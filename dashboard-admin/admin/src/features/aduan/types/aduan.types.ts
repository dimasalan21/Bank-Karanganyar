export type Status = 'Selesai' | 'Dalam Proses' | 'Ditolak';

export interface Lampiran {
  id: string;
  nama: string;
  tipe: 'image' | 'pdf' | 'doc' | 'other';
  url: string;
  ukuran: string; // contoh: "1.2 MB"
}

export interface Aduan {
  id: string;
  noAduan: string;
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

export const DATA: Aduan[] = [
  {
    id: '1', noAduan: 'ADU-2026-0345', kategori: 'Kartu ATM', status: 'Selesai',
    tanggal: '01 Apr 2026', nama: 'Budi Santoso', email: 'budi.santoso@email.com',
    noWa: '6281234567890', alamat: 'Jl. Merdeka No. 12, Surabaya',
    deskripsi: 'Kartu ATM terblokir setelah salah memasukkan PIN sebanyak 3 kali.',
    lampiran: [
      { id: 'a1', nama: 'bukti-ktp.png', tipe: 'image', url: 'https://picsum.photos/seed/ktp1/800/600', ukuran: '1.1 MB' },
      { id: 'a2', nama: 'bukti-kartu-atm.png', tipe: 'image', url: 'https://picsum.photos/seed/atm1/800/600', ukuran: '980 KB' },
    ],
  },
  {
    id: '2', noAduan: 'ADU-2026-0344', kategori: 'Internet Banking', status: 'Selesai',
    tanggal: '31 Mar 2026', nama: 'Siti Rahayu', email: 'siti.rahayu@email.com',
    noWa: '6282345678901', alamat: 'Jl. Diponegoro No. 45, Jakarta',
    deskripsi: 'Tidak bisa login ke internet banking sejak kemarin pagi.',
    lampiran: [],
  },
  {
    id: '3', noAduan: 'ADU-2026-0343', kategori: 'Transfer Bermasalah', status: 'Dalam Proses',
    tanggal: '30 Mar 2026', nama: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com',
    noWa: '6283456789012', alamat: 'Jl. Sudirman No. 7, Bandung',
    deskripsi: 'Transfer ke rekening tujuan sudah terpotong namun dana belum masuk ke rekening penerima. Saya sudah menunggu selama 2x24 jam namun dana tidak kunjung masuk. Mohon segera ditindaklanjuti karena dana tersebut cukup besar dan mendesak.',
    lampiran: [
      { id: 'l1', nama: 'bukti-transfer-bca.png', tipe: 'image', url: 'https://picsum.photos/seed/transfer1/800/600', ukuran: '1.2 MB' },
      { id: 'l2', nama: 'screenshot-mutasi-rekening.png', tipe: 'image', url: 'https://picsum.photos/seed/mutasi2/800/600', ukuran: '980 KB' },
      { id: 'l3', nama: 'bukti-saldo-berkurang.png', tipe: 'image', url: 'https://picsum.photos/seed/saldo3/800/600', ukuran: '750 KB' },
    ],
  },
  { id: '4', noAduan: 'ADU-2026-0342', kategori: 'Pelayanan', status: 'Selesai', tanggal: '29 Mar 2026', nama: 'Dewi Lestari', email: 'dewi.lestari@email.com', noWa: '6284567890123', alamat: 'Jl. Ahmad Yani No. 23, Semarang', deskripsi: 'Pelayanan teller kurang ramah dan antrian sangat panjang.', lampiran: [] },
  { id: '5', noAduan: 'ADU-2026-0341', kategori: 'Kartu Kredit', status: 'Ditolak', tanggal: '28 Mar 2026', nama: 'Rudi Hermawan', email: 'rudi.hermawan@email.com', noWa: '6285678901234', alamat: 'Jl. Gatot Subroto No. 56, Medan', deskripsi: 'Tagihan kartu kredit tidak sesuai dengan transaksi yang dilakukan.', lampiran: [] },
  { id: '6', noAduan: 'ADU-2026-0340', kategori: 'Mobile Banking', status: 'Dalam Proses', tanggal: '27 Mar 2026', nama: 'Rina Wulandari', email: 'rina.wulandari@email.com', noWa: '6286789012345', alamat: 'Jl. Imam Bonjol No. 9, Makassar', deskripsi: 'Aplikasi mobile banking error saat melakukan pembayaran QRIS.', lampiran: [] },
  { id: '7', noAduan: 'ADU-2026-0339', kategori: 'Tabungan', status: 'Selesai', tanggal: '26 Mar 2026', nama: 'Hendra Gunawan', email: 'hendra.gunawan@email.com', noWa: '6287890123456', alamat: 'Jl. Veteran No. 34, Yogyakarta', deskripsi: 'Saldo tabungan berkurang tanpa adanya transaksi yang dilakukan.', lampiran: [] },
  { id: '8', noAduan: 'ADU-2026-0338', kategori: 'Kartu ATM', status: 'Selesai', tanggal: '25 Mar 2026', nama: 'Yanti Kusuma', email: 'yanti.kusuma@email.com', noWa: '6288901234567', alamat: 'Jl. Pahlawan No. 18, Palembang', deskripsi: 'Kartu ATM ditelan mesin setelah transaksi gagal.', lampiran: [] },
  { id: '9', noAduan: 'ADU-2026-0337', kategori: 'Pinjaman', status: 'Dalam Proses', tanggal: '24 Mar 2026', nama: 'Doni Prasetyo', email: 'doni.prasetyo@email.com', noWa: '6289012345678', alamat: 'Jl. Rajawali No. 67, Balikpapan', deskripsi: 'Cicilan pinjaman sudah dibayar namun masih tercatat sebagai tunggakan.', lampiran: [] },
  { id: '10', noAduan: 'ADU-2026-0336', kategori: 'Internet Banking', status: 'Ditolak', tanggal: '23 Mar 2026', nama: 'Mega Fitriani', email: 'mega.fitriani@email.com', noWa: '6280123456789', alamat: 'Jl. Kartini No. 3, Denpasar', deskripsi: 'Permintaan reset password internet banking tidak diproses.', lampiran: [] },
  { id: '11', noAduan: 'ADU-2026-0335', kategori: 'Transfer Bermasalah', status: 'Selesai', tanggal: '22 Mar 2026', nama: 'Bambang Susilo', email: 'bambang.susilo@email.com', noWa: '6281122334455', alamat: 'Jl. Pemuda No. 89, Pekanbaru', deskripsi: 'Transfer antar bank mengalami kegagalan namun saldo sudah terpotong.', lampiran: [] },
  { id: '12', noAduan: 'ADU-2026-0334', kategori: 'Mobile Banking', status: 'Selesai', tanggal: '21 Mar 2026', nama: 'Citra Ayu', email: 'citra.ayu@email.com', noWa: '6282233445566', alamat: 'Jl. Hasanuddin No. 11, Pontianak', deskripsi: 'Fitur scan barcode pada mobile banking tidak berfungsi dengan baik.', lampiran: [] },
];

export const STATUS_STYLE: Record<Status, string> = {
  Selesai: 'bg-green-100 text-green-700',
  'Dalam Proses': 'bg-yellow-100 text-yellow-700',
  Ditolak: 'bg-red-100 text-red-700',
};
