import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; // ✅ import the provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ provide context */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
