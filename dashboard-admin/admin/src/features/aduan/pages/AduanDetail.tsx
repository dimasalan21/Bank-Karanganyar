import { useState } from 'react';
import { ChevronLeft, Hash, UploadCloud } from 'lucide-react';
import { type Aduan, type Status } from '../types/aduan.types';
import AduanInfoCard from '../components/AduanInfoCard';
import AduanStatusCard from '../components/AduanStatusCard';
import AduanLampiranCard from '../components/AduanLampiranCard';

interface AdminResponse {
  message: string;
  email: string;
  attachmentName?: string;
  createdAt: string;
}

interface AduanDetailProps {
  item: Aduan;
  onClose: () => void;
  onStatusChange?: (newStatus: Status) => void;
}

export default function AduanDetail({ item, onClose, onStatusChange }: AduanDetailProps) {
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);
  const [adminResponse, setAdminResponse] = useState<AdminResponse | null>(null);

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
        <div className="lg:col-span-2 space-y-5">
          <AduanInfoCard item={item} />
        </div>

        <div className="space-y-5">
          <AduanStatusCard
            item={item}
            onStatusChange={onStatusChange}
          />
        </div>

        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Deskripsi Aduan</h2>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-gray-500" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-1 break-words whitespace-pre-line">{item.deskripsi}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Kirim Balasan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2" htmlFor="replyMessage">
                  Pesan Balasan
                </label>
                <textarea
                  id="replyMessage"
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  placeholder="Tulis pesan balasan..."
                  className="w-full min-h-[140px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <p className="block text-xs font-semibold text-gray-500 mb-2">Kirim Dokumen (opsional)</p>
                <label
                  htmlFor="replyAttachment"
                  className="group flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50 px-5 py-10 text-center text-sm text-gray-500 transition hover:border-blue-300 hover:bg-blue-100 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Klik atau seret file ke area ini</p>
                    <p className="mt-1 text-xs text-gray-400">Mendukung format PDF, JPG, PNG (maks 5MB)</p>
                  </div>
                  <input
                    id="replyAttachment"
                    type="file"
                    onChange={(event) => setReplyAttachment(event.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
                {replyAttachment && (
                  <p className="mt-2 text-xs text-gray-500">File terpilih: {replyAttachment.name}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!replyMessage.trim()) return;
                  setAdminResponse({
                    email: 'admin@bank.com',
                    message: replyMessage.trim(),
                    attachmentName: replyAttachment?.name,
                    createdAt: new Date().toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }),
                  });
                  setReplyMessage('');
                  setReplyAttachment(null);
                }}
                disabled={replyMessage.trim().length === 0}
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition-colors"
              >
                Kirim Balasan
              </button>
            </div>
          </div>

          <AduanLampiranCard lampiran={item.lampiran ?? []} />
        </div>
      </div>

      <div className="mt-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Respon Admin</h2>
            {adminResponse && (
              <span className="text-xs text-gray-500">Disimpan: {adminResponse.createdAt}</span>
            )}
          </div>
          {adminResponse ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Email Admin</p>
                <p className="text-sm text-gray-700 font-medium">{adminResponse.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Pesan Respon</p>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-line">
                  {adminResponse.message}
                </div>
              </div>
              {adminResponse.attachmentName && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Lampiran</p>
                  <p className="text-sm text-gray-700">{adminResponse.attachmentName}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Belum ada respon admin.</p>
          )}
        </div>
      </div>
    </div>
  );
}
