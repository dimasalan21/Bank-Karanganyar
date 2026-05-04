// components/Sidebar.tsx
import { LayoutDashboard, Search, Settings, FileText, User, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { 
      path: '/aduan', 
      label: 'Daftar Aduan', 
      icon: FileText,
      badge: { count: '5', text: 'baru', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' }
    },
    { 
      path: '/permintaan-informasi', 
      label: 'Permintaan Informasi', 
      icon: Search,
      badge: { count: '12', text: 'baru', color: 'bg-orange-400/10 text-orange-400 border-orange-400/20' }
    },
    { path: '/manajemen-user', label: 'Manajemen User', icon: Users },
    { path: '/settings', label: 'Setting', icon: Settings },
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
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-yellow-400 text-black font-semibold shadow-lg scale-[1.02]'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm flex-1">{item.label}</span>
              
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-200 ${
                  isActive 
                    ? 'bg-black/10 text-black border-black/20 font-bold' 
                    : item.badge.color
                }`}>
                  {item.badge.count} {item.badge.text}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>

  );
}