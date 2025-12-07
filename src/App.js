import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyNotice from "./pages/VerifyNotice";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import Activation from "./pages/Activation";
import PaymentForm from "./pages/PaymentForm";
import Withdraw from "./pages/Withdraw";
import WithdrawHistory from "./pages/WithdrawHistory";
import Referral from "./pages/Referral";
import Support from "./pages/Support";

// Components
import Layout from "./components/Layout";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import AdminActivationRequests from "./admin/AdminActivationRequests";
import AdminWithdrawRequests from "./admin/AdminWithdrawRequests";
import AdminSetRates from "./admin/AdminSetRates";
import AdminSetWallets from "./admin/AdminSetWallets";
import AdminInbox from "./admin/AdminInbox";
import AdminUsers from "./admin/AdminUsers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-notice" element={<VerifyNotice />} />
        <Route path="/terms" element={<Terms />} />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="activation" element={<Activation />} />
          <Route path="payment" element={<PaymentForm />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="withdraw-history" element={<WithdrawHistory />} />
          <Route path="referral" element={<Referral />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="activation-requests" element={<AdminActivationRequests />} />
          <Route path="withdraw-requests" element={<AdminWithdrawRequests />} />
          <Route path="set-rates" element={<AdminSetRates />} />
          <Route path="set-wallets" element={<AdminSetWallets />} />
          <Route path="inbox" element={<AdminInbox />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
