import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  ClipboardList, 
  LogOut, 
  Menu,
  Bell
} from 'lucide-react';

const AgentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications] = useState([]);
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { title: 'Requests', icon: <ClipboardList size={20} />, path: '/requests' },
    { title: 'Users', icon: <Users size={20} />, path: '/users' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold">Agent Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            )}
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:static lg:translate-x-0 z-20 
            bg-white border-r border-gray-200 
            w-64 h-[calc(100vh-4rem)] 
            transition-transform duration-200 ease-in-out
          `}
        >
          <nav className="h-full flex flex-col p-4">
            <div className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg
                    ${location.pathname === item.path
                      ? 'bg-gray-100 text-sky-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};