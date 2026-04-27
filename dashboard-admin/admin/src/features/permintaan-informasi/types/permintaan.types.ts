export type Status = 'Selesai' | 'Dalam Proses' | 'Ditolak';

export interface Lampiran {
  id: string;
  nama: string;
  tipe: 'image' | 'pdf' | 'doc' | 'other';
  url: string;
  ukuran: string;
}

export interface PermintaanInformasi {
  id: string;
  noTiket: string;
  kategori: string;
  status: Status;
  tanggal: string;
  nama: string;
  email: string;
  noWa: string;
  alamat: string;
  deskripsi: string;
  lampiran?: Lampiran[];
}

export const DATA: PermintaanInformasi[] = [
  {
    id: '1', noTiket: 'INFO-2026-0001', kategori: 'Produk Tabungan', status: 'Selesai',
    tanggal: '02 Apr 2026', nama: 'Andi Pratama', email: 'andi@email.com',
    noWa: '628111222333', alamat: 'Jl. Merak No 1',
    deskripsi: 'Dengan hormat, saya Andi Pratama, nasabah Bank Karanganyar sejak tahun 2015. Saya ingin memohon informasi lengkap mengenai prosedur dan persyaratan pembukaan rekening tabungan haji di Bank Karanganyar.\n\nAdapun beberapa hal yang ingin saya ketahui antara lain:\n1. Dokumen apa saja yang perlu disiapkan (KTP, KK, buku nikah, dsb)?\n2. Berapa setoran awal minimal untuk membuka rekening tabungan haji?\n3. Apakah ada biaya administrasi bulanan yang dikenakan?\n4. Berapa lama estimasi waktu antrian keberangkatan haji melalui rekening di Bank Karanganyar?\n5. Apakah bisa mendaftar secara online atau harus datang langsung ke kantor cabang?\n\nSaya juga ingin mengetahui apakah Bank Karanganyar memiliki program khusus atau simulasi biaya haji agar saya bisa memperkirakan kebutuhan dana yang diperlukan. Atas perhatian dan informasinya, saya ucapkan terima kasih banyak.',
    lampiran: [
      { id: 'l1', nama: 'buku-tabungan-haji.png', tipe: 'image', url: 'https://picsum.photos/seed/tabungan1/800/600', ukuran: '1.1 MB' },
      { id: 'l2', nama: 'ktp-andi-pratama.png', tipe: 'image', url: 'https://picsum.photos/seed/ktp2/800/600', ukuran: '650 KB' },
    ],
  },
  { id: '2', noTiket: 'INFO-2026-0002', kategori: 'Pinjaman', status: 'Dalam Proses', tanggal: '03 Apr 2026', nama: 'Siska Amelia', email: 'siska@email.com', noWa: '628222333444', alamat: 'Jl. Garuda No 2', deskripsi: 'Berapa suku bunga KUR tahun ini?' },
  { id: '3', noTiket: 'INFO-2026-0003', kategori: 'Layanan Digital', status: 'Selesai', tanggal: '04 Apr 2026', nama: 'Reza Fahlevi', email: 'reza@email.com', noWa: '628333444555', alamat: 'Jl. Rajawali No 3', deskripsi: 'Bagaimana cara daftar mobile banking tanpa ke cabang?' },
];

export const STATUS_STYLE: Record<Status, string> = {
  Selesai: 'bg-green-100 text-green-700',
  'Dalam Proses': 'bg-yellow-100 text-yellow-700',
  Ditolak: 'bg-red-100 text-red-700',
};
