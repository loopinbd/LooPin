import React from "react";
import PageWrapper from "../components/PageWrapper";
import "../styles/terms.css";

const TermsPage = () => {
  return (
    <PageWrapper>
      <div className="terms-page">
        <h2 className="terms-title">Terms & Conditions</h2>
        <div className="terms-content">
          <p>
            Welcome to <strong>LooPin</strong>. By registering and using our platform, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <h4>1. Eligibility</h4>
          <p>
            You must be at least 18 years old to create an account. By using LooPin, you confirm that all information provided is accurate and complete.
          </p>

          <h4>2. Account Activation</h4>
          <p>
            A one-time activation fee of <strong>$12</strong> is required to unlock all earning and referral features. Activation is subject to admin verification.
          </p>

          <h4>3. Referral Commissions</h4>
          <p>
            Commissions are distributed across three levels as follows:
            <br />
            - Level 1: 25% <br />
            - Level 2: 15% <br />
            - Level 3: 10% <br />
            Only after activation, referral earnings are counted.
          </p>

          <h4>4. Withdrawals</h4>
          <p>
            Minimum withdrawal is <strong>$25</strong>. All withdrawals are manually verified and processed within a reasonable time. A valid payment method and wallet must be provided.
          </p>

          <h4>5. Misuse & Termination</h4>
          <p>
            Any attempt to manipulate the referral system or violate platform policies may result in permanent account suspension without refund.
          </p>

          <h4>6. Changes to Terms</h4>
          <p>
            LooPin reserves the right to update these terms at any time. Users will be notified of any significant changes.
          </p>

          <p>
            For any questions, contact us at <strong>loopinbd@gmail.com</strong>.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TermsPage;
