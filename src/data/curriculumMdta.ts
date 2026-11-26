import type { GradeLevel, SubjectGradeCurriculum, SubjectId } from '../types/assessment';

export const SUBJECT_META: Record<
  SubjectId,
  { nama: string; deskripsi: string; kelasMulai: GradeLevel }
> = {
  al_quran: {
    nama: "Al-Qur'an",
    deskripsi: 'Tahsin/Tajwid, Tahfizh Juz 29–30, Mufradat, dan Tadabbur Makna Ayat',
    kelasMulai: 1,
  },
  hadits_adab: {
    nama: 'Hadits Adab',
    deskripsi: 'Dzikir-dzikir harian, kalimat hikmah, dan hadits adab muamalah sehari-hari',
    kelasMulai: 1,
  },
  tauhid: {
    nama: 'Tauhid',
    deskripsi: 'Dalil Rukun Iman & Islam, pemurnian aqidah, syirik, kufur, nifaq, dan al-wala wal-bara',
    kelasMulai: 3,
  },
  fiqih: {
    nama: 'Fiqih',
    deskripsi: 'Dzikir shalat, praktik & dalil thaharah, shalat wajib/sunnah, shaum, zakat, dan haji',
    kelasMulai: 1,
  },
  sirah_nabawiyah: {
    nama: 'Sirah Nabawiyah',
    deskripsi: 'Kelahiran hingga kewafatan Nabi Muhammad saw beserta ibrah dakwah dan jihad',
    kelasMulai: 3,
  },
  bahasa_arab: {
    nama: 'Bahasa Arab',
    deskripsi: "Imla', Hiwar (percakapan), Mufradat, Nahwu dasar, dan Sharaf terstruktur",
    kelasMulai: 1,
  },
};

export const CURRICULUM_DATA: SubjectGradeCurriculum[] = [
  // ==================== 1. AL-QUR'AN (KELAS 1 - 6) ====================
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 1,
    jam_per_pekan: 5,
    jam_per_tahun: 160,
    standar_isi_ringkas:
      "Membaca huruf tunggal, sambung, berharakat, bertanwin, sukun, tasydid serta menghafal surat al-Fatihah dan an-Nas s.d al-'Ashr.",
    units: [
      {
        kode: 'AQ-1.1',
        tujuan_pembelajaran: "Membaca al-Qur'an dengan benar dalam makhraj huruf, sifat huruf, dan harakatnya.",
        capaian_pembelajaran: [
          '1.1. Membaca huruf tunggal dan berharakat.',
          '1.2. Membaca huruf sambung dan berharakat.',
          '1.3. Membaca huruf bertanwin, sukun, dan tasydid.',
        ],
        materi_inti_dan_dalil: [
          'Makharijul huruf dan sifat huruf dasar.',
          'Tanda baca harakat fathah (ـَ), kasrah (ـِ), dhammah (ـُ), tanwin (ـً ـٍ ـٌ), sukun (ـْ), dan tasydid (ـّ).',
        ],
        halaman_dokumen: 'Hal. 12 (PDF hal. 5)',
      },
      {
        kode: 'AQ-1.2',
        tujuan_pembelajaran: "Menghafal al-Qur'an juz 30 dengan itqan dan kualitas bacaan sesuai kaidah tajwid.",
        capaian_pembelajaran: ["2.1. Menghafal surat al-Fatihah, lalu an-Nas s.d al-'Ashr."],
        materi_inti_dan_dalil: [
          "Surat hafalan wajib Kelas 1: Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlash, Al-Lahab, An-Nashr, Al-Kafirun, Al-Kautsar, Al-Ma'un, Quraisy, Al-Fil, Al-Humazah, Al-'Ashr.",
        ],
        halaman_dokumen: 'Hal. 12 (PDF hal. 5)',
      },
    ],
  },
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 2,
    jam_per_pekan: 5,
    jam_per_tahun: 160,
    standar_isi_ringkas:
      'Membaca hukum mad dan lafazh jalalah serta menghafal surat at-Takatsur s.d at-Tin.',
    units: [
      {
        kode: 'AQ-2.1',
        tujuan_pembelajaran: "Membaca al-Qur'an dengan benar dalam mad.",
        capaian_pembelajaran: ['1.1. Membaca huruf yang dibaca panjang (mad dan lafazh jalalah).'],
        materi_inti_dan_dalil: [
          'Bacaan panjang (mad thabi’i dengan huruf alif, wawu sukun, ya sukun).',
          'Cara membaca lafazh jalalah (اللّٰه) secara tafkhim (tebal) dan tarqiq (tipis).',
        ],
        halaman_dokumen: 'Hal. 12 (PDF hal. 5)',
      },
      {
        kode: 'AQ-2.2',
        tujuan_pembelajaran: "Menghafal al-Qur'an juz 30 dengan itqan dan kualitas bacaan sesuai kaidah tajwid.",
        capaian_pembelajaran: ['2.1. Menghafal surat at-Takatsur s.d at-Tin.'],
        materi_inti_dan_dalil: [
          "Surat hafalan wajib Kelas 2: At-Takatsur, Al-Qari'ah, Al-'Adiyat, Az-Zalzalah, Al-Bayyinah, Al-Qadr, Al-'Alaq, At-Tin.",
        ],
        halaman_dokumen: 'Hal. 12 (PDF hal. 5)',
      },
    ],
  },
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 3,
    jam_per_pekan: 4,
    jam_per_tahun: 128,
    standar_isi_ringkas:
      'Membaca ghunnah, qalqalah, tanda waqaf; menghafal al-Insyirah s.d al-Ghasyiyah; mufradat & tadabbur al-Fatihah, an-Nas s.d al-Kafirun.',
    units: [
      {
        kode: 'AQ-3.1',
        tujuan_pembelajaran: "Membaca al-Qur'an dengan benar dalam ghunnah, qalqalah, dan waqaf.",
        capaian_pembelajaran: [
          '1.1. Membaca huruf yang dibaca dengung (ghunnah).',
          '1.2. Membaca huruf yang dibaca memantul (qalqalah).',
          "1.3. Menghentikan dan melanjutkan bacaan al-Qur'an sesuai dengan tanda waqafnya.",
        ],
        materi_inti_dan_dalil: [
          'Ghunnah pada nun tasydid (نّ) dan mim tasydid (مّ).',
          'Huruf Qalqalah (ق ط ب ج د) yang dibaca memantul.',
          'Tanda-tanda waqaf dasar pada mushaf.',
        ],
        halaman_dokumen: 'Hal. 12 (PDF hal. 5)',
      },
      {
        kode: 'AQ-3.2',
        tujuan_pembelajaran: "Menghafal, menerjemah mufradat, dan tadabbur makna surat pilihan juz 30.",
        capaian_pembelajaran: [
          '2.1. Menghafal surat al-Insyirah s.d al-Ghasyiyah.',
          '3.1. Mengetahui dan menghafal terjemah mufradat/per kata surat al-Fatihah, an-Nas, al-Falaq, al-Ikhlash, al-Lahab, an-Nashr, dan al-Kafirun.',
          '4.1. Memahami, menghayati, dan mengingat kandungan makna dari setiap ayat surat tersebut.',
        ],
        materi_inti_dan_dalil: [
          'Surat hafalan: Al-Insyirah, Ad-Dluha, Al-Lail, As-Syams, Al-Balad, Al-Fajr, Al-Ghasyiyah.',
          'Mufradat & tadabbur aqidah Islam pada Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlash (tauhid uluhiyah & rububiyah, tidak beranak dan tidak diperanakkan), Al-Lahab, An-Nashr, Al-Kafirun (lakum dinukum wa liya din).',
        ],
        halaman_dokumen: 'Hal. 12–13 (PDF hal. 5–6)',
      },
    ],
  },
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 4,
    jam_per_pekan: 4,
    jam_per_tahun: 128,
    standar_isi_ringkas:
      "Tartil 6 juz, hafal al-A'la s.d al-Infithar, ilmu tajwid hukum mad (2, 4/5, 6 harakat), mufradat & tadabbur al-Kautsar s.d al-Qari'ah.",
    units: [
      {
        kode: 'AQ-4.1',
        tujuan_pembelajaran: "Memahami ilmu tajwid dan mampu mempraktikkannya dalam bacaan al-Qur'an yang benar.",
        capaian_pembelajaran: [
          '2.1. Menghafal surat al-A’la s.d al-Infithar.',
          '3.1. Memahami dan mempraktikkan hukum mad: a. dibaca 2 harakat, b. dibaca 4/5 harakat, c. dibaca 6 harakat.',
        ],
        materi_inti_dan_dalil: [
          "Hafalan: Al-A'la, Ath-Thariq, Al-Buruj, Al-Insyiqaq, Al-Muthaffifin, Al-Infithar.",
          'Klasifikasi panjang mad: Mad 2 harakat (Mad Thabi’i, Mad Badal, Mad ‘Iwadl, Mad Shilah Qashirah), Mad 4/5 harakat (Mad Wajib Muttashil, Mad Jaiz Munfashil, Mad Shilah Thawilah), Mad 6 harakat (Mad Lazim Mutsaqqal/Mukhaffaf Kilmi & Harfi).',
        ],
        halaman_dokumen: 'Hal. 13 (PDF hal. 6)',
      },
      {
        kode: 'AQ-4.2',
        tujuan_pembelajaran: "Menghafal terjemah mufradat dan tadabbur makna surat al-Kautsar s.d al-Qari'ah.",
        capaian_pembelajaran: [
          "4.1. Mengetahui dan menghafal terjemah mufradat/per kata surat al-Kautsar, al-Ma'un, Quraisy, al-Fil, al-Humazah, al-'Ashr, at-Takatsur, dan al-Qari'ah.",
          '5.1. Memahami, menghayati, dan mengingat kandungan makna setiap ayatnya.',
        ],
        materi_inti_dan_dalil: [
          "Al-Kautsar (nikmat melimpah & perintah shalat/qurban), Al-Ma'un (ciri pendusta agama: menghardik anak yatim, lalai shalat, riya), Quraisy (nikmat aman & pangan), Al-Fil (pasukan bergajah), Al-Humazah (ancaman pengumpat & penimbun harta), Al-'Ashr (ruginya manusia kecuali yang beriman, beramal shalih, saling menasihati dalam haq & sabar), At-Takatsur (bermegah-megahan), Al-Qari'ah (timbangan amal).",
        ],
        halaman_dokumen: 'Hal. 13 (PDF hal. 6)',
      },
    ],
  },
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 5,
    jam_per_pekan: 4,
    jam_per_tahun: 128,
    standar_isi_ringkas:
      "Hafal at-Takwir s.d an-Naba', tajwid alif lam ta'rif, qalqalah, ghunnah, nun mati/tanwin, mim mati; mufradat & tadabbur al-'Adiyat s.d al-'Alaq.",
    units: [
      {
        kode: 'AQ-5.1',
        tujuan_pembelajaran: "Memahami ilmu tajwid (alif lam, qalqalah, ghunnah, nun mati/tanwin, mim mati) dan hafalan at-Takwir s.d an-Naba'.",
        capaian_pembelajaran: [
          "2.1. Menghafal surat at-Takwir s.d an-Naba'.",
          "3.1. Memahami & mempraktikkan: a. Alif lam ta'rif, b. Qalqalah, c. Ghunnah, d. Hukum nun mati dan tanwin, e. Hukum mim mati.",
        ],
        materi_inti_dan_dalil: [
          "Alif lam ta'rif: Idzhar Qamariyah vs Idgham Syamsiyah.",
          'Qalqalah: Sughra (tengah kata) dan Kubra (akhir/waqaf).',
          'Hukum Nun Mati & Tanwin: Idzhar Halqi, Idgham Bighunnah, Idgham Bilaghunnah, Iqlab, Ikhfa Haqiqi.',
          'Hukum Mim Mati: Ikhfa Syafawi, Idgham Mitslain/Mimi, Idzhar Syafawi.',
        ],
        halaman_dokumen: 'Hal. 13 (PDF hal. 6)',
      },
      {
        kode: 'AQ-5.2',
        tujuan_pembelajaran: "Mufradat dan tadabbur makna surat al-'Adiyat, az-Zalzalah, al-Bayyinah, al-Qadr, dan al-'Alaq.",
        capaian_pembelajaran: [
          "4.1. Terjemah mufradat surat al-'Adiyat, az-Zalzalah, al-Bayyinah, al-Qadr, dan al-'Alaq.",
          '5.1. Memahami dan menghayati kandungan makna ayat untuk pendalaman aqidah Islam.',
        ],
        materi_inti_dan_dalil: [
          "Al-'Adiyat (sifat ingkar manusia & cinta harta), Az-Zalzalah (balasan amal sekecil dzarrah), Al-Bayyinah (kemurnian ibadah tauhid hanif, shalat, zakat), Al-Qadr (turunnya Al-Qur'an & malam kemuliaan), Al-'Alaq (perintah membaca bismi rabbika & larangan melampaui batas).",
        ],
        halaman_dokumen: 'Hal. 14 (PDF hal. 7)',
      },
    ],
  },
  {
    subject_id: 'al_quran',
    mata_pelajaran: "Al-Qur'an",
    kelas: 6,
    jam_per_pekan: 4,
    jam_per_tahun: 128,
    standar_isi_ringkas:
      'Hafal al-Mursalat s.d al-Mulk (Juz 29), tajwid waqaf-ibtida, makhraj-sifat huruf, imalah-isymam-saktah, tafkhim-tarqiq; mufradat at-Tin s.d as-Syams.',
    units: [
      {
        kode: 'AQ-6.1',
        tujuan_pembelajaran: 'Menguasai tajwid lanjutan dan hafalan juz 29 (al-Mursalat s.d al-Mulk).',
        capaian_pembelajaran: [
          '2.1. Menghafal surat al-Mursalat s.d al-Mulk.',
          '3.1. Memahami & mempraktikkan: a. Waqaf dan ibtida, b. Makhraj dan sifat huruf, c. Imalah-isymam-saktah-tasydid/suwkus, d. Tafkhim dan tarqiq.',
        ],
        materi_inti_dan_dalil: [
          'Waqaf & Ibtida: menjaga kesempurnaan makna ayat saat berhenti dan memulai kembali.',
          'Bacaan Gharib: Imalah (Hud:41 majreha), Isymam (Yusuf:11 la ta’manna), Saktah (berhenti sejenak tanpa bernafas, misal al-Kahfi:1-2 / al-Muthaffifin:14).',
          'Tafkhim & Tarqiq pada huruf Ra (ر), Lam Jalalah, dan huruf Isti’la.',
        ],
        halaman_dokumen: 'Hal. 14 (PDF hal. 7)',
      },
      {
        kode: 'AQ-6.2',
        tujuan_pembelajaran: 'Mufradat dan tadabbur makna surat at-Tin, al-Insyirah, ad-Dluha, al-Lail, dan as-Syams.',
        capaian_pembelajaran: [
          '4.1. Terjemah mufradat surat at-Tin, al-Insyirah, ad-Dluha, al-Lail, dan as-Syams.',
          '5.1. Memahami dan menghayati kandungan makna ayat untuk pendalaman aqidah.',
        ],
        materi_inti_dan_dalil: [
          'At-Tin (penciptaan manusia dalam bentuk terbaik kecuali yang sesat, yang beriman & beramal shalih pahala tak putus), Al-Insyirah (kelapangan setelah kesulitan), Ad-Dluha (pemeliharaan Allah & adab kepada yatim/peminta), Al-Lail (jalan kemudahan bagi yang bertakwa & berderma), As-Syams (kesucian jiwa vs pengotoran jiwa).',
        ],
        halaman_dokumen: 'Hal. 14 (PDF hal. 7)',
      },
    ],
  },

  // ==================== 2. HADITS ADAB (KELAS 1 - 6) ====================
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 1,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      'Dzikir harian dasar (15 dzikir) dan 31 kalimat hikmah seputar adab mulia beserta pengamalannya.',
    units: [
      {
        kode: 'HA-1.1',
        tujuan_pembelajaran: 'Menghafal dzikir-dzikir harian, memahaminya, dan mengamalkannya dalam aktivitas sehari-hari.',
        capaian_pembelajaran: [
          "1) Do'a memohon ilmu (رَبِّ زِدْنِي عِلْمًا; اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي...; اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا...)",
          "2-3) Do'a anak shalih & do'a untuk orang tua (رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ...; رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا)",
          '4-7) Dzikir sebelum makan (بِسْمِ اللّٰهِ), lupa basmalah (بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ), sesudah makan (الْحَمْدُ لِلّٰهِ الَّذِي كَفَانَا وَآوَانَا...), sesudah minum (الْحَمْدُ لِلّٰهِ).',
          '8-15) Dzikir memakai pakaian, sebelum & bangun tidur, masuk & keluar toilet, keluar rumah, masuk & keluar masjid.',
        ],
        materi_inti_dan_dalil: [
          'Dzikir sebelum makan cukup بِسْمِ اللّٰهِ (keterangan hadits "Allahumma barik lana..." berstatus dla\'if menurut kurikulum PERSIS).',
          'Dzikir keluar toilet: غُفْرَانَكَ (HR. Sunan Abi Dawud no. 30; dzikir lain selain itu haditsnya dla\'if).',
          'Dzikir keluar rumah: بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ. Dzikir masuk masjid: اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ. Keluar masjid: اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ.',
        ],
        halaman_dokumen: 'Hal. 14–17 (PDF hal. 6–8)',
      },
      {
        kode: 'HA-1.2',
        tujuan_pembelajaran: 'Menghafal dan memahami kalimat-kalimat hikmah seputar adab serta mengamalkannya.',
        capaian_pembelajaran: [
          'Menghafal 31 kalimat hikmah adab mulia (no. 1–31).',
        ],
        materi_inti_dan_dalil: [
          '1. الْأَدِيْبُ مَحْبُوْبٌ (Orang beradab dicintai), 2. أَكْرِمْ أَبَاكَ وَأُمَّكَ (Muliakanlah ayah dan ibumu), 3. أَكْرِمْ أُسْتَاذَكَ (Muliakanlah gurumu), 5. مَنْ جَدَّ وَجَدَ (Siapa yang sungguh-sungguh pasti berhasil), 6. النَّظَافَةُ مِنَ الْإِيْمَانِ (Kebersihan sebagian dari iman), 7. الْكَسَلُ دَاءٌ (Malas itu penyakit), 8. اِحْفَظْ لِسَانَكَ (Jagalah lidahmu).',
          '11. مَنْ صَدَقَ نَجَا (Siapa jujur pasti selamat), 12. الْعِلْمُ نُوْرٌ وَالْجَهْلُ ضَارٌّ, 13. فَاسْتَبِقُوا الْخَيْرَاتِ, 21. الْعَجَلَةُ مِنَ الشَّيْطَانِ (Tergesa-gesa dari setan), 22. كُلْ بِيَمِيْنِكَ (Makan dengan tangan kananmu), 23. لَا تَشْرَبْ قَائِمًا (Jangan minum sambil berdiri), 29. لَا طَاعَةَ لِمَخْلُوْقٍ فِي مَعْصِيَةِ الْخَالِقِ.',
        ],
        halaman_dokumen: 'Hal. 17–19 (PDF hal. 8–9)',
      },
    ],
  },
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 2,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Muraja'ah 15 dzikir + ziyadah dzikir naik kendaraan & do'a orang sakit; hadits-hadits adab makan dan adab minum.",
    units: [
      {
        kode: 'HA-2.1',
        tujuan_pembelajaran: "Menghafal dzikir harian (muraja'ah & ziyadah naik kendaraan dan do'a orang sakit).",
        capaian_pembelajaran: [
          '16) Dzikir naik kendaraan: سُبْحَانَ الَّذِي سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ (QS. Az-Zukhruf).',
          "17) Do'a untuk orang sakit: اللَّهُمَّ رَبَّ النَّاسِ مُذْهِبَ الْبَأْسِ اشْفِ أَنْتَ الشَّافِي لَا شَافِيَ إِلَّا أَنْتَ شِفَاءً لَا يُغَادِرُ سَقَمًا (HR. Bukhari no. 5742).",
        ],
        materi_inti_dan_dalil: [
          'Dzikir 1–15 tetap dimurajaah beserta 2 ziyadah (naik kendaraan & menjenguk orang sakit).',
        ],
        halaman_dokumen: 'Hal. 19–20 (PDF hal. 9)',
      },
      {
        kode: 'HA-2.2',
        tujuan_pembelajaran: 'Menghafal, mengetahui makna, memahami, dan mengamalkan hadits seputar adab makan dan adab minum.',
        capaian_pembelajaran: [
          '2.1 Adab Makan (10 poin): basmalah, tangan kanan, makanan dekat, tidak mencela makanan, mengambil & membersihkan makanan jatuh, menjilat sisa di tangan sebelum tisu/lap, dari pinggir dahulu, tidak sampai kekenyangan, berkumpul agar berkah, mengambil satu persatu.',
          '2.2 Adab Minum (4 poin): tidak minum sambil berdiri (makruh, tetap tercela), tidak bernafas/meniup dalam wadah minum, bernafas 3x di luar wadah, tidak minum dari mulut wadah air minum.',
        ],
        materi_inti_dan_dalil: [
          'سَمِّ اللّٰهَ وَكُلْ بِيَمِيْنِكَ وَكُلْ مِمَّا يَلِيْكَ (HR. Bukhari no. 5376).',
          'إِذَا أَكَلَ أَحَدُكُمْ فَلْيَأْكُلْ بِيَمِيْنِهِ وَإِذَا شَرِبَ فَلْيَشْرَبْ بِيَمِيْنِهِ فَإِنَّ الشَّيْطَانَ يَأْكُلُ بِشِمَالِهِ وَيَشْرَبُ بِشِمَالِهِ (HR. Muslim no. 3764).',
          'مَا عَابَ النَّبِيُّ ﷺ طَعَامًا قَطُّ إِنِ اشْتَهَاهُ أَكَلَهُ وَإِنْ كَرِهَهُ تَرَكَهُ (HR. Bukhari no. 4989).',
          'لَا يَشْرَبَنَّ أَحَدٌ مِنْكُمْ قَائِمًا (HR. Muslim no. 2775) & hadits air zamzam (HR. Bukhari no. 1637) menunjukkan hukumnya makruh.',
          'إِذَا شَرِبَ أَحَدُكُمْ فَلَا يَتَنَفَّسْ فِي الْإِنَاءِ (HR. Bukhari no. 5630); larangan meniup minuman (HR. Tirmidzi no. 1887); larangan minum dari mulut wadah (HR. Bukhari no. 5628).',
        ],
        halaman_dokumen: 'Hal. 20–23 (PDF hal. 9–11)',
      },
    ],
  },
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 3,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Ziyadah do'a sebelum tidur lengkap, do'a menjenguk لا بأس طهور; hadits adab berpakaian, adab tidur, dan adab di rumah.",
    units: [
      {
        kode: 'HA-3.1',
        tujuan_pembelajaran: 'Menghafal hadits adab berpakaian, adab tidur, dan adab di rumah serta mengamalkannya.',
        capaian_pembelajaran: [
          '3.1 Adab Berpakaian: tidak mewah/sombong, tidak isbal karena sombong, tidak pakaian lawan jenis, tidak berpakaian ketat (kasiyat \'ariyat), sandal mulai kanan & lepas kiri, tidak sandal sebelah, tidak bercukur qaza\' (sebagian tipis sebagian tebal).',
          '3.2 Adab Tidur: berwudhu & dzikir sebelum tidur, berbaring ke kanan (terlentang boleh, makruh tengkurap), makruh tidur sebelum isya & berbincang setelah isya.',
          '3.3 Adab di Rumah: masuk rumah baca basmalah, tidak memasang gambar makhluk hidup/patung/salib, tidak buang air menghadap kiblat atau cebok dengan tangan kanan, tidak menjawab salam/dzikir saat buang air, menjaga kebersihan (kebersihan setengah iman).',
        ],
        materi_inti_dan_dalil: [
          'لَعَنَ رَسُوْلُ اللّٰهِ ﷺ الرَّجُلَ يَلْبَسُ لِبْسَةَ الْمَرْأَةِ وَالْمَرْأَةَ تَلْبَسُ لِبْسَةَ الرَّجُلِ (HR. Abu Dawud no. 3575).',
          'Isbal karena sombong (HR. Abu Dawud no. 4096); larangan qaza\' (HR. Bukhari no. 5921).',
          'Tidur wudhu & berbaring kanan: إِذَا أَتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوْءَكَ لِلصَّلَاةِ ثُمَّ اضْطَجِعْ عَلَى شِقِّكَ الْأَيْمَنِ (HR. Bukhari no. 247). Makruh tengkurap (HR. Abu Dawud no. 5042).',
          'لَا تَدْخُلُ الْمَلَائِكَةُ بَيْتًا فِيْهِ كَلْبٌ وَلَا تَصَاوِيْرُ (HR. Muslim no. 5667); الطُّهُورُ شَطْرُ الْإِيمَانِ (HR. Muslim no. 556).',
        ],
        halaman_dokumen: 'Hal. 23–29 (PDF hal. 11–14)',
      },
    ],
  },
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 4,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Ziyadah dzikir bangun tidur dini hari (QS. Ali Imran: 190-191) & dzikir safar; hadits adab kepada orang tua, keluarga, dan sesama.',
    units: [
      {
        kode: 'HA-4.1',
        tujuan_pembelajaran: 'Memahami dan mengamalkan hadits adab kepada orang tua dan keluarga.',
        capaian_pembelajaran: [
          '2.1 Adab kepada Orang Tua: tidak berkata "ah/cis", berkata sopan mulia, selalu merendah, mendo\'akan, tidak mencaci orang tua orang lain, mendahulukan ibu 3 kali dibanding ayah.',
          '2.2 Adab kepada Keluarga: shilaturahim, tidak bermusuhan, menyambung hubungan meski keluarga memusuhi.',
        ],
        materi_inti_dan_dalil: [
          'رِضَا اللّٰهِ فِي رِضَا الْوَالِدَيْنِ وَسَخَطُ اللّٰهِ فِي سَخَطِ الْوَالِدَيْنِ (HR. Tirmidzi / Baihaqi no. 7584).',
          'Mendahulukan ibu 3x: أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أَبُوْكَ (HR. Bukhari no. 5971).',
          'لَا يَدْخُلُ الْجَنَّةَ قَاطِعُ رَحِمٍ (HR. Muslim no. 4637); penyambung rahim sejati adalah yang menyambung ketika diputuskan (HR. Bukhari no. 5991).',
        ],
        halaman_dokumen: 'Hal. 29–33 (PDF hal. 14–16)',
      },
      {
        kode: 'HA-4.2',
        tujuan_pembelajaran: 'Memahami dan mengamalkan hadits adab kepada sesama muslim dan tetangga.',
        capaian_pembelajaran: [
          '2.3 Adab kepada Sesama: mencintai saudara seperti diri sendiri, 6 hak muslim, adab salam (kecil ke besar, berjalan ke duduk, sedikit ke banyak, salam kepada ahli kitab cukup wa\'alaikum), menghadiri undangan meski shaum, mendo\'akan yang bersin (yarhamukallah - yahdikumullah), tidak menyakiti tetangga.',
        ],
        materi_inti_dan_dalil: [
          'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيْهِ مَا يُحِبُّ لِنَفْسِهِ (HR. Bukhari no. 12).',
          'حَقُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ سِتٌّ (6 hak muslim: beri salam, penuhi undangan, beri nasihat, do\'akan bersin, jenguk sakit, antar jenazah — HR. Muslim no. 5778).',
          'مَنْ كَانَ يُؤْمِنُ بِاللّٰهِ وَالْيَوْمِ الْآخِرِ فَلَا يُؤْذِ جَارَهُ (HR. Bukhari no. 5559).',
        ],
        halaman_dokumen: 'Hal. 33–35 (PDF hal. 16–17)',
      },
    ],
  },
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 5,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Ziyadah dzikir tahajjud & pulang safar; hadits adab mencari ilmu & bermajelis, adab di masjid, adab bertamu (isti'dzan), dan adab safar.",
    units: [
      {
        kode: 'HA-5.1',
        tujuan_pembelajaran: 'Memahami hadits adab mencari ilmu, bermajelis, dan adab di masjid.',
        capaian_pembelajaran: [
          '2.1 Adab Mencari Ilmu & Majelis: kewajiban menuntut ilmu, menghormati guru & menyayangi yang muda, tidak mengusir orang dari tempat duduknya (tetapi berlapang-lapang), tidak duduk di tengah lingkaran majelis, tidak menyela di antara dua orang tanpa izin.',
          '2.2 Adab di Masjid: shalat tahiyyatul-masjid sebelum duduk, menjaga kebersihan masjid, tidak datang dengan bau busuk (seperti bawang).',
        ],
        materi_inti_dan_dalil: [
          'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ (HR. Ibnu Majah no. 224). خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ (HR. Bukhari no. 4639).',
          'لَا يُقِيْمُ الرَّجُلُ الرَّجُلَ مِنْ مَقْعَدِهِ ثُمَّ يَجْلِسُ فِيْهِ وَلٰكِنْ تَفَسَّحُوْا وَتَوَسَّعُوْا (HR. Muslim no. 4044).',
          'إِذَا دَخَلَ أَحَدُكُمُ الْمَسْجِدَ فَلَا يَجْلِسْ حَتَّى يُصَلِّيَ رَكْعَتَيْنِ (HR. Bukhari no. 1097).',
        ],
        halaman_dokumen: 'Hal. 39–41 (PDF hal. 19–20)',
      },
      {
        kode: 'HA-5.2',
        tujuan_pembelajaran: "Memahami hadits adab bertamu (isti'dzan) dan adab safar.",
        capaian_pembelajaran: [
          "2.3 Adab Bertamu: isti'dzan dengan salam maksimal 3 kali, menjamu tamu minimal 3 hari (1 hari 1 malam istimewa), tidak memberatkan tuan rumah lebih dari 3 hari.",
          "2.4 Adab Safar: melepas safar dengan do'a, bertakbir ketika menanjak dan bertasbih ketika menurun.",
        ],
        materi_inti_dan_dalil: [
          'إِذَا اسْتَأْذَنَ أَحَدُكُمْ ثَلَاثًا فَلَمْ يُؤْذَنْ لَهُ فَلْيَرْجِعْ (HR. Bukhari no. 6245).',
          'الضِّيَافَةُ ثَلَاثَةُ أَيَّامٍ وَجَائِزَتُهُ يَوْمٌ وَلَيْلَةٌ (HR. Muslim no. 4611).',
          'كُنَّا إِذَا صَعِدْنَا كَبَّرْنَا وَإِذَا نَزَلْنَا سَبَّحْنَا (HR. Bukhari no. 2993).',
        ],
        halaman_dokumen: 'Hal. 41–42 (PDF hal. 20)',
      },
    ],
  },
  {
    subject_id: 'hadits_adab',
    mata_pelajaran: 'Hadits Adab',
    kelas: 6,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Ziyadah ayat kursi, mu'awwidzat sebelum tidur, dan dzikir pagi-petang; hadits menjauhi akhlaq tercela (16 poin) dan pembiasaan akhlaq terpuji (7 poin).",
    units: [
      {
        kode: 'HA-6.1',
        tujuan_pembelajaran: 'Memahami dan mengamalkan hadits menjauhi akhlaq tercela.',
        capaian_pembelajaran: [
          'Menjauhi durhaka kepada ibu/orang tua, menyebarkan berita tanpa seleksi (qila wa qala), menyia-nyiakan harta, berbisik berdua meninggalkan orang ketiga, mencaci, berburuk sangka (zhann), hasud, ghibah, sifat munafik (bohong, ingkar janji, khianat, melampaui batas saat bermusuhan), tidak menahan marah, dan mendiamkan sesama muslim > 3 hari.',
        ],
        materi_inti_dan_dalil: [
          'إِنَّ اللّٰهَ حَرَّمَ عَلَيْكُمْ عُقُوقَ الْأُمَّهَاتِ... وَقِيلَ وَقَالَ وَكَثْرَةَ السُّؤَالِ وَإِضَاعَةَ الْمَالِ (HR. Bukhari no. 5975).',
          'إِيَّاكُمْ وَالْحَسَدَ فَإِنَّ الْحَسَدَ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ (HR. Abu Dawud no. 4905).',
          'أَرْبَعٌ مَنْ كُنَّ فِيْهِ كَانَ مُنَافِقًا خَالِصًا... (HR. Bukhari no. 34).',
          'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ (HR. Bukhari no. 6114).',
        ],
        halaman_dokumen: 'Hal. 46–49 (PDF hal. 22–24)',
      },
      {
        kode: 'HA-6.2',
        tujuan_pembelajaran: 'Memahami dan mengamalkan hadits pembiasaan akhlaq terpuji.',
        capaian_pembelajaran: [
          'Membiasakan jujur, qanaah/bersyukur melihat yang di bawah secara dunia, bershadaqah walau berwajah ceria, berbagi dengan tetangga, meringankan kesusahan & menutupi aib muslim, mengajak kebaikan, dan membalas kebaikan minimal dengan mendo\'akan.',
        ],
        materi_inti_dan_dalil: [
          'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ (HR. Muslim no. 6805).',
          'كُلُّ مَعْرُوفٍ صَدَقَةٌ (HR. Bukhari no. 6021).',
          'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللّٰهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ (HR. Muslim no. 7028).',
        ],
        halaman_dokumen: 'Hal. 49–51 (PDF hal. 24–25)',
      },
    ],
  },

  // ==================== 3. TAUHID (KELAS 3 - 6) ====================
  {
    subject_id: 'tauhid',
    mata_pelajaran: 'Tauhid',
    kelas: 3,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Dalil rukun Islam & rukun Iman; dalil iman kepada Allah (fitrah sejak lahir, mustahil lebih dari satu, mustahil punya anak, mustahil terlihat di dunia) dan iman kepada malaikat.',
    units: [
      {
        kode: 'TH-3.1',
        tujuan_pembelajaran: 'Menghafal dan memahami dalil rukun Islam, rukun Iman, dan keimanan kepada Allah swt.',
        capaian_pembelajaran: [
          '1.1–1.2 Dalil rukun Islam & rukun Iman (HR. Muslim no. 102, QS. An-Nisa: 136).',
          '2.1–2.6 Iman kepada Allah adalah fitrah sejak lahir (QS. Al-A\'raf: 172, HR. Bukhari no. 1385), Allah mustahil lebih dari satu (QS. Al-Anbiya: 22, Al-Isra: 42), tidak punya anak (QS. Al-An\'am: 101), mustahil dilihat kasat mata di dunia (QS. Al-A\'raf: 143), kekuasaan & bukti kebenaran Al-Qur\'an.',
        ],
        materi_inti_dan_dalil: [
          'لَوْ كَانَ فِيْهِمَا آلِهَةٌ إِلَّا اللّٰهُ لَفَسَدَتَا (QS. Al-Anbiya: 22).',
          'كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ فَأَبَوَاهُ يُهَوِّدَانِهِ أَوْ يُنَصِّرَانِهِ أَوْ يُمَجِّسَانِهِ (HR. Bukhari no. 1385).',
          'بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ أَنَّى يَكُونُ لَهُ وَلَدٌ وَلَمْ تَكُنْ لَهُ صَاحِبَةٌ (QS. Al-An\'am: 101).',
        ],
        halaman_dokumen: 'Hal. 51–52 (PDF hal. 25)',
      },
      {
        kode: 'TH-3.2',
        tujuan_pembelajaran: 'Menghafal dan memahami dalil seputar iman kepada malaikat.',
        capaian_pembelajaran: [
          '3.1–3.6 Malaikat sebagai utusan Allah (QS. Fathir: 1), asal penciptaan malaikat dari cahaya & jin dari api (HR. Muslim no. 7682), perintah sujud kepada Adam & pembangkangan Iblis dari golongan jin (QS. Al-Kahfi: 50), keturunan Iblis sebagai musuh manusia (QS. An-Nas), malaikat selalu patuh, tugas Jibril, Israfil peniup sangkakala, pencabut nyawa, Raqib-Atid, dan Malik penjaga neraka.',
        ],
        materi_inti_dan_dalil: [
          'خُلِقَتِ الْمَلَائِكَةُ مِنْ نُورٍ وَخُلِقَ الْجَانُّ مِنْ مَارِجٍ مِنْ نَارٍ (HR. Muslim no. 7682).',
          'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ كَانَ مِنَ الْجِنِّ فَفَسَقَ عَنْ أَمْرِ رَبِّهِ (QS. Al-Kahfi: 50).',
          'مَا يَلْفِظُ مِنْ قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ (QS. Qaf: 18).',
        ],
        halaman_dokumen: 'Hal. 52–54 (PDF hal. 25–26)',
      },
    ],
  },
  {
    subject_id: 'tauhid',
    mata_pelajaran: 'Tauhid',
    kelas: 4,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Dalil iman kepada kitab-kitab Allah (Taurat, Zabur, Injil, Al-Qur'an sebagai muhaimin) dan iman kepada para Nabi serta kisah dakwahnya.",
    units: [
      {
        kode: 'TH-4.1',
        tujuan_pembelajaran: 'Menghafal dan memahami dalil seputar iman kepada kitab.',
        capaian_pembelajaran: [
          '1.1 Empat kitab Allah: Taurat (Musa), Injil (Isa), Zabur (Dawud), Al-Qur\'an (Muhammad saw).',
          '1.2 Status kitab sebelum Al-Qur\'an: pernah ada tetapi sudah banyak diubah sehingga tidak boleh mengimani kandungannya, sikap tidak membenarkan ahli kitab dan tidak mendustakan (HR. Bukhari no. 4458).',
          '1.3 Al-Qur\'an sebagai hakim/muhaimin bagi kitab-kitab sebelumnya dan rujukan utama (QS. Al-Maidah: 48).',
        ],
        materi_inti_dan_dalil: [
          'وَأَنْزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ الْكِتَابِ وَمُهَيْمِنًا عَلَيْهِ (QS. Al-Maidah: 48).',
          'لَا تُصَدِّقُوا أَهْلَ الْكِتَابِ وَلَا تُكَذِّبُوهُمْ وَقُولُوا آمَنَّا بِاللّٰهِ وَمَا أُنْزِلَ إِلَيْنَا (HR. Bukhari no. 4458).',
        ],
        halaman_dokumen: 'Hal. 54–55 (PDF hal. 26–27)',
      },
      {
        kode: 'TH-4.2',
        tujuan_pembelajaran: 'Menghafal dan memahami dalil seputar iman kepada Nabi dan Rasul.',
        capaian_pembelajaran: [
          '2.4–2.7 Nabi mendapat wahyu dari Allah (QS. An-Nisa: 163, Asy-Syura: 51), jumlah Nabi tak terhingga & banyak yang tidak dikisahkan (QS. Ghafir: 78), ayat-ayat yang menyebut 25 nama Nabi serta inti dakwah tauhid para Nabi (اعبدوا الله ما لكم من إله غيره).',
        ],
        materi_inti_dan_dalil: [
          'وَلَقَدْ أَرْسَلْنَا رُسُلًا مِنْ قَبْلِكَ مِنْهُمْ مَنْ قَصَصْنَا عَلَيْكَ وَمِنْهُمْ مَنْ لَمْ نَقْصُصْ عَلَيْكَ (QS. Ghafir: 78).',
          'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِنْ قَبْلِهِ الرُّسُلُ (QS. Ali Imran: 144).',
        ],
        halaman_dokumen: 'Hal. 55–56 (PDF hal. 27)',
      },
    ],
  },
  {
    subject_id: 'tauhid',
    mata_pelajaran: 'Tauhid',
    kelas: 5,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Perjuangan dakwah tauhid para Nabi, dalil iman pada hari akhir (kematian, fitnah & siksa kubur, kebangkitan, hisab, surga-neraka), dan iman pada taqdir.",
    units: [
      {
        kode: 'TH-5.1',
        tujuan_pembelajaran: 'Memahami dan menghayati dalil-dalil perjuangan dakwah tauhid para Nabi dan iman pada hari akhir.',
        capaian_pembelajaran: [
          '1.1–1.10 Perjuangan dakwah tauhid Nabi Nuh, Hud, Shalih, Ibrahim, Luth, Yusuf, Syu\'aib, Musa, Yunus, dan Isa alaihimussalam.',
          '2.11–2.16 Hari akhir dimulai saat kematian (HR. Bukhari no. 6511), ujian & siksa kubur (HR. Ahmad hadits al-Barra bin \'Azib), tiupan sangkakala (QS. Az-Zumar: 68), pengumpulan manusia tanpa alas kaki (Nabi Ibrahim pertama diberi pakaian), hisab amal kitab kanan/belakang (QS. Al-Insyiqaq: 7-12), dan surga 100 tingkatan / Firdaus tertinggi (HR. Bukhari no. 2790).',
        ],
        materi_inti_dan_dalil: [
          'وَنُفِخَ فِي الصُّورِ فَصَعِقَ مَنْ فِي السَّمَاوَاتِ وَمَنْ فِي الْأَرْضِ... ثُمَّ نُفِخَ فِيهِ أُخْرَى فَإِذَا هُمْ قِيَامٌ يَنْظُرُونَ (QS. Az-Zumar: 68).',
          'فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا (QS. Al-Insyiqaq: 7-8).',
        ],
        halaman_dokumen: 'Hal. 56–60 (PDF hal. 27–29)',
      },
      {
        kode: 'TH-5.2',
        tujuan_pembelajaran: 'Menghafal dan memahami dalil-dalil seputar iman pada taqdir.',
        capaian_pembelajaran: [
          '2.17 Penetapan taqdir manusia (amal, rizki, ajal, celaka/bahagia) sejak fase janin 40x3 hari dalam rahim (HR. Bukhari no. 3208).',
          '2.18 Taqdir baik disikapi dengan syukur, taqdir buruk disikapi dengan sabar — urusan mukmin selalu baik (QS. Al-Hadid: 22-23, HR. Muslim no. 7692).',
          '2.19 Taqdir yang dapat dihapus/dipercepat atau ditetapkan sesuai amal shalih & istighfar (QS. Ar-Ra\'d: 39, QS. Nuh: 10-12).',
        ],
        materi_inti_dan_dalil: [
          'عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ... إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ (HR. Muslim no. 7692).',
          'يَمْحُو اللّٰهُ مَا يَشَاءُ وَيُثْبِتُ وَعِنْدَهُ أُمُّ الْكِتَابِ (QS. Ar-Ra\'d: 39).',
        ],
        halaman_dokumen: 'Hal. 60–61 (PDF hal. 29–30)',
      },
    ],
  },
  {
    subject_id: 'tauhid',
    mata_pelajaran: 'Tauhid',
    kelas: 6,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Dalil syirik i'tiqadi vs syirik 'amali (riya, khafi, andad, jimat/tiwalah/ruqyah syirik), kufur i'tiqadi vs 'amali, nifaq i'tiqadi vs 'amali, dan al-wala wal-bara.",
    units: [
      {
        kode: 'TH-6.1',
        tujuan_pembelajaran: "Memahami dalil syirik sebagai kekafiran (i'tiqadi) dan syirik sebatas dosa besar ('amali).",
        capaian_pembelajaran: [
          '1.1 Syirik i\'tiqadi: tidak diampuni & kekal di neraka jika tidak meyakini la ilaha illallah (QS. An-Nisa: 48, Al-Bayyinah: 6, HR. Bukhari no. 44).',
          "1.2 Syirik 'amali (dosa besar, tidak kekal di neraka jika tetap bertauhid): Syirik Do'a, Mahabbah, Tha'ah (menghalalkan yang haram/mengharamkan yang halal), Ashghar/Riya, Khafi (memperindah shalat saat dilihat), Andad (kalimat berandai-andai menyamakan makhluk dengan Allah), serta jampi-jampi (ruqyah), jimat (tamimah), dan pelet (tiwalah) yang mengandung syirik.",
        ],
        materi_inti_dan_dalil: [
          'إِنَّ اللّٰهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذٰلِكَ لِمَنْ يَشَاءُ (QS. An-Nisa: 48).',
          'إِنَّ أَخْوَفَ مَا أَخَافُ عَلَيْكُمُ الشِّرْكُ الْأَصْغَرُ... الرِّيَاءُ (HR. Ahmad no. 23630).',
          'إِنَّ الرُّقَى وَالتَّمَائِمَ وَالتِّوَلَةَ شِرْكٌ (HR. Abu Dawud no. 3885); لَا بَأْسَ بِالرُّقَى مَا لَمْ تَكُنْ شِرْكًا (HR. Abu Dawud no. 3888); مَنْ حَلَفَ بِغَيْرِ اللّٰهِ فَقَدْ أَشْرَكَ (HR. Abu Dawud no. 3253).',
        ],
        halaman_dokumen: 'Hal. 61–63 (PDF hal. 30–31)',
      },
      {
        kode: 'TH-6.2',
        tujuan_pembelajaran: "Memahami dalil kufur, nifaq (i'tiqadi vs 'amali), dan kewajiban al-wala wal-bara.",
        capaian_pembelajaran: [
          "2.3–2.4 Kufur i'tiqadi (QS. An-Nisa: 150-151, Ali Imran: 90) vs Kufur 'amali (meninggalkan shalat HR. Tirmidzi no. 2830, mendatangi peramal/kahin/arraf HR. Ahmad no. 9171, tidak berhukum dengan hukum Allah).",
          "3.5–3.6 Nifaq i'tiqadi (kerak neraka paling bawah QS. An-Nisa: 145) vs Nifaq 'amali (3 tanda munafik: dusta, ingkar janji, khianat amanat HR. Bukhari no. 33).",
          '4.7–4.8 Kewajiban Al-Wala (saling mencintai & mendukung sesama muslim lintas madzhab QS. At-Taubah: 71) dan Al-Bara (tidak menjadikan kafir sebagai wali/pelindung QS. Ali Imran: 28).',
        ],
        materi_inti_dan_dalil: [
          'الْعَهْدُ الَّذِي بَيْنَنَا وَبَيْنَهُمُ الصَّلَاةُ فَمَنْ تَرَكَهَا فَقَدْ كَفَرَ (HR. Tirmidzi no. 2830).',
          'آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ (HR. Bukhari no. 33).',
          'وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ (QS. At-Taubah: 71).',
        ],
        halaman_dokumen: 'Hal. 63–65 (PDF hal. 31–32)',
      },
    ],
  },

  // ==================== 4. FIQIH (KELAS 1 - 6) ====================
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 1,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Hafalan 16 dzikir seputar wudhu & shalat serta memperagakan praktik wudhu, tayammum, adzan, iqamat, dan shalat.',
    units: [
      {
        kode: 'FQ-1.1',
        tujuan_pembelajaran: 'Menghafal dzikir-dzikir seputar ibadah dan mengamalkannya dalam ibadah sehari-hari.',
        capaian_pembelajaran: [
          '1–5) Sebelum wudhu, sesudah wudhu, adzan, menjawab & sesudah adzan, iqamah.',
          "6–16) Iftitah, isti'adzah, ruku', bangkit dari ruku', i'tidal, sujud, duduk di antara dua sujud, tasyahhud awwal, tasyahhud akhir, salam, wirid ba'da shalat.",
        ],
        materi_inti_dan_dalil: [
          'Urutan dzikir shalat dasar mulai dari takbiratul-ihram sampai salam dan wirid ba\'da shalat.',
        ],
        halaman_dokumen: 'Hal. 65 (PDF hal. 32)',
      },
      {
        kode: 'FQ-1.2',
        tujuan_pembelajaran: 'Memperagakan praktik thaharah dan shalat dengan benar.',
        capaian_pembelajaran: [
          'Praktik 1) Wudhu, 2) Tayammum, 3) Adzan, 4) Iqamat, 5) Shalat dari takbiratul-ihram s.d salam.',
        ],
        materi_inti_dan_dalil: [
          'Gerakan dasar wudhu, tayammum, adzan, iqamat, dan shalat fardhu.',
        ],
        halaman_dokumen: 'Hal. 65 (PDF hal. 32)',
      },
    ],
  },
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 2,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Dzikir shalat beserta terjemah; praktik mandi & wirid; dalil-dalil thaharah (wudhu, mandi, tayammum) serta dalil adzan, iqamat, dan shalat.',
    units: [
      {
        kode: 'FQ-2.1',
        tujuan_pembelajaran: 'Memahami dalil-dalil seputar thaharah (wudhu, mandi, tayammum).',
        capaian_pembelajaran: [
          '3.1 Dalil wudhu (QS. Al-Maidah: 6), 3.2 Dalil mandi janabah (QS. Al-Maidah: 6, An-Nisa: 43), 3.3 Dalil tayammum (QS. Al-Maidah: 6).',
        ],
        materi_inti_dan_dalil: [
          'QS. Al-Maidah: 6 tentang perintah membasuh wajah, kedua tangan sampai siku, mengusap kepala, membasuh kaki sampai mata kaki; serta keringanan tayammum dengan tanah suci jika sakit, safar, atau tidak ada air.',
        ],
        halaman_dokumen: 'Hal. 66 (PDF hal. 32)',
      },
      {
        kode: 'FQ-2.2',
        tujuan_pembelajaran: 'Memahami dalil-dalil seputar adzan, iqamat, dan gerakan shalat.',
        capaian_pembelajaran: [
          '3.4 Dalil adzan & iqamat dari mimpi Abdullah bin Zaid (HR. Ahmad no. 16478 — suara Bilal lebih bagus), 3.6 Dalil shalat hadits al-musi\' shalatuhu (tuma\'ninah dalam ruku\', i\'tidal, sujud, duduk, serta wajib baca al-Fatihah setiap rakaat HR. Bukhari & Muslim no. 911).',
        ],
        materi_inti_dan_dalil: [
          'Tuma\'ninah (tenang sejenak sampai tulang kembali pada persendiannya) menjadi syarat sah setiap rukun gerakan shalat.',
        ],
        halaman_dokumen: 'Hal. 66–68 (PDF hal. 32–33)',
      },
    ],
  },
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 3,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Dalil tata cara praktik wudhu (hadits Humran) & tayammum (hadits Ammar bin Yasir), ketentuan rukun & sunnah gerakan shalat (takbir, ruku\', sujud, isyarat telunjuk, salam, dan sujud sahwi).',
    units: [
      {
        kode: 'FQ-3.1',
        tujuan_pembelajaran: 'Memahami dalil-dalil seputar urutan praktik wudhu dan tayammum.',
        capaian_pembelajaran: [
          "3.1 Urutan praktik wudhu (hadits Humran HR. Bukhari no. 164: cuci telapak tangan 3x, madlmadlah-istinsyaq-istintsar, wajah 3x, tangan hingga siku 3x, mengusap kepala 1x dari depan ke tengkuk lalu kembali ke depan + telinga HR. Abu Dawud, kaki hingga mata kaki 3x).",
          '3.2 Praktik tayammum (hadits Ammar bin Yasir HR. Bukhari no. 374: 1x tepukan ke tanah, tiup jika perlu, usap wajah dan telapak tangan kanan-kiri).',
        ],
        materi_inti_dan_dalil: [
          'Mengusap kepala dalam wudhu cukup 1 kali, dari depan ke belakang (tengkuk) lalu kembali ke depan (HR. Bukhari no. 185, Abu Dawud no. 115).',
          'Tayammum cukup 1 kali tepukan ke tanah untuk wajah dan telapak tangan (HR. Bukhari no. 338, 374).',
        ],
        halaman_dokumen: 'Hal. 68–70 (PDF hal. 33–34)',
      },
      {
        kode: 'FQ-3.2',
        tujuan_pembelajaran: 'Memahami dalil ketentuan syar\'i gerakan shalat, isyarat telunjuk, salam, dan sujud sahwi.',
        capaian_pembelajaran: [
          '4.1 Menjawab adzan & do\'a wasilah (HR. Muslim no. 875).',
          '4.2 Takbir mengangkat tangan sejajar bahu (4 posisi: takbiratul ihram, hendak ruku\', bangkit dari ruku\', bangkit dari rakaat kedua), ruku\' punggung rata, i\'tidal, sujud telapak tangan tidak dihamparkan seperti anjing/ujung jari menghadap kiblat, duduk iftirasy vs tawarruk (HR. Bukhari no. 828), isyarat telunjuk tasyahhud (Wa\'il bin Hujr menggerakkan & Abdullah bin Zubair tidak menggerakkan — dua-duanya shahih), salam menoleh kanan-kiri, dan sujud sahwi (pilih yang yakin/sedikit lalu sujud sahwi 2x sebelum salam).',
        ],
        materi_inti_dan_dalil: [
          'Sujud sahwi ketika ragu jumlah rakaat (misal 3 atau 4): buang yang ragu, tetapkan yang yakin (lebih sedikit), genapkan lalu sujud sahwi 2x sebelum salam (HR. Muslim no. 1300).',
          'Isyarat telunjuk saat tasyahhud: menurut PERSIS hadits menggerakkan (HR. Nasa\'i no. 889) dan tidak menggerakkan (HR. Abu Dawud no. 991) keduanya shahih karena menggambarkan waktu berbeda.',
        ],
        halaman_dokumen: 'Hal. 70–74 (PDF hal. 34–36)',
      },
    ],
  },
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 4,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Fiqih shalat berjama'ah, shalat Jum'at, shalat Rawatib, shalat tahiyyatul-masjid, shalat syukrul-wudlu, dan shalat jenazah.",
    units: [
      {
        kode: 'FQ-4.1',
        tujuan_pembelajaran: "Memahami dalil-dalil seputar fiqih shalat berjama'ah dan shalat Jum'at.",
        capaian_pembelajaran: [
          "3.1–3.3 Shalat berjama'ah 27 derajat lebih utama (HR. Bukhari no. 649), makmum wajib mengikuti imam & tidak mendahului (HR. Abu Dawud no. 603), meluruskan & merapatkan shaf (HR. Abu Dawud no. 666-667).",
          "4.1–4.5 Shalat Jum'at wajib bagi muslim kecuali 4 golongan: hamba sahaya, perempuan, anak kecil, orang sakit (HR. Abu Dawud no. 1069), serta musafir boleh tidak Jum'atan/qashar namun jika bermakmum pada muqim harus tamam (tidak qashar). Keutamaan datang awal (unta, sapi, domba, ayam, telur), mandi & sunnah Jum'at, dilarang menyela dua orang & mengobrol saat khutbah (fa qad laghauta), shalat tahiyyatul-masjid 2 rakaat ringkas meski imam sudah khutbah, shalat sunat ba'da Jum'at 2 rakaat (di rumah) atau 4 rakaat (di masjid).",
        ],
        materi_inti_dan_dalil: [
          'صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً (HR. Bukhari no. 649).',
          'الْجُمُعَةُ حَقٌّ وَاجِبٌ عَلَى كُلِّ مُسْلِمٍ فِي جَمَاعَةٍ إِلَّا أَرْبَعَةً: عَبْدٌ مَمْلُوكٌ، وَامْرَأَةٌ، وَصَبِيٌّ، وَمَرِيضٌ (HR. Abu Dawud no. 1069).',
          'إِذَا قُلْتَ لِصَاحِبِكَ يَوْمَ الْجُمُعَةِ أَنْصِتْ وَالْإِمَامُ يَخْطُبُ فَقَدْ لَغَوْتَ (HR. Bukhari no. 934).',
        ],
        halaman_dokumen: 'Hal. 74–78 (PDF hal. 36–38)',
      },
      {
        kode: 'FQ-4.2',
        tujuan_pembelajaran: 'Memahami dalil shalat Rawatib, tahiyyatul-masjid, syukrul-wudlu, dan shalat jenazah.',
        capaian_pembelajaran: [
          '5.1–5.3 Rawatib muakkadah 10 rakaat (HR. Bukhari no. 1180) atau 12 rakaat dengan qabla zhuhur 4 rakaat (HR. Tirmidzi no. 415); shalat sunat antara adzan dan iqamat (HR. Bukhari).',
          '6.1 Tahiyyatul-masjid 2 rakaat sebelum duduk (HR. Muslim no. 1688).',
          '7.1 Syukrul-wudlu 2 rakaat setiap selesai wudhu (kisah Bilal HR. Tirmidzi no. 3689).',
          '8.1–8.2 Shalat jenazah: 4 takbir diakhiri salam tanpa ruku\' dan sujud; urutan bacaan (fatwa Imam an-Nawawi: takbir 1 Al-Fatihah, takbir 2 shalawat, takbir 3 do\'a umum/khusus, takbir 4 do\'a lalu salam).',
        ],
        materi_inti_dan_dalil: [
          'إِذَا دَخَلَ أَحَدُكُمُ الْمَسْجِدَ فَلَا يَجْلِسْ حَتَّى يَرْكَعَ رَكْعَتَيْنِ (HR. Muslim no. 1688).',
          'بَيْنَ كُلِّ أَذَانَيْنِ صَلَاةٌ (HR. Bukhari).',
          'Shalat jenazah 4 takbir tanpa ruku\' dan sujud (HR. Bukhari no. 1333).',
        ],
        halaman_dokumen: 'Hal. 78–81 (PDF hal. 38–40)',
      },
    ],
  },
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 5,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Fiqih shalat malam (maksimal 11 rakaat, witir 1/3/5 rakaat), shalat dluha (minimal 2 rakaat), shalat musafir (jama' & qashar, batas 19 hari), dan shalat 'Id.",
    units: [
      {
        kode: 'FQ-5.1',
        tujuan_pembelajaran: 'Memahami dalil-dalil seputar fiqih shalat malam dan shalat dluha.',
        capaian_pembelajaran: [
          '3.1–3.5 Shalat malam sangat dianjurkan; formasi rakaat genap + witir ganjil maksimal 11 rakaat (HR. Bukhari no. 2013); witir boleh 1, 3, atau 5 rakaat (HR. Abu Dawud no. 1422); bagi yang khawatir tidak bangun akhir malam dianjurkan witir di awal malam (HR. Muslim no. 1802).',
          '4.1–4.2 Shalat dluha sejak matahari terbit hingga menjelang zhuhur, waktu afdhal saat anak unta kepanasan; minimal 2 rakaat, boleh 4 atau lebih (HR. Muslim no. 1698, 1780).',
        ],
        materi_inti_dan_dalil: [
          'مَا كَانَ يَزِيدُ فِي رَمَضَانَ وَلَا فِي غَيْرِهِ عَلَى إِحْدَى عَشْرَةَ رَكْعَةً (HR. Bukhari no. 2013).',
          'صَلَاةُ الْأَوَّابِينَ حِينَ تَرْمَضُ الْفِصَالُ (HR. Muslim no. 1780).',
        ],
        halaman_dokumen: 'Hal. 81–83 (PDF hal. 40–41)',
      },
      {
        kode: 'FQ-5.2',
        tujuan_pembelajaran: "Memahami dalil-dalil seputar fiqih shalat musafir dan shalat 'Id.",
        capaian_pembelajaran: [
          "5.1–5.4 Safar keluar kota/negeri boleh qashar (4 rakaat menjadi 2 rakaat, sejak jarak ±4,8 km / 3 mil atau 3 farsakh HR. Muslim no. 1615) dan jama' taqdim/ta'khir (Zhuhur-Ashar, Maghrib-Isya). Batas menetap safar maksimal 19 hari; jika >19 hari shalat tamam (HR. Bukhari no. 1080).",
          "6.1–6.2 Shalat 'Id 2 rakaat (takbir 7x rakaat 1, 5x rakaat 2 sebelum Al-Fatihah HR. Abu Dawud no. 1153), di mushalla (lapang), bertakbir sepanjang jalan, makan sebelum 'Idul Fithri & tidak makan sebelum 'Idul Adha, berjalan kaki, membedakan jalan pergi dan pulang.",
        ],
        materi_inti_dan_dalil: [
          'فَإِنْ سَافَرْنَا بِتِسْعَةَ عَشَرَ قَصَرْنَا وَإِنْ زِدْنَا أَتْمَمْنَا (HR. Bukhari no. 1080).',
          'التَّكْبِيرُ فِي الْفِطْرِ سَبْعٌ فِي الْأُولَى وَخَمْسٌ فِي الْآخِرَةِ وَالْقِرَاءَةُ بَعْدَهُمَا كِلْتَيْهِمَا (HR. Abu Dawud no. 1153).',
        ],
        halaman_dokumen: 'Hal. 84–86 (PDF hal. 41–42)',
      },
    ],
  },
  {
    subject_id: 'fiqih',
    mata_pelajaran: 'Fiqih',
    kelas: 6,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Dzikir manasik haji/umrah; dalil zakat (simpanan, perhiasan, perdagangan, pertanian, peternakan), infaq, shadaqah, waqaf; dalil shaum wajib & sunat; manasik haji & umrah.',
    units: [
      {
        kode: 'FQ-6.1',
        tujuan_pembelajaran: 'Memahami dalil-dalil seputar fiqih zakat, infaq, shadaqah, dan waqaf.',
        capaian_pembelajaran: [
          '3.1 Zakat wajib: zakat mal & zakat fithri (QS. Al-Baqarah: 43).',
          '3.2 Zakat mal: simpanan (nishab 20 dinar / 85 gr emas, haul 1 tahun, kadar 2,5% HR. Abu Dawud no. 1575), perhiasan emas (HR. Abu Dawud no. 1565), perdagangan (HR. Abu Dawud no. 1564), pertanian (nishab 5 wasaq / 650 kg; irigasi alami/hujan 10%, irigasi berbiaya/usaha 5% HR. Muslim no. 2319), peternakan (kambing 40–120 ekor zakatnya 1 ekor HR. Bukhari no. 1454).',
          '3.3–3.5 Infaq wajib diatur pemimpin muslim (QS. Al-Baqarah: 267), shadaqah sunat lebih dari kebutuhan dimulai dari keluarga (HR. Bukhari no. 1426), waqaf harta diabadikan tidak dijual/dihibahkan/diwariskan (hadits Umar HR. Bukhari no. 2737).',
        ],
        materi_inti_dan_dalil: [
          'لَيْسَ فِيمَا دُونَ خَمْسَةِ أَوْسُقٍ صَدَقَةٌ (HR. Bukhari no. 1447); فِيمَا سَقَتِ السَّمَاءُ... الْعُشْرُ وَفِيمَا سُقِيَ بِالنَّضْحِ نِصْفُ الْعُشْرِ (HR. Muslim no. 2319).',
          'Waqaf Umar bin Khaththab: لَا يُبَاعُ وَلَا يُوهَبُ وَلَا يُورَثُ (HR. Bukhari no. 2737).',
        ],
        halaman_dokumen: 'Hal. 87–89 (PDF hal. 43–44)',
      },
      {
        kode: 'FQ-6.2',
        tujuan_pembelajaran: 'Memahami dalil fiqih shaum serta fiqih & manasik haji dan umrah.',
        capaian_pembelajaran: [
          '4.1–4.7 Shaum wajib Ramadhan (QS. Al-Baqarah: 187, HR. Bukhari no. 1891), shaum sunat: 6 hari Syawwal (HR. Muslim no. 2815), \'Arafah 9 Dzulhijjah (hapus dosa 1 tahun lalu & akan datang), Tasu\'a-Asyura 9-10 Muharram (hapus dosa 1 tahun lalu HR. Muslim no. 2803), Senin-Kamis (HR. Ahmad no. 20758), Ayyamul-bidl 13-14-15 (HR. Nasa\'i no. 2422).',
          '5.1–5.4 Haji & Umrah wajib (QS. Al-Baqarah: 196); rukun umrah (ihram, thawaf, shalat di Maqam Ibrahim, sa\'i, tahallul); rangkaian haji 8-13 Dzulhijjah (ihram, tarwiyah Mina, wukuf Arafah, mabit Muzdalifah, lempar jamrah \'Aqabah, hadyu, tahallul, thawaf ifadlah, mabit Mina & lempar jamarat 3 hari).',
        ],
        materi_inti_dan_dalil: [
          'مَنْ صَامَ رَمَضَانَ ثُمَّ أَتْبَعَهُ سِتًّا مِنْ شَوَّالٍ كَانَ كَصِيَامِ الدَّهْرِ (HR. Muslim no. 2815-2817).',
          'صِيَامُ يَوْمِ عَرَفَةَ أَحْتَسِبُ عَلَى اللّٰهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ وَالسَّنَةَ الَّتِي بَعْدَهُ (HR. Muslim no. 2803).',
        ],
        halaman_dokumen: 'Hal. 90–91 (PDF hal. 44–45)',
      },
    ],
  },

  // ==================== 5. SIRAH NABAWIYAH (KELAS 3 - 6) ====================
  {
    subject_id: 'sirah_nabawiyah',
    mata_pelajaran: 'Sirah Nabawiyah',
    kelas: 3,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Keluarga dan lingkungan Nabi Muhammad saw dari kelahiran hingga kenabian (yatim, masa kecil, penyematan Al-Amin, akhlaq mulia di tengah masyarakat jahiliyyah).',
    units: [
      {
        kode: 'SN-3.1',
        tujuan_pembelajaran: 'Menjelaskan keluarga dan lingkungan Nabi Muhammad saw dari kelahiran sampai kenabian.',
        capaian_pembelajaran: [
          '1) Silsilah keturunan dan kelahiran Nabi Muhammad saw.',
          '2) Pengasuhan Nabi saw dalam keadaan yatim, ditinggal ibunda Aminah dan kakeknya Abdul Muthalib.',
          '3) Masa kecil Nabi saw dan kesaksian pendeta Syam atas ciri-ciri kenabiannya.',
          '4) Kehidupan masa muda hingga menikah dengan Khadijah.',
          '5) Penyematan sebutan Al-Amin sampai diangkat menjadi Nabi.',
        ],
        materi_inti_dan_dalil: [
          'Menanamkan nilai akhlaq mulia, bermental baja, mandiri, dan menjauhi kemaksiatan meski hidup di tengah masyarakat jahiliyyah.',
        ],
        halaman_dokumen: 'Hal. 91–92 (PDF hal. 45)',
      },
    ],
  },
  {
    subject_id: 'sirah_nabawiyah',
    mata_pelajaran: 'Sirah Nabawiyah',
    kelas: 4,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      'Sirah dakwah Nabi saw dari kenabian hingga hijrah ke Madinah beserta strategi bertahan dan mencari peluang baru tanpa konfrontasi prematur.',
    units: [
      {
        kode: 'SN-4.1',
        tujuan_pembelajaran: 'Menjelaskan sirah dakwah Nabi saw dari mulai kenabian hingga hijrah.',
        capaian_pembelajaran: [
          '1–4) Permulaan turun wahyu, dakwah sembunyi-sembunyi & terang-terangan, assabiqunal awwalun, penentangan kaum kafir.',
          '5–9) Diplomasi kaum kafir, hijrah ke Habasyah (Najasyi masuk Islam), masuk Islamnya Umar & Hamzah, pemboikotan ekonomi, tahun kesedihan (wafatnya Khadijah & Abu Thalib).',
          "10–14) Hijrah ke Thaif yang ditolak, Isra Mi'raj, dakwah ke luar Makkah, Bai'at 'Aqabah I & II, Hijrah ke Madinah.",
        ],
        materi_inti_dan_dalil: [
          'Ibrah dakwah: bersabar mencari peluang & lahan baru jika jalan dakwah tidak mungkin dilanjutkan; sepanjang kekuatan politik dan militer belum dimiliki tidak boleh memilih konfrontasi yang mematikan dakwah.',
        ],
        halaman_dokumen: 'Hal. 92 (PDF hal. 45)',
      },
    ],
  },
  {
    subject_id: 'sirah_nabawiyah',
    mata_pelajaran: 'Sirah Nabawiyah',
    kelas: 5,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Perjuangan Nabi saw dari hijrah ke Madinah hingga Perang Khandaq, membangun Masjid Nabawi, muakhat, perjanjian Madinah, Badr, Uhud, hingga Khandaq.",
    units: [
      {
        kode: 'SN-5.1',
        tujuan_pembelajaran: 'Menjelaskan sirah perjuangan Nabi saw dari hijrah ke Madinah sampai perang Khandaq.',
        capaian_pembelajaran: [
          "1–2) Pembangunan Masjid Nabawi, muakhat (persaudaraan Muhajirin-Anshar), Piagam/perjanjian Madinah, awal syari'at adzan, sikap Yahudi & Munafiq.",
          "3–5) Perang Badar, Qainuqa' (2 H); Tasyri' perpindahan qiblat, shaum Ramadhan, zakat fithri, zakat mal, shalat 'Idain; Perang Uhud, Hamra al-Asad, Bi'r Ma'unah (3 H).",
          '6–7) Perang Bani Nadhir (4 H); Perang Banil-Musthaliq, haditsul-ifki, perang Khandaq, Bani Quraizhah, dan turunnya ayat hijab.',
        ],
        materi_inti_dan_dalil: [
          'Ibrah: pentingnya persatuan umat yang didasari tauhid dan bersih dari hubbud-dunya (cinta dunia), karena jihad hanya tegak di atas landasan tersebut.',
        ],
        halaman_dokumen: 'Hal. 93 (PDF hal. 46)',
      },
    ],
  },
  {
    subject_id: 'sirah_nabawiyah',
    mata_pelajaran: 'Sirah Nabawiyah',
    kelas: 6,
    jam_per_pekan: 1,
    jam_per_tahun: 32,
    standar_isi_ringkas:
      "Perjuangan Nabi saw dari pasca Khandaq hingga kewafatan (Hudaibiyah, Khaibar, Mu'tah, Fathu Makkah, Hunain, Tabuk, Haji Wada') beserta nilai keteguhan dan strategi.",
    units: [
      {
        kode: 'SN-6.1',
        tujuan_pembelajaran: 'Menjelaskan sirah perjuangan Nabi saw dari sejak perang Khandaq sampai kewafatannya.',
        capaian_pembelajaran: [
          "1–3) Perjanjian Hudaibiyyah & Bai'at Ridlwan; Perang Khaibar, Fadak, surat dakwah ke raja-raja (7 H); Perang Mu'tah, Fathu Makkah, Hunain, Thaif (8 H).",
          "4–7) Perang Tabuk, pembongkaran kedok munafiq & masjid dlirar (9 H); Penyebaran da'i & Haji Wada' (10 H); Sakit dan kewafatan Rasul saw; Sosok kepribadian & profil keluarga Nabi saw.",
        ],
        materi_inti_dan_dalil: [
          'Nilai keteguhan dalam perjuangan, tahapan membangun kekuatan politik, keahlian diplomasi, strategi militer pertahanan, serta iman dan nifaq diukur dari kesanggupan berjihad fi sabilillah.',
        ],
        halaman_dokumen: 'Hal. 93 (PDF hal. 46)',
      },
    ],
  },

  // ==================== 6. BAHASA ARAB (KELAS 1 - 6) ====================
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 1,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Imla' huruf hijaiyyah tunggal; mufradat & hiwar ta'aruf, bilangan 1–10, warna, anggota badan, buah-buahan, sayuran; serta isim isyarah هٰذَا dan هٰذِهِ.",
    units: [
      {
        kode: 'BA-1.1',
        tujuan_pembelajaran: "Membaca/menulis huruf tunggal, menguasai mufradat/hiwar dasar, dan mengucapkan هٰذَا serta هٰذِهِ.",
        capaian_pembelajaran: [
          '1.1 Membaca dan menulis huruf-huruf hijaiyyah bentuk tunggal.',
          "2.1–2.2 Menghafal & berhiwar mufradat ta'aruf, bilangan 1–10, warna, anggota badan, buah-buahan, dan sayuran.",
          '3.1 Mengucapkan هٰذَا (mudzakkar) dan هٰذِهِ (muannats) dengan tepat sesuai jenis isimnya.',
        ],
        materi_inti_dan_dalil: [
          "Isim Isyarah Qarib: هٰذَا untuk kata benda laki-laki (tanpa ta marbuthah, misal هٰذَا رَأْسٌ / قَلَمٌ) dan هٰذِهِ untuk perempuan (bertanda ة, misal هٰذِهِ عَيْنٌ / تُفَّاحَةٌ).",
        ],
        halaman_dokumen: 'Hal. 94 (PDF hal. 46)',
      },
    ],
  },
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 2,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Imla' huruf hijaiyyah sambung; mufradat & hiwar pakaian, hewan, perkakas rumah, keluarga, bilangan 1–20; serta membedakan isim mudzakkar dan muannats.",
    units: [
      {
        kode: 'BA-2.1',
        tujuan_pembelajaran: 'Menulis huruf sambung, hiwar seputar lingkungan rumah/keluarga, serta mengenal mudzakkar dan muannats.',
        capaian_pembelajaran: [
          '1.1 Membaca dan menulis huruf-huruf hijaiyyah bentuk sambung.',
          "2.1–2.2 Mufradat & hiwar seputar ta'aruf, warna, bilangan 1–20, pakaian, hewan, perkakas rumah, dan keluarga.",
          '3.1 Mengenal isim-isim mudzakkar dan muannats.',
        ],
        materi_inti_dan_dalil: [
          'Ciri dasar muannats (ta marbuthah ة atau makna perempuan seperti أُمٌّ) vs mudzakkar (أَبٌ، قَمِيْصٌ، كُرْسِيٌّ).',
        ],
        halaman_dokumen: 'Hal. 94 (PDF hal. 46)',
      },
    ],
  },
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 3,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Menulis huruf sambung awal-tengah-akhir; hiwar kegiatan belajar/rumah/profesi/pasar/waktu; nahwu mufrad-mutsanna-jama' serta fi'il fa'il dan mubtada' khabar.",
    units: [
      {
        kode: 'BA-3.1',
        tujuan_pembelajaran: 'Menguasai qiraah, hiwar keseharian, serta struktur dasar nahwu.',
        capaian_pembelajaran: [
          '1.1–1.2 Membaca qira\'ah fasih dan menulis huruf sambung awal, tengah, akhir.',
          '2.1–2.2 Hiwar & ta\'bir: kegiatan belajar, kegiatan di rumah, silsilah keluarga, harta, perkakas, profesi, pertemanan, bilangan, pasar, waktu, arah mata angin, liburan.',
          "3.1–3.2 Mengenal isim mufrad (tunggal), mutsanna (dua: +ان/ين), dan jama' (banyak); serta struktur sederhana fi'il fa'il dan mubtada' khabar.",
        ],
        materi_inti_dan_dalil: [
          "Perubahan jumlah isim: Mufrad (طَالِبٌ), Mutsanna (طَالِبَانِ), Jama' (طُلَّابٌ / مُسْلِمُوْنَ).",
          "Jumlah Fi'liyyah (فِعْلٌ + فَاعِلٌ) dan Jumlah Ismiyyah (مُبْتَدَأٌ + خَبَرٌ).",
        ],
        halaman_dokumen: 'Hal. 94–95 (PDF hal. 46–47)',
      },
    ],
  },
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 4,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Hiwar makanan, hobi, belanja, umrah; nahwu fi'il-fa'il-maf'ul bih, mubtada'-khabar, isim tafdlil, fi'il ta'ajjub; sharaf tashrif dlamir rafa' & nashab munfashil serta muttashil.",
    units: [
      {
        kode: 'BA-4.1',
        tujuan_pembelajaran: "Menguasai hiwar tematik, struktur kalimat (maf'ul bih, isim tafdlil, fi'il ta'ajjub), dan tashrif dlamir.",
        capaian_pembelajaran: [
          '2.1–2.2 Hiwar & ta\'bir: makanan, minuman, bentuk, tempat tinggal, akhir pekan, permainan, hobi, belanja, hewan, udara, bepergian, Indonesia, umrah.',
          "3.1–3.2 Struktur fi'il fa'il maf'ul bih, mubtada' khabar, isim tafdlil (أَفْعَلُ), dan fi'il ta'ajjub (مَا أَفْعَلَهُ).",
          "4.1–4.2 Hafal tashrif dlamir rafa' & nashab munfashil (هُوَ.. إِيَّاهُ..) dan dlamir nashab muttashil (ـهُ، ـهَا، ـكَ، ـنِي).",
        ],
        materi_inti_dan_dalil: [
          "Isim Tafdlil berwazan أَفْعَلُ (contoh: أَكْبَرُ, أَجْمَلُ) dan Ta'ajjub (مَا أَجْمَلَ السَّمَاءَ!).",
          "Dlamir munfashil rafa' (هُوَ هُمَا هُمْ...) dan nashab (إِيَّاهُ إِيَّاهُمَا إِيَّاهُمْ...).",
        ],
        halaman_dokumen: 'Hal. 95 (PDF hal. 47)',
      },
    ],
  },
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 5,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Imla' alif layyinah & hamzah washal/qath'i; hiwar transportasi, internet, jual beli online; nahwu jar-majrur & mudlaf-mudlaf ilaih; sharaf dlamir jarr bil-harfi & bil-idlafah.",
    units: [
      {
        kode: 'BA-5.1',
        tujuan_pembelajaran: "Menguasai kaidah imla' alif layyinah/hamzah, struktur jar majrur & idlafah, serta tashrif dlamir jarr.",
        capaian_pembelajaran: [
          "1.2 Menulis alif layyinah, hamzah awal-tengah-akhir, hamzah washal, hamzah qath'i, hamzah di atas alif, wawu, ya, dan berdiri sendiri.",
          '2.1–2.2 Hiwar: bahasa Arab, lalu lintas, SPBU, kereta, pesawat, hotel, taman buah, mall, bank, kuliah, sepakbola, internet, media sosial, jual beli online.',
          "3.1 Struktur fi'il-fa'il-maf'ul bih, mubtada'-khabar, jar-majrur, mudlaf-mudlaf ilaih.",
          '4.1–4.3 Tashrif dlamir rafa\'/nashab munfashil, nashab muttashil, serta dlamir jarr bil-harfi (لَهُ، بِهِ، مِنْهُ) & bil-idlafah (كِتَابُهُ).',
        ],
        materi_inti_dan_dalil: [
          'Kaidah penulisan hamzah washal vs hamzah qath\'i dan alif layyinah (ى / ا).',
          'Idlafah (مُضَافٌ + مُضَافٌ إِلَيْهِ) dimana mudlaf tidak bertanwin dan mudlaf ilaih berharakat majrur (كِتَابُ الطَّالِبِ).',
        ],
        halaman_dokumen: 'Hal. 95–96 (PDF hal. 47)',
      },
    ],
  },
  {
    subject_id: 'bahasa_arab',
    mata_pelajaran: 'Bahasa Arab',
    kelas: 6,
    jam_per_pekan: 2,
    jam_per_tahun: 64,
    standar_isi_ringkas:
      "Hiwar isu kontemporer (kuliah online, Islam di Indonesia, global warming, anti-terorisme, adab medsos, revolusi teknologi); nahwu 'athaf-ma'thuf & shifat-maushuf; sharaf fi'il madli, mudlari', amr, nahyi.",
    units: [
      {
        kode: 'BA-6.1',
        tujuan_pembelajaran: "Menguasai hiwar kontemporer, struktur 'athaf-ma'thuf & shifat-maushuf, serta tashrif fi'il dan dlamir muttashilnya.",
        capaian_pembelajaran: [
          '2.1–2.2 Hiwar & ta\'bir: kuliah online, masa muda, 7 keajaiban dunia, Islam di Indonesia, pernikahan, kesehatan, pahlawan Islam, global warming, bencana alam, pemerintahan, bahaya gadget, kontraterorisme, adab medsos, revolusi teknologi, masa depan.',
          "3.1 Struktur fi'il-fa'il-maf'ul bih, mubtada'-khabar, jar-majrur, mudlaf-mudlaf ilaih, 'athaf-ma'thuf, shifat-maushuf.",
          "4.1–4.2 Tashrif fi'il madli, mudlari', amr, dan nahyi serta dlamir rafa' muttashil di dalamnya.",
        ],
        materi_inti_dan_dalil: [
          "Shifat-Maushuf harus selaras dalam 4 hal (jenis, bilangan, ma'rifat/nakirah, i'rab), misal الطَّالِبُ الْمُجْتَهِدُ.",
          "Tashrif Fi'il Madli (كَتَبَ), Mudlari' (يَكْتُبُ), Amr (اُكْتُبْ), dan Nahyi (لَا تَكْتُبْ) beserta dlamir rafa' muttashil (كَتَبْتُ، كَتَبْنَا، يَكْتُبُونَ).",
        ],
        halaman_dokumen: 'Hal. 96 (PDF hal. 47)',
      },
    ],
  },
];

export function getSubjectsForGrade(grade: GradeLevel): SubjectGradeCurriculum[] {
  return CURRICULUM_DATA.filter((item) => item.kelas === grade);
}

export function getCurriculumForGradeSubject(
  grade: GradeLevel,
  subjectId: SubjectId
): SubjectGradeCurriculum | undefined {
  return CURRICULUM_DATA.find(
    (item) => item.kelas === grade && item.subject_id === subjectId
  );
}
