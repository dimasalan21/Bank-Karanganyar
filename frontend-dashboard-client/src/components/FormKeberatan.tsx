'use client';
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText, User, Users, AlertCircle, Info, UploadCloud, Paperclip, X, FileCheck } from 'lucide-react';
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

  // State untuk menampung file lampiran
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // =========================================================
  // KONFIGURASI CETAK MENGGUNAKAN REACT-TO-PRINT
  // =========================================================
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Formulir_Keberatan_${formData.pemohon.nama || 'Nasabah'}`,
  });

  // Handler Input
  const handlePemohonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, pemohon: { ...formData.pemohon, [e.target.name]: e.target.value } });
  };

  const handleKuasaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, kuasa: { ...formData.kuasa, [e.target.name]: e.target.value } });
  };

  // Handler File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // =========================================================
  // LOGIKA SUBMIT: Kirim ke DB lalu Cetak PDF
  // =========================================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Mengemas data menjadi FormData siap kirim ke backend (Database)
    const payloadDatabase = new FormData();
    payloadDatabase.append('nomorPendaftaran', formData.nomorPendaftaran);
    payloadDatabase.append('tujuanPenggunaan', formData.tujuanPenggunaan);
    payloadDatabase.append('pemohon', JSON.stringify(formData.pemohon));
    payloadDatabase.append('kuasa', JSON.stringify(formData.kuasa));
    payloadDatabase.append('alasan', formData.alasan);
    payloadDatabase.append('kasusPosisi', formData.kasusPosisi);
    
    if (selectedFile) {
      payloadDatabase.append('lampiran', selectedFile);
    }

    // Simulasi pengiriman data
    console.log("Data Keberatan siap dikirim ke Database:", Object.fromEntries(payloadDatabase.entries()));

    // Jeda 150ms agar React selesai render data ke hidden PDF sebelum cetak ditarik
    setTimeout(() => {
      handlePrint();
    }, 150);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 mb-20 transition-all">
        
        {/* ========================================================= */}
        {/* KOTAK 1: FORMULIR UTAMA (TEMA MERAH KEBERATAN) */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* HEADER FORM */}
          <div className="bg-red-700 px-6 py-8 sm:p-10 text-white flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold uppercase">Formulir layanan aduan</h2>
              <p className="text-red-100 text-sm mt-1">Lengkapi data sesuai dengan surat keberatan fisik Bank Karanganyar.</p>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            {/* A. Informasi Pengajuan */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-red-700" /> A. Informasi Pengajuan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Pendaftaran Permohonan Informasi</label>
                  <input type="text" required value={formData.nomorPendaftaran} onChange={(e) => setFormData({...formData, nomorPendaftaran: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none transition-all" placeholder="Masukkan nomor pendaftaran..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan Penggunaan Informasi</label>
                  <input type="text" required value={formData.tujuanPenggunaan} onChange={(e) => setFormData({...formData, tujuanPenggunaan: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none transition-all" placeholder="Tujuan penggunaan data..." />
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
                  <input type="text" required name="nama" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                  <textarea name="alamat" required rows={2} onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
                  <input type="text" required name="pekerjaan" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                  <input type="text" required name="telepon" onChange={handlePemohonChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none" />
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
                    <input type="radio" required name="alasan" value={item} onChange={(e) => setFormData({...formData, alasan: e.target.value})} className="w-4 h-4 text-red-700 focus:ring-red-600" />
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
              <textarea required value={formData.kasusPosisi} onChange={(e) => setFormData({...formData, kasusPosisi: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none resize-none" placeholder="Tuliskan alasan detail keberatan Anda di sini..."></textarea>
            </section>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOTAK 2: LAMPIRAN DIGITAL (TEMA MERAH) */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all">
          <div className="p-8 md:p-10 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-red-700 pl-4 flex items-center gap-2">
              Dokumen Pendukung <span className="text-sm font-normal text-gray-500">(Opsional)</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Silakan unggah salinan identitas, surat penolakan sebelumnya, atau dokumen pendukung lainnya yang berkaitan dengan keberatan Anda.
            </p>
            
            {!selectedFile ? (
              <div className="relative border-2 border-dashed border-red-300 bg-red-50/30 rounded-2xl p-8 hover:bg-red-50 transition-colors text-center cursor-pointer group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <UploadCloud className="w-10 h-10 text-red-400 mx-auto mb-3 group-hover:text-red-600 transition-colors" />
                <p className="text-sm font-semibold text-gray-700">Klik atau seret file ke area ini</p>
                <p className="text-xs text-gray-500 mt-1">Mendukung format PDF, JPG, atau PNG (Maks 5MB)</p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white border border-red-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 bg-red-100 text-red-700 flex items-center justify-center rounded-lg flex-shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-gray-800 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSelectedFile(null)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  title="Hapus file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOTAK 3: TOMBOL EKSEKUSI */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all p-6 md:p-8">
          <button 
            type="submit" 
            className="w-full bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-red-800 transition-all flex items-center justify-center gap-3"
          >
            <FileCheck className="w-6 h-6" />
            Simpan Data & Cetak Formulir PDF
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            Pastikan data yang Anda isi sudah benar sebelum menyimpan dan mencetak formulir keberatan.
          </p>
        </div>

      </form>

      {/* ========================================================= */}
      {/* TEMPLATE TERSEMBUNYI UNTUK DICETAK (TIDAK BERUBAH) */}
      {/* ========================================================= */}
      <div className="hidden">
        <TemplatePDFKeberatan ref={componentRef} data={formData} />
      </div>
    </>
  );
};

export default FormKeberatan;