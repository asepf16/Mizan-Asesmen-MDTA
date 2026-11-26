import React, { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import type { AssessmentPackage } from '../types/assessment';

interface JsonSchemaViewProps {
  pkg: AssessmentPackage;
}

export const JsonSchemaView: React.FC<JsonSchemaViewProps> = ({ pkg }) => {
  const [copied, setCopied] = useState(false);

  const formattedJson = JSON.stringify(pkg, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `asesmen-mdta-kelas-${pkg.metadata.kelas}-${pkg.metadata.subject_id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Output Terstruktur JSON (Sesuai JSON Schema)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Siap diintegrasikan ke sistem CBT madrasah, bank soal, atau aplikasi penilaian sumatif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                Tersalin
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                Salin JSON
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Unduh .json
          </button>
        </div>
      </div>

      <div className="p-5 bg-slate-950 text-slate-100 overflow-x-auto max-h-[680px]">
        <pre className="font-mono text-xs leading-relaxed">
          <code>{formattedJson}</code>
        </pre>
      </div>
    </div>
  );
};
