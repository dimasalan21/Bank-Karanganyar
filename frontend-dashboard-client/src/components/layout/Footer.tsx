import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bank-blue text-white mt-auto border-t-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Info Kontak (Sesuai referensi dokumen Anda) */}
          <div>
            <h3 className="font-bold text-lg mb-2">PT BPR BANK KARANGANYAR (PERSERODA)</h3>
            <p className="text-sm text-blue-100 mt-1">Jl. Lawu Timur No 135 Karanganyar</p>
            <p className="text-sm text-blue-100">Telp. (0271) 495489, (0271) 494666</p>
            <p className="text-sm text-blue-100">Email: info@bankkaranganyar.co.id</p>
          </div>

          {/* Hak Cipta */}
          <div className="md:text-right text-sm text-blue-200">
            <p>&copy; {new Date().getFullYear()} Bank Karanganyar.</p>
            <p>Sistem Layanan Mandiri Digital.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;