import React, { forwardRef } from 'react';
import type { FormDataPermohonan } from './FormPermohonan';
import logoBank from '../assets/logo2.png'; 

interface TemplateProps {
  data: FormDataPermohonan | null;
}

const TemplatePDFPermohonan = forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  if (!data) return null;

  const getTodayDate = () => {
    return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const namaPemohon = data.nama || '';

  const CheckIcon = ({ checked }: { checked: boolean }) => (
    <div className="w-[14px] h-[14px] border border-black flex items-center justify-center mr-3 bg-white flex-shrink-0">
      {checked && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );

  return (
    <div ref={ref} className="w-[210mm] min-h-[297mm] bg-white pt-[0mm] px-[20mm] pb-[20mm] text-black font-serif mx-auto box-border">
      
      {/* HEADER / KOP SURAT - Identik dengan Keberatan */}
      <div className="flex items-center border-b-4 border-black pb-4 mb-2">
        <div className="w-[240px] flex-shrink-0 mr-4">
          <img src={logoBank} alt="Logo Bank Karanganyar" className="w-full h-auto object-contain" />
        </div>
        
        <div className="flex-1 text-center space-y-0.5 mt-2">
          <h1 className="font-bold text-[18px] uppercase">
            PT BPR BANK KARANGANYAR (PERSERODA)
          </h1>
          <p className="text-[13px]">Jl. Lawu Timur no 135 Karanganyar</p>
          <p className="text-[13px]">Telp. (0271) 495489, (0271) 494666</p>
          <p className="text-[13px]">Email: info@bankkaranganyar.co.id</p>
        </div>
      </div>

      <div className="text-center mt-8 mb-8">
        <h2 className="font-bold text-[15px] underline uppercase">FORMULIR PERMOHONAN INFORMASI</h2>
        <p className="text-[12px] mt-3">
          <span className="font-bold">No. Pendaftaran</span> <em className="text-[10px]">(diisi petugas)*</em> : ........................................
        </p>
      </div>

      <div className="text-[12px] space-y-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-[200px] py-1.5 align-top">Nama</td>
              <td className="w-[15px] align-top py-1.5">:</td>
              <td className="px-2 align-top py-1.5">{namaPemohon || '.......................................................................................'}</td>
            </tr>
            <tr>
              <td className="py-1.5 align-top">Alamat</td>
              <td className="align-top py-1.5">:</td>
              <td className="px-2 align-top py-1.5">{data.alamat || '.......................................................................................'}</td>
            </tr>
            <tr>
              <td className="py-1.5 align-top">Pekerjaan</td>
              <td className="align-top py-1.5">:</td>
              <td className="px-2 align-top py-1.5">{data.pekerjaan || '.......................................................................................'}</td>
            </tr>
            <tr>
              <td className="py-1.5 align-top">Nomor Telepon/Email</td>
              <td className="align-top py-1.5">:</td>
              <td className="px-2 align-top py-1.5">{data.kontak || '.......................................................................................'}</td>
            </tr>
            <tr>
              <td className="py-1.5 align-top pt-4">Rincian Informasi yang dibutuhkan</td>
              <td className="align-top pt-4">:</td>
              <td className="px-2 align-top pt-4 text-justify whitespace-pre-wrap">{data.rincian || '.......................................................................................'}</td>
            </tr>
            <tr>
              <td className="py-1.5 align-top pt-4">Tujuan Penggunaan Informasi</td>
              <td className="align-top pt-4">:</td>
              <td className="px-2 align-top pt-4 text-justify whitespace-pre-wrap">{data.tujuan || '.......................................................................................'}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 space-y-4">
          <div className="flex items-start">
            <div className="w-[200px] pt-1">Cara Memperoleh Informasi**</div>
            <div className="w-[15px] pt-1">:</div>
            <div className="flex-1 pl-2 space-y-3">
              <div className="flex items-center">
                <div className="w-[25px]">1.</div>
                <CheckIcon checked={data.caraMemperoleh.includes('Melihat')} />
                <div>Melihat/membaca/mendengarkan/mencatat***</div>
              </div>
              <div className="flex items-center">
                <div className="w-[25px]">2.</div>
                <CheckIcon checked={data.caraMemperoleh.includes('salinan')} />
                <div>Mendapatkan salinan (hardcopy/softcopy)***</div>
              </div>
            </div>
          </div>
          <div className="flex items-start pt-2">
            <div className="w-[200px] pt-1">Cara Mendapatkan Salinan**</div>
            <div className="w-[15px] pt-1">:</div>
            <div className="flex-1 pl-2 space-y-3">
              {['Mengambil Langsung', 'Kurir', 'Pos', 'Faksimili', 'Email'].map((opt, i) => (
                <div key={opt} className="flex items-center">
                  <div className="w-[25px]">{i + 1}.</div>
                  <CheckIcon checked={data.caraSalinan === opt} />
                  <div>{opt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="break-inside-avoid pt-12">
          <div className="flex justify-between">
            <div className="w-[45%] flex flex-col items-center text-center">
              <div className="h-[40px]"><p>Petugas Pelayan Informasi</p></div>
              <div className="mt-20 w-full flex flex-col items-center">
                <p className="whitespace-nowrap">( ................................................ )</p>
              </div>
            </div>
            <div className="w-[45%] flex flex-col items-center text-center">
              <div className="h-[20px] mb-2"><p className="text-[12px]">Karanganyar, {getTodayDate()}</p></div>
              <div className="h-[40px]"><p>Pemohon Informasi</p></div>
              <div className="mt-20 w-full flex flex-col items-center">
                <p className="whitespace-nowrap">
                  ( {namaPemohon ? <span className="font-bold underline uppercase px-2">{namaPemohon}</span> : '................................................'} )
                </p>
              </div>
            </div>
          </div>
          <div className="mt-14 text-[10px] italic text-gray-700">
            Keterangan : *' Diisi petugas; **' Pilih salah satu; ***' Coret yang tidak perlu
          </div>
        </div>
      </div>
    </div>
  );
});

TemplatePDFPermohonan.displayName = 'TemplatePDFPermohonan';
export default TemplatePDFPermohonan;