
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Users,
//   LayoutDashboard,
//   ClipboardList,
//   LogOut,
//   Menu,
//   X,
//   CreditCard,
//   Users2,
//   BriefcaseBusiness,
//   HandCoinsIcon,
//   User,
// } from "lucide-react";

// const AgentLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const initials = user
//     ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
//     : "";

//   const navItems = [
//     !user.isSuperAgent && {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       path: "/agent-dashboard",
//     },
//     user.isSuperAgent && {
//       icon: CreditCard,
//       label: "My Agent",
//       path: "/agent-dashboard/my-agents",
//     },
//     !user.isSuperAgent && {
//       icon: Users2,
//       label: "Client",
//       path: "/agent-dashboard/requests-agent",
//     },
//     !user.isSuperAgent && {
//       icon: BriefcaseBusiness,
//       label: "Service Provider",
//       path: "/agent-dashboard/service-provider-agent",
//     },
//     !user.isSuperAgent && {
//       icon: HandCoinsIcon,
//       label: "Payments",
//       path: "/agent-dashboard/payments-agent",
//     },
//     !user.isSuperAgent && {
//       icon: User,
//       label: "Profile",
//       path: "/profile",
//     },
//     user.isSuperAgent && {
//       icon: ClipboardList,
//       label: "Payments",
//       path: "/agent-dashboard/payments-super-agent",
//     },
//   ].filter(Boolean);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <div
//         className={`
//                     fixed inset-y-0 left-0 z-50 w-64 
//                     bg-white shadow-xl border-r 
//                     transform transition-transform duration-300 
//                     ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//                     lg:relative lg:translate-x-0
//                 `}
//       >
//         <div className="flex h-full flex-col">
//           {/* Sidebar Header */}
//           <div className="flex items-center justify-between px-6 py-5 border-b">
//             <Link
//               to="/agent-dashboard"
//               className="text-2xl font-bold text-sky-600 tracking-tight"
//             >
//               TopInfo
//             </Link>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <nav className="flex-1 py-6 px-4 space-y-2">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`
//                                         flex items-center px-4 py-3 
//                                         text-sm rounded transition-all 
//                                         ${location.pathname === item.path
//                       ? "bg-sky-100 text-sky-700 font-semibold"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }
//                                     `}
//                 >
//                   <Icon className="mr-3 h-5 w-5 opacity-70" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Logout Button */}
//           <div className="border-t p-4">
//             <button
//               onClick={handleLogout}
//               className="
//                                 flex w-full items-center 
//                                 px-4 py-3 text-sm 
//                                 text-red-500 hover:bg-red-50 
//                                 rounded transition-colors
//                             "
//             >
//               <LogOut className="mr-3 h-5 w-5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden h-screen w-full">
//         {/* Top Bar */}
//         <header className="bg-white shadow-sm border-b w-full">
//           <div className="flex items-center justify-between px-4 sm:px-6 py-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="lg:hidden text-gray-500 hover:text-gray-700 -ml-1"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
//                 {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
//               </h1>
//             </div>

//             <div className="flex items-center gap-2 sm:gap-4">
//               <div className="hidden sm:flex w-10 h-10 bg-sky-100 text-sky-600 items-center justify-center rounded-full font-semibold border border-sky-200">
//                 {initials}
//               </div>
//               <div className="flex flex-col">
//                 <p className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
//                   {user ? `${user.firstname} ${user.lastname}` : "Guest"}
//                 </p>
//                 <p className="text-xs text-gray-500 uppercase tracking-wider">
//                   {user?.isSuperAgent ? "SUPER AGENT" : "AGENT"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 w-full">
//           {children}
//         </main>
//       </div>

//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="
//                         lg:hidden fixed inset-0 
//                         bg-black bg-opacity-50 z-40 
//                         transition-opacity duration-300
//                     "
//         />
//       )}
//     </div>
//   );
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
  Users2,
  BriefcaseBusiness,
  HandCoinsIcon,
  User,
} from "lucide-react";

const AgentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : "";

  // Reorganized navigation items
  const mainNavItems = [
    !user.isSuperAgent && {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/agent-dashboard",
    },
    user.isSuperAgent && {
      icon: CreditCard,
      label: "My Agent",
      path: "/agent-dashboard/my-agents",
    },
    !user.isSuperAgent && {
      icon: Users2,
      label: "Client",
      path: "/agent-dashboard/requests-agent",
    },
    !user.isSuperAgent && {
      icon: BriefcaseBusiness,
      label: "Service Provider",
      path: "/agent-dashboard/service-provider-agent",
    },
    !user.isSuperAgent && {
      icon: HandCoinsIcon,
      label: "Payments",
      path: "/agent-dashboard/payments-agent",
    },
    user.isSuperAgent && {
      icon: ClipboardList,
      label: "Payments",
      path: "/agent-dashboard/payments-super-agent",
    },
  ].filter(Boolean);

  const profileNavItem = !user.isSuperAgent && {
    icon: User,
    label: "Profile",
    path: "/profile",
  };

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
              className="text-2xl font-bold text-sky-600 tracking-tight"
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

          {/* Main Navigation Items */}
          <nav className="flex-1 py-6 px-4">
            <div className="space-y-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 
                      text-sm rounded transition-all 
                      ${location.pathname === item.path
                        ? "bg-sky-100 text-sky-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon className="mr-3 h-5 w-5 opacity-70" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Profile Link - Separated from main navigation */}
          
          </nav>

          {/* Logout Button */}
          <div className="border-t p-4">
          {profileNavItem && (
              <div className="mt-6 pt-6 border-t">
                <Link
                  to={profileNavItem.path}
                  className={`
                    flex items-center px-4 py-3 
                    text-sm rounded transition-all 
                    ${location.pathname === profileNavItem.path
                      ? "bg-sky-100 text-sky-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <User className="mr-3 h-5 w-5 opacity-70" />
                  {profileNavItem.label}
                </Link>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="
                flex w-full items-center 
                px-4 py-3 text-sm 
                text-red-500 hover:bg-red-50 
                rounded transition-colors
              "
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen w-full">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b w-full">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 -ml-1"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                {[...mainNavItems, profileNavItem].filter(Boolean).find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex w-10 h-10 bg-sky-100 text-sky-600 items-center justify-center rounded-full font-semibold border border-sky-200">
                {initials}
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                  {user ? `${user.firstname} ${user.lastname}` : "Guest"}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {user?.isSuperAgent ? "SUPER AGENT" : "AGENT"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 w-full">
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