import { ChevronLeft, Hash } from 'lucide-react';
import { type Aduan, type Status } from '../types/aduan.types';
import AduanInfoCard from '../components/AduanInfoCard';
import AduanStatusCard from '../components/AduanStatusCard';
import AduanLampiranCard from '../components/AduanLampiranCard';

interface AduanDetailProps {
  item: Aduan;
  onClose: () => void;
  onStatusChange?: (newStatus: Status) => void;
}

export default function AduanDetail({ item, onClose, onStatusChange }: AduanDetailProps) {
  const handleEmailReply = () => {
    const subject = encodeURIComponent(`Balasan Aduan ${item.noAduan} - ${item.kategori}`);
    const body = encodeURIComponent(
      `Yth. ${item.nama},\n\nTerima kasih telah menghubungi kami terkait aduan nomor ${item.noAduan}.\n\n[Tulis balasan Anda di sini]\n\nHormat kami,\nTim Layanan Nasabah`
    );
    window.open(`mailto:${item.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWaReply = () => {
    const message = encodeURIComponent(
      `Halo ${item.nama}, kami dari Tim Layanan Nasabah terkait aduan Anda nomor *${item.noAduan}* (${item.kategori}).\n\n[Tulis balasan Anda di sini]\n\nTerima kasih.`
    );
    window.open(`https://wa.me/${item.noWa}?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={onClose} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeft size={18} />
          Kembali ke Daftar Aduan
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Detail Aduan</h1>
        <p className="text-gray-500 text-sm mt-1">{item.noAduan} · {item.kategori} · {item.tanggal}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Kolom kiri */}
        <div className="lg:col-span-2 space-y-5">
          <AduanInfoCard item={item} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deskripsi Aduan</h2>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-gray-500" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-1 break-words whitespace-pre-line">{item.deskripsi}</p>
            </div>
          </div>
        </div>

        {/* Kolom kanan: Status → Lampiran (bawah) */}
        <div className="space-y-5">
          <AduanStatusCard
            item={item}
            onEmailReply={handleEmailReply}
            onWaReply={handleWaReply}
            onStatusChange={onStatusChange}
          />
          <AduanLampiranCard lampiran={item.lampiran ?? []} />
        </div>
      </div>
    </div>
  );
}
