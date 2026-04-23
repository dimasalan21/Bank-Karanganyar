export type Status = 'Selesai' | 'Dalam Proses' | 'Ditolak';

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
}

export const DATA: PermintaanInformasi[] = [
  { id: '1', noTiket: 'INFO-2026-0001', kategori: 'Produk Tabungan', status: 'Selesai', tanggal: '02 Apr 2026', nama: 'Andi Pratama', email: 'andi@email.com', noWa: '628111222333', alamat: 'Jl. Merak No 1', deskripsi: 'Mohon info syarat buka rekening tabungan haji.' },
  { id: '2', noTiket: 'INFO-2026-0002', kategori: 'Pinjaman', status: 'Dalam Proses', tanggal: '03 Apr 2026', nama: 'Siska Amelia', email: 'siska@email.com', noWa: '628222333444', alamat: 'Jl. Garuda No 2', deskripsi: 'Berapa suku bunga KUR tahun ini?' },
  { id: '3', noTiket: 'INFO-2026-0003', kategori: 'Layanan Digital', status: 'Selesai', tanggal: '04 Apr 2026', nama: 'Reza Fahlevi', email: 'reza@email.com', noWa: '628333444555', alamat: 'Jl. Rajawali No 3', deskripsi: 'Bagaimana cara daftar mobile banking tanpa ke cabang?' },
];

export const STATUS_STYLE: Record<Status, string> = {
  Selesai: 'bg-green-100 text-green-700',
  'Dalam Proses': 'bg-yellow-100 text-yellow-700',
  Ditolak: 'bg-red-100 text-red-700',
};
