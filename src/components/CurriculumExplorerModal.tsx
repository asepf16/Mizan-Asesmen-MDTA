import React from 'react';
import { BookOpen, FileText, X } from 'lucide-react';
import type { GradeLevel, SubjectId } from '../types/assessment';
import { getCurriculumForGradeSubject } from '../data/curriculumMdta';

interface CurriculumExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  kelas: GradeLevel;
  subjectId: SubjectId;
}

export const CurriculumExplorerModal: React.FC<CurriculumExplorerModalProps> = ({
  isOpen,
  onClose,
  kelas,
  subjectId,
}) => {
  if (!isOpen) return null;

  const data = getCurriculumForGradeSubject(kelas, subjectId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-emerald-800 shrink-0" aria-hidden="true" />
            <div>
              <h2
                id="curriculum-modal-title"
                className="text-base font-bold text-slate-900"
              >
                Rujukan Resmi Kurikulum MDTA PERSIS
              </h2>
              <p className="text-xs text-slate-500">
                Kelas {kelas} Ula · {data?.mata_pelajaran ?? ''} · Dokumen Terlampir (47 Halaman)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela rujukan kurikulum"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {data ? (
            <>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-xs font-semibold text-slate-700">
                  Ringkasan Standar Isi · {data.jam_per_pekan} Jam/Pekan ({data.jam_per_tahun} Jam/Tahun)
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {data.standar_isi_ringkas}
                </p>
              </div>

              <div className="space-y-5">
                {data.units.map((unit) => (
                  <section
                    key={unit.kode}
                    className="border border-slate-200 rounded-lg p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800">
                        {unit.kode}
                      </span>
                      <span className="text-xs text-slate-500">
                        {unit.halaman_dokumen}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">
                      {unit.tujuan_pembelajaran}
                    </h3>

                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-slate-700">
                        Capaian Pembelajaran:
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 leading-relaxed">
                        {unit.capaian_pembelajaran.map((cp, i) => (
                          <li key={i}>{cp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-700">
                        Materi Inti &amp; Dalil Resmi:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-800 leading-relaxed">
                        {unit.materi_inti_dan_dalil.map((dalil, i) => {
                          const hasArabic = /[\u0600-\u06FF]/.test(dalil);
                          return (
                            <li
                              key={i}
                              className={`p-2.5 rounded-md bg-slate-50 border border-slate-200/70 ${
                                hasArabic ? 'text-slate-900' : ''
                              }`}
                            >
                              {dalil}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </section>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-600">
              Data kurikulum untuk kelas dan mata pelajaran ini belum dipilih.
            </p>
          )}

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <FileText className="w-4 h-4 text-emerald-800" aria-hidden="true" />
                Pratinjau Dokumen PDF Kurikulum MDTA PERSIS
              </div>
              <a
                href="/assets/aistudio/mdta_1-1-digabungkan_c7e35124.pdf"
                download="Kurikulum_MDTA_PERSIS.pdf"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline underline-offset-2"
              >
                Unduh PDF Asli
              </a>
            </div>
            <iframe
              title="Dokumen Kurikulum MDTA PERSIS"
              src="/assets/aistudio/mdta_1-1-digabungkan_c7e35124.pdf"
              className="w-full h-80 rounded-md border border-slate-200 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
