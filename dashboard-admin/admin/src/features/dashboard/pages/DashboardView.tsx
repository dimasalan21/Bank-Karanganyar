import StatCard from '../../../components/StatCard';
import type { StatData, Pengaduan } from '../../../types/dashboard';
import DashboardHeader from '../components/DashboardHeader';
import DashboardRecentTable from '../components/DashboardRecentTable';

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

export default function DashboardView() {
  return (
    <div className="p-6 md:p-8 max-w-full mx-auto space-y-8">
      <DashboardHeader
        title="Dashboard"
        subtitle="Selamat datang di sistem pengaduan Bank Karanganyar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <DashboardRecentTable data={recentPengaduan} />
    </div>
  );
}
