'use client';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TemplatePDFPermohonan from './TemplatePDFPermohonan';
import logoBank from '../assets/logo2.png'; 

export interface FormDataPermohonan {
  nama: string; alamat: string; pekerjaan: string; kontak: string;
  rincian: string; tujuan: string; caraMemperoleh: string[]; caraSalinan: string;
}
const FormPermohonan: React.FC = () => {
  const { register, handleSubmit } = useForm<FormDataPermohonan>({
    defaultValues: { caraMemperoleh: [] }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormDataPermohonan | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormDataPermohonan) => {
    setIsGenerating(true);
    setFormData(data);

    setTimeout(async () => {
      try {
        if (pdfRef.current) {
          const canvas = await html2canvas(pdfRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
          
          // REVISI: Menggunakan JPEG dengan kualitas 0.8 untuk ukuran yang sangat ringan
          const imgData = canvas.toDataURL('image/jpeg', 0.8); 
          const pdf = new jsPDF('p', 'mm', 'a4');
          
          const pdfW = 210;
          const pdfH = 297;
          const imgProps = pdf.getImageProperties(imgData);
          const totalImgHeight = (imgProps.height * pdfW) / imgProps.width;

          let heightLeft = totalImgHeight;
          let position = 0;

          pdf.addImage(imgData, 'JPEG', 0, position, pdfW, totalImgHeight);
          heightLeft -= pdfH;

          while (heightLeft > 0.1) {
            position -= pdfH;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfW, totalImgHeight);
            heightLeft -= pdfH;
          }

          const safeName = data.nama ? data.nama.replace(/\s+/g, '_') : 'Pemohon';
          pdf.save(`Permohonan_Informasi_${safeName}.pdf`);
        }
      } catch (e) {
        console.error("Error Generate PDF:", e);
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-20 transition-all">
        <div className="bg-white p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-2 border border-gray-100 rounded-lg shadow-sm">
              <img src={logoBank} alt="Logo" className="w-32 md:w-40 object-contain" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-bold text-xl md:text-2xl uppercase tracking-tight text-gray-900">PT BPR BANK KARANGANYAR (PESERODA)</h1>
              <p className="text-gray-500 text-sm mt-1">Sistem Elektronik Permohonan Informasi Publik</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-gray-800 pl-4">Identitas Pemohon</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input {...register("nama", { required: "Nama harus diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
                  <input {...register("pekerjaan", { required: "Wajib diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon/Email</label>
                  <input {...register("kontak", { required: "Wajib diisi" })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 outline-none transition-all bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Domisili</label>
                  <textarea {...register("alamat", { required: "Wajib diisi" })} rows={2} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 outline-none transition-all resize-none bg-gray-50 text-gray-900" />
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Detail Permohonan</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rincian Informasi yang Dibutuhkan</label>
                <textarea {...register("rincian", { required: "Mohon isi rincian" })} rows={4} className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-900 outline-none bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan Penggunaan Informasi</label>
                <textarea {...register("tujuan", { required: "Wajib diisi" })} rows={2} className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-900 outline-none bg-gray-50 text-gray-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Cara Memperoleh</label>
                <div className="space-y-3">
                  {['Melihat', 'salinan'].map((val) => (
                    <label key={val} className="flex items-center cursor-pointer">
                      <input type="checkbox" value={val} {...register("caraMemperoleh")} className="w-5 h-5 accent-gray-900" />
                      <span className="ml-3 text-sm text-gray-700 font-medium">{val === 'Melihat' ? 'Melihat / Mencatat' : 'Salinan (Hard/Softcopy)'}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Cara Mendapatkan</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Mengambil Langsung', 'Kurir', 'Pos', 'Faksimili', 'Email'].map((opt) => (
                    <label key={opt} className="flex items-center cursor-pointer">
                      <input type="radio" value={opt} {...register("caraSalinan", { required: true })} className="w-4 h-4 accent-gray-900" />
                      <span className="ml-3 text-sm text-gray-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <button type="submit" disabled={isGenerating} className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-800 transition-all">
                {isGenerating ? 'Memproses Dokumen...' : 'Generate & Download PDF Resmi'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <TemplatePDFPermohonan ref={pdfRef} data={formData} />
    </>
  );
};

export default FormPermohonan;