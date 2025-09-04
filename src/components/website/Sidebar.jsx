import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Users, 
  Settings, 
  CreditCard, 
  Activity, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  const sidebarItems = {
    ADMIN: [
      { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon size={20} /> },
      { name: 'Users', path: '/dashboard/users', icon: <Users size={20} /> },
      { name: 'Requests', path: '/dashboard/requests', icon: <Activity size={20} /> },
      { name: 'Requests', path: '/dashboard/service-providers', icon: <Activity size={20} /> },
      
      { name: 'Payments', path: '/dashboard/payments', icon: <CreditCard size={20} /> },
      { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
    ],
    AGENT: [
      { name: 'Dashboard', path: '/agent-dashboard', icon: <HomeIcon size={20} /> },
      { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ]
  };

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col shadow-md">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold text-slate-600">TopInfo</h2>
        <p className="text-sm text-gray-500">{user.role} Dashboard</p>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {sidebarItems[user.role].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 hover:bg-slate-50 rounded-md text-gray-700 hover:text-slate-600 mb-2"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;