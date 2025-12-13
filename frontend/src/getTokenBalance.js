import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Thay thế bằng Địa chỉ Hợp đồng (Contract Address) của Token MyToken bạn vừa triển khai trên Sepolia
const MY_TOKEN_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; 

// Giao diện ABI (Application Binary Interface) của Token ERC-20
// Chúng ta chỉ cần các hàm cần thiết (balanceOf, symbol, decimals)
const MY_TOKEN_ABI = [
  // Lấy số dư: function balanceOf(address account) view returns (uint256)
  "function balanceOf(address account) view returns (uint256)",
  // Lấy ký hiệu: function symbol() view returns (string)",
  "function symbol() view returns (string)",
  // Lấy số thập phân: function decimals() view returns (uint8)",
  "function decimals() view returns (uint8)"
];

function GetTokenBalance() {
  const [balance, setBalance] = useState('N/A');
  const [symbol, setSymbol] = useState('');
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Hàm kết nối ví và lấy địa chỉ người dùng
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Yêu cầu MetaMask kết nối
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        return accounts[0]; // Trả về địa chỉ đã kết nối
      } catch (e) {
        console.error("Lỗi khi kết nối ví:", e);
        setError("Vui lòng kết nối MetaMask.");
        return null;
      }
    } else {
      setError("Vui lòng cài đặt ví MetaMask.");
      return null;
    }
  };

  // 2. Hàm lấy số dư Token từ Hợp đồng
  const fetchTokenBalance = async () => {
    const userAddress = await connectWallet();
    if (!userAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Thiết lập Provider: Kết nối đến blockchain thông qua MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Khởi tạo Contract Interface: Đối tượng để gọi các hàm trên Smart Contract
      const tokenContract = new ethers.Contract(MY_TOKEN_ADDRESS, MY_TOKEN_ABI, provider);

      // Gọi hàm `symbol()`
      const tokenSymbol = await tokenContract.symbol();
      setSymbol(tokenSymbol);

      // Gọi hàm `balanceOf(userAddress)` để lấy số dư (ở dạng BigNumber)
      const rawBalance = await tokenContract.balanceOf(userAddress);
      
      // Lấy số thập phân (decimals) để chuyển đổi từ raw balance sang định dạng dễ đọc
      const decimals = await tokenContract.decimals();
      
      // Chuyển đổi số dư: từ BigNumber (với 10^decimals) sang số thập phân dễ đọc
      const formattedBalance = ethers.formatUnits(rawBalance, decimals);
      
      setBalance(formattedBalance);

    } catch (e) {
      console.error("Lỗi khi lấy số dư Token:", e);
      setError("Lỗi khi tương tác với hợp đồng. Đảm bảo bạn đang ở mạng Sepolia.");
      setBalance('LỖI');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Tự động thử kết nối và lấy dữ liệu khi component được load
    fetchTokenBalance(); 
    
    // Thêm listener để tự động cập nhật khi tài khoản MetaMask thay đổi
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', fetchTokenBalance);
        window.ethereum.on('chainChanged', fetchTokenBalance);
        
        return () => {
            // Dọn dẹp listener khi component bị unmount
            window.ethereum.removeListener('accountsChanged', fetchTokenBalance);
            window.ethereum.removeListener('chainChanged', fetchTokenBalance);
        }
    }
  }, []);

  return (
    <div>
      <h3>📊 Tương tác với Smart Contract</h3>
      <p>Địa chỉ Token đang dùng: <code>{MY_TOKEN_ADDRESS}</code></p>
      
      {account ? (
        <>
          <p>Ví MetaMask đã kết nối: <code>{account}</code></p>
          <hr/>
          {isLoading ? (
            <p>Đang tải số dư...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>LỖI: {error}</p>
          ) : (
            <h4>Số dư {symbol || "Token"} của bạn: **{balance}** {symbol}</h4>
          )}
        </>
      ) : (
        <button onClick={connectWallet}>Kết nối Ví MetaMask</button>
      )}
      
      <button onClick={fetchTokenBalance} disabled={isLoading} style={{marginLeft: '10px'}}>
        Tải lại số dư
      </button>
    </div>
  );
}

export default GetTokenBalance;