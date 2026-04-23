import { useState } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { DATA, STATUS_STYLE, type Aduan } from '../types/aduan.types';
import AduanDetail from './AduanDetail';

const PAGE_SIZE = 5;

export default function AduanList() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAduan, setSelectedAduan] = useState<Aduan | null>(null);

  const filtered = DATA.filter((d) => {
    const matchSearch =
      d.noAduan.toLowerCase().includes(search.toLowerCase()) ||
      d.kategori.toLowerCase().includes(search.toLowerCase()) ||
      d.nama.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleFilter = (val: string) => {
    setFilterStatus(val);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = ['No. Aduan', 'Nama Nasabah', 'Kategori', 'Status', 'Tanggal'];
    const csvRows = filtered.map(item =>
      `${item.noAduan},${item.nama},${item.kategori},${item.status},${item.tanggal}`
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
      />
    );
  }

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Aduan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola dan cari data pengaduan nasabah</p>
      </div>

      {/* SEARCH + FILTER + EXPORT */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5 flex flex-wrap items-center gap-3 justify-between">
        <div className="relative w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari no. aduan, kategori, atau nama..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Selesai">Selesai</option>
            <option value="Dalam Proses">Dalam Proses</option>
            <option value="Ditolak">Ditolak</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors shadow-sm"
          >
            <Download size={18} className="text-gray-500" />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* TABLE HEAD */}
        <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
          <div>No. Aduan</div>
          <div className="col-span-1">Nama Nasabah</div>
          <div>Kategori</div>
          <div>Status</div>
          <div>Tanggal</div>
          <div>Aksi</div>
        </div>

        {/* ROWS */}
        {paginated.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Tidak ada data yang ditemukan</p>
          </div>
        ) : (
          paginated.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 px-6 py-4 border-t border-gray-50 text-sm items-center hover:bg-gray-50 transition-colors"
            >
              <div className="font-semibold text-gray-800">{item.noAduan}</div>
              <div className="text-gray-600">{item.nama}</div>
              <div className="text-gray-600">{item.kategori}</div>
              <div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_STYLE[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <div className="text-gray-500">{item.tanggal}</div>
              <div>
                <button
                  onClick={() => setSelectedAduan(item)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1c2d] text-white hover:bg-[#2a2d42] transition-colors"
                >
                  <Eye size={13} />
                  Detail
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-500">
          Menampilkan {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} data
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                n === currentPage
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
