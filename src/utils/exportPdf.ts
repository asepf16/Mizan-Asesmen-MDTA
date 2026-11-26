import { jsPDF } from 'jspdf';
import type { AssessmentPackage } from '../types/assessment';
import {
  COGNITIVE_LEVEL_LABELS,
  QUESTION_TYPE_LABELS,
} from '../types/assessment';

const DPI_SCALE = 2;

interface PageConfig {
  orientation: 'portrait' | 'landscape';
  pageW: number; // px at 96dpi logical
  pageH: number;
  marginX: number;
  marginTop: number;
  marginBottom: number;
}

const PORTRAIT_CONFIG: PageConfig = {
  orientation: 'portrait',
  pageW: 794,
  pageH: 1123,
  marginX: 48,
  marginTop: 48,
  marginBottom: 56,
};

const LANDSCAPE_CONFIG: PageConfig = {
  orientation: 'landscape',
  pageW: 1123,
  pageH: 794,
  marginX: 42,
  marginTop: 42,
  marginBottom: 48,
};

class CanvasPaginatedPdf {
  private cfg: PageConfig;
  private pages: HTMLCanvasElement[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private y = 0;

  constructor(cfg: PageConfig) {
    this.cfg = cfg;
    this.newPage();
  }

  private newPage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.cfg.pageW * DPI_SCALE;
    canvas.height = this.cfg.pageH * DPI_SCALE;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Gagal menginisialisasi kanvas PDF.');
    }
    ctx.scale(DPI_SCALE, DPI_SCALE);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, this.cfg.pageW, this.cfg.pageH);
    this.canvas = canvas;
    this.ctx = ctx;
    this.pages.push(canvas);
    this.y = this.cfg.marginTop;
  }

  get contentWidth(): number {
    return this.cfg.pageW - this.cfg.marginX * 2;
  }

  get currentY(): number {
    return this.y;
  }

  set currentY(val: number) {
    this.y = val;
  }

  get maxY(): number {
    return this.cfg.pageH - this.cfg.marginBottom;
  }

  ensureSpace(neededHeight: number, onNewPage?: () => void) {
    if (this.y + neededHeight > this.maxY && this.y > this.cfg.marginTop + 10) {
      this.newPage();
      if (onNewPage) onNewPage();
    }
  }

  wrapText(
    text: string,
    maxWidth: number,
    font: string,
    rtl = false
  ): string[] {
    this.ctx.font = font;
    this.ctx.direction = rtl ? 'rtl' : 'ltr';
    const paragraphs = text.split('\n');
    const lines: string[] = [];

    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      const words = trimmed.split(/\s+/);
      let current = '';
      for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (this.ctx.measureText(test).width <= maxWidth) {
          current = test;
        } else {
          if (current) lines.push(current);
          current = word;
        }
      }
      if (current) lines.push(current);
    }

    return lines.length > 0 ? lines : [''];
  }

  drawLines(
    lines: string[],
    x: number,
    yStart: number,
    lineHeight: number,
    font: string,
    color: string,
    align: CanvasTextAlign = 'left',
    rtl = false
  ): number {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';
    this.ctx.direction = rtl ? 'rtl' : 'ltr';
    let y = yStart;
    for (const line of lines) {
      this.ctx.fillText(line, x, y);
      y += lineHeight;
    }
    this.ctx.direction = 'ltr';
    this.ctx.textAlign = 'left';
    return y;
  }

  drawRect(
    x: number,
    y: number,
    w: number,
    h: number,
    fill?: string,
    stroke?: string,
    lineWidth = 1
  ) {
    if (fill) {
      this.ctx.fillStyle = fill;
      this.ctx.fillRect(x, y, w, h);
    }
    if (stroke) {
      this.ctx.strokeStyle = stroke;
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeRect(x, y, w, h);
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color: string, width = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  savePdf(filename: string, footerPrefix: string) {
    const total = this.pages.length;
    for (let i = 0; i < total; i++) {
      const c = this.pages[i];
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.font = '400 10px "DM Sans", sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.direction = 'ltr';
        ctx.fillText(footerPrefix, this.cfg.marginX, this.cfg.pageH - 28);
        ctx.textAlign = 'right';
        ctx.fillText(
          `Halaman ${i + 1} dari ${total}`,
          this.cfg.pageW - this.cfg.marginX,
          this.cfg.pageH - 28
        );
        ctx.restore();
      }
    }

    const pdf = new jsPDF({
      orientation: this.cfg.orientation,
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    this.pages.forEach((canvas, idx) => {
      if (idx > 0) pdf.addPage();
      const imgData = canvas.toDataURL('image/jpeg', 0.94);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
    });

    pdf.save(filename);
  }
}

export async function downloadKisiKisiPdf(pkg: AssessmentPackage): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const doc = new CanvasPaginatedPdf(LANDSCAPE_CONFIG);
  const { metadata, kisi_kisi } = pkg;
  const x0 = LANDSCAPE_CONFIG.marginX;
  const w = doc.contentWidth;

  doc.currentY = doc.drawLines(
    ['KISI-KISI PENILAIAN SUMATIF AKM / HOTS — MDTA PERSATUAN ISLAM NO. 05 NURUL ISLAM TEGALPANJANG GARUT'],
    x0,
    doc.currentY,
    20,
    '700 13px "Plus Jakarta Sans", sans-serif',
    '#065F46'
  );
  doc.currentY = doc.drawLines(
    [metadata.judul_paket],
    x0,
    doc.currentY + 2,
    22,
    '700 16px "Plus Jakarta Sans", sans-serif',
    '#0F172A'
  );
  doc.currentY = doc.drawLines(
    [
      `Jenjang: ${metadata.jenjang}  ·  Kelas ${metadata.kelas} Ula  ·  ${metadata.mata_pelajaran}  ·  ${metadata.semester}  ·  ${metadata.sumber_kurikulum_resmi}`,
    ],
    x0,
    doc.currentY + 2,
    18,
    '400 11px "DM Sans", sans-serif',
    '#475569'
  );
  doc.currentY += 10;

  const cols = [
    { label: 'No', ratio: 0.04, align: 'center' as CanvasTextAlign },
    { label: 'Kode TP', ratio: 0.08, align: 'left' as CanvasTextAlign },
    { label: 'Tujuan & Capaian Pembelajaran', ratio: 0.24, align: 'left' as CanvasTextAlign },
    { label: 'Indikator Soal AKM / HOTS', ratio: 0.26, align: 'left' as CanvasTextAlign },
    { label: 'Bentuk Soal', ratio: 0.13, align: 'left' as CanvasTextAlign },
    { label: 'Level Kognitif', ratio: 0.12, align: 'left' as CanvasTextAlign },
    { label: 'Soal', ratio: 0.04, align: 'center' as CanvasTextAlign },
    { label: 'Rujukan', ratio: 0.09, align: 'left' as CanvasTextAlign },
  ];

  const drawTableHeader = () => {
    const headerH = 28;
    doc.drawRect(x0, doc.currentY, w, headerH, '#F1F5F9', '#CBD5E1', 1);
    let cx = x0;
    for (const col of cols) {
      const cw = w * col.ratio;
      doc.drawLine(cx, doc.currentY, cx, doc.currentY + headerH, '#CBD5E1', 1);
      const tx = col.align === 'center' ? cx + cw / 2 : cx + 6;
      doc.drawLines(
        [col.label],
        tx,
        doc.currentY + 8,
        14,
        '700 10.5px "DM Sans", sans-serif',
        '#0F172A',
        col.align
      );
      cx += cw;
    }
    doc.drawLine(x0 + w, doc.currentY, x0 + w, doc.currentY + headerH, '#CBD5E1', 1);
    doc.currentY += headerH;
  };

  drawTableHeader();

  const cellPad = 7;
  const lineH = 14;
  const cellFont = '400 10.5px "DM Sans", sans-serif';
  const boldFont = '700 10.5px "DM Sans", sans-serif';

  for (const row of kisi_kisi) {
    const colWidths = cols.map((c) => w * c.ratio - cellPad * 2);

    const tpLines = doc.wrapText(row.tujuan_pembelajaran, colWidths[2], boldFont);
    const cpLines = doc.wrapText(row.capaian_pembelajaran, colWidths[2], cellFont);
    const indLines = doc.wrapText(row.indikator_soal, colWidths[3], cellFont);
    const bentukLines = doc.wrapText(
      QUESTION_TYPE_LABELS[row.bentuk_soal] ?? row.bentuk_soal,
      colWidths[4],
      cellFont
    );
    const levelLines = doc.wrapText(
      COGNITIVE_LEVEL_LABELS[row.level_kognitif] ?? row.level_kognitif,
      colWidths[5],
      cellFont
    );
    const rujukanLines = doc.wrapText(row.sumber_kurikulum, colWidths[7], cellFont);

    const maxLines = Math.max(
      1,
      tpLines.length + cpLines.length,
      indLines.length,
      bentukLines.length,
      levelLines.length,
      rujukanLines.length
    );

    const rowH = maxLines * lineH + cellPad * 2 + 4;
    doc.ensureSpace(rowH, drawTableHeader);

    const ry = doc.currentY;
    doc.drawRect(x0, ry, w, rowH, '#FFFFFF', '#CBD5E1', 1);

    let cx = x0;
    const drawCellColumn = (colIdx: number, drawFn: (cellX: number, cellW: number) => void) => {
      const cw = w * cols[colIdx].ratio;
      doc.drawLine(cx, ry, cx, ry + rowH, '#CBD5E1', 1);
      drawFn(cx, cw);
      cx += cw;
    };

    drawCellColumn(0, (cellX, cw) => {
      doc.drawLines([String(row.no_urut)], cellX + cw / 2, ry + cellPad, lineH, cellFont, '#475569', 'center');
    });
    drawCellColumn(1, (cellX) => {
      doc.drawLines([row.kode_tp], cellX + cellPad, ry + cellPad, lineH, boldFont, '#065F46');
    });
    drawCellColumn(2, (cellX) => {
      const afterTp = doc.drawLines(tpLines, cellX + cellPad, ry + cellPad, lineH, boldFont, '#0F172A');
      doc.drawLines(cpLines, cellX + cellPad, afterTp + 2, lineH, cellFont, '#475569');
    });
    drawCellColumn(3, (cellX) => {
      doc.drawLines(indLines, cellX + cellPad, ry + cellPad, lineH, cellFont, '#0F172A');
    });
    drawCellColumn(4, (cellX) => {
      doc.drawLines(bentukLines, cellX + cellPad, ry + cellPad, lineH, cellFont, '#334155');
    });
    drawCellColumn(5, (cellX) => {
      doc.drawLines(levelLines, cellX + cellPad, ry + cellPad, lineH, cellFont, '#334155');
    });
    drawCellColumn(6, (cellX, cw) => {
      doc.drawLines([String(row.nomor_soal)], cellX + cw / 2, ry + cellPad, lineH, boldFont, '#0F172A', 'center');
    });
    drawCellColumn(7, (cellX) => {
      doc.drawLines(rujukanLines, cellX + cellPad, ry + cellPad, lineH, cellFont, '#475569');
    });

    doc.drawLine(x0 + w, ry, x0 + w, ry + rowH, '#CBD5E1', 1);
    doc.currentY += rowH;
  }

  doc.savePdf(
    `kisi-kisi-mdta-kelas-${metadata.kelas}-${metadata.subject_id}.pdf`,
    `Mizan Asesmen MDTA Persatuan Islam No. 05 Nurul Islam Tegalpanjang Garut · Kelas ${metadata.kelas} Ula · ${metadata.mata_pelajaran}`
  );
}

export async function downloadNaskahPdf(
  pkg: AssessmentPackage,
  includeAnswerKey: boolean
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const doc = new CanvasPaginatedPdf(PORTRAIT_CONFIG);
  const { metadata, butir_soal } = pkg;
  const x0 = PORTRAIT_CONFIG.marginX;
  const w = doc.contentWidth;

  // Kop Madrasah
  doc.currentY = doc.drawLines(
    ['MDTA PERSATUAN ISLAM NO. 05 NURUL ISLAM TEGALPANJANG GARUT'],
    x0 + w / 2,
    doc.currentY,
    18,
    '700 12px "Plus Jakarta Sans", sans-serif',
    '#065F46',
    'center'
  );
  doc.currentY = doc.drawLines(
    [metadata.judul_paket],
    x0 + w / 2,
    doc.currentY + 2,
    22,
    '700 15px "Plus Jakarta Sans", sans-serif',
    '#0F172A',
    'center'
  );
  doc.currentY = doc.drawLines(
    [
      `Kelas ${metadata.kelas} Ula  ·  ${metadata.mata_pelajaran}  ·  ${metadata.semester}  ·  Waktu: ${metadata.alokasi_waktu_menit} Menit`,
    ],
    x0 + w / 2,
    doc.currentY + 2,
    16,
    '400 11px "DM Sans", sans-serif',
    '#475569',
    'center'
  );
  doc.currentY += 10;

  // Kotak Identitas Santri
  doc.drawRect(x0, doc.currentY, w, 34, '#F8FAFC', '#CBD5E1', 1);
  doc.drawLines(
    ['Nama Santri: ................................................'],
    x0 + 12,
    doc.currentY + 10,
    16,
    '400 11px "DM Sans", sans-serif',
    '#334155'
  );
  doc.drawLines(
    [`Kelas: ${metadata.kelas} Ula      Tanggal: ............................`],
    x0 + w - 12,
    doc.currentY + 10,
    16,
    '400 11px "DM Sans", sans-serif',
    '#334155',
    'right'
  );
  doc.currentY += 48;

  const bodyFont = '400 11.5px "DM Sans", sans-serif';
  const boldBodyFont = '700 11.5px "DM Sans", sans-serif';
  const metaFont = '600 10px "DM Sans", sans-serif';
  const smallFont = '400 10px "DM Sans", sans-serif';
  const arabicFont = '400 17px "Amiri", "Traditional Arabic", serif';

  for (const q of butir_soal) {
    // Estimate block height so questions don't split awkwardly
    const stimLines = q.stimulus_konteks
      ? doc.wrapText(q.stimulus_konteks, w - 24, bodyFont)
      : [];
    const stimArabLines = q.stimulus_arab
      ? doc.wrapText(q.stimulus_arab, w - 28, arabicFont, true)
      : [];
    const qLines = doc.wrapText(q.pertanyaan, w - 16, boldBodyFont);
    const qArabLines = q.pertanyaan_arab
      ? doc.wrapText(q.pertanyaan_arab, w - 20, arabicFont, true)
      : [];

    let estH = 38 + stimLines.length * 16 + stimArabLines.length * 28 + qLines.length * 17 + qArabLines.length * 28 + 30;
    if (q.opsi_pilihan) estH += q.opsi_pilihan.length * 24;
    if (q.pernyataan_benar_salah) estH += q.pernyataan_benar_salah.length * 36 + 26;
    if (q.pasangan_menjodohkan) estH += q.pasangan_menjodohkan.length * 38 + 26;
    if (includeAnswerKey) estH += 70;

    if (estH < doc.maxY - PORTRAIT_CONFIG.marginTop) {
      doc.ensureSpace(estH);
    } else {
      doc.ensureSpace(140);
    }

    // Header baris soal
    doc.drawLine(x0, doc.currentY, x0 + w, doc.currentY, '#CBD5E1', 1);
    doc.currentY += 8;
    doc.drawLines(
      [
        `Soal No. ${q.nomor}  ·  ${q.kode_tp}  ·  ${
          QUESTION_TYPE_LABELS[q.bentuk_soal] ?? q.bentuk_soal
        }  ·  ${COGNITIVE_LEVEL_LABELS[q.level_kognitif] ?? q.level_kognitif}`,
      ],
      x0,
      doc.currentY,
      15,
      metaFont,
      '#065F46'
    );
    doc.drawLines(
      [`Skor Maks: ${q.skor_maksimal}`],
      x0 + w,
      doc.currentY,
      15,
      metaFont,
      '#64748B',
      'right'
    );
    doc.currentY += 20;

    // Stimulus box
    if (stimLines.length > 0 || stimArabLines.length > 0 || q.stimulus_sumber) {
      const srcLines = q.stimulus_sumber
        ? doc.wrapText(`Rujukan: ${q.stimulus_sumber}`, w - 24, smallFont)
        : [];
      const boxH =
        16 +
        stimLines.length * 16 +
        (stimArabLines.length > 0 ? stimArabLines.length * 28 + 10 : 0) +
        (srcLines.length > 0 ? srcLines.length * 14 + 4 : 0);

      doc.ensureSpace(boxH);
      doc.drawRect(x0, doc.currentY, w, boxH, '#F8FAFC', '#E2E8F0', 1);
      let sy = doc.currentY + 10;
      if (stimLines.length > 0) {
        sy = doc.drawLines(stimLines, x0 + 12, sy, 16, bodyFont, '#1E293B');
      }
      if (stimArabLines.length > 0) {
        sy += 4;
        sy = doc.drawLines(
          stimArabLines,
          x0 + w - 14,
          sy,
          28,
          arabicFont,
          '#0F172A',
          'right',
          true
        );
      }
      if (srcLines.length > 0) {
        doc.drawLines(srcLines, x0 + 12, sy + 2, 14, smallFont, '#64748B');
      }
      doc.currentY += boxH + 10;
    }

    // Pertanyaan
    doc.ensureSpace(qLines.length * 17 + 20);
    doc.currentY = doc.drawLines(qLines, x0, doc.currentY, 17, boldBodyFont, '#0F172A');
    if (qArabLines.length > 0) {
      doc.currentY = doc.drawLines(
        qArabLines,
        x0 + w,
        doc.currentY + 2,
        28,
        arabicFont,
        '#0F172A',
        'right',
        true
      );
    }
    doc.currentY += 6;

    // Opsi PG / PG Kompleks
    if (
      (q.bentuk_soal === 'pg_sederhana' ||
        q.bentuk_soal === 'pg_biasa' ||
        q.bentuk_soal === 'pg_kompleks_centang') &&
      q.opsi_pilihan
    ) {
      const prefix = q.bentuk_soal === 'pg_kompleks_centang' ? '[  ] ' : '';
      for (const opt of q.opsi_pilihan) {
        const optLines = doc.wrapText(`${prefix}${opt.kode}. ${opt.teks}`, w - 24, bodyFont);
        const optArabLines = opt.teks_arab
          ? doc.wrapText(opt.teks_arab, w - 36, arabicFont, true)
          : [];
        const optH = optLines.length * 16 + optArabLines.length * 26 + 4;
        doc.ensureSpace(optH);
        const isCorrectHighlight = includeAnswerKey && opt.benar;
        doc.currentY = doc.drawLines(
          optLines,
          x0 + 14,
          doc.currentY,
          16,
          isCorrectHighlight ? boldBodyFont : bodyFont,
          isCorrectHighlight ? '#065F46' : '#0F172A'
        );
        if (optArabLines.length > 0) {
          doc.currentY = doc.drawLines(
            optArabLines,
            x0 + w - 12,
            doc.currentY,
            26,
            arabicFont,
            '#0F172A',
            'right',
            true
          );
        }
        doc.currentY += 4;
      }
    }

    // Tabel Benar Salah
    if (q.bentuk_soal === 'pg_kompleks_benar_salah' && q.pernyataan_benar_salah) {
      const col1 = w * 0.76;
      const col2 = w * 0.12;
      const col3 = w * 0.12;
      doc.ensureSpace(26);
      doc.drawRect(x0, doc.currentY, w, 24, '#F1F5F9', '#CBD5E1', 1);
      doc.drawLines(['Pernyataan'], x0 + 8, doc.currentY + 6, 14, metaFont, '#0F172A');
      doc.drawLines(['Benar'], x0 + col1 + col2 / 2, doc.currentY + 6, 14, metaFont, '#0F172A', 'center');
      doc.drawLines(['Salah'], x0 + col1 + col2 + col3 / 2, doc.currentY + 6, 14, metaFont, '#0F172A', 'center');
      doc.currentY += 24;

      for (const stmt of q.pernyataan_benar_salah) {
        const sLines = doc.wrapText(stmt.pernyataan, col1 - 16, bodyFont);
        const sArab = stmt.pernyataan_arab
          ? doc.wrapText(stmt.pernyataan_arab, col1 - 20, arabicFont, true)
          : [];
        const rH = sLines.length * 16 + sArab.length * 26 + 12;
        doc.ensureSpace(rH);
        const ry = doc.currentY;
        doc.drawRect(x0, ry, w, rH, '#FFFFFF', '#CBD5E1', 1);
        doc.drawLine(x0 + col1, ry, x0 + col1, ry + rH, '#CBD5E1', 1);
        doc.drawLine(x0 + col1 + col2, ry, x0 + col1 + col2, ry + rH, '#CBD5E1', 1);
        const ny = doc.drawLines(sLines, x0 + 8, ry + 7, 16, bodyFont, '#0F172A');
        if (sArab.length > 0) {
          doc.drawLines(sArab, x0 + col1 - 8, ny, 26, arabicFont, '#0F172A', 'right', true);
        }
        const markB = includeAnswerKey && stmt.kunci === 'Benar' ? '✓' : '☐';
        const markS = includeAnswerKey && stmt.kunci === 'Salah' ? '✓' : '☐';
        doc.drawLines([markB], x0 + col1 + col2 / 2, ry + 8, 16, boldBodyFont, '#065F46', 'center');
        doc.drawLines([markS], x0 + col1 + col2 + col3 / 2, ry + 8, 16, boldBodyFont, '#065F46', 'center');
        doc.currentY += rH;
      }
      doc.currentY += 8;
    }

    // Menjodohkan
    if (q.bentuk_soal === 'menjodohkan' && q.pasangan_menjodohkan) {
      const pairs = q.pasangan_menjodohkan;
      const rotated =
        !includeAnswerKey && pairs.length > 1
          ? [...pairs.slice(1), pairs[0]]
          : pairs;
      const halfW = w * 0.48;
      const rightW = w - halfW;

      doc.ensureSpace(24);
      doc.drawRect(x0, doc.currentY, w, 24, '#F1F5F9', '#CBD5E1', 1);
      doc.drawLines(['Kolom A (Premis)'], x0 + 8, doc.currentY + 6, 14, metaFont, '#0F172A');
      doc.drawLines(
        [includeAnswerKey ? 'Pasangan Tepat' : 'Kolom B (Pilihan)'],
        x0 + halfW + 8,
        doc.currentY + 6,
        14,
        metaFont,
        '#0F172A'
      );
      doc.currentY += 24;

      pairs.forEach((pair, idx) => {
        const rightPair = rotated[idx];
        const leftLines = doc.wrapText(`${idx + 1}. ${pair.premis}`, halfW - 16, bodyFont);
        const leftArab = pair.premis_arab
          ? doc.wrapText(pair.premis_arab, halfW - 18, arabicFont, true)
          : [];
        const isRightAr = /[\u0600-\u06FF]/.test(rightPair.respon);
        const letter = String.fromCharCode(65 + idx);
        const rightText = `${includeAnswerKey ? '' : `${letter}. `}${rightPair.respon}`;
        const rightLines = doc.wrapText(
          rightText,
          rightW - 16,
          isRightAr ? arabicFont : bodyFont,
          isRightAr
        );
        const rightArabLines = rightPair.respon_arab
          ? doc.wrapText(rightPair.respon_arab, rightW - 18, arabicFont, true)
          : [];

        const leftH = leftLines.length * 16 + leftArab.length * 26;
        const rightH =
          rightLines.length * (isRightAr ? 26 : 16) + rightArabLines.length * 26;
        const rH = Math.max(leftH, rightH) + 14;

        doc.ensureSpace(rH);
        const ry = doc.currentY;
        doc.drawRect(x0, ry, w, rH, '#FFFFFF', '#CBD5E1', 1);
        doc.drawLine(x0 + halfW, ry, x0 + halfW, ry + rH, '#CBD5E1', 1);

        const ly = doc.drawLines(leftLines, x0 + 8, ry + 7, 16, bodyFont, '#0F172A');
        if (leftArab.length > 0) {
          doc.drawLines(leftArab, x0 + halfW - 8, ly, 26, arabicFont, '#0F172A', 'right', true);
        }

        const rry = isRightAr
          ? doc.drawLines(
              rightLines,
              x0 + w - 8,
              ry + 7,
              26,
              arabicFont,
              '#0F172A',
              'right',
              true
            )
          : doc.drawLines(rightLines, x0 + halfW + 8, ry + 7, 16, bodyFont, '#0F172A');
        if (rightArabLines.length > 0) {
          doc.drawLines(
            rightArabLines,
            x0 + w - 8,
            rry + 2,
            26,
            arabicFont,
            '#0F172A',
            'right',
            true
          );
        }
        doc.currentY += rH;
      });
      doc.currentY += 8;
    }

    // Garis jawaban untuk soal terbuka jika kunci disembunyikan
    if (
      (q.bentuk_soal === 'isian_singkat' ||
        q.bentuk_soal === 'uraian_berargumen') &&
      !includeAnswerKey
    ) {
      const rows = q.bentuk_soal === 'isian_singkat' ? 1 : 4;
      doc.ensureSpace(rows * 22 + 8);
      for (let i = 0; i < rows; i++) {
        doc.currentY += 18;
        doc.drawLine(x0, doc.currentY, x0 + w, doc.currentY, '#CBD5E1', 1);
      }
      doc.currentY += 10;
    }

    // Kunci & Pembahasan Syariat
    if (includeAnswerKey) {
      const kLines = doc.wrapText(`Kunci Jawaban: ${q.kunci_jawaban}`, w - 16, boldBodyFont);
      const pLines = doc.wrapText(`Pembahasan Syariat: ${q.pembahasan_syariat}`, w - 16, smallFont);
      const rLines = q.rubrik_penskoran
        ? doc.wrapText(`Rubrik Penskoran: ${q.rubrik_penskoran}`, w - 16, smallFont)
        : [];
      const keyH = kLines.length * 16 + pLines.length * 14 + rLines.length * 14 + 14;
      doc.ensureSpace(keyH);
      doc.drawRect(x0, doc.currentY, w, keyH, '#ECFDF5', '#A7F3D0', 1);
      let ky = doc.currentY + 8;
      ky = doc.drawLines(kLines, x0 + 8, ky, 16, boldBodyFont, '#065F46');
      ky = doc.drawLines(pLines, x0 + 8, ky + 2, 14, smallFont, '#1E293B');
      if (rLines.length > 0) {
        doc.drawLines(rLines, x0 + 8, ky + 2, 14, smallFont, '#475569');
      }
      doc.currentY += keyH + 10;
    }

    doc.currentY += 10;
  }

  doc.savePdf(
    `naskah-soal-mdta-kelas-${metadata.kelas}-${metadata.subject_id}.pdf`,
    `Mizan Asesmen MDTA Persatuan Islam No. 05 Nurul Islam Tegalpanjang Garut · Kelas ${metadata.kelas} Ula · ${metadata.mata_pelajaran}`
  );
}
