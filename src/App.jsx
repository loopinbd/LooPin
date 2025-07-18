import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";
import Activation from "./pages/Activation";
import Withdraw from "./pages/Withdraw";
import Referral from "./pages/Referral";
import Support from "./pages/Support";
import TermsPage from "./pages/TermsPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import HomeRedirect from "./pages/HomeRedirect"; // ✅ add this

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ✅ Home redirect */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Protected Routes (Login Required) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activation" element={<Activation />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/support" element={<Support />} />
      </Route>

      {/* Admin Panel (only loopinbd@gmail.com) */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
