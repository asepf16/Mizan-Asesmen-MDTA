import { useState } from 'react';
import { Header, type WorkspaceTab } from './components/Header';
import { ConfigPanel } from './components/ConfigPanel';
import { KisiKisiView } from './components/KisiKisiView';
import { QuestionPackView } from './components/QuestionPackView';
import { JsonSchemaView } from './components/JsonSchemaView';
import { CurriculumExplorerModal } from './components/CurriculumExplorerModal';
import {
  getCurriculumForGradeSubject,
  getSubjectsForGrade,
} from './data/curriculumMdta';
import { SAMPLE_PACKAGES } from './data/samplePackages';
import type {
  AssessmentPackage,
  GradeLevel,
  QuestionDistribution,
  SubjectId,
} from './types/assessment';

function getDefaultDistribution(grade: GradeLevel): QuestionDistribution {
  if (grade <= 3) {
    return {
      pg: 3,
      pg_kompleks_centang: 0,
      pg_kompleks_benar_salah: 0,
      menjodohkan: 1,
      isian_singkat: 1,
      uraian_berargumen: 0,
    };
  }
  return {
    pg: 2,
    pg_kompleks_centang: 1,
    pg_kompleks_benar_salah: 1,
    menjodohkan: 1,
    isian_singkat: 0,
    uraian_berargumen: 1,
  };
}

export default function App() {
  const initialPackage = SAMPLE_PACKAGES[0];

  const [activePackage, setActivePackage] =
    useState<AssessmentPackage>(initialPackage);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('naskah_soal');

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    initialPackage.metadata.kelas
  );
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(
    initialPackage.metadata.subject_id
  );
  const [selectedUnitCodes, setSelectedUnitCodes] = useState<string[]>(() => {
    const cur = getCurriculumForGradeSubject(
      initialPackage.metadata.kelas,
      initialPackage.metadata.subject_id
    );
    return cur ? cur.units.map((u) => u.kode) : [];
  });

  const [semester, setSemester] = useState<string>(
    'Penilaian Sumatif Akhir Semester Ganjil'
  );
  const [topikMateri, setTopikMateri] = useState<string>('');
  const [distribution, setDistribution] = useState<QuestionDistribution>(() =>
    getDefaultDistribution(initialPackage.metadata.kelas)
  );
  const [customInstruction, setCustomInstruction] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] =
    useState<boolean>(false);

  const handleChangeGrade = (grade: GradeLevel) => {
    const prevWasUpper = selectedGrade >= 4;
    const nextIsUpper = grade >= 4;
    setSelectedGrade(grade);
    const available = getSubjectsForGrade(grade);
    const stillValid = available.some((s) => s.subject_id === selectedSubject);
    const nextSubject = stillValid
      ? selectedSubject
      : available[0]?.subject_id ?? 'hadits_adab';
    setSelectedSubject(nextSubject);

    const cur = getCurriculumForGradeSubject(grade, nextSubject);
    setSelectedUnitCodes(cur ? cur.units.map((u) => u.kode) : []);
    if (prevWasUpper !== nextIsUpper) {
      setDistribution(getDefaultDistribution(grade));
    }
    setTopikMateri('');
    setGenerationError(null);
  };

  const handleChangeSubject = (subject: SubjectId) => {
    setSelectedSubject(subject);
    const cur = getCurriculumForGradeSubject(selectedGrade, subject);
    setSelectedUnitCodes(cur ? cur.units.map((u) => u.kode) : []);
    setTopikMateri('');
    setGenerationError(null);
  };

  const handleToggleUnitCode = (kode: string) => {
    setSelectedUnitCodes((prev) =>
      prev.includes(kode) ? prev.filter((c) => c !== kode) : [...prev, kode]
    );
  };

  const handleChangeDistribution = (
    key: keyof QuestionDistribution,
    value: number
  ) => {
    setDistribution((prev) => ({ ...prev, [key]: value }));
    setGenerationError(null);
  };

  const handleResetDistribution = () => {
    setDistribution(getDefaultDistribution(selectedGrade));
    setGenerationError(null);
  };

  const handleSelectSamplePackage = (pkg: AssessmentPackage) => {
    setActivePackage(pkg);
    setSelectedGrade(pkg.metadata.kelas);
    setSelectedSubject(pkg.metadata.subject_id);
    const cur = getCurriculumForGradeSubject(
      pkg.metadata.kelas,
      pkg.metadata.subject_id
    );
    setSelectedUnitCodes(cur ? cur.units.map((u) => u.kode) : []);
    setDistribution(getDefaultDistribution(pkg.metadata.kelas));
    setTopikMateri('');
    setGenerationError(null);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStatus('Menghubungi layanan penyusun soal...');
    setGenerationError(null);

    const parseJsonSafe = async <T,>(response: Response): Promise<T> => {
      const rawText = await response.text();
      try {
        return JSON.parse(rawText) as T;
      } catch {
        const snippet = rawText.replace(/\s+/g, ' ').trim().slice(0, 100);
        throw new Error(
          `Respons server bukan JSON (HTTP ${response.status}${
            snippet ? `: "${snippet}"` : ''
          }). Silakan coba klik "Susun Paket Soal" kembali.`
        );
      }
    };

    try {
      const startRes = await fetch('/api/assessments/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kelas: selectedGrade,
          subjectId: selectedSubject,
          semester,
          topikMateri,
          distribution,
          selectedUnitCodes,
          customInstruction,
          async: true,
        }),
      });

      const startPayload = await parseJsonSafe<{
        jobId?: string;
        message?: string;
        package?: AssessmentPackage;
        error?: string;
      }>(startRes);

      if (!startRes.ok) {
        throw new Error(
          startPayload.error ||
            `Gagal memulai penyusunan soal (HTTP ${startRes.status}).`
        );
      }

      if (startPayload.package) {
        setActivePackage(startPayload.package);
        setActiveTab('naskah_soal');
        return;
      }

      const jobId = startPayload.jobId;
      if (!jobId) {
        throw new Error('Server tidak mengembalikan ID antrean penyusunan soal.');
      }

      if (startPayload.message) {
        setGenerationStatus(startPayload.message);
      }

      let finalPackage: AssessmentPackage | undefined;
      const startedAt = Date.now();
      let consecutivePollErrors = 0;

      while (Date.now() - startedAt < 180000) {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        let pollRes: Response;
        try {
          pollRes = await fetch(
            `/api/assessments/jobs/${encodeURIComponent(jobId)}`,
            {
              method: 'GET',
              cache: 'no-store',
              signal: AbortSignal.timeout(12000),
            }
          );
        } catch (netErr) {
          consecutivePollErrors += 1;
          if (consecutivePollErrors >= 4) {
            throw netErr instanceof Error
              ? netErr
              : new Error('Koneksi jaringan ke server terputus.');
          }
          continue;
        }

        let jobPayload: {
          status?: 'pending' | 'done' | 'error';
          message?: string;
          chars?: number;
          package?: AssessmentPackage;
          error?: string;
        };

        try {
          jobPayload = await parseJsonSafe(pollRes);
          consecutivePollErrors = 0;
        } catch (parseErr) {
          consecutivePollErrors += 1;
          if (consecutivePollErrors >= 3) {
            throw parseErr;
          }
          continue;
        }

        if (!pollRes.ok) {
          throw new Error(
            jobPayload.error ||
              `Gagal memeriksa status penyusunan (HTTP ${pollRes.status}).`
          );
        }

        if (jobPayload.status === 'done' && jobPayload.package) {
          finalPackage = jobPayload.package;
          break;
        }

        if (jobPayload.status === 'error') {
          throw new Error(
            jobPayload.error || 'Gagal menyusun paket soal dari layanan server.'
          );
        }

        if (jobPayload.chars && jobPayload.chars > 0) {
          setGenerationStatus(
            `${jobPayload.message || 'Menyusun paket soal...'} (${Math.round(
              jobPayload.chars / 100
            ) / 10} KB)`
          );
        } else if (jobPayload.message) {
          setGenerationStatus(jobPayload.message);
        }
      }

      if (!finalPackage) {
        throw new Error(
          'Proses penyusunan soal melampaui batas waktu tunggu. Silakan coba lagi atau kurangi jumlah butir soal.'
        );
      }

      setActivePackage(finalPackage);
      setActiveTab('naskah_soal');
    } catch (err: unknown) {
      setGenerationError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan jaringan saat menghubungi server.'
      );
    } finally {
      setIsGenerating(false);
      setGenerationStatus(null);
    }
  };

  const handlePrint = () => {
    if (activeTab === 'json_schema') {
      setActiveTab('naskah_soal');
      setTimeout(() => window.print(), 100);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCurriculum={() => setIsCurriculumModalOpen(true)}
        onPrint={handlePrint}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 space-y-6">
        <div className="no-print flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="space-y-1 max-w-3xl">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-balance">
              Penyusun Kisi-Kisi &amp; Paket Soal Sumatif AKM / HOTS MDTA PERSIS
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seluruh indikator, teks dalil Al-Qur&apos;an dan Hadits, istilah fiqih-tauhid, adab harian, serta naskah sirah berlandaskan langsung pada Kurikulum MDTA Persatuan Islam Kelas 1–6 Ula.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Tampilan dokumen asesmen"
            className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg shrink-0 self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'naskah_soal'}
              onClick={() => setActiveTab('naskah_soal')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'naskah_soal'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Naskah Soal AKM
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'kisi_kisi'}
              onClick={() => setActiveTab('kisi_kisi')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'kisi_kisi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kisi-Kisi Penilaian
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'json_schema'}
              onClick={() => setActiveTab('json_schema')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'json_schema'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Output JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
          <ConfigPanel
            selectedGrade={selectedGrade}
            onChangeGrade={handleChangeGrade}
            selectedSubject={selectedSubject}
            onChangeSubject={handleChangeSubject}
            topikMateri={topikMateri}
            onChangeTopikMateri={setTopikMateri}
            selectedUnitCodes={selectedUnitCodes}
            onToggleUnitCode={handleToggleUnitCode}
            semester={semester}
            onChangeSemester={setSemester}
            distribution={distribution}
            onChangeDistribution={handleChangeDistribution}
            onResetDistribution={handleResetDistribution}
            customInstruction={customInstruction}
            onChangeCustomInstruction={setCustomInstruction}
            isGenerating={isGenerating}
            generationStatus={generationStatus}
            generationError={generationError}
            onGenerate={handleGenerate}
            samplePackages={SAMPLE_PACKAGES}
            activePackageId={activePackage.metadata.id}
            onSelectSamplePackage={handleSelectSamplePackage}
            onOpenCurriculum={() => setIsCurriculumModalOpen(true)}
          />

          <div className="min-w-0">
            {activeTab === 'naskah_soal' && (
              <QuestionPackView key={activePackage.metadata.id} pkg={activePackage} />
            )}
            {activeTab === 'kisi_kisi' && <KisiKisiView pkg={activePackage} />}
            {activeTab === 'json_schema' && <JsonSchemaView pkg={activePackage} />}
          </div>
        </div>
      </main>

      <footer className="no-print border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            Mizan Asesmen MDTA Persatuan Islam No. 05 Nurul Islam Tegalpanjang Garut · Rujukan Kurikulum Diniyah Ula Kelas 1–6
          </span>
          <button
            type="button"
            onClick={() => setIsCurriculumModalOpen(true)}
            className="text-emerald-800 hover:text-emerald-900 font-medium underline underline-offset-2"
          >
            Buka Dokumen Kurikulum Resmi
          </button>
        </div>
      </footer>

      <CurriculumExplorerModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        kelas={selectedGrade}
        subjectId={selectedSubject}
      />
    </div>
  );
}
