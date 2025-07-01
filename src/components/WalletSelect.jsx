import React from "react";
import "../styles/WalletSelect.css"; // Style file for logos & dropdown

const WalletSelect = ({ selectedWallet, setSelectedWallet }) => {
  const wallets = [
    { name: "Nagad", logo: "/wallets/nagad.png" },
    { name: "Bkash", logo: "/wallets/bkash.png" },
    { name: "USDT", logo: "/wallets/usdt.png" },
  ];

  return (
    <div className="wallet-select-container">
      <label htmlFor="wallet" className="wallet-label">
        Select Wallet
      </label>
      <select
        id="wallet"
        className="wallet-select"
        value={selectedWallet}
        onChange={(e) => setSelectedWallet(e.target.value)}
      >
        <option value="">-- Choose Wallet --</option>
        {wallets.map((wallet) => (
          <option key={wallet.name} value={wallet.name}>
            {wallet.name}
          </option>
        ))}
      </select>

      {selectedWallet && (
        <div className="wallet-preview">
          <img
            src={`/wallets/${selectedWallet.toLowerCase()}.png`}
            alt={selectedWallet}
            className="wallet-logo"
          />
          <span>{selectedWallet}</span>
        </div>
      )}
    </div>
  );
};

export default WalletSelect;
