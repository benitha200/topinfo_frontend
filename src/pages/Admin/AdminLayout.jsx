// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   Users,
//   FileText,
//   CreditCard,
//   BarChart2,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   Activity
// } from 'lucide-react';

// const AdminLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const initials = user
//     ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
//     : "";

//   const navItems = [
//     { icon: BarChart2, label: 'Overview', path: '/dashboard' },
//     { icon: Users, label: 'Clients', path: '/dashboard/clients' },
//     { icon: CreditCard, label: 'Agents', path: '/dashboard/agents' },
//     { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
//     { icon: Activity, label: 'Service Providers', path: '/dashboard/service-providers' },
//     { icon: Activity, label: 'Services', path: '/dashboard/service' },
//     { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     window.location.href = '/login';
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } fixed inset-y-0 left-0 z-50 w-64 bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
//       >
//         <div className="flex h-full flex-col">
//           {/* Sidebar Header */}
//           <div className="flex items-center justify-between px-4 py-6">
//             <Link to="/dashboard" className="text-xl font-bold text-white">
//               TopInfo Admin
//             </Link>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="lg:hidden text-white hover:text-gray-200"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <nav className="flex-1 space-y-1 px-2 py-4">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
//                     location.pathname === item.path
//                       ? 'bg-blue-700 text-white'
//                       : 'text-white hover:bg-blue-500'
//                   }`}
//                 >
//                   <Icon className="mr-3 h-5 w-5" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Logout Button */}
//           <div className="border-t border-gray-100 p-4">
//             <button
//               onClick={handleLogout}
//               className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 bg-white rounded"
//             >
//               <LogOut className="mr-3 h-5 w-5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between px-6 py-4">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <h1 className="text-xl font-semibold text-gray-800">
//               {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
//             </h1>
//             <header className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
//                 {initials}
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">
//                   {user ? `${user.firstname} ${user.lastname}` : "Guest"}
//                 </p>
//                 <p className="text-sm text-gray-500">{user?.role}</p>
//               </div>
//             </header>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto bg-white">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  FileText,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  Activity,
  BookUser,
  User2Icon,
  File
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const initials = user
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : "";

  const navItems = [
    { icon: BarChart2, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/dashboard/clients' },
    // { icon: User2Icon, label: 'Users', path: '/dashboard/users' },
    { icon: CreditCard, label: 'Agents', path: '/dashboard/agents' },
    { icon: BookUser, label: 'Super Agents', path: '/dashboard/super-agents' },
    { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
    { icon: Users, label: 'Service Providers', path: '/dashboard/service-providers' },
    { icon: File, label: 'Services', path: '/dashboard/service' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex h-full flex-col border-r">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <Link 
              to="/dashboard" 
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
          <nav className="flex-1 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-6 py-3 text-sm 
                    transition-colors duration-200
                    ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                w-full flex items-center justify-center 
                px-4 py-2.5 text-sm 
                bg-red-50 text-red-600 
                rounded-lg 
                hover:bg-red-100 
                transition-colors duration-200
              "
            >
              <LogOut className="mr-2 h-5 w-5" />
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
            
            <h1 className="text-xl font-medium text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-semibold">
                  {initials}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {user ? `${user.firstname} ${user.lastname}` : "Guest"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
