import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileDown,
  FileText,
  GraduationCap,
  Loader2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import type { AssessmentPackage, QuestionItem } from '../types/assessment';
import {
  COGNITIVE_LEVEL_LABELS,
  QUESTION_TYPE_LABELS,
} from '../types/assessment';
import { downloadNaskahPdf } from '../utils/exportPdf';
import { downloadNaskahWord } from '../utils/exportWord';

interface QuestionPackViewProps {
  pkg: AssessmentPackage;
}

type ViewMode = 'guru' | 'santri';

export const QuestionPackView: React.FC<QuestionPackViewProps> = ({ pkg }) => {
  const [mode, setMode] = useState<ViewMode>('guru');
  const [showAllAnswersInGuru, setShowAllAnswersInGuru] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'word' | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const includeAnswerKeyInExport = mode === 'guru' && showAllAnswersInGuru;

  const handleDownloadPdf = async () => {
    setExportError(null);
    setExporting('pdf');
    try {
      await downloadNaskahPdf(pkg, includeAnswerKeyInExport);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : 'Gagal mengunduh file PDF naskah soal.'
      );
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadWord = async () => {
    setExportError(null);
    setExporting('word');
    try {
      await downloadNaskahWord(pkg, includeAnswerKeyInExport);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : 'Gagal mengunduh file Word naskah soal.'
      );
    } finally {
      setExporting(null);
    }
  };

  // Interactive answers state for Santri mode
  const [singleAnswers, setSingleAnswers] = useState<Record<number, string>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<number, Record<string, 'Benar' | 'Salah'>>>({});
  const [matchAnswers, setMatchAnswers] = useState<Record<number, Record<string, string>>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});

  // Shuffle matching responses deterministically per question number so students actually match
  const shuffledMatchingOptions = useMemo(() => {
    const map: Record<number, { key: string; label: string }[]> = {};
    for (const q of pkg.butir_soal) {
      if (q.pasangan_menjodohkan && q.pasangan_menjodohkan.length > 0) {
        const items = q.pasangan_menjodohkan.map((p) => ({
          key: p.id,
          label: p.respon_arab ? `${p.respon} — ${p.respon_arab}` : p.respon,
        }));
        // Deterministic rotation by 1 so it is not already aligned 1-to-1
        const rotated =
          items.length > 1 ? [...items.slice(1), items[0]] : items;
        map[q.nomor] = rotated;
      }
    }
    return map;
  }, [pkg]);

  const handleResetSimulation = () => {
    setSingleAnswers({});
    setMultiAnswers({});
    setTfAnswers({});
    setMatchAnswers({});
    setTextAnswers({});
    setSubmitted(false);
  };

  const evaluateQuestion = (q: QuestionItem): { earned: number; status: 'benar' | 'sebagian' | 'salah' | 'manual' } => {
    if (q.bentuk_soal === 'pg_sederhana' || q.bentuk_soal === 'pg_biasa') {
      const chosen = singleAnswers[q.nomor];
      const correctOpt = q.opsi_pilihan?.find((o) => o.benar)?.kode ?? q.kunci_jawaban.trim();
      if (chosen && chosen === correctOpt) {
        return { earned: q.skor_maksimal, status: 'benar' };
      }
      return { earned: 0, status: 'salah' };
    }

    if (q.bentuk_soal === 'pg_kompleks_centang') {
      const chosen = [...(multiAnswers[q.nomor] ?? [])].sort();
      const expected = (
        q.kunci_array && q.kunci_array.length > 0
          ? q.kunci_array
          : q.opsi_pilihan?.filter((o) => o.benar).map((o) => o.kode) ?? []
      )
        .slice()
        .sort();
      if (
        chosen.length === expected.length &&
        chosen.every((v, idx) => v === expected[idx])
      ) {
        return { earned: q.skor_maksimal, status: 'benar' };
      }
      const correctHits = chosen.filter((c) => expected.includes(c)).length;
      const wrongHits = chosen.filter((c) => !expected.includes(c)).length;
      if (correctHits > 0 && wrongHits === 0) {
        const partial = Math.round((correctHits / expected.length) * q.skor_maksimal);
        return { earned: partial, status: 'sebagian' };
      }
      return { earned: 0, status: 'salah' };
    }

    if (q.bentuk_soal === 'pg_kompleks_benar_salah') {
      const stmts = q.pernyataan_benar_salah ?? [];
      if (stmts.length === 0) return { earned: 0, status: 'salah' };
      const ans = tfAnswers[q.nomor] ?? {};
      const correctCount = stmts.filter((s) => ans[s.id] === s.kunci).length;
      if (correctCount === stmts.length) {
        return { earned: q.skor_maksimal, status: 'benar' };
      }
      if (correctCount > 0) {
        return {
          earned: Math.round((correctCount / stmts.length) * q.skor_maksimal),
          status: 'sebagian',
        };
      }
      return { earned: 0, status: 'salah' };
    }

    if (q.bentuk_soal === 'menjodohkan') {
      const pairs = q.pasangan_menjodohkan ?? [];
      if (pairs.length === 0) return { earned: 0, status: 'salah' };
      const ans = matchAnswers[q.nomor] ?? {};
      const correctCount = pairs.filter((p) => ans[p.id] === p.id).length;
      if (correctCount === pairs.length) {
        return { earned: q.skor_maksimal, status: 'benar' };
      }
      if (correctCount > 0) {
        return {
          earned: Math.round((correctCount / pairs.length) * q.skor_maksimal),
          status: 'sebagian',
        };
      }
      return { earned: 0, status: 'salah' };
    }

    if (q.bentuk_soal === 'isian_singkat') {
      const raw = (textAnswers[q.nomor] ?? '').trim().toLowerCase();
      if (!raw) return { earned: 0, status: 'salah' };
      const candidates = (q.kunci_array && q.kunci_array.length > 0
        ? q.kunci_array
        : [q.kunci_jawaban]
      ).map((k) => k.trim().toLowerCase());
      const matched = candidates.some(
        (c) => raw === c || (c.length >= 6 && raw.includes(c))
      );
      return matched
        ? { earned: q.skor_maksimal, status: 'benar' }
        : { earned: 0, status: 'salah' };
    }

    // Uraian berargumen dinilai berdasarkan rubrik oleh guru
    return { earned: 0, status: 'manual' };
  };

  const totalMaxAuto = pkg.butir_soal
    .filter((q) => q.bentuk_soal !== 'uraian_berargumen')
    .reduce((acc, q) => acc + q.skor_maksimal, 0);

  const totalEarnedAuto = submitted
    ? pkg.butir_soal.reduce((acc, q) => acc + evaluateQuestion(q).earned, 0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 print-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-500">
              {pkg.metadata.jenjang} · Kelas {pkg.metadata.kelas} Ula ·{' '}
              {pkg.metadata.mata_pelajaran} ·{' '}
              {pkg.metadata.fase_asesmen === 'AKM_DASAR_LOTS_MOTS'
                ? 'AKM Dasar (LOTS–MOTS)'
                : 'AKM Menengah & HOTS (C4–C5)'}
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {pkg.metadata.judul_paket}
            </h1>
            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{pkg.metadata.semester}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                Alokasi Waktu: {pkg.metadata.alokasi_waktu_menit} Menit
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {pkg.butir_soal.length} Butir Soal
              </span>
            </div>
          </div>

          <div className="no-print flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMode('guru');
                    setSubmitted(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    mode === 'guru'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Naskah &amp; Kunci (Guru)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('santri');
                    setSubmitted(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    mode === 'santri'
                      ? 'bg-white text-emerald-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                  Simulasi Santri
                </button>
              </div>

              {mode === 'guru' ? (
                <button
                  type="button"
                  onClick={() => setShowAllAnswersInGuru((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  {showAllAnswersInGuru ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                      Sembunyikan Kunci
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      Tampilkan Kunci
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetSimulation}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  Ulangi Simulasi
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">
                {includeAnswerKeyInExport
                  ? 'Unduhan menyertakan Kunci & Pembahasan'
                  : 'Unduhan berupa Naskah Santri (tanpa Kunci)'}
              </span>
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
        </div>

        {exportError && (
          <div className="no-print mt-4 rounded-lg bg-red-50 border border-red-200 px-3.5 py-2 text-xs text-red-700">
            {exportError}
          </div>
        )}

        {mode === 'santri' && submitted && (
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Hasil Uji Coba Simulasi Santri
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Skor objektif otomatis: <span className="font-mono font-bold tabular-nums text-emerald-800">{totalEarnedAuto} / {totalMaxAuto}</span>. Soal uraian diperiksa manual menggunakan rubrik penskoran di bawah.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetSimulation}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Kerjakan Ulang
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {pkg.butir_soal.map((q) => {
          const evalResult = submitted ? evaluateQuestion(q) : null;
          const revealGuru = mode === 'guru' && showAllAnswersInGuru;
          const revealFeedback = revealGuru || (mode === 'santri' && submitted);

          return (
            <article
              key={q.nomor}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 print-break-inside-avoid print-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    Soal No. {q.nomor}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-emerald-800 font-medium">
                    {q.kode_tp}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{QUESTION_TYPE_LABELS[q.bentuk_soal] ?? q.bentuk_soal}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {COGNITIVE_LEVEL_LABELS[q.level_kognitif] ?? q.level_kognitif}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {evalResult && evalResult.status !== 'manual' && (
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        evalResult.status === 'benar'
                          ? 'text-emerald-700'
                          : evalResult.status === 'sebagian'
                          ? 'text-amber-700'
                          : 'text-red-700'
                      }`}
                    >
                      {evalResult.status === 'benar' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      {evalResult.earned}/{q.skor_maksimal} Poin
                    </span>
                  )}
                  <span className="font-mono tabular-nums text-slate-500">
                    Skor Maks: {q.skor_maksimal}
                  </span>
                </div>
              </div>

              {/* Stimulus Konteks & Dalil */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 space-y-3">
                <p className="text-sm text-slate-800 leading-relaxed">
                  {q.stimulus_konteks}
                </p>

                {q.stimulus_arab && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl text-slate-900 text-right whitespace-pre-line bg-white border border-slate-200 rounded-lg px-4 py-3"
                  >
                    {q.stimulus_arab}
                  </p>
                )}

                {q.stimulus_sumber && (
                  <p className="text-[11px] text-slate-500">
                    Rujukan: {q.stimulus_sumber}
                  </p>
                )}
              </div>

              {/* Pertanyaan */}
              <div className="space-y-2">
                <p className="text-[15px] font-semibold text-slate-900 leading-relaxed">
                  {q.pertanyaan}
                </p>
                {q.pertanyaan_arab && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl text-slate-900 text-right"
                  >
                    {q.pertanyaan_arab}
                  </p>
                )}
              </div>

              {/* Tipe 1: Pilihan Ganda Sederhana (A-C) & PG Biasa (A-D) */}
              {(q.bentuk_soal === 'pg_sederhana' || q.bentuk_soal === 'pg_biasa') &&
                q.opsi_pilihan && (
                  <div className="space-y-2 pt-1">
                    {q.opsi_pilihan.map((opt) => {
                      const isSelected = singleAnswers[q.nomor] === opt.kode;
                      const showRight = revealFeedback && opt.benar;
                      const showWrongSelected =
                        mode === 'santri' && submitted && isSelected && !opt.benar;

                      return (
                        <label
                          key={opt.kode}
                          className={`flex items-start gap-3 p-3 rounded-lg border text-sm transition-colors ${
                            mode === 'santri' && !submitted ? 'cursor-pointer' : ''
                          } ${
                            showRight
                              ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                              : showWrongSelected
                              ? 'bg-red-50/70 border-red-300 text-slate-900'
                              : isSelected
                              ? 'bg-slate-100 border-slate-400 text-slate-900'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/60'
                          }`}
                        >
                          {mode === 'santri' ? (
                            <input
                              type="radio"
                              name={`q-${q.nomor}`}
                              disabled={submitted}
                              checked={isSelected}
                              onChange={() =>
                                setSingleAnswers((prev) => ({
                                  ...prev,
                                  [q.nomor]: opt.kode,
                                }))
                              }
                              className="mt-1 text-emerald-800 focus:ring-emerald-700"
                            />
                          ) : null}
                          <span className="font-mono font-bold text-slate-700 shrink-0 w-5">
                            {opt.kode}.
                          </span>
                          <div className="flex-1 space-y-1">
                            <span>{opt.teks}</span>
                            {opt.teks_arab && (
                              <div
                                dir="rtl"
                                lang="ar"
                                className="font-arabic text-lg text-slate-900 text-right"
                              >
                                {opt.teks_arab}
                              </div>
                            )}
                          </div>
                          {showRight && (
                            <CheckCircle2
                              className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                              aria-label="Jawaban benar"
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}

              {/* Tipe 2: PG Kompleks Centang (>1 jawaban benar) */}
              {q.bentuk_soal === 'pg_kompleks_centang' && q.opsi_pilihan && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-500">
                    Pilih lebih dari satu jawaban yang benar:
                  </p>
                  {q.opsi_pilihan.map((opt) => {
                    const selectedArr = multiAnswers[q.nomor] ?? [];
                    const isChecked = selectedArr.includes(opt.kode);
                    const showRight = revealFeedback && opt.benar;
                    const showWrongSelected =
                      mode === 'santri' && submitted && isChecked && !opt.benar;

                    return (
                      <label
                        key={opt.kode}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-sm transition-colors ${
                          mode === 'santri' && !submitted ? 'cursor-pointer' : ''
                        } ${
                          showRight
                            ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                            : showWrongSelected
                            ? 'bg-red-50/70 border-red-300 text-slate-900'
                            : isChecked
                            ? 'bg-slate-100 border-slate-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          disabled={mode === 'guru' || submitted}
                          checked={
                            mode === 'guru'
                              ? showAllAnswersInGuru && opt.benar
                              : isChecked
                          }
                          onChange={() => {
                            setMultiAnswers((prev) => {
                              const current = prev[q.nomor] ?? [];
                              const next = current.includes(opt.kode)
                                ? current.filter((c) => c !== opt.kode)
                                : [...current, opt.kode];
                              return { ...prev, [q.nomor]: next };
                            });
                          }}
                          className="mt-1 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                        />
                        <span className="font-mono font-bold text-slate-700 shrink-0 w-5">
                          {opt.kode}.
                        </span>
                        <div className="flex-1 space-y-1">
                          <span>{opt.teks}</span>
                          {opt.teks_arab && (
                            <div
                              dir="rtl"
                              lang="ar"
                              className="font-arabic text-lg text-slate-900 text-right"
                            >
                              {opt.teks_arab}
                            </div>
                          )}
                        </div>
                        {showRight && (
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                            aria-label="Pernyataan tepat"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Tipe 3: PG Kompleks Tabel Benar-Salah */}
              {q.bentuk_soal === 'pg_kompleks_benar_salah' &&
                q.pernyataan_benar_salah && (
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                          <th className="py-2.5 px-4">Pernyataan</th>
                          <th className="py-2.5 px-3 w-24 text-center">Benar</th>
                          <th className="py-2.5 px-3 w-24 text-center">Salah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {q.pernyataan_benar_salah.map((stmt) => {
                          const chosen = tfAnswers[q.nomor]?.[stmt.id];
                          const isBenarChecked =
                            mode === 'guru'
                              ? revealGuru && stmt.kunci === 'Benar'
                              : chosen === 'Benar';
                          const isSalahChecked =
                            mode === 'guru'
                              ? revealGuru && stmt.kunci === 'Salah'
                              : chosen === 'Salah';

                          return (
                            <tr key={stmt.id} className="align-top">
                              <td className="py-3 px-4 text-slate-800 leading-relaxed">
                                {stmt.pernyataan}
                                {stmt.pernyataan_arab && (
                                  <div
                                    dir="rtl"
                                    lang="ar"
                                    className="font-arabic text-lg text-right mt-1"
                                  >
                                    {stmt.pernyataan_arab}
                                  </div>
                                )}
                                {mode === 'santri' && submitted && (
                                  <span
                                    className={`block mt-1 text-xs font-semibold ${
                                      chosen === stmt.kunci
                                        ? 'text-emerald-700'
                                        : 'text-red-700'
                                    }`}
                                  >
                                    Kunci: {stmt.kunci}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="radio"
                                  aria-label={`${stmt.id} Benar`}
                                  name={`tf-${q.nomor}-${stmt.id}`}
                                  disabled={mode === 'guru' || submitted}
                                  checked={isBenarChecked}
                                  onChange={() =>
                                    setTfAnswers((prev) => ({
                                      ...prev,
                                      [q.nomor]: {
                                        ...(prev[q.nomor] ?? {}),
                                        [stmt.id]: 'Benar',
                                      },
                                    }))
                                  }
                                  className="text-emerald-800 focus:ring-emerald-700"
                                />
                              </td>
                              <td className="py-3 px-3 text-center">
                                <input
                                  type="radio"
                                  aria-label={`${stmt.id} Salah`}
                                  name={`tf-${q.nomor}-${stmt.id}`}
                                  disabled={mode === 'guru' || submitted}
                                  checked={isSalahChecked}
                                  onChange={() =>
                                    setTfAnswers((prev) => ({
                                      ...prev,
                                      [q.nomor]: {
                                        ...(prev[q.nomor] ?? {}),
                                        [stmt.id]: 'Salah',
                                      },
                                    }))
                                  }
                                  className="text-emerald-800 focus:ring-emerald-700"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

              {/* Tipe 4: Menjodohkan */}
              {q.bentuk_soal === 'menjodohkan' && q.pasangan_menjodohkan && (
                <div className="space-y-2.5 pt-1">
                  {q.pasangan_menjodohkan.map((pair, idx) => {
                    const chosenKey = matchAnswers[q.nomor]?.[pair.id] ?? '';
                    const optionsForSelect = shuffledMatchingOptions[q.nomor] ?? [];
                    const isArabicRespon = /[\u0600-\u06FF]/.test(pair.respon);

                    return (
                      <div
                        key={pair.id}
                        className="grid grid-cols-1 md:grid-cols-[1fr_24px_1fr] items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white"
                      >
                        <div className="text-sm text-slate-900 leading-relaxed">
                          <span className="font-mono font-semibold text-slate-500 mr-2 tabular-nums">
                            {idx + 1}.
                          </span>
                          {pair.premis}
                          {pair.premis_arab && (
                            <div
                              dir="rtl"
                              lang="ar"
                              className="font-arabic text-lg text-right mt-1"
                            >
                              {pair.premis_arab}
                            </div>
                          )}
                        </div>

                        <div className="hidden md:flex justify-center text-slate-400 text-xs font-mono">
                          →
                        </div>

                        <div>
                          {mode === 'guru' ? (
                            <div
                              dir={isArabicRespon ? 'rtl' : 'ltr'}
                              lang={isArabicRespon ? 'ar' : 'id'}
                              className={`p-2.5 rounded-md border text-sm space-y-1.5 ${
                                revealGuru
                                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                                  : 'bg-slate-50 border-slate-200 text-slate-500'
                              } ${isArabicRespon ? 'font-arabic text-lg text-right' : ''}`}
                            >
                              {revealGuru ? (
                                <>
                                  <div>{pair.respon}</div>
                                  {pair.respon_arab && (
                                    <div
                                      dir="rtl"
                                      lang="ar"
                                      className="font-arabic text-lg text-right text-slate-900 pt-1 border-t border-emerald-200/70"
                                    >
                                      {pair.respon_arab}
                                    </div>
                                  )}
                                </>
                              ) : (
                                'Pasangan disembunyikan (Mode Kunci Nonaktif)'
                              )}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <select
                                disabled={submitted}
                                value={chosenKey}
                                onChange={(e) =>
                                  setMatchAnswers((prev) => ({
                                    ...prev,
                                    [q.nomor]: {
                                      ...(prev[q.nomor] ?? {}),
                                      [pair.id]: e.target.value,
                                    },
                                  }))
                                }
                                className={`w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-900 focus:outline-none focus:border-emerald-700 ${
                                  submitted
                                    ? chosenKey === pair.id
                                      ? 'border-emerald-400 bg-emerald-50/50'
                                      : 'border-red-300 bg-red-50/40'
                                    : 'border-slate-200'
                                }`}
                              >
                                <option value="">-- Pilih pasangan yang tepat --</option>
                                {optionsForSelect.map((opt, optIdx) => (
                                  <option key={opt.key} value={opt.key}>
                                    {String.fromCharCode(65 + optIdx)}. {opt.label}
                                  </option>
                                ))}
                              </select>
                              {submitted && chosenKey !== pair.id && (
                                <div className="space-y-1">
                                  <p
                                    dir={isArabicRespon ? 'rtl' : 'ltr'}
                                    className={`text-xs text-emerald-800 font-medium ${
                                      isArabicRespon ? 'font-arabic text-base text-right' : ''
                                    }`}
                                  >
                                    Pasangan benar: {pair.respon}
                                  </p>
                                  {pair.respon_arab && (
                                    <p
                                      dir="rtl"
                                      lang="ar"
                                      className="font-arabic text-base text-right text-emerald-900"
                                    >
                                      {pair.respon_arab}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tipe 5 & 6: Isian Singkat & Uraian Berargumen */}
              {(q.bentuk_soal === 'isian_singkat' ||
                q.bentuk_soal === 'uraian_berargumen') && (
                <div className="pt-1">
                  {mode === 'santri' ? (
                    q.bentuk_soal === 'isian_singkat' ? (
                      <input
                        type="text"
                        disabled={submitted}
                        value={textAnswers[q.nomor] ?? ''}
                        onChange={(e) =>
                          setTextAnswers((prev) => ({
                            ...prev,
                            [q.nomor]: e.target.value,
                          }))
                        }
                        placeholder="Ketik jawaban singkat di sini..."
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    ) : (
                      <textarea
                        rows={4}
                        disabled={submitted}
                        value={textAnswers[q.nomor] ?? ''}
                        onChange={(e) =>
                          setTextAnswers((prev) => ({
                            ...prev,
                            [q.nomor]: e.target.value,
                          }))
                        }
                        placeholder="Tuliskan analisis dan argumen syariat berdasarkan dalil..."
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    )
                  ) : (
                    <div className="h-12 border border-dashed border-slate-300 rounded-lg bg-slate-50/40 flex items-center px-3 text-xs text-slate-400">
                      Area jawaban santri pada naskah cetak
                    </div>
                  )}
                </div>
              )}

              {/* Kunci Jawaban & Pembahasan Syariat */}
              {revealFeedback && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                  <p className="font-semibold text-emerald-900">
                    Kunci Jawaban: <span className="font-normal text-slate-900">{q.kunci_jawaban}</span>
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Pembahasan Dalil &amp; Syariat: </span>
                    {q.pembahasan_syariat}
                  </p>
                  {q.rubrik_penskoran && (
                    <p className="text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-800">Rubrik Penskoran: </span>
                      {q.rubrik_penskoran}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {mode === 'santri' && !submitted && (
        <div className="no-print flex justify-end">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
          >
            Periksa Jawaban &amp; Lihat Pembahasan
          </button>
        </div>
      )}
    </div>
  );
};
