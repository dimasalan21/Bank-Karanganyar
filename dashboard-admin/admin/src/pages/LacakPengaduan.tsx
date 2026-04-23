import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, CheckCircle } from 'lucide-react';

export default function LacakPengaduan({ currentPage, onNavigate }: any) {
  const [resi, setResi] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (resi.trim() !== '') setIsSearched(true);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={onNavigate}>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Lacak Pengaduan</h2>
          <p className="text-gray-500 mt-1">Pantau status penyelesaian pengaduan Anda menggunakan nomor resi.</p>
        </div>

        {/* Kotak Pencarian */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Masukkan Nomor Pengaduan (Contoh: ADU-2026-0345)"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                value={resi}
                onChange={(e) => setResi(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#1a1c2d] hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Cari Data
            </button>
          </form>
        </div>

        {/* Hasil Pencarian (Muncul setelah tombol diklik) */}
        {isSearched && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 bg-[#eef2f6]">
              <h3 className="font-semibold text-gray-800">Hasil Pencarian: {resi}</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-700 rounded-full">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Pengaduan Selesai</h4>
                  <p className="text-gray-600 mb-4">Pengaduan Anda terkait <strong>Kartu ATM</strong> telah berhasil diselesaikan oleh tim kami pada tanggal 01 April 2026.</p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block">
                    <p className="text-sm text-gray-500 mb-1">Catatan Petugas:</p>
                    <p className="text-gray-700 italic">"Kartu ATM baru sudah dapat diambil di kantor cabang terdekat dengan membawa KTP asli."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}