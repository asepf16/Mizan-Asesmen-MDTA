import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { CURRICULUM_DATA, SUBJECT_META } from './src/data/curriculumMdta.ts';
import type {
  GradeLevel,
  SubjectId,
  AssessmentPackage,
  QuestionDistribution,
} from './src/types/assessment.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const ASSESSMENT_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    metadata: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        judul_paket: { type: Type.STRING },
        jenjang: { type: Type.STRING },
        kelas: { type: Type.INTEGER },
        fase_asesmen: { type: Type.STRING },
        mata_pelajaran: { type: Type.STRING },
        subject_id: { type: Type.STRING },
        semester: { type: Type.STRING },
        tahun_ajaran: { type: Type.STRING },
        alokasi_waktu_menit: { type: Type.INTEGER },
        sumber_kurikulum_resmi: { type: Type.STRING },
        tanggal_disusun: { type: Type.STRING },
      },
      required: [
        'id',
        'judul_paket',
        'jenjang',
        'kelas',
        'fase_asesmen',
        'mata_pelajaran',
        'subject_id',
        'semester',
        'tahun_ajaran',
        'alokasi_waktu_menit',
        'sumber_kurikulum_resmi',
        'tanggal_disusun',
      ],
    },
    kisi_kisi: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          no_urut: { type: Type.INTEGER },
          kode_tp: { type: Type.STRING },
          tujuan_pembelajaran: { type: Type.STRING },
          capaian_pembelajaran: { type: Type.STRING },
          indikator_soal: { type: Type.STRING },
          bentuk_soal: { type: Type.STRING },
          level_kognitif: { type: Type.STRING },
          nomor_soal: { type: Type.INTEGER },
          sumber_kurikulum: { type: Type.STRING },
        },
        required: [
          'no_urut',
          'kode_tp',
          'tujuan_pembelajaran',
          'capaian_pembelajaran',
          'indikator_soal',
          'bentuk_soal',
          'level_kognitif',
          'nomor_soal',
          'sumber_kurikulum',
        ],
      },
    },
    butir_soal: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nomor: { type: Type.INTEGER },
          kode_tp: { type: Type.STRING },
          bentuk_soal: { type: Type.STRING },
          level_kognitif: { type: Type.STRING },
          stimulus_konteks: { type: Type.STRING },
          stimulus_arab: { type: Type.STRING },
          stimulus_sumber: { type: Type.STRING },
          pertanyaan: { type: Type.STRING },
          pertanyaan_arab: { type: Type.STRING },
          opsi_pilihan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                kode: { type: Type.STRING },
                teks: { type: Type.STRING },
                teks_arab: { type: Type.STRING },
                benar: { type: Type.BOOLEAN },
              },
              required: ['kode', 'teks', 'benar'],
            },
          },
          pasangan_menjodohkan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                premis: { type: Type.STRING },
                premis_arab: { type: Type.STRING },
                respon: { type: Type.STRING },
                respon_arab: { type: Type.STRING },
              },
              required: ['id', 'premis', 'respon'],
            },
          },
          pernyataan_benar_salah: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                pernyataan: { type: Type.STRING },
                pernyataan_arab: { type: Type.STRING },
                kunci: { type: Type.STRING },
              },
              required: ['id', 'pernyataan', 'kunci'],
            },
          },
          kunci_jawaban: { type: Type.STRING },
          kunci_array: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          pembahasan_syariat: { type: Type.STRING },
          rubrik_penskoran: { type: Type.STRING },
          skor_maksimal: { type: Type.INTEGER },
        },
        required: [
          'nomor',
          'kode_tp',
          'bentuk_soal',
          'level_kognitif',
          'stimulus_konteks',
          'pertanyaan',
          'kunci_jawaban',
          'pembahasan_syariat',
          'skor_maksimal',
        ],
      },
    },
  },
  required: ['metadata', 'kisi_kisi', 'butir_soal'],
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'mizan-asesmen-mdta' });
  });

  app.post('/api/assessments/generate', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          error:
            'GEMINI_API_KEY belum tersedia di lingkungan server. Periksa panel Settings > Secrets.',
        });
        return;
      }

      const {
        kelas,
        subjectId,
        semester = 'Penilaian Sumatif Akhir Semester',
        topikMateri = '',
        questionCount = 5,
        distribution,
        selectedUnitCodes,
        customInstruction = '',
      } = req.body as {
        kelas: GradeLevel;
        subjectId: SubjectId;
        semester?: string;
        topikMateri?: string;
        questionCount?: number;
        distribution?: QuestionDistribution;
        selectedUnitCodes?: string[];
        customInstruction?: string;
      };

      const gradeNum = Number(kelas) as GradeLevel;
      if (![1, 2, 3, 4, 5, 6].includes(gradeNum)) {
        res.status(400).json({ error: 'Tingkat kelas harus antara 1 sampai 6 Ula.' });
        return;
      }

      const curriculum = CURRICULUM_DATA.find(
        (c) => c.kelas === gradeNum && c.subject_id === subjectId
      );

      if (!curriculum) {
        const subjectInfo = SUBJECT_META[subjectId];
        res.status(400).json({
          error: subjectInfo
            ? `Mata pelajaran ${subjectInfo.nama} pada struktur Kurikulum MDTA PERSIS baru diajarkan mulai Kelas ${subjectInfo.kelasMulai} Ula.`
            : 'Kombinasi kelas dan mata pelajaran tidak ditemukan di kurikulum.',
        });
        return;
      }

      const activeUnits =
        Array.isArray(selectedUnitCodes) && selectedUnitCodes.length > 0
          ? curriculum.units.filter((u) => selectedUnitCodes.includes(u.kode))
          : curriculum.units;

      const unitsToUse = activeUnits.length > 0 ? activeUnits : curriculum.units;
      const isLowerPhase = gradeNum <= 3;

      const pgTypeKey = isLowerPhase ? 'pg_sederhana' : 'pg_biasa';
      const distSanitized: QuestionDistribution = distribution
        ? {
            pg: Math.max(0, Math.min(20, Number(distribution.pg) || 0)),
            pg_kompleks_centang: Math.max(
              0,
              Math.min(20, Number(distribution.pg_kompleks_centang) || 0)
            ),
            pg_kompleks_benar_salah: Math.max(
              0,
              Math.min(20, Number(distribution.pg_kompleks_benar_salah) || 0)
            ),
            menjodohkan: Math.max(
              0,
              Math.min(20, Number(distribution.menjodohkan) || 0)
            ),
            isian_singkat: Math.max(
              0,
              Math.min(20, Number(distribution.isian_singkat) || 0)
            ),
            uraian_berargumen: Math.max(
              0,
              Math.min(20, Number(distribution.uraian_berargumen) || 0)
            ),
          }
        : isLowerPhase
        ? {
            pg: Math.max(1, (Number(questionCount) || 5) - 2),
            pg_kompleks_centang: 0,
            pg_kompleks_benar_salah: 0,
            menjodohkan: 1,
            isian_singkat: 1,
            uraian_berargumen: 0,
          }
        : {
            pg: Math.max(1, (Number(questionCount) || 5) - 4),
            pg_kompleks_centang: 1,
            pg_kompleks_benar_salah: 1,
            menjodohkan: 1,
            isian_singkat: 0,
            uraian_berargumen: 1,
          };

      const totalRequested =
        distSanitized.pg +
        distSanitized.pg_kompleks_centang +
        distSanitized.pg_kompleks_benar_salah +
        distSanitized.menjodohkan +
        distSanitized.isian_singkat +
        distSanitized.uraian_berargumen;

      if (totalRequested < 1 || totalRequested > 25) {
        res.status(400).json({
          error: 'Total jumlah soal dari seluruh bentuk soal harus antara 1 sampai 25 butir.',
        });
        return;
      }

      const breakdownLines: string[] = [];
      let currentNum = 1;
      const addBreakdown = (
        count: number,
        bentukCode: string,
        label: string
      ) => {
        if (count > 0) {
          const endNum = currentNum + count - 1;
          const rangeText =
            count === 1 ? `Nomor ${currentNum}` : `Nomor ${currentNum}–${endNum}`;
          breakdownLines.push(
            `- ${rangeText}: TEPAT ${count} butir dengan bentuk_soal = "${bentukCode}" (${label})`
          );
          currentNum = endNum + 1;
        }
      };

      addBreakdown(
        distSanitized.pg,
        pgTypeKey,
        isLowerPhase ? 'Pilihan Ganda Sederhana A–C' : 'Pilihan Ganda Biasa A–D'
      );
      addBreakdown(
        distSanitized.pg_kompleks_centang,
        'pg_kompleks_centang',
        'PG Kompleks Centang >1 jawaban benar'
      );
      addBreakdown(
        distSanitized.pg_kompleks_benar_salah,
        'pg_kompleks_benar_salah',
        'PG Kompleks Tabel Benar–Salah'
      );
      addBreakdown(
        distSanitized.menjodohkan,
        'menjodohkan',
        'Menjodohkan'
      );
      addBreakdown(
        distSanitized.isian_singkat,
        'isian_singkat',
        'Isian Singkat'
      );
      addBreakdown(
        distSanitized.uraian_berargumen,
        'uraian_berargumen',
        'Uraian Berargumen'
      );

      const formatSpecs = `ATURAN STRUKTUR TIAP BENTUK SOAL (WAJIB DIPATUHI):
- "pg_sederhana" -> Wajib punya tepat 3 opsi di opsi_pilihan (kode: "A", "B", "C") dengan tepat 1 opsi benar: true.
- "pg_biasa" -> Wajib punya tepat 4 opsi di opsi_pilihan (kode: "A", "B", "C", "D") dengan tepat 1 opsi benar: true.
- "pg_kompleks_centang" -> Wajib punya 4 opsi di opsi_pilihan (kode: "A", "B", "C", "D") dengan 2 atau 3 opsi benar: true, dan kunci_array berisi array kode yang benar (misal ["A", "C"]).
- "pg_kompleks_benar_salah" -> Wajib punya 3 atau 4 pernyataan di pernyataan_benar_salah dengan field kunci bernilai persis "Benar" atau "Salah".
- "menjodohkan" -> Wajib punya ${isLowerPhase ? '3' : '4'} pasang di pasangan_menjodohkan (id, premis, respon).
- "isian_singkat" -> Tanpa opsi_pilihan; wajib sertakan kunci_jawaban singkat serta kunci_array berisi variasi penulisan benar (huruf kecil/latin/Arab) dan rubrik_penskoran.
- "uraian_berargumen" -> Pertanyaan terbuka beserta kunci_jawaban dan rubrik_penskoran terperinci.`;

      const phaseRule = isLowerPhase
        ? `FASE KELAS ${gradeNum} ULA (AKM DASAR / LOTS-MOTS):
- Stimulus: Teks cerita pendek (1-3 kalimat), dialog sederhana, atau situasi konkret santri sehari-hari. Bahasa singkat, jelas, ramah anak, dan langsung pada inti pertanyaan.
- Level Kognitif yang WAJIB digunakan (pilih nilai persis): "C1_Mengingat", "C2_Memahami", atau "C3_Menerapkan".`
        : `FASE KELAS ${gradeNum} ULA (AKM MENENGAH & HOTS C4-C5):
- Stimulus: Studi kasus dilema/masalah ibadah sehari-hari, analisis penerapan adab, atau petikan dalil Al-Qur'an/Hadits beserta terjemahannya.
- Level Kognitif yang WAJIB digunakan (pilih nilai persis): "C4_Menganalisis" atau "C5_Mengevaluasi" (HOTS menuntut santri menganalisis sebab-akibat, membandingkan hukum/tindakan, atau mengevaluasi kesesuaian perilaku dengan dalil syariat PERSIS).`;

      const curriculumContext = unitsToUse
        .map(
          (u) =>
            `[Kode ${u.kode} | ${u.halaman_dokumen}]
Tujuan Pembelajaran: ${u.tujuan_pembelajaran}
Capaian Pembelajaran:
${u.capaian_pembelajaran.map((cp) => `- ${cp}`).join('\n')}
Materi Inti & Dalil Resmi Kurikulum:
${u.materi_inti_dan_dalil.map((d) => `- ${d}`).join('\n')}`
        )
        .join('\n\n');

      const prompt = `Susunlah Kisi-Kisi dan Paket Soal Penilaian Sumatif (TEPAT ${totalRequested} butir soal dengan skor total 100) untuk:
- Jenjang: Diniyah Ula (MDTA Persatuan Islam / PERSIS)
- Kelas: ${gradeNum} Ula
- Mata Pelajaran: ${curriculum.mata_pelajaran} (subject_id: "${curriculum.subject_id}")
- Topik / Bab Materi: ${topikMateri.trim() ? topikMateri.trim() : 'Seluruh capaian pembelajaran aktif pada semester terkait'}
- Semester/Jenis: ${semester}
- Fase: ${isLowerPhase ? 'AKM_DASAR_LOTS_MOTS' : 'AKM_MENENGAH_HOTS'}

KOMPOSISI JUMLAH PER BENTUK SOAL YANG WAJIB DIPENUHI PERSIS (TOTAL ${totalRequested} SOAL):
${breakdownLines.join('\n')}

${phaseRule}

${formatSpecs}

SUMBER MATERI KURIKULUM MDTA PERSIS TERLAMPIR (WAJIB 100% GROUNDED PADA DATA INI):
Ringkasan Standar Isi: ${curriculum.standar_isi_ringkas}

${curriculumContext}

${customInstruction ? `Catatan Tambahan Penyusun: ${customInstruction}` : ''}

Pastikan:
1. Nomor soal berurutan 1 s.d ${totalRequested}, jumlah baris kisi_kisi sama persis dengan jumlah butir_soal (${totalRequested}), dan jumlah tiap bentuk_soal mengikuti rincian komposisi di atas secara eksak.
2. WAJIB TEKS ARAB: Untuk SETIAP butir soal yang memuat, merujuk, atau membahas ayat Al-Qur'an, Hadits Nabi saw, atau dzikir/do'a, WAJIB tuliskan teks Arab aslinya secara lengkap dengan harakat pada field "stimulus_arab" (atau pada "pertanyaan_arab" / "teks_arab" / "respon_arab" / "pernyataan_arab" sesuai konteksnya). Jangan hanya menuliskan terjemahan atau nomor hadits saja, KECUALI pada soal "isian_singkat" yang menanyakan hafalan lafazh tersebut agar kunci tidak bocor di stimulus.
3. Semua dalil Al-Qur'an, Hadits, nomor hadits, dan istilah Fiqih/Tauhid/Adab/Sirah/Bahasa Arab WAJIB konsisten 100% dengan materi Kurikulum MDTA PERSIS di atas.
4. Pada metadata: jenjang harus "Diniyah Ula", kelas harus ${gradeNum}, fase_asesmen harus "${isLowerPhase ? 'AKM_DASAR_LOTS_MOTS' : 'AKM_MENENGAH_HOTS'}", subject_id harus "${curriculum.subject_id}", mata_pelajaran harus "${curriculum.mata_pelajaran}", tanggal_disusun gunakan "2026-11-26".`;

      const systemInstruction =
        'Anda adalah Pakar Pengembangan Asesmen Pembelajaran Madrasah Diniyah Takmiliyah Awaliyah (MDTA) Persatuan Islam (PERSIS). Anda menyusun kisi-kisi dan soal AKM/HOTS secara akurat, beradab, sesuai manhaj dalil Al-Qur\'an dan Sunnah pada Kurikulum MDTA PERSIS, dan mengeluarkan JSON valid sesuai schema.';

      const modelsToTry = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'] as const;
      let rawText = '';
      let lastError: unknown = null;

      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      const isTransientError = (err: unknown): boolean => {
        const msg = err instanceof Error ? err.message : String(err);
        return (
          msg.includes('503') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('high demand') ||
          msg.includes('502') ||
          msg.includes('500') ||
          msg.includes('429') ||
          msg.includes('RESOURCE_EXHAUSTED')
        );
      };

      for (const modelName of modelsToTry) {
        const maxAttempts = 2;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: ASSESSMENT_RESPONSE_SCHEMA,
              },
            });

            const candidateText = (response.text ?? '').trim();
            if (candidateText) {
              rawText = candidateText;
              break;
            }
            lastError = new Error('Model mengembalikan respons kosong.');
          } catch (err: unknown) {
            lastError = err;
            console.warn(
              `Attempt ${attempt}/${maxAttempts} failed for ${modelName}:`,
              err instanceof Error ? err.message : err
            );
            if (!isTransientError(err)) {
              break;
            }
            if (attempt < maxAttempts) {
              await sleep(1200 * attempt);
            }
          }
        }
        if (rawText) {
          break;
        }
      }

      if (!rawText) {
        throw lastError ?? new Error('Model tidak mengembalikan output JSON.');
      }

      const parsed = JSON.parse(rawText) as AssessmentPackage;
      res.json({ package: parsed });
    } catch (error: unknown) {
      console.error('Error generating assessment package:', error);
      const rawMsg = error instanceof Error ? error.message : String(error);

      let statusCode = 500;
      let friendlyMessage =
        'Terjadi kesalahan saat menyusun paket soal dengan layanan AI.';

      if (
        rawMsg.includes('503') ||
        rawMsg.includes('UNAVAILABLE') ||
        rawMsg.includes('high demand')
      ) {
        statusCode = 503;
        friendlyMessage =
          'Layanan model AI sedang mengalami lonjakan trafik sementara (503). Sistem sudah mencoba ulang otomatis dan berpindah model cadangan—silakan klik "Susun Paket Soal AKM/HOTS" kembali dalam beberapa detik.';
      } else if (rawMsg.includes('429') || rawMsg.includes('RESOURCE_EXHAUSTED')) {
        statusCode = 429;
        friendlyMessage =
          'Batas kuota permintaan AI sementara tercapai (429). Silakan tunggu sebentar lalu coba lagi, atau periksa kunci API di panel Settings > Secrets.';
      } else if (
        rawMsg.includes('API_KEY_INVALID') ||
        rawMsg.includes('PERMISSION_DENIED') ||
        rawMsg.includes('403')
      ) {
        statusCode = 403;
        friendlyMessage =
          'Kunci API tidak valid atau tidak memiliki izin akses. Silakan periksa GEMINI_API_KEY di panel Settings > Secrets.';
      } else if (rawMsg) {
        friendlyMessage = rawMsg;
      }

      res.status(statusCode).json({ error: friendlyMessage });
    }
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
