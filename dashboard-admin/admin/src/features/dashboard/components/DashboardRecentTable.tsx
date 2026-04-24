type StatusType = 'Selesai' | 'Dalam Proses' | 'Ditolak' | string;

interface RecentTableRow {
  id: string;
  noPengaduan: string;
  kategori: string;
  status: StatusType;
  tanggal: string;
}

interface DashboardRecentTableProps {
  data: RecentTableRow[];
}

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

export default function DashboardRecentTable({ data }: DashboardRecentTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Pengaduan Terbaru</h3>
      </div>
      <div className="overflow-x-auto px-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#eef2f6] text-gray-600 text-sm">
              <th className="px-6 py-4 font-medium whitespace-nowrap">No. Pengaduan</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Kategori</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm whitespace-nowrap">{row.noPengaduan}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{row.kategori}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.status)} whitespace-nowrap`}
                  >
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
  );
}
