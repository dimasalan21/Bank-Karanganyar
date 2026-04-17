// components/Sidebar.tsx
import { LayoutDashboard, Search, Settings, FileText, User, Users } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ isOpen, onClose, currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'daftar-aduan', label: 'Daftar Aduan', icon: FileText },
    { id: 'lacak-pengaduan', label: 'Lacak Pengaduan', icon: Search },
    { id: 'manajemen-user', label: 'Manajemen User', icon: Users },
    { id: 'setting', label: 'Setting', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-72 bg-gradient-to-b from-[#1a1c2d] to-[#101223] h-screen text-white flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 shadow-2xl pt-16`}
    >
      {/* PROFILE CARD - LANGSUNG DI ATAS */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 rounded-xl p-3.5 border border-yellow-400/30 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center text-[#1a1c2d] shadow-lg flex-shrink-0">
              <User size={24} strokeWidth={2.5} />
            </div>
            
            {/* Info Profile */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin Sistem</p>
              <p className="text-xs text-gray-300 truncate">admin@bprkaranganyar</p>
            </div>
          </div>
          
          {/* Badge Role */}
          <div className="mt-2.5 pt-2.5 border-t border-yellow-400/20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/30 text-yellow-200 border border-yellow-400/40">
              Super Administrator
            </span>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-yellow-400 text-black font-semibold shadow-lg scale-[1.02]'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}