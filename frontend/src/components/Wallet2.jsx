import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

// Định nghĩa hằng số (không đổi)
//const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138"; //mạng sepolia testnet

const CONTRACT_ABI = [
  // minimal ABI: mint and tokenURI, ownerOnly mint
  "function mint(address to, string memory tokenURI) external returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

// Định nghĩa các style (có thể chuyển sang file CSS riêng)
const styles = {
  container: {
display: 'flex', // Bật Flexbox
    flexDirection: 'column', // Xếp theo cột (để căn giữa dọc)
    alignItems: 'center', // Căn giữa theo chiều ngang (trục chính)
    justifyContent: 'center', // Căn giữa theo chiều dọc (trục phụ)
    minHeight: '100vh', // Chiều cao tối thiểu 100% viewport height
    fontFamily: 'Arial, sans-serif',
    background: '#f4f7f6',
  },
  card: {
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    background: '#ffffff', // Nền thẻ trắng
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    marginTop: '15px',
    width: '100%',
  },
  connectButton: {
    backgroundColor: '#FF8C00', // Màu cam nổi bật (TNT?)
    color: 'white',
  },
  mintButton: {
    backgroundColor: '#1E90FF', // Màu xanh dương
    color: 'white',
  },
  addressText: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '6px',
    wordBreak: 'break-all',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#555',
  },
  logo: {
    fontSize: '36px',
    marginBottom: '10px',
  }
};

function App(){
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(()=> {
    if(window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);
    }
  },[]);

  async function connectWallet(){
    if(!window.ethereum) return alert("Cài Metamask trước!");
    
    setIsConnecting(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const p = new ethers.BrowserProvider(window.ethereum);
      const s = await p.getSigner();
      const addr = await s.getAddress();
      setProvider(p);
      setSigner(s);
      setAddress(addr);
      const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s);
      setContract(c);
    } catch (error) {
      console.error("Lỗi kết nối ví:", error);
      alert("Kết nối ví thất bại.");
    } finally {
      setIsConnecting(false);
    }
  }

  async function mintDemo(){
    if(!contract || !signer) return alert("Chưa kết nối ví!");
    
    setIsMinting(true);
    const tokenURI = "https://example.com/metadata/1.json"; // dùng IPFS/URL
    try {
      // 1. Gọi hàm mint trên contract
      const tx = await contract.mint(address, tokenURI);
      console.log("tx sent", tx);
      
      alert(`Đang chờ giao dịch xác nhận (hash: ${tx.hash.substring(0, 10)}...).`);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      
      // 2. Lưu record off-chain
      await axios.post('http://localhost:4000/api/nfts/mint', {
        token_id: 1, // giả sử là 1
        contract_address: CONTRACT_ADDRESS,
        owner_address: address,
        uri: tokenURI,
        level: 1
      });
      
      alert("Mint và lưu off-chain thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi mint: " + (err.message || "Đã xảy ra lỗi không xác định."));
    } finally {
      setIsMinting(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🦊</div>
        <h2 style={styles.title}>TNT loyalty NFT</h2>
        
        {address ? (
          <div>
            <p>Đã kết nối thành công!</p>
            <div style={styles.addressText}>
              **Ví:** {address}
            </div>
            <p>Nhấn nút bên dưới để nhận **thẻ thành viên NFT** độc quyền của bạn!</p>
            <button 
              onClick={mintDemo} 
              style={{...styles.button, ...styles.mintButton}}
              disabled={isMinting}
            >
              {isMinting ? 'đang tạo NFT...' : 'nhận token chăm sóc khách hàng'}
            </button>
          </div>
        ) : (
          <div>
            <p>Vui lòng kết nối ví Metamask để nhận ưu đãi thành viên.</p>
            <button 
              onClick={connectWallet} 
              style={{...styles.button, ...styles.connectButton}}
              disabled={isConnecting}
            >
              {isConnecting ? 'đang kết nối...' : 'kết nối ví metamask'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;