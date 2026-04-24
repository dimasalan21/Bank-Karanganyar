import { useState } from 'react';
import { Mail, MessageCircle, Pencil, Check, X } from 'lucide-react';
import { STATUS_STYLE, type PermintaanInformasi, type Status } from '../types/permintaan.types';

interface PermintaanStatusCardProps {
  item: PermintaanInformasi;
  onEmailReply: () => void;
  onWaReply: () => void;
  onStatusChange?: (newStatus: Status) => void;
}

export default function PermintaanStatusCard({ item, onEmailReply, onWaReply, onStatusChange }: PermintaanStatusCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStatus, setTempStatus] = useState<Status>(item.status);

  const handleEdit = () => {
    setTempStatus(item.status);
    setIsEditing(true);
  };

  const handleSave = () => {
    onStatusChange?.(tempStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempStatus(item.status);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Status Permintaan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Status Permintaan
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Status</p>
              {onStatusChange && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors font-medium"
                >
                  <Pencil size={11} />
                  Edit Status
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value as Status)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                >
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"
                  >
                    <Check size={13} />
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <X size={13} />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${STATUS_STYLE[item.status]}`}>
                {item.status}
              </span>
            )}
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
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Kirim Balasan
        </h2>
        <div className="space-y-3">
          <button
            onClick={onEmailReply}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1c2d] text-white text-sm font-medium hover:bg-[#2a2d42] transition-colors"
          >
            <Mail size={16} />
            Balas via Email
          </button>
          <button
            onClick={onWaReply}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={16} />
            Balas via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
