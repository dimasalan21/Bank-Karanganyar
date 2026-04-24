import { useState } from 'react';
import { DATA, type Aduan, type Status } from '../types/aduan.types';
import AduanSearchBar from '../components/AduanSearchBar';
import AduanTable from '../components/AduanTable';
import AduanPagination from '../components/AduanPagination';
import AduanDetail from './AduanDetail';

const PAGE_SIZE = 5;

export default function AduanList() {
  const [data, setData] = useState<Aduan[]>(DATA);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAduan, setSelectedAduan] = useState<Aduan | null>(null);

  const filtered = data.filter((d) => {
    const matchSearch =
      d.noAduan.toLowerCase().includes(search.toLowerCase()) ||
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
    // Update juga selectedAduan agar badge status langsung berubah di detail
    setSelectedAduan(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
  };

  const handleExport = () => {
    const headers = ['Tanggal', 'Ticket ID', 'Nama', 'Email', 'Status'];
    const csvRows = filtered.map(item =>
      `${item.tanggal},${item.noAduan},${item.nama},${item.email},${item.status}`
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_Aduan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedAduan) {
    return (
      <AduanDetail
        item={selectedAduan}
        onClose={() => setSelectedAduan(null)}
        onStatusChange={(newStatus) => handleStatusChange(selectedAduan.id, newStatus)}
      />
    );
  }

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Aduan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola dan cari data pengaduan nasabah</p>
      </div>

      <AduanSearchBar
        search={search}
        filterStatus={filterStatus}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onExport={handleExport}
      />

      <AduanTable data={paginated} onSelectAduan={setSelectedAduan} />

      <AduanPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
