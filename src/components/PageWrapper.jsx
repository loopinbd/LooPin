// src/components/PageWrapper.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/PageWrapper.css";

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="page-wrapper">
      {sidebarOpen && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
