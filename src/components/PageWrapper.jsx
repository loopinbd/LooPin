import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/PageWrapper.css";

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="page-wrapper">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="layout-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="page-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
