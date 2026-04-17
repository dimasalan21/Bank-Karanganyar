import React from 'react';
import type { FormDataPermohonan } from './FormPermohonan';
import logoBank from '../assets/logo2.png'; 

interface TemplateProps {
  data: FormDataPermohonan | null;
}

const A4_W = 794;
const A4_H = 1123;
const PAD_X = 85; 
const PAD_Y = 70; // MARGIN 1 SPASI: Melindungi Atas & Bawah Kertas
const FONT = '"Times New Roman", Times, serif';

// ─────────────────────────────────────────────────────────────
// PEMISAH TEKS CERDAS
// ─────────────────────────────────────────────────────────────
const splitTextToFlow = (rincian: string, tujuan: string) => {
  const safeRincian = rincian || '';
  const safeTujuan = tujuan || '';
  
  const MAX_CHARS_P1 = 1200; 

  const totalTextLen = safeRincian.length + safeTujuan.length;
  const isMulti = totalTextLen > 800; 

  let rP1 = safeRincian; let rP2 = '';
  let tP1 = safeTujuan;  let tP2 = '';

  if (isMulti) {
    if (safeRincian.length > MAX_CHARS_P1) {
      let breakIdx = safeRincian.lastIndexOf(' ', MAX_CHARS_P1);
      if (breakIdx === -1) breakIdx = MAX_CHARS_P1;
      rP1 = safeRincian.slice(0, breakIdx);
      rP2 = safeRincian.slice(breakIdx + 1);
      tP1 = '';
      tP2 = safeTujuan;
    } else {
      rP1 = safeRincian;
      const remaining = MAX_CHARS_P1 - safeRincian.length;
      if (safeTujuan.length > remaining) {
        let breakIdx = safeTujuan.lastIndexOf(' ', remaining);
        if (breakIdx === -1) breakIdx = remaining;
        tP1 = safeTujuan.slice(0, breakIdx);
        tP2 = safeTujuan.slice(breakIdx + 1);
      } else {
        tP1 = safeTujuan;
      }
    }
  }

  return { rP1, rP2, tP1, tP2, isMulti };
};

// ─────────────────────────────────────────────────────────────
// KOMPONEN SMARTLINE
// ─────────────────────────────────────────────────────────────
const SmartLine = ({ text = '', minLines = 1, justify = false }: { text?: string, minLines?: number, justify?: boolean }) => {
  const safeText = text || '';
  const actualLines = Math.max(minLines, Math.ceil(safeText.length / 75));

  return (
    <div style={{ flex: 1, position: 'relative', minHeight: actualLines * 24, paddingLeft: 10 }}>
      <div style={{ position: 'absolute', top: 0, left: 10, right: 0, zIndex: 0 }}>
        {Array.from({ length: actualLines }).map((_, i) => (
          <div key={i} style={{ height: 24, borderBottom: '1.5px dotted #666', boxSizing: 'border-box' }} />
        ))}
      </div>
      
      {safeText.trim().length > 0 && (
        <div style={{
          position: 'relative', 
          zIndex: 1, 
          backgroundColor: '#fff', 
          textAlign: justify ? 'justify' : 'left', 
          fontSize: 13.5, 
          lineHeight: '24px', 
          color: '#000', 
          paddingBottom: 2, 
          minHeight: actualLines * 24, 
          width: '100%',
          wordWrap: 'break-word'
        }}>
          {safeText}
        </div>
      )}
    </div>
  );
};

// REVISI: MarginTop hack dihapus, biarkan Flexbox menyelaraskan secara natural
const CheckIcon = ({ checked }: { checked: boolean }) => (
  <div style={{
    width: 14, height: 14, border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: '#fff', flexShrink: 0
  }}>
    {checked && (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )}
  </div>
);

// Pembungkus Kertas A4
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: A4_W,
    height: A4_H, 
    padding: `${PAD_Y}px ${PAD_X}px`, 
    backgroundColor: '#fff',
    fontFamily: FONT,
    boxSizing: 'border-box',
    position: 'relative',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden' 
  }}>
    {children}
  </div>
);

const TemplatePDFPermohonan = React.forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  if (!data) return null;

  const namaPemohon = data.nama || '';
  const { rP1, rP2, tP1, tP2, isMulti } = splitTextToFlow(data.rincian, data.tujuan);
  const tanggalHariIni = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  // ─────────────────────────────────────────────────────────────
  // REVISI CHECKBOXES: Memakai alignItems: 'center' pada anak baris agar sejajar sempurna
  // ─────────────────────────────────────────────────────────────
  const RenderCheckboxes = () => (
    <div style={{ marginTop: 30 }}> 
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 15 }}>
        {/* Label Induk Diberi paddingTop: 2 agar selaras dengan anak yang ter-center */}
        <div style={{ width: 185, fontSize: 13, paddingTop: 2 }}>Cara Memperoleh Informasi**</div>
        <div style={{ width: 22, textAlign: 'center', paddingTop: 2 }}>:</div>
        
        <div style={{ flex: 1, fontSize: 12, paddingLeft: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* BARIS ANAK: Menggunakan alignItems: 'center' agar kotak tidak mengambang */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20 }}>1.</div>
            <CheckIcon checked={data.caraMemperoleh.includes('Melihat')} />
            <div>Melihat/membaca/mendengarkan/mencatat***</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20 }}>2.</div>
            <CheckIcon checked={data.caraMemperoleh.includes('salinan')} />
            <div>Mendapatkan salinan (hardcopy/softcopy)***</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Label Induk Diberi paddingTop: 2 agar selaras dengan anak yang ter-center */}
        <div style={{ width: 185, fontSize: 13, paddingTop: 2 }}>Cara Mendapatkan Salinan**</div>
        <div style={{ width: 22, textAlign: 'center', paddingTop: 2 }}>:</div>
        
        <div style={{ flex: 1, fontSize: 12, paddingLeft: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Mengambil Langsung', 'Kurir', 'Pos', 'Faksimili', 'Email'].map((opt, i) => (
            <div key={opt} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20 }}>{i + 1}.</div>
              <CheckIcon checked={data.caraSalinan === opt} />
              <div>{opt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RenderSignatures = ({ hasTextAbove }: { hasTextAbove: boolean }) => (
    <div style={{ marginTop: hasTextAbove ? 40 : 10 }}>
      <div style={{ textAlign: 'right', marginBottom: 30, fontSize: 13 }}>
        Karanganyar, {tanggalHariIni}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: 13 }}>
        <div style={{ width: 220 }}>
          Petugas Pelayan Informasi
          <div style={{ height: 60 }} />
          ( ............................................ )
        </div>
        <div style={{ width: 220 }}>
          Pemohon Informasi
          <div style={{ height: 60 }} />
          <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: 14 }}>
            {namaPemohon ? namaPemohon.toUpperCase() : '............................................'}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30, fontSize: 10, lineHeight: 1.5 }}>
        Keterangan : <br/>
        *' Diisi oleh petugas berdasarkan nomor registrasi permohonan informasi publik <br/>
        **' Pilih salah satu dengan memberi tanda (v) <br/>
        ***' Coret yang tidak perlu
      </div>
    </div>
  );

  return (
    <div style={{ position: 'absolute', top: 0, left: -9999 }}>
      <div ref={ref} style={{ width: A4_W }}>
        
        {/* ================= HALAMAN 1 ================= */}
        <PageWrapper> 
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <img src={logoBank} style={{ width: 230 }} alt="Logo Bank" />
            <div style={{ flex: 1, textAlign: 'center', lineHeight: 1.25 }}>
              <div style={{ fontWeight: 'bold', fontSize: 19, letterSpacing: 0.5 }}>PT BPR BANK KARANGANYAR (PESERODA)</div>
              <div style={{ fontSize: 12.5, marginTop: 4 }}>Jl. Lawu Timur no 135 Karanganyar</div>
              <div style={{ fontSize: 12.5, marginTop: 2 }}>Telp. (0271) 495489, (0271) 494666</div>
              <div style={{ fontSize: 12.5, marginTop: 2 }}>Email: info@bankkaranganyar.co.id</div>
            </div>
          </div>
          <div style={{ borderBottom: '3.5px solid #000', width: '100%' }} />
          <div style={{ borderBottom: '1px solid #000', width: '100%', marginTop: 2 }} />
          
          <div style={{ textAlign: 'center', marginTop: 25, marginBottom: 25 }}>
            <div style={{ fontWeight: 'bold', fontSize: 15, textDecoration: 'underline' }}>FORMULIR PERMOHONAN INFORMASI</div>
            <div style={{ fontSize: 12, marginTop: 10 }}>
              <strong>No. Pendaftaran</strong> <em style={{ fontSize: 10 }}>(diisi petugas)*</em> : ........................................
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Nama', val: namaPemohon, minLines: 1 },
              { label: 'Alamat', val: data.alamat || '', minLines: 2 },
              { label: 'Pekerjaan', val: data.pekerjaan || '', minLines: 1 },
              { label: 'Nomor Telepon/Email', val: data.kontak || '', minLines: 1 },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ width: 185, fontSize: 13.5, paddingTop: 4 }}>{item.label}</div>
                <div style={{ width: 22, textAlign: 'center', paddingTop: 4 }}>:</div>
                <SmartLine text={item.val} minLines={item.minLines} />
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 8 }}>
              <div style={{ width: 185, fontSize: 13, paddingTop: 6 }}>
                Rincian Informasi yang dibutuhkan <br/>
                <em style={{ fontSize: 10, fontStyle: 'italic' }}>(tambahkan kertas bila perlu)</em>
              </div>
              <div style={{ width: 22, textAlign: 'center', paddingTop: 6 }}>:</div>
              <SmartLine text={rP1} minLines={3} justify={true} />
            </div>

            {tP1 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 8 }}>
                <div style={{ width: 185, fontSize: 13, paddingTop: 6 }}>Tujuan Penggunaan Informasi</div>
                <div style={{ width: 22, textAlign: 'center', paddingTop: 6 }}>:</div>
                <SmartLine text={tP1} minLines={3} justify={true} />
              </div>
            )}
          </div>

          {!isMulti && (
            <>
              <RenderCheckboxes />
              <RenderSignatures hasTextAbove={true} />
            </>
          )}
        </PageWrapper>

        {/* ================= HALAMAN 2 ================= */}
        {isMulti && (
          <PageWrapper>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {rP2 && (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ width: 185 }}></div>
                  <div style={{ width: 22 }}></div>
                  <SmartLine text={rP2} justify={true} />
                </div>
              )}

              {tP2 && (
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: rP2 ? 10 : 0 }}>
                  <div style={{ width: 185, fontSize: 13, paddingTop: 6 }}>{tP1 ? '' : 'Tujuan Penggunaan Informasi'}</div>
                  <div style={{ width: 22, textAlign: 'center', paddingTop: 6 }}>{tP1 ? '' : ':'}</div>
                  <SmartLine text={tP2} justify={true} />
                </div>
              )}
            </div>

            <RenderCheckboxes />
            <RenderSignatures hasTextAbove={!!(rP2 || tP2)} />
          </PageWrapper>
        )}

      </div>
    </div>
  );
});

TemplatePDFPermohonan.displayName = 'TemplatePDFPermohonan';
export default TemplatePDFPermohonan;