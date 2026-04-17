import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText, User, Users, AlertCircle, Info, Printer } from 'lucide-react';
import TemplatePDFKeberatan from './TemplatePDFKeberatan';

// KATA "export" DI BAWAH INI SANGAT WAJIB ADA
export interface KeberatanData {
  nomorPendaftaran: string;
  tujuanPenggunaan: string;
  pemohon: { nama: string; alamat: string; pekerjaan: string; telepon: string };
  kuasa: { nama: string; alamat: string; pekerjaan: string; telepon: string };
  alasan: string;
  kasusPosisi: string;
}

const FormKeberatan: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<KeberatanData>({
    nomorPendaftaran: '',
    tujuanPenggunaan: '',
    pemohon: { nama: '', alamat: '', pekerjaan: '', telepon: '' },
    kuasa: { nama: '', alamat: '', pekerjaan: '', telepon: '' },
    alasan: '',
    kasusPosisi: '',
  });

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Formulir_Keberatan_${formData.pemohon.nama || 'Nasabah'}`,
  });

  const handlePemohonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, pemohon: { ...formData.pemohon, [e.target.name]: e.target.value } });
  };

  const handleKuasaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, kuasa: { ...formData.kuasa, [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-red-700 px-6 py-8 sm:p-10 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase">Formulir Pengajuan Keberatan</h2>
            <p className="text-red-100 text-sm mt-1">Lengkapi data sesuai dengan surat keberatan fisik Bank Karanganyar.</p>
          </div>
        </div>

        <form className="p-6 sm:p-10 space-y-10">
          {/* A. Informasi Pengajuan */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-red-700" /> A. Informasi Pengajuan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Pendaftaran Permohonan Informasi</label>
                <input type="text" value={formData.nomorPendaftaran} onChange={(e) => setFormData({...formData, nomorPendaftaran: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none transition-all" placeholder="Masukkan nomor pendaftaran..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan Penggunaan Informasi</label>
                <input type="text" value={formData.tujuanPenggunaan} onChange={(e) => setFormData({...formData, tujuanPenggunaan: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none transition-all" placeholder="Tujuan penggunaan data..." />
              </div>
            </div>
          </section>

          {/* Identitas Pemohon */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-red-700" /> Identitas Pemohon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" name="nama" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                <textarea name="alamat" rows={2} onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
                <input type="text" name="pekerjaan" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                <input type="text" name="telepon" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
            </div>
          </section>

          {/* Identitas Kuasa Pemohon */}
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" /> Identitas Kuasa Pemohon <span className="text-xs font-normal text-gray-400">(Opsional)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Kuasa</label>
                <input type="text" name="nama" onChange={handleKuasaChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Nomor Telepon Kuasa</label>
                <input type="text" name="telepon" onChange={handleKuasaChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-400 outline-none bg-white" />
              </div>
            </div>
          </section>

          {/* B. Alasan Pengajuan Keberatan */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-700" /> B. Alasan Pengajuan Keberatan
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Permohonan Informasi ditolak",
                "Informasi berkala tidak disediakan",
                "Permintaan informasi tidak ditanggapi",
                "Permintaan informasi ditanggapi tidak sebagaimana yang diminta",
                "Permintaan informasi tidak dipenuhi",
                "Biaya yang dikenakan tidak wajar",
                "Informasi yang disampaikan melebihi jangka waktu yang ditentukan"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-red-50 cursor-pointer transition-colors">
                  <input type="radio" name="alasan" value={item} onChange={(e) => setFormData({...formData, alasan: e.target.value})} className="w-4 h-4 text-red-700 focus:ring-red-600" />
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* C. Kasus Posisi */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-700" /> C. Kasus Posisi
            </h3>
            <textarea value={formData.kasusPosisi} onChange={(e) => setFormData({...formData, kasusPosisi: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none resize-none" placeholder="Tuliskan alasan detail keberatan Anda di sini..."></textarea>
          </section>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="button" 
              onClick={() => handlePrint()}
              className="px-10 py-4 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition-all flex items-center gap-3 shadow-xl"
            >
              <Printer className="w-5 h-5" /> Cetak Formulir PDF
            </button>
          </div>
        </form>
      </div>

      {/* TEMPLATE TERSEMBUNYI UNTUK DICETAK */}
      <div className="hidden">
        <TemplatePDFKeberatan ref={componentRef} data={formData} />
      </div>
    </div>
  );
};

export default FormKeberatan;