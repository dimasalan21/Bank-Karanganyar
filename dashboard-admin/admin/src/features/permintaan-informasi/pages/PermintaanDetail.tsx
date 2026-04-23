import { ChevronLeft, User, Mail, Phone, MapPin, Hash, MessageCircle } from 'lucide-react';
import { STATUS_STYLE, type PermintaanInformasi } from '../types/permintaan.types';

interface PermintaanDetailProps {
  item: PermintaanInformasi;
  onClose: () => void;
}

export default function PermintaanDetail({ item, onClose }: PermintaanDetailProps) {
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
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={18} />
          Kembali ke Daftar Permintaan
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Detail Permintaan Informasi</h1>
        <p className="text-gray-500 text-sm mt-1">{item.noTiket} · {item.kategori} · {item.tanggal}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT – Info Nasabah */}
        <div className="lg:col-span-2 space-y-5">
          {/* Informasi Nasabah */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wide">Informasi Pemohon</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <User size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Nama Pemohon</p>
                  <p className="text-base font-semibold text-gray-800">{item.nama}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-base text-gray-700">{item.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">No. WhatsApp</p>
                  <p className="text-base text-gray-700">+{item.noWa}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Alamat</p>
                  <p className="text-base text-gray-700">{item.alamat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deskripsi Permintaan</h2>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-gray-500" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-1">{item.deskripsi}</p>
            </div>
          </div>
        </div>

        {/* RIGHT – Status & Aksi */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Status Permintaan</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${STATUS_STYLE[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Kategori</p>
                <p className="text-sm text-gray-700 font-medium">{item.kategori}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Tanggal Masuk</p>
                <p className="text-sm text-gray-700">{item.tanggal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">No. Tiket</p>
                <p className="text-sm font-semibold text-gray-800">{item.noTiket}</p>
              </div>
            </div>
          </div>

          {/* Kirim Balasan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Kirim Balasan</h2>
            <div className="space-y-3">
              <button
                onClick={handleEmailReply}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1c2d] text-white text-sm font-medium hover:bg-[#2a2d42] transition-colors"
              >
                <Mail size={16} />
                Balas via Email
              </button>
              <button
                onClick={handleWaReply}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={16} />
                Balas via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
