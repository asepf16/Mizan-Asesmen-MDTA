import type { IncomingMessage, ServerResponse } from 'http';
import {
  buildAssessmentPrompt,
  generateAssessmentPackage,
  mapFriendlyAiError,
  type GenerateAssessmentRequestBody,
} from '../../server/assessmentGenerator.ts';

export const maxDuration = 60;

async function readJsonBody(
  req: IncomingMessage & { body?: unknown }
): Promise<GenerateAssessmentRequestBody> {
  if (req.body && typeof req.body === 'object') {
    return req.body as GenerateAssessmentRequestBody;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    return JSON.parse(req.body) as GenerateAssessmentRequestBody;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? (JSON.parse(raw) as GenerateAssessmentRequestBody) : ({} as GenerateAssessmentRequestBody);
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; method?: string },
  res: ServerResponse
) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Metode harus POST.' });
    return;
  }

  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let useStream = false;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      sendJson(res, 500, {
        error:
          'GEMINI_API_KEY belum tersedia di Environment Variables server. Tambahkan GEMINI_API_KEY pada pengaturan proyek lalu redeploy.',
      });
      return;
    }

    const body = await readJsonBody(req);
    const { prompt, systemInstruction, totalRequested, mataPelajaran } =
      buildAssessmentPrompt(body);

    useStream = Boolean(body.stream || body.async);

    const writeNdjson = (obj: Record<string, unknown>) => {
      if (useStream && !res.writableEnded) {
        res.write(`${JSON.stringify(obj)}\n`);
      }
    };

    if (useStream) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('X-Accel-Buffering', 'no');
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

    const parsed = await generateAssessmentPackage(
      { apiKey, prompt, systemInstruction },
      {
        onStatus: (msg) => writeNdjson({ type: 'status', message: msg }),
        onProgress: useStream
          ? (chars) => writeNdjson({ type: 'progress', chars })
          : undefined,
      }
    );

    if (useStream) {
      writeNdjson({ type: 'result', package: parsed });
      res.end();
    } else {
      sendJson(res, 200, { package: parsed });
    }
  } catch (error: unknown) {
    console.error('Vercel assessment generation error:', error);
    const { statusCode, friendlyMessage } = mapFriendlyAiError(error);

    if (res.headersSent) {
      if (!res.writableEnded) {
        res.write(
          `${JSON.stringify({ type: 'error', status: statusCode, error: friendlyMessage })}\n`
        );
        res.end();
      }
    } else {
      sendJson(res, statusCode, { error: friendlyMessage });
    }
  } finally {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }
}
