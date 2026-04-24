'use client';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { FileCheck } from 'lucide-react'; 
import TemplatePDFPermohonan from './TemplatePDFPermohonan';
import logoBank from '../assets/logo2.png'; 

// =========================================================
// REVISI: Mengganti 'kontak' menjadi 'telepon' dan 'email'
// =========================================================
export interface FormDataPermohonan {
  nama: string; 
  alamat: string; 
  pekerjaan: string; 
  telepon: string;
  email: string;
  rincian: string; 
  tujuan: string; 
  caraMemperoleh: string[]; 
  caraSalinan: string;
}

const FormPermohonan: React.FC = () => {
  const { register, handleSubmit } = useForm<FormDataPermohonan>({
    defaultValues: { caraMemperoleh: [] }
  });

  const [formData, setFormData] = useState<FormDataPermohonan | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // =========================================================
  // KONFIGURASI CETAK MENGGUNAKAN REACT-TO-PRINT
  // =========================================================
  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `Formulir_Permohonan_Informasi`,
  });

  // =========================================================
  // LOGIKA SUBMIT: Simpan ke DB lalu Cetak PDF
  // =========================================================
  const onSubmit = (data: FormDataPermohonan) => {
    setFormData(data); 
    
    // Karena tidak ada file attachment, data bisa langsung dikirim dalam bentuk JSON
    console.log("Data Permohonan siap dikirim ke Database API:", data);

    // Jeda 150ms agar React sempat mengisi template PDF sebelum print muncul
    setTimeout(() => {
      handlePrint();
    }, 150);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6 mb-20 transition-all">
        
        {/* ========================================================= */}
        {/* KOTAK 1: FORMULIR UTAMA (TEMA BIRU BUMD) */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* HEADER BANK */}
          <div className="bg-white p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-2 border border-gray-100 rounded-lg shadow-sm bg-white">
                <img src={logoBank} alt="Logo" className="w-32 md:w-40 object-contain" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-bold text-xl md:text-2xl uppercase tracking-tight text-gray-900">PT BPR BANK KARANGANYAR (PESERODA)</h1>
                <p className="text-gray-500 text-sm mt-1">Sistem Elektronik Permohonan Informasi Publik</p>
              </div>
            </div>
          </div>

          {/* ISI FORMULIR */}
          <div className="p-8 md:p-12 space-y-10">
            {/* IDENTITAS */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-900 pl-4">Identitas Pemohon</h2>
              
              {/* Baris 1: Nama & Pekerjaan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input {...register("nama", { required: "Nama harus diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
                  <input {...register("pekerjaan", { required: "Wajib diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
              </div>

              {/* REVISI Baris 2: Telepon, Email, & Alamat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                  <input type="tel" {...register("telepon", { required: "Wajib diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" {...register("email", { required: "Wajib diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Domisili</label>
                  <textarea {...register("alamat", { required: "Wajib diisi" })} rows={2} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all resize-none bg-gray-50 text-gray-900" />
                </div>
              </div>
            </div>

            {/* DETAIL PERMOHONAN */}
            <div className="space-y-6 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Detail Permohonan</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rincian Informasi yang Dibutuhkan</label>
                <textarea {...register("rincian", { required: "Mohon isi rincian" })} rows={4} className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-900 focus:ring-0 outline-none bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan Penggunaan Informasi</label>
                <textarea {...register("tujuan", { required: "Wajib diisi" })} rows={2} className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-900 focus:ring-0 outline-none bg-gray-50 text-gray-900" />
              </div>
            </div>

            {/* CHECKBOX & RADIO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Cara Memperoleh</label>
                <div className="space-y-3">
                  {['Melihat', 'salinan'].map((val) => (
                    <label key={val} className="flex items-center cursor-pointer group">
                      <input type="checkbox" value={val} {...register("caraMemperoleh")} className="w-5 h-5 accent-blue-900" />
                      <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-900 transition-colors">{val === 'Melihat' ? 'Melihat / Mencatat' : 'Salinan (Hard/Softcopy)'}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Cara Mendapatkan</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Mengambil Langsung', 'Kurir', 'Pos', 'Faksimili', 'Email'].map((opt) => (
                    <label key={opt} className="flex items-center cursor-pointer group">
                      <input type="radio" value={opt} {...register("caraSalinan", { required: true })} className="w-4 h-4 accent-blue-900" />
                      <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOTAK 2: TOMBOL EKSEKUSI */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all p-6 md:p-8">
          <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-3">
            <FileCheck className="w-6 h-6" />
            Simpan Data & Cetak Formulir PDF
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            Pastikan data yang Anda isi sudah benar sebelum menyimpan dan mencetak formulir.
          </p>
        </div>

      </form>

      {/* ========================================================= */}
      {/* TEMPLATE TERSEMBUNYI UNTUK DICETAK */}
      {/* ========================================================= */}
      <div className="hidden">
        <TemplatePDFPermohonan ref={pdfRef} data={formData} />
      </div>
    </>
  );
};

export default FormPermohonan;