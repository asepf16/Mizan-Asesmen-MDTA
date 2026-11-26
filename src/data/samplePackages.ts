import type { AssessmentPackage } from '../types/assessment';

export const SAMPLE_PACKAGES: AssessmentPackage[] = [
  {
    metadata: {
      id: 'pkg-fiqih-4-pas',
      judul_paket: 'Penilaian Sumatif Akhir Semester — Fiqih Kelas 4 Ula',
      jenjang: 'Diniyah Ula',
      kelas: 4,
      fase_asesmen: 'AKM_MENENGAH_HOTS',
      mata_pelajaran: 'Fiqih',
      subject_id: 'fiqih',
      semester: 'Ganjil / Genap (Sumatif)',
      tahun_ajaran: '2026/2027',
      alokasi_waktu_menit: 60,
      sumber_kurikulum_resmi:
        'Kurikulum Madrasah Diniyah Persatuan Islam (Diniyah Ula Kelas 4 · Hal. 74–81)',
      tanggal_disusun: '2026-11-26',
    },
    kisi_kisi: [
      {
        no_urut: 1,
        kode_tp: 'FQ-4.1',
        tujuan_pembelajaran:
          "Memahami dalil-dalil seputar fiqih shalat berjama'ah dan shalat Jum'at.",
        capaian_pembelajaran:
          "4.1 Memahami dalil kewajiban shalat Jum'at bagi laki-laki dewasa dan pengecualian hamba sahaya, perempuan, anak kecil, orang sakit, serta musafir.",
        indikator_soal:
          'Disajikan studi kasus perjalanan safar yang melewati waktu Jum\'at, santri dapat menganalisis hukum kewajiban shalat Jum\'at dan ketentuan shalat berjama\'ah bersama imam muqim berdasarkan dalil kurikulum MDTA PERSIS.',
        bentuk_soal: 'pg_biasa',
        level_kognitif: 'C4_Menganalisis',
        nomor_soal: 1,
        sumber_kurikulum: 'Hal. 76 (PDF hal. 37) · Hadits Abu Dawud no. 1069 & Musafir',
      },
      {
        no_urut: 2,
        kode_tp: 'FQ-4.1',
        tujuan_pembelajaran:
          "Memahami dalil-dalil seputar fiqih shalat berjama'ah dan shalat Jum'at.",
        capaian_pembelajaran:
          "4.4–4.5 Memahami sunnah sebelum shalat Jum'at, shalat tahiyyatul masjid ketika imam berkhutbah, serta larangan berbicara saat khutbah.",
        indikator_soal:
          'Disajikan petikan hadits dan situasi di masjid saat khatib sudah naik mimbar, santri dapat memilih lebih dari satu tindakan yang sesuai dengan sunnah Rasulullah saw.',
        bentuk_soal: 'pg_kompleks_centang',
        level_kognitif: 'C4_Menganalisis',
        nomor_soal: 2,
        sumber_kurikulum: 'Hal. 76–78 (PDF hal. 37–38) · Hadits Bukhari no. 934 & Muslim no. 2061',
      },
      {
        no_urut: 3,
        kode_tp: 'FQ-4.2',
        tujuan_pembelajaran:
          'Memahami dalil-dalil seputar fiqih shalat Rawatib, tahiyyatul-masjid, syukrul-wudlu, dan shalat jenazah.',
        capaian_pembelajaran:
          '5.1–8.2 Memahami bilangan rakaat shalat Rawatib muakkadah, tata cara shalat jenazah tanpa ruku dan sujud, serta urutan bacaannya.',
        indikator_soal:
          'Disajikan tabel pernyataan seputar ketentuan shalat Rawatib, tahiyyatul-masjid, dan shalat jenazah, santri dapat mengevaluasi kebenaran tiap pernyataan sesuai dalil.',
        bentuk_soal: 'pg_kompleks_benar_salah',
        level_kognitif: 'C5_Mengevaluasi',
        nomor_soal: 3,
        sumber_kurikulum: 'Hal. 78–80 (PDF hal. 38–39) · Fiqih Kelas 4',
      },
      {
        no_urut: 4,
        kode_tp: 'FQ-4.1',
        tujuan_pembelajaran:
          "Memahami dalil-dalil seputar fiqih shalat berjama'ah, Rawatib, dan shalat jenazah.",
        capaian_pembelajaran:
          'Menghubungkan konsep ibadah sunnah dan jama\'ah dengan petikan dalil hadits shahih yang tepat.',
        indikator_soal:
          'Santri dapat menjodohkan empat konsep ibadah Fiqih Kelas 4 dengan nash hadits Arab yang sesuai dari dokumen kurikulum.',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C4_Menganalisis',
        nomor_soal: 4,
        sumber_kurikulum: 'Hal. 75–79 (PDF hal. 37–39) · Hadits Bukhari & Muslim',
      },
      {
        no_urut: 5,
        kode_tp: 'FQ-4.2',
        tujuan_pembelajaran:
          'Memahami dalil-dalil seputar fiqih shalat berjama\'ah dan shalat jenazah.',
        capaian_pembelajaran:
          "3.2 Kewajiban makmum mengikuti imam, tidak mendahului, serta 8.1–8.2 tata cara shalat jenazah.",
        indikator_soal:
          'Disajikan kasus kekeliruan tata cara shalat jenazah dan adab makmum, santri dapat mengevaluasi kesalahan tersebut beserta argumen dalilnya.',
        bentuk_soal: 'uraian_berargumen',
        level_kognitif: 'C5_Mengevaluasi',
        nomor_soal: 5,
        sumber_kurikulum: 'Hal. 75 & 79–80 (PDF hal. 37 & 39) · Hadits Abu Dawud no. 603 & Baihaqi no. 6959',
      },
    ],
    butir_soal: [
      {
        nomor: 1,
        kode_tp: 'FQ-4.1',
        bentuk_soal: 'pg_biasa',
        level_kognitif: 'C4_Menganalisis',
        stimulus_konteks:
          'Pada hari Jum\'at, Ridwan (santri kelas 4 Ula yang sudah baligh) bersama ayahnya melakukan perjalanan safar dari Bandung menuju Yogyakarta. Ketika masuk waktu Zhuhur di sebuah masjid peristirahatan, khatib sudah hampir selesai khutbah dan mereka memutuskan ikut shalat Jum\'at berjama\'ah bersama imam yang berstatus penduduk setempat (muqim).',
        stimulus_arab:
          'الْجُمُعَةُ حَقٌّ وَاجِبٌ عَلَى كُلِّ مُسْلِمٍ فِي جَمَاعَةٍ إِلَّا أَرْبَعَةً: عَبْدٌ مَمْلُوكٌ، وَامْرَأَةٌ، وَصَبِيٌّ، وَمَرِيضٌ',
        stimulus_sumber: 'HR. Abu Dawud bab al-jumu\'ah lil-mamluk wal-mar\'ah no. 1069 (Hal. 76)',
        pertanyaan:
          'Berdasarkan hadits dan keterangan fiqih pada kurikulum MDTA PERSIS, analisis hukum yang tepat mengenai keadaan ayah Ridwan (sebagai musafir) saat mengikuti shalat bersama imam muqim adalah...',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Wajib shalat Jum\'at tanpa keringanan apa pun, dan jika ketinggalan khutbah shalatnya tidak sah.',
            benar: false,
          },
          {
            kode: 'B',
            teks: 'Tidak ada kewajiban shalat Jum\'at baginya karena berstatus musafir (boleh Zhuhur qashar), namun bila bermakmum pada imam muqim wajib shalat tamam (tidak mengqashar).',
            benar: true,
          },
          {
            kode: 'C',
            teks: 'Boleh bermakmum pada shalat Jum\'at lalu langsung salam pada rakaat pertama karena berhak atas qashar.',
            benar: false,
          },
          {
            kode: 'D',
            teks: 'Tetap wajib shalat Jum\'at dua kali sebagai pengganti status musafir dan penduduk setempat.',
            benar: false,
          },
        ],
        kunci_jawaban: 'B',
        pembahasan_syariat:
          'Merujuk Kurikulum Fiqih Kelas 4 hal. 76: selain 4 golongan pada hadits Abu Dawud no. 1069 (hamba sahaya, perempuan, anak kecil, orang sakit), musafir juga tidak memiliki kewajiban shalat Jum\'at (boleh menggantinya dengan Zhuhur qashar). Akan tetapi, jika musafir bermakmum kepada imam yang muqim, ia tetap wajib mengikuti shalat secara tamam (sempurna tanpa qashar).',
        skor_maksimal: 20,
      },
      {
        nomor: 2,
        kode_tp: 'FQ-4.1',
        bentuk_soal: 'pg_kompleks_centang',
        level_kognitif: 'C4_Menganalisis',
        stimulus_konteks:
          'Ahmad tiba di masjid saat imam sudah berada di atas mimbar menyampaikan khutbah Jum\'at. Di shaf depan, dua temannya tampak berbisik. Ahmad melihat ada celah kosong di barisan depan dan ia langsung menegur temannya dengan berkata "Diamlah!" sebelum mengerjakan shalat.',
        stimulus_arab:
          'إِذَا قُلْتَ لِصَاحِبِكَ يَوْمَ الْجُمُعَةِ أَنْصِتْ وَالْإِمَامُ يَخْطُبُ فَقَدْ لَغَوْتَ',
        stimulus_sumber: 'Shahih al-Bukhari bab al-inshat yaumal-jumu\'ah no. 934 (Hal. 77)',
        pertanyaan:
          'Centanglah (pilih lebih dari satu) tindakan yang SEHARUSNYA dilakukan Ahmad agar sesuai dengan tuntunan sunnah shalat Jum\'at!',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Tetap mengerjakan shalat tahiyyatul-masjid sebanyak dua rakaat dengan ringkas meskipun imam sedang berkhutbah.',
            benar: true,
          },
          {
            kode: 'B',
            teks: 'Menegur teman yang mengobrol dengan ucapan "Diamlah!" agar khutbah kembali tenang.',
            benar: false,
          },
          {
            kode: 'C',
            teks: 'Segera diam dan menyimak khutbah tanpa mengobrol serta tidak melangkahi atau memisahkan dua orang yang sedang duduk.',
            benar: true,
          },
          {
            kode: 'D',
            teks: 'Setelah shalat Jum\'at selesai, mengerjakan shalat sunat ba\'da Jum\'at dua rakaat di rumah atau empat rakaat di masjid.',
            benar: true,
          },
        ],
        kunci_jawaban: 'A, C, D',
        kunci_array: ['A', 'C', 'D'],
        pembahasan_syariat:
          'Berdasarkan hal. 76–78: (A) benar sesuai HR. Muslim no. 2061 tentang tahiyyatul masjid 2 rakaat ringkas saat khatib berkhutbah; (B) salah karena menegur dengan ucapan saat khutbah menggugurkan pahala Jum\'at (HR. Bukhari no. 934); (C) benar sesuai HR. Bukhari no. 883 & 929; (D) benar sesuai HR. Bukhari no. 937 (2 rakaat di rumah) dan HR. Muslim no. 2073 (4 rakaat di masjid).',
        rubrik_penskoran: 'Skor penuh 20 jika tepat memilih A, C, dan D tanpa memilih B.',
        skor_maksimal: 20,
      },
      {
        nomor: 3,
        kode_tp: 'FQ-4.2',
        bentuk_soal: 'pg_kompleks_benar_salah',
        level_kognitif: 'C5_Mengevaluasi',
        stimulus_konteks:
          'Dalam kegiatan praktik ibadah di madrasah, seorang santri merangkum ketentuan shalat sunnah Rawatib, tahiyyatul-masjid, syukrul-wudlu, dan shalat jenazah untuk dipresentasikan di hadapan ustadz.',
        stimulus_arab:
          'مَنْ صَلَّى فِي يَوْمٍ وَلَيْلَةٍ ثِنْتَيْ عَشْرَةَ رَكْعَةً بُنِيَ لَهُ بَيْتٌ فِي الْجَنَّةِ: أَرْبَعًا قَبْلَ الظُّهْرِ، وَرَكْعَتَيْنِ بَعْدَهَا، وَرَكْعَتَيْنِ بَعْدَ الْمَغْرِبِ، وَرَكْعَتَيْنِ بَعْدَ الْعِشَاءِ، وَرَكْعَتَيْنِ قَبْلَ صَلَاةِ الْفَجْرِ',
        stimulus_sumber: 'HR. at-Tirmidzi no. 415 & Kurikulum Fiqih Kelas 4 Hal. 78–80',
        pertanyaan:
          'Evaluasilah setiap pernyataan dalam rangkuman santri berikut dengan memilih Benar atau Salah berdasarkan dalil pada kurikulum MDTA PERSIS!',
        pernyataan_benar_salah: [
          {
            id: 'tf-1',
            pernyataan:
              'Jumlah minimal shalat Rawatib muakkadah adalah 10 rakaat (qabla shubuh 2, qabla zhuhur 2, ba\'da zhuhur 2, ba\'da maghrib 2, ba\'da isya 2), dan dapat ditambah menjadi 12 rakaat dengan menjadikan qabla zhuhur 4 rakaat.',
            kunci: 'Benar',
          },
          {
            id: 'tf-2',
            pernyataan:
              'Shalat sunnah syukrul-wudlu hanya disyariatkan ketika seseorang berwudhu untuk shalat fardhu, dan tidak dianjurkan setelah wudhu di luar waktu shalat wajib.',
            kunci: 'Salah',
          },
          {
            id: 'tf-3',
            pernyataan:
              'Dalam shalat jenazah, ruku\' dan sujud dilakukan pada takbir keempat sebelum salam agar lebih khusyuk.',
            kunci: 'Salah',
          },
          {
            id: 'tf-4',
            pernyataan:
              'Urutan bacaan shalat jenazah menurut fatwa Imam an-Nawawi dalam Riyadhus-Shalihin ialah takbir ke-1 membaca al-Fatihah, takbir ke-2 membaca shalawat, takbir ke-3 membaca do\'a untuk semua muslim, dan takbir ke-4 membaca do\'a khusus untuk mayit.',
            kunci: 'Benar',
          },
        ],
        kunci_jawaban: '1: Benar, 2: Salah, 3: Salah, 4: Benar',
        pembahasan_syariat:
          '1) Benar (HR. Bukhari no. 1180 & HR. Tirmidzi no. 415). 2) Salah, karena pada hal. 79 dijelaskan wudhu syukrul-wudlu dianjurkan setiap kali batal wudhu kapan pun waktunya meski bukan untuk shalat wajib (hadits Bilal HR. Tirmidzi no. 3689). 3) Salah, karena shalat jenazah terdiri dari 4 takbir diakhiri salam tanpa ada ruku\', sujud, dan rukun lainnya (hal. 79). 4) Benar sesuai hal. 79–80.',
        skor_maksimal: 20,
      },
      {
        nomor: 4,
        kode_tp: 'FQ-4.1',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C4_Menganalisis',
        stimulus_konteks:
          'Berikut adalah daftar kaidah ibadah Fiqih Kelas 4 beserta potongan dalil hadits shahih yang tercantum dalam buku Kurikulum MDTA PERSIS.',
        stimulus_sumber: 'Kurikulum Fiqih Kelas 4 Hal. 75–79',
        pertanyaan:
          'Jodohkan setiap konsep/ketentuan fiqih di sebelah kiri dengan potongan dalil hadits yang tepat di sebelah kanan!',
        pasangan_menjodohkan: [
          {
            id: 'm-1',
            premis: "Keutamaan shalat berjama'ah dibanding shalat sendirian (27 derajat)",
            respon: 'صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
          },
          {
            id: 'm-2',
            premis: 'Shalat sunnah di antara setiap dua adzan (adzan dan iqamat)',
            respon: 'بَيْنَ كُلِّ أَذَانَيْنِ صَلَاةٌ بَيْنَ كُلِّ أَذَانَيْنِ صَلَاةٌ لِمَنْ شَاءَ',
          },
          {
            id: 'm-3',
            premis: 'Perintah shalat tahiyyatul-masjid dua rakaat sebelum duduk',
            respon: 'إِذَا دَخَلَ أَحَدُكُمُ الْمَسْجِدَ فَلَا يَجْلِسْ حَتَّى يَرْكَعَ رَكْعَتَيْنِ',
          },
          {
            id: 'm-4',
            premis: 'Kewajiban meluruskan dan merapatkan shaf agar tidak ada celah bagi setan',
            respon: 'أَقِيمُوا الصُّفُوفَ وَحَاذُوا بَيْنَ الْمَنَاكِبِ وَسُدُّوا الْخَلَلَ',
          },
        ],
        kunci_jawaban: '1→A, 2→B, 3→C, 4→D',
        pembahasan_syariat:
          'Keempat dalil berasal langsung dari materi Fiqih Kelas 4: HR. Bukhari no. 649 (shalat jamaah 27 derajat), HR. Bukhari no. 624/antara dua adzan, HR. Muslim no. 1688 (tahiyyatul-masjid), dan HR. Abu Dawud no. 666–667 (meluruskan shaf).',
        skor_maksimal: 20,
      },
      {
        nomor: 5,
        kode_tp: 'FQ-4.2',
        bentuk_soal: 'uraian_berargumen',
        level_kognitif: 'C5_Mengevaluasi',
        stimulus_konteks:
          'Ketika melaksanakan shalat berjama\'ah Zhuhur, Fauzan selalu langsung takbir dan ruku\' bersamaan atau sedikit lebih cepat sebelum imam selesai bertakbir, dengan alasan ingin menjaga kecepatan agar tidak tertinggal. Sementara itu, pada kesempatan lain saat shalat jenazah, ia melihat temannya membaca surat pendek setelah al-Fatihah pada takbir pertama.',
        stimulus_arab:
          'إِنَّمَا جُعِلَ الْإِمَامُ لِيُؤْتَمَّ بِهِ فَإِذَا كَبَّرَ فَكَبِّرُوا وَلَا تُكَبِّرُوا حَتَّى يُكَبِّرَ\nأَنَّ السُّنَّةَ فِي الصَّلَاةِ عَلَى الْجَنَازَةِ أَنْ يُكَبِّرَ الْإِمَامُ، ثُمَّ يَقْرَأُ بِفَاتِحَةِ الْكِتَابِ بَعْدَ التَّكْبِيرَةِ الْأُولَى سِرًّا فِي نَفْسِهِ، ثُمَّ يُصَلِّي عَلَى النَّبِيِّ ﷺ وَيُخْلِصُ الدُّعَاءَ لِلْجَنَازَةِ فِي التَّكْبِيرَاتِ لَا يَقْرَأُ فِي شَيْءٍ مِنْهُنَّ',
        stimulus_sumber: 'HR. Abu Dawud no. 603 & HR. al-Baihaqi no. 6959 (Hal. 75 & 80)',
        pertanyaan:
          'Evaluasilah dua peristiwa di atas! Mengapa sikap Fauzan dalam shalat jama\'ah tidak dibenarkan syariat, dan bagaimana hukum membaca surat Al-Qur\'an setelah al-Fatihah pada shalat jenazah menurut dalil kurikulum MDTA PERSIS?',
        kunci_jawaban:
          '1) Sikap Fauzan mendahului atau menyamai takbir/gerakan imam bertentangan dengan hadits HR. Abu Dawud no. 603: imam dijadikan untuk diikuti, sehingga makmum dilarang takbir, ruku\', atau sujud sebelum imam melakukannya. 2) Membaca surat Al-Qur\'an setelah al-Fatihah pada shalat jenazah menyalahi sunnah (HR. al-Baihaqi no. 6959: cukup membaca al-Fatihah secara sirr setelah takbir pertama tanpa membaca surat apa pun pada satu takbir pun).',
        pembahasan_syariat:
          'Hadits Abu Dawud no. 603 menegaskan tata tertib bermakmum: "fa idza kabbara fa kabbiru wa la tukabbiru hatta yukabbira" (jangan takbir hingga imam takbir). Adapun pada shalat jenazah, hadits as-Sunanul-Kubra al-Baihaqi no. 6959 secara tegas menyebutkan tidak membaca surat Al-Qur\'an pada satu takbir pun setelah al-Fatihah.',
        rubrik_penskoran:
          'Skor 20: Menilai kesalahan mendahului imam + dalil/kaidah pengikutannya (10 poin) dan menjelaskan tidak adanya bacaan surat selain al-Fatihah pada shalat jenazah sesuai HR. Baihaqi no. 6959 (10 poin).',
        skor_maksimal: 20,
      },
    ],
  },
  {
    metadata: {
      id: 'pkg-hadits-adab-2-pas',
      judul_paket: 'Penilaian Sumatif Akhir Semester — Hadits Adab Kelas 2 Ula',
      jenjang: 'Diniyah Ula',
      kelas: 2,
      fase_asesmen: 'AKM_DASAR_LOTS_MOTS',
      mata_pelajaran: 'Hadits Adab',
      subject_id: 'hadits_adab',
      semester: 'Genap (Sumatif)',
      tahun_ajaran: '2026/2027',
      alokasi_waktu_menit: 45,
      sumber_kurikulum_resmi:
        'Kurikulum Madrasah Diniyah Persatuan Islam (Diniyah Ula Kelas 2 · Hal. 19–23)',
      tanggal_disusun: '2026-11-26',
    },
    kisi_kisi: [
      {
        no_urut: 1,
        kode_tp: 'HA-2.2',
        tujuan_pembelajaran:
          'Menghafal, mengetahui makna, memahami, dan mengamalkan hadits seputar adab makan.',
        capaian_pembelajaran:
          '2.1 Membiasakan adab makan: membaca basmalah, tangan kanan, mengambil makanan dekat, tidak mencela makanan, membersihkan makanan jatuh.',
        indikator_soal:
          'Disajikan cerita pendek santri saat makan siang bersama, santri dapat memilih perilaku adab makan yang benar sesuai hadits Nabi saw.',
        bentuk_soal: 'pg_sederhana',
        level_kognitif: 'C2_Memahami',
        nomor_soal: 1,
        sumber_kurikulum: 'Hal. 20–21 (PDF hal. 10) · HR. Bukhari no. 5376 & no. 4989',
      },
      {
        no_urut: 2,
        kode_tp: 'HA-2.2',
        tujuan_pembelajaran:
          'Menghafal, mengetahui makna, memahami, dan mengamalkan hadits seputar adab minum.',
        capaian_pembelajaran:
          '2.2 Adab minum: tidak minum berdiri, tidak bernafas/meniup dalam wadah minum, bernafas 3x di luar wadah.',
        indikator_soal:
          'Disajikan dialog sederhana dua santri saat minum teh hangat, santri dapat menentukan cara minum yang sesuai ajaran Rasulullah saw.',
        bentuk_soal: 'pg_sederhana',
        level_kognitif: 'C3_Menerapkan',
        nomor_soal: 2,
        sumber_kurikulum: 'Hal. 22–23 (PDF hal. 10–11) · HR. Bukhari no. 5630 & Tirmidzi no. 1887',
      },
      {
        no_urut: 3,
        kode_tp: 'HA-2.1',
        tujuan_pembelajaran:
          "Menghafal dzikir harian (muraja'ah & ziyadah naik kendaraan dan do'a orang sakit).",
        capaian_pembelajaran:
          'Menghafal dzikir naik kendaraan, dzikir bangun tidur, dan do\'a untuk orang sakit.',
        indikator_soal:
          'Santri dapat menjodohkan kondisi aktivitas harian dengan lafazh dzikir atau do\'a Arab yang tepat.',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C2_Memahami',
        nomor_soal: 3,
        sumber_kurikulum: 'Hal. 19–20 (PDF hal. 9) · Dzikir Harian Kelas 2',
      },
      {
        no_urut: 4,
        kode_tp: 'HA-2.2',
        tujuan_pembelajaran:
          'Memahami hadits-hadits adab makan dan minum serta mengamalkannya.',
        capaian_pembelajaran:
          '2.1 Adab makan apabila ada sedikit makanan yang terjatuh dan apabila lupa membaca basmalah.',
        indikator_soal:
          'Disajikan situasi lupa membaca basmalah di tengah makan, santri dapat menuliskan bacaan dzikir yang benar dengan tepat.',
        bentuk_soal: 'isian_singkat',
        level_kognitif: 'C3_Menerapkan',
        nomor_soal: 4,
        sumber_kurikulum: 'Hal. 19 (PDF hal. 9) · Dzikir ketika lupa basmalah sebelum makan',
      },
    ],
    butir_soal: [
      {
        nomor: 1,
        kode_tp: 'HA-2.2',
        bentuk_soal: 'pg_sederhana',
        level_kognitif: 'C2_Memahami',
        stimulus_konteks:
          'Salman makan siang bersama keluarganya di rumah. Di meja makan ada sayur bayam yang tidak terlalu disukai Salman. Salman tetap tenang dan mengambil lauk lain yang berada di dekatnya dengan tangan kanan.',
        stimulus_arab:
          'مَا عَابَ النَّبِيُّ ﷺ طَعَامًا قَطُّ، إِنِ اشْتَهَاهُ أَكَلَهُ وَإِنْ كَرِهَهُ تَرَكَهُ',
        stimulus_sumber: 'HR. al-Bukhari no. 4989 & no. 5376 (Hal. 21)',
        pertanyaan:
          'Apa sikap mulia yang dicontohkan Salman sesuai hadits Nabi saw tentang makanan yang tidak disukai?',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Tidak mencela makanan; jika suka dimakan, jika tidak suka ditinggalkan.',
            benar: true,
          },
          {
            kode: 'B',
            teks: 'Mengatakan sayur itu tidak enak supaya diganti makanan lain.',
            benar: false,
          },
          {
            kode: 'C',
            teks: 'Mengambil makanan yang paling jauh di ujung meja dengan tangan kiri.',
            benar: false,
          },
        ],
        kunci_jawaban: 'A',
        pembahasan_syariat:
          'Sesuai HR. al-Bukhari no. 4989: Nabi saw tidak pernah sekalipun mencela makanan; jika beliau suka, beliau makan, dan jika tidak suka, beliau meninggalkannya.',
        skor_maksimal: 25,
      },
      {
        nomor: 2,
        kode_tp: 'HA-2.2',
        bentuk_soal: 'pg_sederhana',
        level_kognitif: 'C3_Menerapkan',
        stimulus_konteks:
          'Aisyah membawa segelas teh hangat. Adiknya berkata, "Kak, tiup saja tehnya supaya cepat dingin!" Namun Aisyah teringat pelajaran Hadits Adab di madrasah.',
        stimulus_arab: 'أَنَّ النَّبِيَّ ﷺ نَهَى عَنِ النَّفْخِ فِي الشُّرْبِ',
        stimulus_sumber: 'Sunan at-Tirmidzi no. 1887 & Shahih Muslim no. 5405 (Hal. 23)',
        pertanyaan:
          'Bagaimana cara minum yang benar yang harus dilakukan Aisyah?',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Meniup gelas perlahan lalu meminumnya sambil berdiri.',
            benar: false,
          },
          {
            kode: 'B',
            teks: 'Menunggu teh tidak terlalu panas, duduk, membaca basmalah, dan bernafas tiga kali di luar gelas.',
            benar: true,
          },
          {
            kode: 'C',
            teks: 'Minum sekaligus dengan satu nafas di dalam gelas.',
            benar: false,
          },
        ],
        kunci_jawaban: 'B',
        pembahasan_syariat:
          'Nabi saw melarang meniup minuman (HR. Tirmidzi no. 1887), melarang bernafas dalam wadah (HR. Bukhari no. 5630), dan menganjurkan bernafas tiga kali di luar wadah minum (HR. Muslim no. 5405).',
        skor_maksimal: 25,
      },
      {
        nomor: 3,
        kode_tp: 'HA-2.1',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C2_Memahami',
        stimulus_konteks:
          'Pasangkan keadaan di bawah ini dengan bacaan dzikir atau do\'a harian yang telah dihafalkan di Kelas 2!',
        stimulus_sumber: 'Kurikulum Hadits Adab Kelas 2 Hal. 19–20',
        pertanyaan: 'Jodohkan aktivitas di kolom kiri dengan bacaan do\'a di kolom kanan!',
        pasangan_menjodohkan: [
          {
            id: 'ha2-1',
            premis: 'Ketika naik kendaraan',
            respon: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ',
          },
          {
            id: 'ha2-2',
            premis: 'Menjenguk teman yang sedang sakit',
            respon: 'اللَّهُمَّ رَبَّ النَّاسِ مُذْهِبَ الْبَأْسِ اشْفِ أَنْتَ الشَّافِي',
          },
          {
            id: 'ha2-3',
            premis: 'Sesudah selesai makan',
            respon: 'الْحَمْدُ لِلّٰهِ الَّذِي كَفَانَا وَآوَانَا غَيْرَ مَكْفِيٍّ وَلَا مَكْفُوْرٍ',
          },
        ],
        kunci_jawaban: '1→A, 2→B, 3→C',
        pembahasan_syariat:
          'Ketiga dzikir tersebut merupakan materi wajib dzikir harian Kelas 2 (hal. 19–20): QS. Az-Zukhruf untuk naik kendaraan, HR. Bukhari no. 5742 untuk orang sakit, dan HR. Bukhari no. 5459 untuk sesudah makan.',
        skor_maksimal: 25,
      },
      {
        nomor: 4,
        kode_tp: 'HA-2.2',
        bentuk_soal: 'isian_singkat',
        level_kognitif: 'C3_Menerapkan',
        stimulus_konteks:
          'Zaid sangat lapar sepulang sekolah sehingga langsung menyuap nasi. Di tengah makan, ia baru ingat belum membaca "Bismillah".',
        stimulus_sumber: 'Kurikulum Hadits Adab Kelas 2 Hal. 19 (No. 5)',
        pertanyaan:
          'Tuliskan bacaan dzikir ketika lupa membaca basmalah sebelum makan (dalam latin atau Arab)!',
        kunci_jawaban: 'Bismillahi awwalahu wa akhirahu (بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ)',
        kunci_array: [
          'bismillahi awwalahu wa akhirahu',
          'بِسْمِ اللّٰهِ أَوَّلَهُ وَآخِرَهُ',
          'بسم الله أوله وآخره',
        ],
        pembahasan_syariat:
          'Sesuai daftar dzikir harian no. 5 (hal. 19): jika lupa membaca basmalah sebelum makan, membaca "Bismillahi awwalahu wa akhirahu" (Dengan nama Allah di awalnya dan akhirnya, HR. Abu Dawud no. 3769–3770).',
        rubrik_penskoran: 'Skor 25 jika menuliskan lafazh Bismillahi awwalahu wa akhirahu dengan benar.',
        skor_maksimal: 25,
      },
    ],
  },
  {
    metadata: {
      id: 'pkg-tauhid-6-pas',
      judul_paket: 'Penilaian Sumatif Akhir Jenjang — Tauhid Kelas 6 Ula',
      jenjang: 'Diniyah Ula',
      kelas: 6,
      fase_asesmen: 'AKM_MENENGAH_HOTS',
      mata_pelajaran: 'Tauhid',
      subject_id: 'tauhid',
      semester: 'Akhir Jenjang (Sumatif)',
      tahun_ajaran: '2026/2027',
      alokasi_waktu_menit: 60,
      sumber_kurikulum_resmi:
        'Kurikulum Madrasah Diniyah Persatuan Islam (Diniyah Ula Kelas 6 · Hal. 61–65)',
      tanggal_disusun: '2026-11-26',
    },
    kisi_kisi: [
      {
        no_urut: 1,
        kode_tp: 'TH-6.1',
        tujuan_pembelajaran:
          "Memahami dalil syirik sebagai kekafiran (i'tiqadi) dan syirik sebatas dosa besar ('amali).",
        capaian_pembelajaran:
          "1.1–1.2 Membedakan syirik i'tiqadi yang mengeluarkan dari Islam dengan syirik 'amali (riya, khafi, andad, jimat/tiwalah) yang berstatus dosa besar.",
        indikator_soal:
          'Disajikan studi kasus ucapan dan perbuatan sehari-hari (riya, andad, jimat), santri dapat menganalisis klasifikasi syirik dan konsekuensi hukumnya.',
        bentuk_soal: 'pg_biasa',
        level_kognitif: 'C4_Menganalisis',
        nomor_soal: 1,
        sumber_kurikulum: 'Hal. 61–63 (PDF hal. 30–31) · Tafsir Ibnu Katsir & HR. Ahmad no. 23630',
      },
      {
        no_urut: 2,
        kode_tp: 'TH-6.2',
        tujuan_pembelajaran:
          "Memahami dalil kufur, nifaq (i'tiqadi vs 'amali), dan kewajiban al-wala wal-bara.",
        capaian_pembelajaran:
          "2.4–3.6 Mengidentifikasi perbuatan kufur 'amali dan tanda-tanda nifaq 'amali berdasarkan hadits shahih.",
        indikator_soal:
          'Santri dapat mengevaluasi beberapa tindakan nyata untuk menentukan mana saja yang termasuk kategori kufur \'amali dan nifaq \'amali.',
        bentuk_soal: 'pg_kompleks_centang',
        level_kognitif: 'C5_Mengevaluasi',
        nomor_soal: 2,
        sumber_kurikulum: 'Hal. 64 (PDF hal. 31) · HR. Tirmidzi no. 2830, Ahmad no. 9171, Bukhari no. 33',
      },
      {
        no_urut: 3,
        kode_tp: 'TH-6.2',
        tujuan_pembelajaran:
          'Memahami dalil kewajiban al-wala dan al-bara serta batasannya.',
        capaian_pembelajaran:
          '4.7–4.8 Memahami al-wala sesama muslim lintas madzhab dan al-bara dari orang kafir.',
        indikator_soal:
          'Disajikan narasi pergaulan lintas madzhab dan hukum ruqyah, santri dapat mengevaluasi kebenaran tiap pernyataan sesuai dalil kurikulum.',
        bentuk_soal: 'pg_kompleks_benar_salah',
        level_kognitif: 'C5_Mengevaluasi',
        nomor_soal: 3,
        sumber_kurikulum: 'Hal. 63 & 65 (PDF hal. 31–32) · QS. At-Taubah: 71 & Ali Imran: 28',
      },
      {
        no_urut: 4,
        kode_tp: 'TH-6.1',
        tujuan_pembelajaran:
          'Memahami dalil-dalil syirik, kufur, dan nifaq.',
        capaian_pembelajaran:
          'Menghubungkan istilah syirik khafi, andad, kufur \'amali, dan nifaq \'amali dengan dalil atau penjelasannya.',
        indikator_soal:
          'Santri dapat menjodohkan empat istilah aqidah Kelas 6 dengan definisi dalil yang tepat.',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C4_Menganalisis',
        nomor_soal: 4,
        sumber_kurikulum: 'Hal. 62–64 (PDF hal. 30–31)',
      },
    ],
    butir_soal: [
      {
        nomor: 1,
        kode_tp: 'TH-6.1',
        bentuk_soal: 'pg_biasa',
        level_kognitif: 'C4_Menganalisis',
        stimulus_konteks:
          'Dalam sebuah diskusi kelas, Pak Hasan mendengar dua kejadian: (1) Seseorang yang biasanya shalat singkat, lalu membaguskan dan memanjangkan shalatnya karena sadar sedang diperhatikan gurunya; (2) Seseorang yang berkata setelah rumahnya selamat dari pencurian, "Seandainya tadi malam tidak ada anjing penjaga, pasti pencuri sudah masuk ke rumah kita."',
        stimulus_arab:
          'الشِّرْكُ الْخَفِيُّ أَنْ يَقُومَ الرَّجُلُ يُصَلِّي فَيُزَيِّنُ صَلَاتَهُ لِمَا يَرَى مِنْ نَظَرِ رَجُلٍ',
        stimulus_sumber: 'Sunan Ibnu Majah no. 4204 & Riwayat Ibnu Abi Hatim / Ibnu Abbas ra (Hal. 62–63)',
        pertanyaan:
          'Berdasarkan materi Tauhid Kelas 6 MDTA PERSIS, kedua kejadian di atas secara berurutan termasuk dalam kategori...',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Syirik khafi (membaguskan shalat karena dilihat orang) dan syirik andad (kalimat berandai-andai yang menyandarkan keselamatan pada sebab selain Allah).',
            benar: true,
          },
          {
            kode: 'B',
            teks: 'Kufur i\'tiqadi dan nifaq i\'tiqadi yang langsung mengeluarkan pelakunya dari agama Islam.',
            benar: false,
          },
          {
            kode: 'C',
            teks: 'Syirik tha\'ah dan syirik mahabbah yang tidak termasuk dosa besar.',
            benar: false,
          },
          {
            kode: 'D',
            teks: 'Perbuatan mubah karena keduanya hanya niat di dalam hati dan ucapan biasa.',
            benar: false,
          },
        ],
        kunci_jawaban: 'A',
        pembahasan_syariat:
          'Merujuk hal. 62–63: membaguskan shalat karena dilihat orang lain disebut Syirik Khafi (HR. Ibnu Majah no. 4204), sedangkan ucapan berandai-andai seperti "Seandainya tidak ada anjing itu pasti pencuri masuk" dikategorikan Ibnu Abbas ra sebagai Syirik Andad (menyamakan makhluk dengan Allah dalam perlindungan), dan keduanya tergolong syirik \'amali (dosa besar, tidak kekal di neraka selama masih bertauhid).',
        skor_maksimal: 25,
      },
      {
        nomor: 2,
        kode_tp: 'TH-6.2',
        bentuk_soal: 'pg_kompleks_centang',
        level_kognitif: 'C5_Mengevaluasi',
        stimulus_konteks:
          'Kurikulum Tauhid Kelas 6 membedakan antara kufur/nifaq i\'tiqadi (yang membatalkan Islam) dan kufur/nifaq \'amali (sebatas amal yang berdosa besar sepanjang masih meyakini syahadatnya).',
        stimulus_arab:
          'مَنْ أَتَى كَاهِنًا أَوْ عَرَّافًا فَصَدَّقَهُ بِمَا يَقُولُ فَقَدْ كَفَرَ بِمَا أُنْزِلَ عَلَى مُحَمَّدٍ ﷺ\nالْعَهْدُ الَّذِي بَيْنَنَا وَبَيْنَهُمُ الصَّلَاةُ فَمَنْ تَرَكَهَا فَقَدْ كَفَرَ\nآيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ',
        stimulus_sumber: 'HR. Ahmad no. 9171, HR. Tirmidzi no. 2830, HR. Bukhari no. 33 (Hal. 64)',
        pertanyaan:
          'Pilihlah lebih dari satu perilaku berikut yang secara tegas dikategorikan sebagai perbuatan kufur \'amali atau nifaq \'amali dalam dokumen kurikulum Tauhid Kelas 6!',
        opsi_pilihan: [
          {
            kode: 'A',
            teks: 'Mendatangi peramal (kahin/arraf) lalu membenarkan apa yang diramalkannya.',
            benar: true,
          },
          {
            kode: 'B',
            teks: 'Meninggalkan shalat dengan sengaja padahal masih mengaku muslim.',
            benar: true,
          },
          {
            kode: 'C',
            teks: 'Mengingkari seluruh nabi dan membedakan keimanan antara Allah dan rasul-Nya.',
            benar: false,
          },
          {
            kode: 'D',
            teks: 'Berbicara dusta, mengingkari janji, dan berkhianat ketika diberi amanat.',
            benar: true,
          },
        ],
        kunci_jawaban: 'A, B, D',
        kunci_array: ['A', 'B', 'D'],
        pembahasan_syariat:
          '(A) Kufur \'amali sesuai HR. Ahmad no. 9171; (B) Kufur \'amali sesuai HR. Tirmidzi no. 2830; (D) Nifaq \'amali sesuai HR. Bukhari no. 33. Sedangkan (C) merupakan kufur i\'tiqadi (QS. An-Nisa: 150–151) yang mengeluarkan pelakunya dari Islam.',
        rubrik_penskoran: 'Skor penuh 25 jika memilih A, B, dan D tepat.',
        skor_maksimal: 25,
      },
      {
        nomor: 3,
        kode_tp: 'TH-6.2',
        bentuk_soal: 'pg_kompleks_benar_salah',
        level_kognitif: 'C5_Mengevaluasi',
        stimulus_konteks:
          'Seorang santri diminta mengevaluasi beberapa pernyataan mengenai batasan ruqyah, syirik \'amali, serta prinsip al-wala dan al-bara dalam pergaulan kaum muslimin.',
        stimulus_arab:
          'لَا بَأْسَ بِالرُّقَى مَا لَمْ تَكُنْ شِرْكًا\nوَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ',
        stimulus_sumber: 'HR. Abu Dawud no. 3888 & QS. At-Taubah: 71 (Hal. 62–65)',
        pertanyaan:
          'Tentukan apakah pernyataan-pernyataan berikut Benar atau Salah berdasarkan dalil pada Kurikulum Tauhid Kelas 6!',
        pernyataan_benar_salah: [
          {
            id: 'th6-1',
            pernyataan:
              'Semua bentuk ruqyah (jampi-jampi) tanpa terkecuali hukumnya syirik dan haram dilakukan meskipun tidak mengandung unsur kesyirikan.',
            kunci: 'Salah',
          },
          {
            id: 'th6-2',
            pernyataan:
              'Kewajiban al-wala (saling setia dan mendukung) berlaku kepada sesama muslim meskipun berbeda madzhab.',
            kunci: 'Benar',
          },
          {
            id: 'th6-3',
            pernyataan:
              'Menghalalkan apa yang diharamkan Allah atau mengharamkan apa yang dihalalkan Allah demi menaati tokoh/pendeta termasuk bentuk syirik tha\'ah.',
            kunci: 'Benar',
          },
        ],
        kunci_jawaban: '1: Salah, 2: Benar, 3: Benar',
        pembahasan_syariat:
          '1) Salah, karena hadits HR. Abu Dawud no. 3888 menyatakan "La ba\'sa bir-ruqa ma lam takun syirkan" (tidak mengapa ruqyah selama tidak syirik). 2) Benar sesuai CP 4.7 hal. 64 & QS. At-Taubah: 71. 3) Benar sesuai hadits Adi bin Hatim pada Syirik Tha\'ah hal. 62.',
        skor_maksimal: 25,
      },
      {
        nomor: 4,
        kode_tp: 'TH-6.1',
        bentuk_soal: 'menjodohkan',
        level_kognitif: 'C4_Menganalisis',
        stimulus_konteks:
          'Cocokkan istilah-istilah kerusakan aqidah di bawah ini dengan padanan penjelasan dalil yang tercantum di buku Kurikulum Tauhid Kelas 6.',
        stimulus_sumber: 'Kurikulum Tauhid Kelas 6 Hal. 62–64',
        pertanyaan:
          'Jodohkan istilah aqidah di sebelah kiri dengan dalil atau pengertiannya di sebelah kanan!',
        pasangan_menjodohkan: [
          {
            id: 'th-m1',
            premis: 'Syirik Asghar / Riya',
            respon: 'Beramal ibadah agar dilihat dan dipuji manusia (HR. Ahmad no. 23630)',
            respon_arab: 'إِنَّ أَخْوَفَ مَا أَخَافُ عَلَيْكُمُ الشِّرْكُ الْأَصْغَرُ... الرِّيَاءُ',
          },
          {
            id: 'th-m2',
            premis: 'Tamimah & Tiwalah',
            respon: 'Penggunaan jimat dan pelet yang termasuk amal-amal syirik (HR. Abu Dawud no. 3885)',
            respon_arab: 'إِنَّ الرُّقَى وَالتَّمَائِمَ وَالتِّوَلَةَ شِرْكٌ',
          },
          {
            id: 'th-m3',
            premis: 'Nifaq I\'tiqadi',
            respon: 'Menampakkan iman di lisan tetapi menyembunyikan kekafiran; tempatnya di kerak neraka (QS. An-Nisa: 145)',
            respon_arab: 'إِنَّ الْمُنَافِقِينَ فِي الدَّرْكِ الْأَسْفَلِ مِنَ النَّارِ',
          },
          {
            id: 'th-m4',
            premis: 'Al-Bara',
            respon: 'Berlepas diri dan tidak menjadikan orang kafir sebagai wali/pelindung (QS. Ali Imran: 28)',
            respon_arab: 'لَا يَتَّخِذِ الْمُؤْمِنُونَ الْكَافِرِينَ أَوْلِيَاءَ مِنْ دُونِ الْمُؤْمِنِينَ',
          },
        ],
        kunci_jawaban: '1→A, 2→B, 3→C, 4→D',
        pembahasan_syariat:
          'Seluruh istilah diambil langsung dari Capaian Pembelajaran 1.2, 3.5, dan 4.8 Kurikulum Tauhid Kelas 6 hal. 62–65.',
        skor_maksimal: 25,
      },
    ],
  },
];
