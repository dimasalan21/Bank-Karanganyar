import { ChevronLeft, Hash } from 'lucide-react';
import { type PermintaanInformasi, type Status } from '../types/permintaan.types';
import PermintaanInfoCard from '../components/PermintaanInfoCard';
import PermintaanStatusCard from '../components/PermintaanStatusCard';

interface PermintaanDetailProps {
  item: PermintaanInformasi;
  onClose: () => void;
  onStatusChange?: (newStatus: Status) => void;
}

export default function PermintaanDetail({ item, onClose, onStatusChange }: PermintaanDetailProps) {
  const handleEmailReply = () => {
    const subject = encodeURIComponent(`Balasan Permintaan Informasi ${item.noTiket} - ${item.kategori}`);
    const body = encodeURIComponent(
      `Yth. ${item.nama},\n\nTerima kasih telah menghubungi kami terkait permintaan informasi nomor ${item.noTiket}.\n\n[Tulis balasan Anda di sini]\n\nHormat kami,\nTim Layanan Nasabah`
    );
    window.open(`mailto:${item.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWaReply = () => {
    const message = encodeURIComponent(
      `Halo ${item.nama}, kami dari Tim Layanan Nasabah terkait permintaan informasi Anda nomor *${item.noTiket}* (${item.kategori}).\n\n[Tulis balasan Anda di sini]\n\nTerima kasih.`
    );
    window.open(`https://wa.me/${item.noWa}?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={onClose} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeft size={18} />
          Kembali ke Daftar Permintaan
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Detail Permintaan Informasi</h1>
        <p className="text-gray-500 text-sm mt-1">{item.noTiket} · {item.kategori} · {item.tanggal}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Kolom kiri */}
        <div className="lg:col-span-2 space-y-5">
          <PermintaanInfoCard item={item} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deskripsi Permintaan</h2>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-gray-500" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-1 break-words whitespace-pre-line">{item.deskripsi}</p>
            </div>
          </div>
        </div>

        {/* Kolom kanan: Status saja */}
        <div className="space-y-5">
          <PermintaanStatusCard
            item={item}
            onEmailReply={handleEmailReply}
            onWaReply={handleWaReply}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
