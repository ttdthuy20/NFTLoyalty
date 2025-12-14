import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Vui lòng cài MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      setWalletAddress(address);
      setIsConnected(true);
    } catch (err) {
      if (err.code === 4001) {
        alert("Bạn đã từ chối kết nối ví");
      }
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setWalletAddress("");
        setIsConnected(false);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, []);

  return (
    <button
      onClick={connectWallet}
      className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition transform hover:scale-105 ${
        isConnected
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
      }`}
    >
      <FaWallet />
      <span>
        {isConnected
           ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          // ? `${walletAddress}`
          : "Kết nối ví MetaMask"}
      </span>
    </button>
  );
};

export default ConnectWallet;
