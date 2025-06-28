import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import WithdrawForm from "../components/WithdrawForm";
import WithdrawHistory from "../components/WithdrawHistory";
import "../styles/withdraw.css";

const Withdraw = () => {
  const [balance, setBalance] = useState(85.50); // Simulated user balance
  const [history, setHistory] = useState([
    { method: "bKash", amount: 40, date: "2025-06-01" },
    { method: "Nagad", amount: 30, date: "2025-06-15" },
  ]);

  const handleWithdraw = (withdrawData) => {
    const { method, address, amount } = withdrawData;

    if (amount > balance) return;
    const newBalance = balance - amount;
    const newHistory = [
      { method, amount, date: new Date().toLocaleDateString() },
      ...history,
    ];
    setBalance(newBalance);
    setHistory(newHistory);
  };

  return (
    <PageWrapper>
      <div className="withdraw-page">
        <h2 className="withdraw-heading">Withdraw Funds</h2>

        <WithdrawForm balance={balance} onWithdraw={handleWithdraw} />

        <section className="withdraw-history-section">
          <WithdrawHistory history={history} />
        </section>
      </div>
    </PageWrapper>
  );
};

export default Withdraw;
