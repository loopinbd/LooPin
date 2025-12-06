// src/pages/Terms.js

import React from "react";
import "../styles/Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-box">
        <h1 className="logo">Loopin</h1>
        <p>Unlock Passive Income Powered by Blockchain</p>

        <h2>Terms & Conditions</h2>

        <p>
          Welcome to Loopin! By using our platform, you agree to the following rules and guidelines:
        </p>

        <ol>
          <li>You must be at least 18 years old to register and use our services.</li>
          <li>All payments and withdrawals must follow the platform’s guidelines and minimum requirements.</li>
          <li>Referral commissions are valid only after the referred user completes account activation.</li>
          <li>Users are responsible for keeping their login credentials secure.</li>
          <li>Any fraudulent activity, multiple accounts, or misuse may result in account termination.</li>
          <li>The platform may update these terms at any time. Users are advised to review them regularly.</li>
          <li>All decisions made by the admin regarding activation, withdrawal, or commissions are final.</li>
        </ol>

        <p>
          By continuing to use Loopin, you confirm that you understand and agree to these Terms & Conditions.
        </p>
      </div>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default Terms;
