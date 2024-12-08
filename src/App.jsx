import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Bell,
  Search,
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  Facebook,
  Youtube,
} from "lucide-react";

// Import your pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Services from "./pages/Services";
import BecomeProvider from "./pages/BecomeProvider";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import AgentDashboard from "./pages/Dashboards/AgentDashboard";
import UsersPage from "./pages/Admin/UsersPage";
import RequestsPage from "./pages/Admin/RequestsPage";
import PaymentsPage from "./pages/Admin/PaymentsPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import ServicesPage from "./pages/Admin/Services/ServicesPage";
import ServiceCategoriesPage from "./pages/Admin/Services/ServicesPage";
import ServiceProvidersPage from "./pages/Admin/ServiceProvidersPage";
import RequestListAgent from "./pages/Agent/RequestListAgent";
import BecomeAgent from "./pages/BecomeAgent";
import AgentUsers from "./pages/Agent/AgentUsers";
import AddRequestPage from "./pages/Agent/AddRequestPage";
import PaymentApprovalPage from "./pages/Agent/PaymentApprovalPage";
import RequestDetailPage from "./pages/Agent/RequestDetailPage";
import AgentPaymentsPage from "./pages/Agent/AgentPaymentsPage";
import ClientsPage from "./pages/Admin/ClientsPage";
import ServiceProviderListAgent from "./pages/Agent/ServiceProviderListAgent";
import SuperAgentsPage from "./pages/Admin/SuperAgentsPage";
import AgentsPage from "./pages/Admin/AgentsPage";
import MyAgents from "./pages/Agent/MyAgents";
import PaymentCallback from "./pages/PaymentCallback";
import ServiceProvidersPageAgent from "./pages/Agent/ServiceProvidersPageAgent";
import AddServiceProvidersPageAgent from "./pages/Agent/AddServiceProvidersPageAgent";
import CreateService from "./pages/Admin/Services/Create";
import ClientRequest from "./pages/ClientRequest";
import ProviderPaymentCallback from "./pages/ProviderPaymentCallback";
import ServiceSelectionPage from "./pages/Agent/ServiceSelectionPage";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Footer from "./components/website/Footer";
import ContactUs from "./pages/ContactUs";
import UpdateService from "./pages/Admin/Services/Update";
import Navigation from "./components/website/Navigation";

// ProtectedRoute Component (Added back)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user?.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};



// const Navigation = () => {
//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-2xl font-bold text-sky-600">
//             TopInfo
//           </Link>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="hidden md:flex space-x-6 ml-6">
//             <Link
//               to="/services"
//               className="text-gray-700 hover:text-sky-600 transition-colors"
//             >
//               Abasaba Serivisi
//             </Link>
//             {/* <Link
//               to="/become-provider"
//               className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
//             > */}
//             <Link
//               to="/become-provider"
//               className="text-gray-700 hover:text-sky-600 transition-colors"
//             >
//               Abatanga Serivisi
//             </Link>
//             <Link
//               to="/become-agent"
//               className="text-gray-700 hover:text-sky-600 transition-colors"
//             >
//               Aba Agent
//             </Link>
//           </div>
//           <Link
//             to="/login"
//             className="px-4  py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
//           >
//             Injira
//           </Link>

//           <button className="md:hidden">
//             <Menu size={24} className="text-gray-700" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };



const LayoutWrapper = ({ children }) => {
  const userString = localStorage.getItem("user");
  let user = null;

  // Validate the userString before parsing
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    user = null; // Fallback to null if parsing fails
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-1 pt-20">{children}</div>
      {!user?.role && <Footer />}
    </div>
  );
};


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Home />
            </LayoutWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <LayoutWrapper>
              <Register />
            </LayoutWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <LayoutWrapper>
              <Login />
            </LayoutWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <LayoutWrapper>
              <Services />
            </LayoutWrapper>
          }
        />
        <Route
          path="/client-request/:serviceId"
          element={
            <LayoutWrapper>
              <ClientRequest />
            </LayoutWrapper>
          }
        />
        <Route
          path="/payment-callback"
          element={
            <LayoutWrapper>
              <PaymentCallback />
            </LayoutWrapper>
          }
        />
        <Route
          path="/become-provider"
          element={
            <LayoutWrapper>
              <BecomeProvider />
            </LayoutWrapper>
          }
        />

        <Route
          path="/provider-payment-callback"
          element={
            <LayoutWrapper>
              <ProviderPaymentCallback />
            </LayoutWrapper>
          }
        />
        <Route
          path="/become-agent"
          element={
            <LayoutWrapper>
              <BecomeAgent />
            </LayoutWrapper>
          }
        />
        <Route
          path="/about-us"
          element={
            <LayoutWrapper>
              <AboutUs />
            </LayoutWrapper>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <LayoutWrapper>
              <PrivacyPolicy />
            </LayoutWrapper>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <LayoutWrapper>
              <TermsOfService />
            </LayoutWrapper>
          }
        />
        <Route
          path="/contact-us"
          element={
            <LayoutWrapper>
              <ContactUs />
            </LayoutWrapper>
          }
        />

        {/* Protected Routes (without Layout) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/clients"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/super-agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <SuperAgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/requests"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <RequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service-providers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ServiceProvidersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ServiceCategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UpdateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/requests-agent"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <RequestListAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/service-providers"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <ServiceProvidersPageAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/my-agents"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <MyAgents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent-dashboard/service-provider-agent"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <ServiceProviderListAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/serviceprovider-agent/create"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AddServiceProvidersPageAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/requests-agent/select-services"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <ServiceSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/requests-agent/create/:serviceId"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AddRequestPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent-dashboard/agent-users"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/requests-agent/view/:id"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <RequestDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/payments-agent"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <AgentPaymentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
