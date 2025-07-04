import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/PageWrapper.css";

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="page-wrapper">
      <div className="layout-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-body">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="page-content">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
