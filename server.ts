import crypto from 'crypto';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import type { AssessmentPackage } from './src/types/assessment.ts';
import {
  buildAssessmentPrompt,
  generateAssessmentPackage,
  mapFriendlyAiError,
  type GenerateAssessmentRequestBody,
} from './server/assessmentGenerator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface AssessmentJob {
  id: string;
  status: 'pending' | 'done' | 'error';
  message: string;
  chars: number;
  package?: AssessmentPackage;
  error?: string;
  statusCode?: number;
  createdAt: number;
}

const assessmentJobs = new Map<string, AssessmentJob>();

function pruneOldJobs() {
  const cutoff = Date.now() - 15 * 60 * 1000;
  for (const [id, job] of assessmentJobs.entries()) {
    if (job.createdAt < cutoff) {
      assessmentJobs.delete(id);
    }
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'mizan-asesmen-mdta' });
  });

  app.get('/api/assessments/jobs/:jobId', (req, res) => {
    pruneOldJobs();
    const job = assessmentJobs.get(req.params.jobId);
    res.setHeader('Cache-Control', 'no-store');
    if (!job) {
      res.status(404).json({
        error:
          'Sesi penyusunan soal tidak ditemukan atau telah kedaluwarsa. Silakan klik "Susun Paket Soal" kembali.',
      });
      return;
    }
    res.json({
      jobId: job.id,
      status: job.status,
      message: job.message,
      chars: job.chars,
      ...(job.status === 'done' && job.package ? { package: job.package } : {}),
      ...(job.status === 'error'
        ? { error: job.error, statusCode: job.statusCode ?? 500 }
        : {}),
    });
  });

  app.post('/api/assessments/generate', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error:
            'GEMINI_API_KEY belum tersedia di lingkungan server. Periksa panel Settings > Secrets.',
        });
        return;
      }

      const body = req.body as GenerateAssessmentRequestBody;
      const { prompt, systemInstruction, totalRequested, mataPelajaran } =
        buildAssessmentPrompt(body);

      const stream = Boolean(body.stream);
      const asyncMode = Boolean(body.async);

      if (asyncMode) {
        pruneOldJobs();
        const jobId = crypto.randomUUID();
        const initialMessage = `Menyusun ${totalRequested} butir soal ${mataPelajaran}...`;
        const job: AssessmentJob = {
          id: jobId,
          status: 'pending',
          message: initialMessage,
          chars: 0,
          createdAt: Date.now(),
        };
        assessmentJobs.set(jobId, job);

        void (async () => {
          try {
            const parsed = await generateAssessmentPackage(
              { apiKey, prompt, systemInstruction },
              {
                onStatus: (msg) => {
                  job.message = msg;
                },
                onProgress: (chars) => {
                  job.chars = chars;
                },
              }
            );
            job.package = parsed;
            job.status = 'done';
            job.message = 'Paket soal selesai disusun.';
          } catch (err: unknown) {
            console.error('Async assessment job failed:', err);
            const { statusCode, friendlyMessage } = mapFriendlyAiError(err);
            job.status = 'error';
            job.statusCode = statusCode;
            job.error = friendlyMessage;
          }
        })();

        res.status(202).json({
          jobId,
          status: 'pending',
          message: initialMessage,
        });
        return;
      }

      const writeNdjson = (obj: Record<string, unknown>) => {
        if (stream && !res.writableEnded) {
          res.write(`${JSON.stringify(obj)}\n`);
        }
      };

      let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
      if (stream) {
        req.setTimeout(0);
        res.setTimeout(0);
        res.status(200);
        res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('X-Accel-Buffering', 'no');
        if (typeof res.flushHeaders === 'function') {
          res.flushHeaders();
        }
        writeNdjson({
          type: 'status',
          message: `Menyusun ${totalRequested} butir soal ${mataPelajaran}...`,
        });
        heartbeatTimer = setInterval(() => {
          writeNdjson({ type: 'ping', ts: Date.now() });
        }, 2000);
        res.on('close', () => {
          if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
          }
        });
      }

      try {
        const parsed = await generateAssessmentPackage(
          { apiKey, prompt, systemInstruction },
          {
            onStatus: (msg) => writeNdjson({ type: 'status', message: msg }),
            onProgress: stream
              ? (chars) => writeNdjson({ type: 'progress', chars })
              : undefined,
          }
        );
        if (stream) {
          writeNdjson({ type: 'result', package: parsed });
          res.end();
        } else {
          res.json({ package: parsed });
        }
      } finally {
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer);
          heartbeatTimer = null;
        }
      }
    } catch (error: unknown) {
      console.error('Error generating assessment package:', error);
      const { statusCode, friendlyMessage } = mapFriendlyAiError(error);

      if (res.headersSent) {
        if (!res.writableEnded) {
          res.write(
            `${JSON.stringify({ type: 'error', status: statusCode, error: friendlyMessage })}\n`
          );
          res.end();
        }
      } else {
        res.status(statusCode).json({ error: friendlyMessage });
      }
    }
  });

  app.use('/api/*', (_req, res) => {
    res.status(404).json({ error: 'Endpoint API tidak ditemukan.' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

startServer();
