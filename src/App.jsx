import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Protected Routes (Login required) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* Admin Route (Only for loopinbd@gmail.com) */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
