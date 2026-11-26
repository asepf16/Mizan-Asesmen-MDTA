import React from 'react';
import { Printer } from 'lucide-react';

export type WorkspaceTab = 'kisi_kisi' | 'naskah_soal' | 'json_schema';

interface HeaderProps {
  activeTab: WorkspaceTab;
  onSelectTab: (tab: WorkspaceTab) => void;
  onOpenCurriculum: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCurriculum,
  onPrint,
}) => {
  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 min-h-16 py-2 flex items-center justify-between gap-4 lg:gap-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('naskah_soal');
          }}
          className="text-xs sm:text-sm xl:text-[15px] font-bold tracking-tight text-slate-900 leading-snug min-w-0 max-w-[260px] sm:max-w-[400px] xl:max-w-none"
        >
          Mizan Asesmen MDTA Persatuan Islam No. 05 Nurul Islam Tegalpanjang Garut
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onSelectTab('kisi_kisi')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'kisi_kisi'
                ? 'text-emerald-800 border-emerald-700'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Kisi-Kisi
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('naskah_soal')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'naskah_soal'
                ? 'text-emerald-800 border-emerald-700'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Naskah AKM
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('json_schema')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'json_schema'
                ? 'text-emerald-800 border-emerald-700'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Output JSON
          </button>
          <button
            type="button"
            onClick={onOpenCurriculum}
            className="py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-300 transition-colors whitespace-nowrap shrink-0"
          >
            Kurikulum PDF
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            Cetak Naskah
          </button>
        </div>
      </div>
    </header>
  );
};
