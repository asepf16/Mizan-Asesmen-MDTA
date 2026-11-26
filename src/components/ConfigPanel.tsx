import React from 'react';
import {
  BookOpen,
  Sparkles,
  FileCheck2,
  AlertCircle,
  Loader2,
  Minus,
  Plus,
} from 'lucide-react';
import type {
  AssessmentPackage,
  GradeLevel,
  QuestionDistribution,
  SubjectId,
} from '../types/assessment';
import {
  getCurriculumForGradeSubject,
  getSubjectsForGrade,
} from '../data/curriculumMdta';

interface ConfigPanelProps {
  selectedGrade: GradeLevel;
  onChangeGrade: (grade: GradeLevel) => void;
  selectedSubject: SubjectId;
  onChangeSubject: (subject: SubjectId) => void;
  topikMateri: string;
  onChangeTopikMateri: (topik: string) => void;
  selectedUnitCodes: string[];
  onToggleUnitCode: (kode: string) => void;
  semester: string;
  onChangeSemester: (semester: string) => void;
  distribution: QuestionDistribution;
  onChangeDistribution: (key: keyof QuestionDistribution, value: number) => void;
  onResetDistribution: () => void;
  customInstruction: string;
  onChangeCustomInstruction: (value: string) => void;
  isGenerating: boolean;
  generationError: string | null;
  onGenerate: () => void;
  samplePackages: AssessmentPackage[];
  activePackageId: string;
  onSelectSamplePackage: (pkg: AssessmentPackage) => void;
  onOpenCurriculum: () => void;
}

const GRADES: GradeLevel[] = [1, 2, 3, 4, 5, 6];

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  selectedGrade,
  onChangeGrade,
  selectedSubject,
  onChangeSubject,
  topikMateri,
  onChangeTopikMateri,
  selectedUnitCodes,
  onToggleUnitCode,
  semester,
  onChangeSemester,
  distribution,
  onChangeDistribution,
  onResetDistribution,
  customInstruction,
  onChangeCustomInstruction,
  isGenerating,
  generationError,
  onGenerate,
  samplePackages,
  activePackageId,
  onSelectSamplePackage,
  onOpenCurriculum,
}) => {
  const availableSubjects = getSubjectsForGrade(selectedGrade);
  const currentCurriculum = getCurriculumForGradeSubject(selectedGrade, selectedSubject);
  const isUpperPhase = selectedGrade >= 4;

  const totalQuestions =
    distribution.pg +
    distribution.pg_kompleks_centang +
    distribution.pg_kompleks_benar_salah +
    distribution.menjodohkan +
    distribution.isian_singkat +
    distribution.uraian_berargumen;

  const isInvalidTotal = totalQuestions < 1 || totalQuestions > 25;

  const formatRows: {
    key: keyof QuestionDistribution;
    label: string;
    hint: string;
  }[] = [
    {
      key: 'pg',
      label: 'Pilihan Ganda (PG)',
      hint: isUpperPhase ? '4 opsi (A–D)' : '3 opsi (A–C)',
    },
    {
      key: 'pg_kompleks_centang',
      label: 'PG Kompleks',
      hint: 'Centang >1 benar',
    },
    {
      key: 'pg_kompleks_benar_salah',
      label: 'Benar – Salah',
      hint: 'Tabel evaluasi',
    },
    {
      key: 'menjodohkan',
      label: 'Menjodohkan',
      hint: isUpperPhase ? 'Konsep & dalil' : 'Pasangan sederhana',
    },
    {
      key: 'isian_singkat',
      label: 'Isian Singkat',
      hint: 'Jawaban pendek',
    },
    {
      key: 'uraian_berargumen',
      label: 'Uraian Berargumen',
      hint: 'Analisis + rubrik',
    },
  ];

  return (
    <aside className="no-print space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Parameter Asesmen Sumatif
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Penyesuaian fase AKM &amp; HOTS otomatis mengikuti tingkat kelas Ula.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Tingkat Kelas (Diniyah Ula)
          </label>
          <div className="grid grid-cols-6 gap-1 p-1 bg-slate-100 rounded-lg">
            {GRADES.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChangeGrade(g)}
                className={`py-2 text-xs font-semibold rounded-md transition-colors tabular-nums min-h-[40px] ${
                  selectedGrade === g
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {isUpperPhase
              ? 'Fase Kelas 4–6 Ula · AKM Menengah & HOTS (C4 Analisis / C5 Evaluasi) · PG Biasa, PG Kompleks, Menjodohkan Dalil, Uraian.'
              : 'Fase Kelas 1–3 Ula · AKM Dasar (LOTS–MOTS) · Cerita pendek ramah anak · PG A–C, Menjodohkan, Isian Singkat.'}
          </p>
        </div>

        <div>
          <label
            htmlFor="subject-select"
            className="block text-xs font-semibold text-slate-700 mb-2"
          >
            Mata Pelajaran Kurikulum
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => onChangeSubject(e.target.value as SubjectId)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          >
            {availableSubjects.map((sub) => (
              <option key={sub.subject_id} value={sub.subject_id}>
                {sub.mata_pelajaran} ({sub.jam_per_pekan} JP/pekan)
              </option>
            ))}
          </select>
          {selectedGrade <= 2 && (
            <p className="mt-1.5 text-[11px] text-slate-500">
              Catatan Struktur Kurikulum: Tauhid &amp; Sirah Nabawiyah mulai diajarkan pada Kelas 3 Ula.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="topik-materi-input"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Topik / Bab Materi
          </label>
          <input
            id="topik-materi-input"
            type="text"
            value={topikMateri}
            onChange={(e) => onChangeTopikMateri(e.target.value)}
            placeholder={
              currentCurriculum
                ? currentCurriculum.standar_isi_ringkas.slice(0, 68) + '...'
                : 'Tuliskan topik atau bab materi...'
            }
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
        </div>

        {currentCurriculum && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">
                Unit Tujuan Pembelajaran (TP)
              </span>
              <button
                type="button"
                onClick={onOpenCurriculum}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:text-emerald-900 underline underline-offset-2"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                Lihat Dalil
              </button>
            </div>
            <div className="space-y-2">
              {currentCurriculum.units.map((unit) => {
                const checked = selectedUnitCodes.includes(unit.kode);
                return (
                  <label
                    key={unit.kode}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                        : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleUnitCode(unit.kode)}
                      className="mt-0.5 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                    />
                    <span className="leading-relaxed">
                      <span className="font-mono font-semibold text-slate-800">
                        {unit.kode}
                      </span>{' '}
                      · {unit.tujuan_pembelajaran}{' '}
                      <span className="text-slate-500">({unit.halaman_dokumen})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="semester-select"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Jenis Penilaian
          </label>
          <select
            id="semester-select"
            value={semester}
            onChange={(e) => onChangeSemester(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
          >
            <option value="Penilaian Sumatif Akhir Semester Ganjil">Penilaian Sumatif Akhir Semester Ganjil</option>
            <option value="Penilaian Sumatif Akhir Semester Genap">Penilaian Sumatif Akhir Semester Genap</option>
            <option value="Penilaian Sumatif Tengah Semester">Penilaian Sumatif Tengah Semester</option>
            <option value="Ujian Akhir Jenjang Diniyah Ula">Ujian Akhir Jenjang Diniyah Ula</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">
              Jumlah Soal per Bentuk
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`font-mono font-semibold tabular-nums ${
                  isInvalidTotal ? 'text-red-700' : 'text-emerald-800'
                }`}
              >
                Total: {totalQuestions}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <button
                type="button"
                onClick={onResetDistribution}
                className="text-slate-500 hover:text-slate-900 underline underline-offset-2"
              >
                Default Fase
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-white">
            {formatRows.map((row) => {
              const val = distribution[row.key];
              return (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-2 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900 truncate">
                      {row.label}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {row.hint}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      aria-label={`Kurangi jumlah ${row.label}`}
                      onClick={() =>
                        onChangeDistribution(row.key, Math.max(0, val - 1))
                      }
                      disabled={val <= 0}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
                    >
                      <Minus className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      aria-label={`Jumlah ${row.label}`}
                      value={val}
                      onChange={(e) => {
                        const num = parseInt(e.target.value, 10);
                        onChangeDistribution(
                          row.key,
                          Number.isNaN(num) ? 0 : Math.max(0, Math.min(20, num))
                        );
                      }}
                      className="w-10 h-7 text-center text-xs font-mono font-semibold tabular-nums text-slate-900 border border-slate-200 rounded-md focus:outline-none focus:border-emerald-700"
                    />
                    <button
                      type="button"
                      aria-label={`Tambah jumlah ${row.label}`}
                      onClick={() =>
                        onChangeDistribution(row.key, Math.min(20, val + 1))
                      }
                      disabled={val >= 20}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {isInvalidTotal && (
            <p className="mt-1.5 text-[11px] text-red-700">
              Total seluruh bentuk soal harus antara 1 sampai 25 butir.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="custom-note"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Fokus Konteks / Catatan Asatidz (Opsional)
          </label>
          <textarea
            id="custom-note"
            rows={2}
            value={customInstruction}
            onChange={(e) => onChangeCustomInstruction(e.target.value)}
            placeholder="Contoh: Fokus pada studi kasus shalat musafir dan dalil hadits shahih..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
        </div>

        {generationError && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
            <span>{generationError}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || isInvalidTotal}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-[42px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Menyusun Kisi-Kisi &amp; {totalQuestions} Soal...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Susun Paket Soal ({totalQuestions} Butir)
            </>
          )}
        </button>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Paket Referensi Terkurasi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Contoh naskah terverifikasi langsung dari PDF Kurikulum MDTA PERSIS.
          </p>
        </div>

        <div className="space-y-2">
          {samplePackages.map((pkg) => {
            const isActive = pkg.metadata.id === activePackageId;
            return (
              <button
                key={pkg.metadata.id}
                type="button"
                onClick={() => onSelectSamplePackage(pkg)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                    : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900 leading-snug">
                    {pkg.metadata.mata_pelajaran} · Kelas {pkg.metadata.kelas} Ula
                  </span>
                  <FileCheck2
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {pkg.metadata.fase_asesmen === 'AKM_DASAR_LOTS_MOTS'
                    ? 'AKM Dasar (LOTS–MOTS)'
                    : 'AKM Menengah & HOTS'}{' '}
                  · {pkg.butir_soal.length} Butir
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
};
