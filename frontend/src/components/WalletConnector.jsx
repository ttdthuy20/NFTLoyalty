import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnector({ onConnect }) {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) return alert("Cài MetaMask trước!");

    try {
      const [acc] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc);
      if (onConnect) onConnect(acc);
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối ví!");
    }
  }

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Kết nối MetaMask</button>
      ) : (
        <p>Đã đăng nhập: {account}</p>
      )}
    </div>
  );
}
