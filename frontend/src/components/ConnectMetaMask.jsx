import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  // minimal ABI: mint and tokenURI, ownerOnly mint
  "function mint(address to, string memory tokenURI) external returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)"
];

function App(){
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(()=> {
    if(window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);
    }
  },[]);

  async function connectWallet(){
    if(!window.ethereum) return alert("Cài Metamask trước");
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const p = new ethers.BrowserProvider(window.ethereum);
    const s = await p.getSigner();
    const addr = await s.getAddress();
    setProvider(p);
    setSigner(s);
    setAddress(addr);
    const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s);
    setContract(c);
  }

  async function mintDemo(){
    if(!contract || !signer) return alert("Chưa kết nối");
    const tokenURI = "https://example.com/metadata/1.json"; // dùng IPFS/URL
    // Note: in our SimpleNFT, mint is onlyOwner -> for demo either make mint public or use a local signer that's owner
    try {
      const tx = await contract.mint(address, tokenURI);
      console.log("tx sent", tx);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      // lấy tokenId từ event logs nếu có, hoặc nextTokenId từ contract (simple approach: assume tokenId = 1)
      // Ghi record off-chain về backend
      await axios.post('http://localhost:4000/api/nfts/mint', {
        token_id: 1,
        contract_address: CONTRACT_ADDRESS,
        owner_address: address,
        uri: tokenURI,
        level: 1
      });
      alert("Mint và lưu off-chain thành công");
    } catch (err) {
      console.error(err);
      alert("Lỗi mint: " + (err.message || err));
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>TNT Loyalty NFT</h2>
      {address ? (
        <div>
          <p>Đã kết nối: {address}</p>
          <button onClick={mintDemo}>Nhận token chăm sóc khách hàng</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Kết nối ví Metamask</button>
      )}
    </div>
  );
}

export default ConnectMetaMask;

