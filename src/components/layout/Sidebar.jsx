import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/ax-aurix-final-for-dark-bg.png';
import {
  Home,
  MessageSquare,
  Mail,
  Image as ImageIcon,
  Settings,
  X,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Enquiries', path: '/enquiries', icon: MessageSquare },
  { name: 'Content Gallery', path: '/content-gallery', icon: ImageIcon },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <aside className={`
      fixed lg:static top-0 left-0 z-50 h-full
      bg-white/80 backdrop-blur-xl border-r border-slate-200/60 text-slate-700 w-64 flex-shrink-0 
      transition-all duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none shadow-slate-200/50
      ${sidebarOpen ? 'translate-x-0 lg:ml-0' : '-translate-x-full lg:translate-x-0 lg:-ml-64'}
    `}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-transparent mt-2 shrink-0">
        <img src={logoImage} alt="Aurix Events Logo" className="h-9 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" />
        <button 
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 mt-4 flex-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Menu</p>
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-xl group transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-blue-50/80 text-blue-700 font-semibold shadow-sm' 
                    : 'hover:bg-slate-50 text-slate-600 font-medium'
                }`
              }
            >
              {({ isActive }) => {
                const Icon = item.icon;
                return (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full" />
                    )}
                    <Icon
                      className={`w-5 h-5 mr-3 transition-colors duration-300 ${
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100/80 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-300 group relative overflow-hidden"
        >
          <LogOut className="w-5 h-5 mr-2 text-slate-400 group-hover:text-red-500 transition-colors" />
          <span className="font-semibold">Logout Account</span>
        </button>
      </div>
    </aside>
  );
}
