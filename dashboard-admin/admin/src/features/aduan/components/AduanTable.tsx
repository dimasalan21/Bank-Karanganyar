import { Eye, Search } from 'lucide-react';
import { STATUS_STYLE, type Aduan } from '../types/aduan.types';

interface AduanTableProps {
  data: Aduan[];
  onSelectAduan: (item: Aduan) => void;
}

export default function AduanTable({ data, onSelectAduan }: AduanTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* TABLE HEAD */}
      <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
        <div>Tanggal</div>
        <div>Ticket ID</div>
        <div>Nama</div>
        <div>Email</div>
        <div>Status</div>
        <div>Aksi</div>
      </div>

      {/* ROWS */}
      {data.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Tidak ada data yang ditemukan</p>
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-6 px-6 py-4 border-t border-gray-50 text-sm items-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-gray-500">{item.tanggal}</div>
            <div className="font-semibold text-gray-800">{item.noAduan}</div>
            <div className="text-gray-600">{item.nama}</div>
            <div className="text-gray-600 truncate mr-2" title={item.email}>{item.email}</div>
            <div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_STYLE[item.status]}`}>
                {item.status}
              </span>
            </div>
            <div>
              <button
                onClick={() => onSelectAduan(item)}
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
  );
}
