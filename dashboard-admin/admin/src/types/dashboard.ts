export type PengaduanStatus = 'Selesai' | 'Dalam Proses' | 'Ditolak';

export interface StatData {
  id: string;
  title: string;
  value: number;
  type: 'total' | 'proses' | 'selesai' | 'ditolak';
}

export interface Pengaduan {
  id: string;
  noPengaduan: string;
  kategori: string;
  status: PengaduanStatus;
  tanggal: string;
}