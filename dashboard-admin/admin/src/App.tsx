import { useState } from 'react';
import Dashboard from './pages/index';
import DaftarAduan from './pages/DaftarAduan';
import LacakPengaduan from './pages/LacakPengaduan';
import Setting from './pages/Setting';
import ManajemenUser from './pages/ManajemenUser';
import Login from './pages/Login';
import BankLogo from './assets/bank-karanganyar-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setShowWelcome(true);

    setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    setTimeout(() => {
      setShowWelcome(false);
      setIsLoggedIn(true);
    }, 2600);
  };

  // LOGIN PAGE
  if (!isLoggedIn && !showWelcome) {
    return <Login onLogin={handleLogin} />;
  }

  // WELCOME SCREEN
  if (showWelcome) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] transition-all duration-700 ${
        fadeOut ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100'
      }`}>

        <div className="text-center">

          {/* LOGO */}
          <div className="mb-8">
            <div className="w-36 h-36 mx-auto bg-white/90 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(240,165,0,0.4)]">
              <img src={BankLogo} className="w-24 object-contain" />
            </div>
          </div>

          {/* TEXT (REVISI SESUAI PERMINTAAN) */}
          <h1 className="text-4xl font-semibold text-white mb-2 tracking-wide">
            Selamat Datang Admin
          </h1>

          <p className="text-[#f0a500] text-lg font-medium mb-1">
            Bank Karanganyar
          </p>

          <p className="text-gray-400 text-sm tracking-[0.25em] uppercase">
            Dashboard Admin
          </p>

          {/* LOADING */}
          <div className="mt-8 w-24 h-1 bg-gray-700 mx-auto rounded overflow-hidden">
            <div className="h-full bg-[#f0a500] animate-loadingBar"></div>
          </div>
        </div>

        <style>{`
          @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .animate-loadingBar {
            animation: loadingBar 2.2s ease forwards;
          }
        `}</style>
      </div>
    );
  }

  // RENDER PAGE DENGAN ANIMASI MASUK
  const renderPage = () => {
    const page = (() => {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard currentPage={currentPage} onNavigate={setCurrentPage} />;
        case 'daftar-aduan':
          return <DaftarAduan currentPage={currentPage} onNavigate={setCurrentPage} />;
        case 'lacak-pengaduan':
          return <LacakPengaduan currentPage={currentPage} onNavigate={setCurrentPage} />;
        case 'manajemen-user':
          return <ManajemenUser currentPage={currentPage} onNavigate={setCurrentPage} />;
        case 'setting':
          return <Setting currentPage={currentPage} onNavigate={setCurrentPage} />;
        default:
          return <Dashboard currentPage={currentPage} onNavigate={setCurrentPage} />;
      }
    })();

    return (
      <div className="animate-pageIn">
        {page}
      </div>
    );
  };

  return (
    <>
      {renderPage()}

      <style>{`
        @keyframes pageIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-pageIn {
          animation: pageIn 0.7s ease-out;
        }
      `}</style>
    </>
  );
}

export default App;