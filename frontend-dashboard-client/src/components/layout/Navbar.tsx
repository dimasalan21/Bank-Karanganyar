import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; 
// Pastikan path logo ini sesuai dengan letak file Anda
import logoBank from '../../assets/logo-final.png'; 

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // =========================================================
  // FUNGSI KHUSUS: Memaksa scroll ke atas saat Home/Logo diklik
  // =========================================================
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Memastikan menu mobile tertutup otomatis
  };

  return (
    <nav className="bg-[#123296] shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* ========================================================= */}
          {/* SISI KIRI: Logo & Nama Bank */}
          {/* ========================================================= */}
          <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3 md:gap-4 cursor-pointer">
            <div className="flex items-center justify-center">
              <img 
                src={logoBank} 
                alt="Logo Bank Karanganyar" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain p-1 transition-all duration-300" 
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x50/1e3a8a/ffffff?text=LOGO+BANK";
                }}
              />
            </div>
            <div className="hidden sm:block flex-col justify-center">
              <h1 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight tracking-wide">
                PT BPR BANK KARANGANYAR
              </h1>
              <p className="text-blue-200 text-[10px] md:text-xs font-medium tracking-widest mt-0.5">
                E-FORMULIR SYSTEM
              </p>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* SISI KANAN: Menu Navigasi Desktop */}
          {/* ========================================================= */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link 
              to="/" 
              onClick={handleHomeClick} 
              className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide"
            >
              Home
            </Link>
            
            {/* Menggunakan tag <a> agar fungsi hash-scroll (#) berfungsi dari halaman mana pun */}
            <a 
              href="/#about" 
              className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide"
            >
              About
            </a>
            <a 
              href="/#contact" 
              className="text-white text-sm font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wide"
            >
              Contact us
            </a>
          </div>

          {/* ========================================================= */}
          {/* SISI KANAN: Tombol Hamburger Menu (Mobile) */}
          {/* ========================================================= */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white hover:text-yellow-400 focus:outline-none p-1.5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MENU DROPDOWN MOBILE (Tampil saat Hamburger diklik) */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full shadow-2xl border-t border-white/10 bg-[#123296] animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 space-y-1 flex flex-col">
            <Link 
              to="/" 
              onClick={handleHomeClick}
              className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-white/10 transition-all border-b border-white/5"
            >
              Home
            </Link>
            <a 
              href="/#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-white/10 transition-all border-b border-white/5"
            >
              About
            </a>
            <a 
              href="/#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;