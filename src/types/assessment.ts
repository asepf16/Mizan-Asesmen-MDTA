export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SubjectId =
  | 'al_quran'
  | 'hadits_adab'
  | 'tauhid'
  | 'fiqih'
  | 'sirah_nabawiyah'
  | 'bahasa_arab';

export type PhaseType = 'AKM_DASAR_LOTS_MOTS' | 'AKM_MENENGAH_HOTS';

export type QuestionType =
  | 'pg_sederhana'
  | 'pg_biasa'
  | 'pg_kompleks_centang'
  | 'pg_kompleks_benar_salah'
  | 'menjodohkan'
  | 'isian_singkat'
  | 'uraian_berargumen';

export type CognitiveLevel =
  | 'C1_Mengingat'
  | 'C2_Memahami'
  | 'C3_Menerapkan'
  | 'C4_Menganalisis'
  | 'C5_Mengevaluasi';

export interface QuestionDistribution {
  pg: number;
  pg_kompleks_centang: number;
  pg_kompleks_benar_salah: number;
  menjodohkan: number;
  isian_singkat: number;
  uraian_berargumen: number;
}

export interface KisiKisiItem {
  no_urut: number;
  kode_tp: string;
  tujuan_pembelajaran: string;
  capaian_pembelajaran: string;
  indikator_soal: string;
  bentuk_soal: QuestionType;
  level_kognitif: CognitiveLevel;
  nomor_soal: number;
  sumber_kurikulum: string;
}

export interface QuestionOption {
  kode: string;
  teks: string;
  teks_arab?: string;
  benar: boolean;
}

export interface MatchingPair {
  id: string;
  premis: string;
  premis_arab?: string;
  respon: string;
  respon_arab?: string;
}

export interface TrueFalseStatement {
  id: string;
  pernyataan: string;
  pernyataan_arab?: string;
  kunci: 'Benar' | 'Salah';
}

export interface QuestionItem {
  nomor: number;
  kode_tp: string;
  bentuk_soal: QuestionType;
  level_kognitif: CognitiveLevel;
  stimulus_konteks: string;
  stimulus_arab?: string;
  stimulus_sumber?: string;
  pertanyaan: string;
  pertanyaan_arab?: string;
  opsi_pilihan?: QuestionOption[];
  pasangan_menjodohkan?: MatchingPair[];
  pernyataan_benar_salah?: TrueFalseStatement[];
  kunci_jawaban: string;
  kunci_array?: string[];
  pembahasan_syariat: string;
  rubrik_penskoran?: string;
  skor_maksimal: number;
}

export interface AssessmentMetadata {
  id: string;
  judul_paket: string;
  jenjang: 'Diniyah Ula';
  kelas: GradeLevel;
  fase_asesmen: PhaseType;
  mata_pelajaran: string;
  subject_id: SubjectId;
  semester: string;
  tahun_ajaran: string;
  alokasi_waktu_menit: number;
  sumber_kurikulum_resmi: string;
  tanggal_disusun: string;
}

export interface AssessmentPackage {
  metadata: AssessmentMetadata;
  kisi_kisi: KisiKisiItem[];
  butir_soal: QuestionItem[];
}

export interface CurriculumTopicUnit {
  kode: string;
  tujuan_pembelajaran: string;
  capaian_pembelajaran: string[];
  materi_inti_dan_dalil: string[];
  halaman_dokumen: string;
}

export interface SubjectGradeCurriculum {
  subject_id: SubjectId;
  mata_pelajaran: string;
  kelas: GradeLevel;
  jam_per_pekan: number;
  jam_per_tahun: number;
  standar_isi_ringkas: string;
  units: CurriculumTopicUnit[];
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  pg_sederhana: 'Pilihan Ganda Sederhana (A–C)',
  pg_biasa: 'Pilihan Ganda (A–D)',
  pg_kompleks_centang: 'PG Kompleks (Pilih >1 Benar)',
  pg_kompleks_benar_salah: 'PG Kompleks (Tabel Benar–Salah)',
  menjodohkan: 'Menjodohkan',
  isian_singkat: 'Isian Singkat',
  uraian_berargumen: 'Uraian Berargumen',
};

export const COGNITIVE_LEVEL_LABELS: Record<CognitiveLevel, string> = {
  C1_Mengingat: 'C1 · Mengingat (LOTS)',
  C2_Memahami: 'C2 · Memahami (LOTS)',
  C3_Menerapkan: 'C3 · Menerapkan (MOTS)',
  C4_Menganalisis: 'C4 · Menganalisis (HOTS)',
  C5_Mengevaluasi: 'C5 · Mengevaluasi (HOTS)',
};
