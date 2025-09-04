import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

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
import AgentPaymentCallback from "./pages/Agent/AgentPaymentCallback";
import AgentProviderPaymentCallback from "./pages/Agent/AgentProviderPaymentCallback";
import SuperAgentPaymentsPage from "./pages/Agent/SuperAgentPaymentsPage";
import ForgetPassword from "./components/website/ForgetPassword";
import ResetPassword from "./components/website/ResetPassword";
import ServiceProviderView from "./pages/Agent/ServiceProviderView";
import ServiceProviderEdit from "./pages/Agent/ServiceProviderEdit";
import OperationDashboard from "./pages/Dashboards/OperationDashboard";
import Reports from "./pages/Admin/Reports/Reports";
import Profile from "./pages/Profile";
import EditServiceProvider from "./pages/Admin/ServiceProviders/EditServiceProvider";
import Agreement from "./pages/Agent/Agreement";
import DsicountClub from "./pages/Membership/DsicountClub";
import JoinMembershipPage from "./pages/Membership/JoinMembershipPage";
import OTPVerification from "./pages/OTPverification";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="flex-1">{children}</div>
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
          path="/otp-verification"
          element={
            <LayoutWrapper>
              <OTPVerification />
            </LayoutWrapper>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <LayoutWrapper>
              <ForgetPassword />
            </LayoutWrapper>
          }
        />
        <Route
          path="/reset-password"
          element={
            <LayoutWrapper>
              <ResetPassword />
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
          path="/discount-club"
          element={
            <LayoutWrapper>
              <DsicountClub />
            </LayoutWrapper>
          }
        />
        <Route
          path="/membership-club"
          element={
            <LayoutWrapper>
              <DsicountClub />
            </LayoutWrapper>
          }
        />
        <Route
          path="/discount-club/join"
          element={
            <LayoutWrapper>
              <JoinMembershipPage />
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
            <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER_SUPPORT"]}>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agents"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
              <AgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
              <Reports />
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
            <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER_SUPPORT"]}>
              <RequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service-providers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
              <ServiceProvidersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
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
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
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
          path="/agent-dashboard/serviceprovider-agent/view/:id"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <ServiceProviderView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/serviceprovider-agent/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <ServiceProviderEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/serviceprovider/edit/:providerId"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditServiceProvider />
            </ProtectedRoute>
          }
        />
        {/* `/agent-dashboard/serviceprovider-agent/view/${serviceProviderId}` */}
        <Route
          path="/agent-dashboard/serviceprovider-agent/create"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <AddServiceProvidersPageAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/payment-callback"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentPaymentCallback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/provider-payment-callback"
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <AgentProviderPaymentCallback />
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
        <Route
          path="/agent-dashboard/payments-super-agent"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <SuperAgentPaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/agreement"
          element={
            <ProtectedRoute allowedRoles={["AGENT", "ADMIN"]}>
              <Agreement />
            </ProtectedRoute>
          }
        />


        <Route
          path="/operations-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS"]}>
              <AgentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cutomer-support-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER_SUPPORT"]}>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS", "CUSTOMER_SUPPORT", "AGENT"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
