import React, { useState } from 'react';
import { FileDown, FileText, Loader2 } from 'lucide-react';
import type { AssessmentPackage } from '../types/assessment';
import {
  COGNITIVE_LEVEL_LABELS,
  QUESTION_TYPE_LABELS,
} from '../types/assessment';
import { downloadKisiKisiPdf } from '../utils/exportPdf';
import { downloadKisiKisiWord } from '../utils/exportWord';

interface KisiKisiViewProps {
  pkg: AssessmentPackage;
}

export const KisiKisiView: React.FC<KisiKisiViewProps> = ({ pkg }) => {
  const { metadata, kisi_kisi } = pkg;
  const [exporting, setExporting] = useState<'pdf' | 'word' | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const totalSkor = pkg.butir_soal.reduce((acc, q) => acc + q.skor_maksimal, 0);
  const hotsCount = kisi_kisi.filter(
    (k) =>
      k.level_kognitif === 'C4_Menganalisis' ||
      k.level_kognitif === 'C5_Mengevaluasi'
  ).length;

  const handleDownloadPdf = async () => {
    setExportError(null);
    setExporting('pdf');
    try {
      await downloadKisiKisiPdf(pkg);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : 'Gagal mengunduh file PDF kisi-kisi.'
      );
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadWord = async () => {
    setExportError(null);
    setExporting('word');
    try {
      await downloadKisiKisiWord(pkg);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : 'Gagal mengunduh file Word kisi-kisi.'
      );
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden print-full">
      <div className="p-6 border-b border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs text-slate-500 font-medium">
              Kisi-Kisi Penilaian Sumatif · {metadata.jenjang} · Kelas {metadata.kelas} Ula ·{' '}
              {metadata.mata_pelajaran}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{metadata.judul_paket}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
              <span>Sumber: {metadata.sumber_kurikulum_resmi}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Jumlah Indikator: {kisi_kisi.length}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Total Skor: {totalSkor}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                Proporsi HOTS (C4–C5): {hotsCount}/{kisi_kisi.length}
              </span>
            </div>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={exporting !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
            >
              {exporting === 'pdf' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              Unduh PDF
            </button>
            <button
              type="button"
              onClick={handleDownloadWord}
              disabled={exporting !== null}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
            >
              {exporting === 'word' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              Unduh Word (.docx)
            </button>
          </div>
        </div>

        {exportError && (
          <div className="no-print rounded-lg bg-red-50 border border-red-200 px-3.5 py-2 text-xs text-red-700">
            {exportError}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4 w-24">Kode TP</th>
              <th className="py-3 px-4 min-w-[200px]">
                Tujuan &amp; Capaian Pembelajaran
              </th>
              <th className="py-3 px-4 min-w-[240px]">Indikator Soal AKM / HOTS</th>
              <th className="py-3 px-4 w-44">Bentuk Soal</th>
              <th className="py-3 px-4 w-44">Level Kognitif</th>
              <th className="py-3 px-4 w-20 text-center">No. Soal</th>
              <th className="py-3 px-4 min-w-[180px]">Rujukan Kurikulum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {kisi_kisi.map((row) => (
              <tr
                key={`${row.no_urut}-${row.nomor_soal}`}
                className="hover:bg-slate-50/70 transition-colors align-top"
              >
                <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-500">
                  {row.no_urut}
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-emerald-800 whitespace-nowrap">
                  {row.kode_tp}
                </td>
                <td className="py-3.5 px-4 space-y-1">
                  <p className="font-semibold text-slate-900 leading-snug">
                    {row.tujuan_pembelajaran}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {row.capaian_pembelajaran}
                  </p>
                </td>
                <td className="py-3.5 px-4 leading-relaxed text-slate-800">
                  {row.indikator_soal}
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  {QUESTION_TYPE_LABELS[row.bentuk_soal] ?? row.bentuk_soal}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">
                  {COGNITIVE_LEVEL_LABELS[row.level_kognitif] ?? row.level_kognitif}
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-semibold tabular-nums text-slate-900">
                  {row.nomor_soal}
                </td>
                <td className="py-3.5 px-4 text-slate-600 leading-relaxed">
                  {row.sumber_kurikulum}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
