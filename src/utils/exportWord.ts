import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import type { AssessmentPackage } from '../types/assessment';
import {
  COGNITIVE_LEVEL_LABELS,
  QUESTION_TYPE_LABELS,
} from '../types/assessment';

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function makeTableCell(
  children: Paragraph[],
  options?: {
    widthPct?: number;
    shadeHex?: string;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  }
): TableCell {
  return new TableCell({
    width: options?.widthPct
      ? { size: options.widthPct, type: WidthType.PERCENTAGE }
      : undefined,
    shading: options?.shadeHex
      ? {
          fill: options.shadeHex,
          type: ShadingType.CLEAR,
          color: 'auto',
        }
      : undefined,
    margins: {
      top: 100,
      bottom: 100,
      left: 130,
      right: 130,
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    },
    children: children.map((p) =>
      options?.align ? p : p
    ),
  });
}

function createArabicParagraph(text: string, sizeHalfPts = 28): Paragraph {
  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length <= 1) {
    return new Paragraph({
      bidirectional: true,
      alignment: AlignmentType.RIGHT,
      spacing: { before: 80, after: 80, line: 360 },
      children: [
        new TextRun({
          text: text.trim(),
          rightToLeft: true,
          font: 'Amiri',
          size: sizeHalfPts,
          color: '0F172A',
        }),
      ],
    });
  }

  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: { before: 80, after: 80, line: 360 },
    children: lines.flatMap((line, idx) => [
      new TextRun({
        text: line.trim(),
        rightToLeft: true,
        font: 'Amiri',
        size: sizeHalfPts,
        color: '0F172A',
        break: idx > 0 ? 1 : 0,
      }),
    ]),
  });
}

export async function downloadKisiKisiWord(pkg: AssessmentPackage): Promise<void> {
  const { metadata, kisi_kisi } = pkg;

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      { label: 'No', width: 5 },
      { label: 'Kode TP', width: 9 },
      { label: 'Tujuan & Capaian Pembelajaran', width: 23 },
      { label: 'Indikator Soal AKM / HOTS', width: 25 },
      { label: 'Bentuk Soal', width: 13 },
      { label: 'Level Kognitif', width: 12 },
      { label: 'No. Soal', width: 6 },
      { label: 'Rujukan Kurikulum', width: 15 },
    ].map(
      (col) =>
        new TableCell({
          width: { size: col.width, type: WidthType.PERCENTAGE },
          shading: { fill: 'F1F5F9', type: ShadingType.CLEAR, color: 'auto' },
          margins: { top: 110, bottom: 110, left: 110, right: 110 },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 6, color: '94A3B8' },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: '94A3B8' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
            right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: col.label,
                  bold: true,
                  size: 19,
                  font: 'DM Sans',
                  color: '0F172A',
                }),
              ],
            }),
          ],
        })
    ),
  });

  const dataRows = kisi_kisi.map(
    (row) =>
      new TableRow({
        children: [
          makeTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: String(row.no_urut),
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 5 }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: row.kode_tp,
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                    color: '065F46',
                  }),
                ],
              }),
            ],
            { widthPct: 9 }
          ),
          makeTableCell(
            [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: row.tujuan_pembelajaran,
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: row.capaian_pembelajaran,
                    size: 18,
                    font: 'DM Sans',
                    color: '475569',
                  }),
                ],
              }),
            ],
            { widthPct: 23 }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: row.indikator_soal,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 25 }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      QUESTION_TYPE_LABELS[row.bentuk_soal] ?? row.bentuk_soal,
                    size: 18,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 13 }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      COGNITIVE_LEVEL_LABELS[row.level_kognitif] ??
                      row.level_kognitif,
                    size: 18,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 12 }
          ),
          makeTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: String(row.nomor_soal),
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 6 }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: row.sumber_kurikulum,
                    size: 18,
                    font: 'DM Sans',
                    color: '475569',
                  }),
                ],
              }),
            ],
            { widthPct: 15 }
          ),
        ],
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
            },
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: 'KISI-KISI PENILAIAN SUMATIF AKM / HOTS — MDTA PERSATUAN ISLAM NO. 05 NURUL ISLAM TEGALPANJANG GARUT',
                bold: true,
                size: 26,
                font: 'DM Sans',
                color: '065F46',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: metadata.judul_paket,
                bold: true,
                size: 22,
                font: 'DM Sans',
                color: '0F172A',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Jenjang: ${metadata.jenjang}  |  Kelas: ${metadata.kelas} Ula  |  Mata Pelajaran: ${metadata.mata_pelajaran}  |  Jenis: ${metadata.semester}  |  Sumber: ${metadata.sumber_kurikulum_resmi}`,
                size: 19,
                font: 'DM Sans',
                color: '475569',
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...dataRows],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  triggerBlobDownload(
    blob,
    `kisi-kisi-mdta-kelas-${metadata.kelas}-${metadata.subject_id}.docx`
  );
}

export async function downloadNaskahWord(
  pkg: AssessmentPackage,
  includeAnswerKey: boolean
): Promise<void> {
  const { metadata, butir_soal } = pkg;
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: 'MDTA PERSATUAN ISLAM NO. 05 NURUL ISLAM TEGALPANJANG GARUT',
          bold: true,
          size: 24,
          font: 'DM Sans',
          color: '065F46',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: metadata.judul_paket,
          bold: true,
          size: 22,
          font: 'DM Sans',
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: `Kelas ${metadata.kelas} Ula · ${metadata.mata_pelajaran} · ${metadata.semester} · Alokasi Waktu: ${metadata.alokasi_waktu_menit} Menit`,
          size: 19,
          font: 'DM Sans',
          color: '475569',
        }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            makeTableCell(
              [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Nama Santri : ......................................................',
                      size: 20,
                      font: 'DM Sans',
                    }),
                  ],
                }),
              ],
              { widthPct: 55 }
            ),
            makeTableCell(
              [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Kelas : ${metadata.kelas} Ula     Tanggal : ....................`,
                      size: 20,
                      font: 'DM Sans',
                    }),
                  ],
                }),
              ],
              { widthPct: 45 }
            ),
          ],
        }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 140 } })
  );

  for (const q of butir_soal) {
    children.push(
      new Paragraph({
        spacing: { before: 160, after: 80 },
        children: [
          new TextRun({
            text: `Soal No. ${q.nomor}`,
            bold: true,
            size: 21,
            font: 'DM Sans',
            color: '065F46',
          }),
          new TextRun({
            text: `  ·  ${q.kode_tp}  ·  ${
              QUESTION_TYPE_LABELS[q.bentuk_soal] ?? q.bentuk_soal
            }  ·  ${
              COGNITIVE_LEVEL_LABELS[q.level_kognitif] ?? q.level_kognitif
            }  ·  Skor Maks: ${q.skor_maksimal}`,
            size: 18,
            font: 'DM Sans',
            color: '64748B',
          }),
        ],
      })
    );

    if (q.stimulus_konteks) {
      children.push(
        new Paragraph({
          spacing: { after: 80, line: 300 },
          children: [
            new TextRun({
              text: q.stimulus_konteks,
              size: 21,
              font: 'DM Sans',
              color: '1E293B',
            }),
          ],
        })
      );
    }

    if (q.stimulus_arab) {
      children.push(createArabicParagraph(q.stimulus_arab, 28));
    }

    if (q.stimulus_sumber) {
      children.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `Rujukan: ${q.stimulus_sumber}`,
              italics: true,
              size: 17,
              font: 'DM Sans',
              color: '64748B',
            }),
          ],
        })
      );
    }

    children.push(
      new Paragraph({
        spacing: { before: 40, after: 100, line: 300 },
        children: [
          new TextRun({
            text: q.pertanyaan,
            bold: true,
            size: 21,
            font: 'DM Sans',
            color: '0F172A',
          }),
        ],
      })
    );

    if (q.pertanyaan_arab) {
      children.push(createArabicParagraph(q.pertanyaan_arab, 28));
    }

    if (
      (q.bentuk_soal === 'pg_sederhana' ||
        q.bentuk_soal === 'pg_biasa' ||
        q.bentuk_soal === 'pg_kompleks_centang') &&
      q.opsi_pilihan
    ) {
      const prefixSymbol = q.bentuk_soal === 'pg_kompleks_centang' ? '☐ ' : '';
      for (const opt of q.opsi_pilihan) {
        children.push(
          new Paragraph({
            indent: { left: 360 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `${prefixSymbol}${opt.kode}. ${opt.teks}`,
                size: 20,
                font: 'DM Sans',
                color: '0F172A',
              }),
            ],
          })
        );
        if (opt.teks_arab) {
          children.push(createArabicParagraph(opt.teks_arab, 26));
        }
      }
    }

    if (q.bentuk_soal === 'pg_kompleks_benar_salah' && q.pernyataan_benar_salah) {
      const tfHeader = new TableRow({
        tableHeader: true,
        children: [
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Pernyataan',
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 76, shadeHex: 'F1F5F9' }
          ),
          makeTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Benar',
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 12, shadeHex: 'F1F5F9' }
          ),
          makeTableCell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Salah',
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 12, shadeHex: 'F1F5F9' }
          ),
        ],
      });

      const tfRows = q.pernyataan_benar_salah.map(
        (stmt) =>
          new TableRow({
            children: [
              makeTableCell(
                [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: stmt.pernyataan,
                        size: 19,
                        font: 'DM Sans',
                      }),
                    ],
                  }),
                  ...(stmt.pernyataan_arab
                    ? [createArabicParagraph(stmt.pernyataan_arab, 24)]
                    : []),
                ],
                { widthPct: 76 }
              ),
              makeTableCell(
                [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text:
                          includeAnswerKey && stmt.kunci === 'Benar' ? '✓' : '☐',
                        size: 20,
                        font: 'DM Sans',
                      }),
                    ],
                  }),
                ],
                { widthPct: 12 }
              ),
              makeTableCell(
                [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text:
                          includeAnswerKey && stmt.kunci === 'Salah' ? '✓' : '☐',
                        size: 20,
                        font: 'DM Sans',
                      }),
                    ],
                  }),
                ],
                { widthPct: 12 }
              ),
            ],
          })
      );

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [tfHeader, ...tfRows],
        })
      );
    }

    if (q.bentuk_soal === 'menjodohkan' && q.pasangan_menjodohkan) {
      const pairs = q.pasangan_menjodohkan;
      const rotated =
        !includeAnswerKey && pairs.length > 1
          ? [...pairs.slice(1), pairs[0]]
          : pairs;

      const mHeader = new TableRow({
        tableHeader: true,
        children: [
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Kolom A (Premis / Konsep)',
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 48, shadeHex: 'F1F5F9' }
          ),
          makeTableCell(
            [
              new Paragraph({
                children: [
                  new TextRun({
                    text: includeAnswerKey
                      ? 'Pasangan Tepat'
                      : 'Kolom B (Pilihan Pasangan)',
                    bold: true,
                    size: 19,
                    font: 'DM Sans',
                  }),
                ],
              }),
            ],
            { widthPct: 52, shadeHex: 'F1F5F9' }
          ),
        ],
      });

      const mRows = pairs.map((pair, idx) => {
        const rightPair = rotated[idx];
        const isRightAr = /[\u0600-\u06FF]/.test(rightPair.respon);
        const letter = String.fromCharCode(65 + idx);
        return new TableRow({
          children: [
            makeTableCell(
              [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${idx + 1}. ${pair.premis}`,
                      size: 19,
                      font: 'DM Sans',
                    }),
                  ],
                }),
                ...(pair.premis_arab
                  ? [createArabicParagraph(pair.premis_arab, 24)]
                  : []),
              ],
              { widthPct: 48 }
            ),
            makeTableCell(
              [
                isRightAr
                  ? createArabicParagraph(
                      `${includeAnswerKey ? '' : `${letter}. `}${rightPair.respon}`,
                      26
                    )
                  : new Paragraph({
                      children: [
                        new TextRun({
                          text: `${includeAnswerKey ? '' : `${letter}. `}${rightPair.respon}`,
                          size: 19,
                          font: 'DM Sans',
                        }),
                      ],
                    }),
                ...(rightPair.respon_arab
                  ? [createArabicParagraph(rightPair.respon_arab, 24)]
                  : []),
              ],
              { widthPct: 52 }
            ),
          ],
        });
      });

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [mHeader, ...mRows],
        })
      );
    }

    if (
      (q.bentuk_soal === 'isian_singkat' ||
        q.bentuk_soal === 'uraian_berargumen') &&
      !includeAnswerKey
    ) {
      const lineCount = q.bentuk_soal === 'isian_singkat' ? 1 : 4;
      for (let i = 0; i < lineCount; i++) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 60 },
            children: [
              new TextRun({
                text: 'Jawaban: ...........................................................................................................................',
                size: 19,
                font: 'DM Sans',
                color: '94A3B8',
              }),
            ],
          })
        );
      }
    }

    if (includeAnswerKey) {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: 'Kunci Jawaban: ',
              bold: true,
              size: 19,
              font: 'DM Sans',
              color: '065F46',
            }),
            new TextRun({
              text: q.kunci_jawaban,
              size: 19,
              font: 'DM Sans',
              color: '0F172A',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 40, line: 280 },
          children: [
            new TextRun({
              text: 'Pembahasan Dalil & Syariat: ',
              bold: true,
              size: 19,
              font: 'DM Sans',
              color: '0F172A',
            }),
            new TextRun({
              text: q.pembahasan_syariat,
              size: 19,
              font: 'DM Sans',
              color: '334155',
            }),
          ],
        })
      );
      if (q.rubrik_penskoran) {
        children.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'Rubrik Penskoran: ',
                bold: true,
                size: 18,
                font: 'DM Sans',
                color: '475569',
              }),
              new TextRun({
                text: q.rubrik_penskoran,
                size: 18,
                font: 'DM Sans',
                color: '475569',
              }),
            ],
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 850,
              right: 850,
              bottom: 850,
              left: 850,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  triggerBlobDownload(
    blob,
    `naskah-soal-mdta-kelas-${metadata.kelas}-${metadata.subject_id}.docx`
  );
}
