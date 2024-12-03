// import React, { useState } from 'react';
// import {
//     Users,
//     LayoutDashboard,
//     ClipboardList,
//     LogOut,
//     Menu,
//     Bell,
//     X
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const AgentLayout = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const navigate = useNavigate();

//     const user = JSON.parse(localStorage.getItem("user"));
//     const initials = user
//         ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
//         : "";

//     const menuItems = [
//         {
//             title: 'Dashboard',
//             icon: <LayoutDashboard size={20} />,
//             path: '/agent-dashboard'
//         },
//         {
//             title: 'Requests',
//             icon: <ClipboardList size={20} />,
//             path: '/agent-dashboard/requests-agent'
//         },
//         {
//             title: 'Payments',
//             icon: <ClipboardList size={20} />,
//             path: '/agent-dashboard/payments-agent'
//         },
//         // {
//         //   title: 'Users',
//         //   icon: <Users size={20} />,
//         //   path: '/agent-dashboard/agent-users'
//         // },
//     ];

//     const handleLogout = () => {
//         // Clear all items from localStorage
//         localStorage.clear();
//         // Redirect to the login page
//         navigate('/login');
//     };

//     return (
//         <div className="h-screen flex flex-col">
//             {/* Header */}
//             <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
//                 <div className="flex items-center gap-4">
//                     <button
//                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                         className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
//                     >
//                         {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
//                     </button>
//                     <h1 className="text-xl font-bold text-blue-600">TopInfo Agent</h1>

//                 </div>
//                 <header className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
//                         {initials}
//                     </div>
//                     <div>
//                         <p className="font-medium text-gray-900">
//                             {user ? `${user.firstname} ${user.lastname}` : "Guest"}
//                         </p>
//                         <p className="text-sm text-gray-500">{user?.role}</p>
//                     </div>
//                 </header>
//             </header>

//             <div className="flex flex-1 overflow-hidden relative">
//                 {/* Overlay for mobile */}
//                 {isSidebarOpen && (
//                     <div
//                         onClick={() => setIsSidebarOpen(false)}
//                         className="fixed inset-0 bg-black/50 z-10 lg:hidden"
//                     />
//                 )}

//                 {/* Sidebar */}
//                 <aside
//                     className={`
//             fixed lg:static z-20
//             bg-white border-r border-gray-200
//             w-64 h-[calc(100vh-4rem)]
//             transform transition-transform duration-300 ease-in-out
//             ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//             lg:translate-x-0
//           `}
//                 >
//                     <nav className="h-full flex flex-col p-4">
//                         <div className="flex-1 space-y-1">
//                             {menuItems.map((item) => (
//                                 <Link
//                                     to={item.path}
//                                     key={item.title}
//                                     onClick={() => setIsSidebarOpen(false)}
//                                     className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//                                 >
//                                     {item.icon}
//                                     <span>{item.title}</span>
//                                 </Link>
//                             ))}
//                         </div>
//                         <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                             <LogOut size={20} />
//                             <span>Logout</span>
//                         </button>
//                     </nav>
//                 </aside>

//                 {/* Main content */}
//                 <main className="flex-1 overflow-auto bg-gray-50 p-6">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AgentLayout;

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//     Users,
//     LayoutDashboard,
//     ClipboardList,
//     LogOut,
//     Menu,
//     X
// } from 'lucide-react';

// const AgentLayout = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const location = useLocation();
//     const user = JSON.parse(localStorage.getItem("user"));

//     const initials = user
//         ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
//         : "";

//     const navItems = [
//         {
//             icon: LayoutDashboard,
//             label: 'Dashboard',
//             path: '/agent-dashboard'
//         },
//         {
//             icon: ClipboardList,
//             label: 'Requests',
//             path: '/agent-dashboard/requests-agent'
//         },
//         {
//             icon: ClipboardList,
//             label: 'Payments',
//             path: '/agent-dashboard/payments-agent'
//         },
//     ];

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <div
//                 className={`${
//                     isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//                 } fixed inset-y-0 left-0 z-50 w-64 bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
//             >
//                 <div className="flex h-full flex-col">
//                     {/* Sidebar Header */}
//                     <div className="flex items-center justify-between px-4 py-6">
//                         <Link to="/agent-dashboard" className="text-xl font-bold text-white">
//                             TopInfo Agent
//                         </Link>
//                         <button
//                             onClick={() => setIsSidebarOpen(false)}
//                             className="lg:hidden text-white hover:text-gray-200"
//                         >
//                             <X className="h-6 w-6" />
//                         </button>
//                     </div>

//                     {/* Navigation Items */}
//                     <nav className="flex-1 space-y-1 px-2 py-4">
//                         {navItems.map((item) => {
//                             const Icon = item.icon;
//                             return (
//                                 <Link
//                                     key={item.path}
//                                     to={item.path}
//                                     className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
//                                         location.pathname === item.path
//                                             ? 'bg-blue-700 text-white'
//                                             : 'text-white hover:bg-blue-500'
//                                     }`}
//                                 >
//                                     <Icon className="mr-3 h-5 w-5" />
//                                     {item.label}
//                                 </Link>
//                             );
//                         })}
//                     </nav>

//                     {/* Logout Button */}
//                     <div className="border-t border-gray-100 p-4">
//                         <button
//                             onClick={handleLogout}
//                             className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 bg-white rounded"
//                         >
//                             <LogOut className="mr-3 h-5 w-5" />
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 {/* Top Bar */}
//                 <header className="bg-white shadow-sm">
//                     <div className="flex items-center justify-between px-6 py-4">
//                         <button
//                             onClick={() => setIsSidebarOpen(true)}
//                             className="lg:hidden text-gray-500 hover:text-gray-700"
//                         >
//                             <Menu className="h-6 w-6" />
//                         </button>
//                         <h1 className="text-xl font-semibold text-gray-800">
//                             {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
//                         </h1>
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
//                                 {initials}
//                             </div>
//                             <div>
//                                 <p className="font-medium text-gray-900">
//                                     {user ? `${user.firstname} ${user.lastname}` : "Guest"}
//                                 </p>
//                                 <p className="text-sm text-gray-500">{user?.role}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Page Content */}
//                 <main className="flex-1 overflow-y-auto bg-white p-5">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AgentLayout;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Menu,
  X,
  CreditCard,
} from "lucide-react";

const AgentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : "";

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/agent-dashboard",
    },
    user.isSuperAgent && {
      icon: CreditCard,
      label: "My Agent",
      path: "/agent-dashboard/my-agents",
    },
    {
      icon: ClipboardList,
      label: "Client",
      path: "/agent-dashboard/requests-agent",
    },
    {
      icon: ClipboardList,
      label: "Service Provider",
      path: "/agent-dashboard/service-provider-agent",
    },
    {
      icon: ClipboardList,
      label: "Payments",
      path: "/agent-dashboard/payments-agent",
    },
  ].filter(Boolean);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
                    fixed inset-y-0 left-0 z-50 w-64 
                    bg-white shadow-xl border-r 
                    transform transition-transform duration-300 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:relative lg:translate-x-0
                `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <Link
              to="/agent-dashboard"
              className="text-2xl font-bold text-blue-600 tracking-tight"
            >
              TopInfo
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-6 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                                        flex items-center px-4 py-3 
                                        text-sm rounded-lg transition-all 
                                        ${
                                          location.pathname === item.path
                                            ? "bg-blue-100 text-blue-700 font-semibold"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }
                                    `}
                >
                  <Icon className="mr-3 h-5 w-5 opacity-70" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="
                                flex w-full items-center 
                                px-4 py-3 text-sm 
                                text-red-500 hover:bg-red-50 
                                rounded-lg transition-colors
                            "
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)
                ?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-4">
              <div
                className="
                                    w-10 h-10 
                                    bg-blue-100 text-blue-600 
                                    flex items-center justify-center 
                                    rounded-full font-semibold 
                                    border border-blue-200
                                "
              >
                {initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user ? `${user.firstname} ${user.lastname}` : "Guest"}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="
                        lg:hidden fixed inset-0 
                        bg-black bg-opacity-50 z-40 
                        transition-opacity duration-300
                    "
        />
      )}
    </div>
  );
};

export default AgentLayout;
