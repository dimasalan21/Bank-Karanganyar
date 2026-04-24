import { useState } from 'react';
import { DATA, type PermintaanInformasi, type Status } from '../types/permintaan.types';
import PermintaanSearchBar from '../components/PermintaanSearchBar';
import PermintaanTable from '../components/PermintaanTable';
import PermintaanPagination from '../components/PermintaanPagination';
import PermintaanDetail from './PermintaanDetail';

const PAGE_SIZE = 5;

export default function PermintaanList() {
  const [data, setData] = useState<PermintaanInformasi[]>(DATA);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPermintaan, setSelectedPermintaan] = useState<PermintaanInformasi | null>(null);

  const filtered = data.filter((d) => {
    const matchSearch =
      d.noTiket.toLowerCase().includes(search.toLowerCase()) ||
      d.kategori.toLowerCase().includes(search.toLowerCase()) ||
      d.nama.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handleFilter = (val: string) => { setFilterStatus(val); setCurrentPage(1); };

  const handleStatusChange = (id: string, newStatus: Status) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    // Update juga selectedPermintaan agar badge status langsung berubah di detail
    setSelectedPermintaan(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
  };

  const handleExport = () => {
    const headers = ['Tanggal', 'Ticket ID', 'Nama', 'Email', 'Status'];
    const csvRows = filtered.map(item =>
      `${item.tanggal},${item.noTiket},${item.nama},${item.email},${item.status}`
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_Permintaan_Informasi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedPermintaan) {
    return (
      <PermintaanDetail
        item={selectedPermintaan}
        onClose={() => setSelectedPermintaan(null)}
        onStatusChange={(newStatus) => handleStatusChange(selectedPermintaan.id, newStatus)}
      />
    );
  }

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Permintaan Informasi</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola dan cari data permintaan informasi dari nasabah</p>
      </div>

      <PermintaanSearchBar
        search={search}
        filterStatus={filterStatus}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onExport={handleExport}
      />

      <PermintaanTable data={paginated} onSelectPermintaan={setSelectedPermintaan} />

      <PermintaanPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
