import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/ax-aurix-final-for-dark-bg.png';
import {
  Home,
  MessageSquare,
  Mail,
  Image,
  Settings,
  X,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Enquiries', path: '/enquiries', icon: MessageSquare },
  { name: 'Content Gallery', path: '/content-gallery', icon: Image },
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
      bg-white border-r border-slate-200 text-slate-700 w-64 flex-shrink-0 
      transition-all duration-300 ease-in-out flex flex-col
      ${sidebarOpen ? 'translate-x-0 lg:ml-0' : '-translate-x-full lg:translate-x-0 lg:-ml-64'}
    `}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-transparent mt-2 shrink-0">
        <img src={logoImage} alt="Aurix Events Logo" className="h-10 w-auto object-contain" />
        <button 
          className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 mt-2 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg group transition-all ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-600'
                }`
              }
            >
              {({ isActive }) => {
                const Icon = item.icon;
                return (
                  <>
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
