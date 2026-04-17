
// src/pages/index.tsx
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import type { StatData, Pengaduan } from '../types/dashboard';

// --- MOCK DATA ---
const statsData: StatData[] = [
  { id: '1', title: 'Total Pengaduan', value: 156, type: 'total' },
  { id: '2', title: 'Dalam Proses', value: 23, type: 'proses' },
  { id: '3', title: 'Selesai', value: 120, type: 'selesai' },
  { id: '4', title: 'Ditolak', value: 13, type: 'ditolak' },
];

const recentPengaduan: Pengaduan[] = [
  { id: '1', noPengaduan: 'ADU-2026-0345', kategori: 'Kartu ATM', status: 'Selesai', tanggal: '01 Apr 2026' },
  { id: '2', noPengaduan: 'ADU-2026-0344', kategori: 'Internet Banking', status: 'Selesai', tanggal: '31 Mar 2026' },
  { id: '3', noPengaduan: 'ADU-2026-0343', kategori: 'Transfer Bermasalah', status: 'Dalam Proses', tanggal: '30 Mar 2026' },
  { id: '4', noPengaduan: 'ADU-2026-0342', kategori: 'Pelayanan', status: 'Selesai', tanggal: '29 Mar 2026' },
];
// -----------------

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-700';
    case 'Dalam Proses':
      return 'bg-yellow-100 text-yellow-700';
    case 'Ditolak':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// PERUBAHAN ADA DI BARIS INI: Menambahkan props { currentPage, onNavigate }
export default function Dashboard({ currentPage, onNavigate }: any) {
  return (
    // PERUBAHAN ADA DI BARIS INI: Meneruskan props ke komponen Layout
    <Layout currentPage={currentPage} onNavigate={onNavigate}>
      {/* Pake max-w-full dan padding responsif */}
      <div className="p-6 md:p-8 max-w-full mx-auto space-y-8">
        
        {/* Header Title */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">Selamat datang di sistem pengaduan Bank Karanganyar</p>
        </div>

        {/* Stats Grid - Menjadi Responsif (1 kolom ke 2 ke 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>

        {/* Data Table - Tambahkan overflow-x-auto */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Pengaduan Terbaru</h3>
          </div>
          <div className="overflow-x-auto px-1"> {/* Baris ini penting untuk responsif tabel */}
            <table className="w-full text-left border-collapse min-w-[700px]"> {/* Tambahkan min-width agar tabel tidak menciut terlalu jauh */}
              <thead>
                <tr className="bg-[#eef2f6] text-gray-600 text-sm">
                  <th className="px-6 py-4 font-medium whitespace-nowrap">No. Pengaduan</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Kategori</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPengaduan.map((row) => (
                  <tr key={row.id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{row.noPengaduan}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{row.kategori}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.status)} whitespace-nowrap`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{row.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}