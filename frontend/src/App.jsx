import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Sử dụng react-icons cho các biểu tượng (cần cài đặt: npm install react-icons)
import { FaWallet, FaStore, FaUsers, FaDragon, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GiMountains } from 'react-icons/gi';
import { BiSupport } from 'react-icons/bi';
import RegisterForm from './components/RegisterForm'; // Dùng tệp mới
import Shop from './components/Shop'; // danh sách cửa hàng thành viên
import NFT from './components/NFT'; // bộ sưu tập NFT
import Dashboard from './components/Dashboard'; // Dashboard
import Wallet from './components/Wallet'; // Wallet
import Wallet2 from './components/Wallet2'; // Wallet
import { Link } from 'react-router-dom';

import "./App.css";

// --- CÁC COMPONENT CON ---

// 1. Navbar: Thanh điều hướng và nút kết nối Web3
const Navbar = ({ isConnected, connectWallet }) => {
  return (
    <nav className="bg-indigo-900/90 backdrop-blur-md text-white p-4 fixed w-full z-50 shadow-lg">
      <div className="container max-w-[90%] mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <Link to="/">
           <FaDragon className="text-yellow-400 text-3xl" /></Link>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            <Link to="/">TNT Loyalty Chain</Link>
          </span>
           
        </div>
   
        <div className="hidden md:flex space-x-6 font-medium">
          
          <a href="shop" className="hover:text-yellow-300 transition">Cửa hàng Thành viên</a>
          {/* <a href="customer" className="hover:text-yellow-300 transition">Khách hàng</a> */}
           <a href="NFT" className="hover:text-yellow-300 transition">Bộ sưu tập NFT</a>
          <a href="dashboard" className="hover:text-yellow-300 transition">Thống kê</a>
           <a href="register" className="hover:text-yellow-300 transition">Đăng ký</a>
           <a href="Wallet2" className="hover:text-yellow-300 transition">Ví của tôi</a>
        </div>

        {/* Nút Web3 quan trọng nhất */}
        <button 
          onClick={connectWallet}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition transform hover:scale-105 ${
            isConnected 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
          }`}
        >
          <FaWallet />
          <span>{isConnected ? "0x1234...abcd" : "Kết nối Ví Meta Mask"}</span>
        </button>


      </div>
    </nav>
  );
};

// 2. Hero Section: Hình ảnh Đà Nẵng và lời kêu gọi chính
const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden" 
      style={{
        // Sử dụng ảnh Cầu Rồng Đà Nẵng làm nền chính
        backgroundImage: `linear-gradient(rgba(20, 10, 60, 0.7), rgba(30, 20, 80, 0.7)), url('/images/caurong1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Hiệu ứng parallax nhẹ
      }}
    >
     

      <div className="container mx-auto text-center relative z-10 px-4">
        <h1 className="text-5xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
          Khám phá Đà Nẵng<br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
            Tích lũy NFT -  Nhận thưởng thật
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-gray-200">
          Hệ sinh thái chăm sóc khách hàng thân thiết đầu tiên tại Thành phố Đà Nẵng trên nền tảng Blockchain. 
          Sở hữu NFT thành viên, tận hưởng ưu đãi độc quyền trên khắp thành phố bên sông Hàn.
        </p>
        <button className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1" onClick="javascript:window.location.href='/register'">
          Săn NFT thành viên ngay
          
        </button>
      </div>
    </div>
  );
};

// 3. Stats Section: Thống kê (Giả lập số liệu on-chain)
const StatsSection = () => {
  const stats = [
    { icon: <FaUsers size={40} />, number: "15,420+", label: "Khách hàng đã kết nối ví", color: "text-blue-400" },
    { icon: <FaStore size={40} />, number: "250+", label: "Đối tác doanh nghiệp", color: "text-green-400" },
    { icon: <FaDragon size={40} />, number: "50,000+", label: "NFT đã được mint", color: "text-yellow-400" },
  ];

  return (
    <section id="thong-ke" className="py-20 bg-slate-900 relative -mt-20 z-20 rounded-t-[3rem] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur border border-slate-700 hover:border-indigo-500 transition duration-300">
              <div className={`inline-block p-4 rounded-full bg-slate-700/50 mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Introduction & Ecosystem Section
const IntroSection = () => {
  return (
    <section id="gioi-thieu" className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Web3 NFT Concept" 
            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-indigo-900">Về TNT Loyalty Chain Network</h2>
          <div className="w-20 h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Chúng tôi cách mạng hóa chương trình khách hàng thân thiết bằng công nghệ Blockchain.
            Thay vì những tấm thẻ nhựa hay ứng dụng riêng lẻ, bạn sở hữu một <strong>NFT Membership</strong> duy nhất.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-gray-700">Tích điểm liên thông giữa các cửa hàng tại Đà Nẵng.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-gray-700">NFT cấp cao có thể chuyển nhượng, bán lại trên thị trường.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-gray-700">Minh bạch tuyệt đối nhờ công nghệ chuỗi khối.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// 5. Shop Showcase Section: Các cửa hàng thành viên
const ShopShowcase = () => {
  // Dữ liệu giả lập các shop
  const shops = [
    { name: "Cà phê Sông Hàn View", type: "F&B", discount: "Giảm 15% cho NFT Hạng Vàng", img: "/images/shop1.jpg" },
    { name: "Ngũ Hành Resort & Spa", type: "Lưu trú", discount: "Tặng 1 đêm khi sở hữu NFT Bạch Kim", img: "/images/shop2.jpg" },
    { name: "Đà Nẵng Souvenirs", type: "Mua sắm", discount: "Giảm 10% tổng hóa đơn", img: "/images/shop3.jpg" },
    { name: "Hải sản Trường Sa", type: "Du lịch", discount: "Giảm 15% hóa đơn", img: "/images/shop4.jpg" },
  ];

  return (
    <section id="doi-tac" className="py-10 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">Cửa hàng thành viên</h2>
          <p className="text-xl text-gray-600">Sử dụng NFT của bạn tại các địa điểm hàng đầu Đà Nẵng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shops.map((shop, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-6">
                <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider">{shop.type}</span>
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">{shop.name}</h3>
                <p className="text-gray-600 text-sm flex items-center">
                  <FaDragon className="text-yellow-500 mr-2" />
                  {shop.discount}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:text-indigo-800 transition">
            <span>Xem tất cả</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// 6. NFTs Section: bộ sưu tập NFTs
const NFTShowcase = () => {
  // 
  const NFTs = [
    { name: "Cầu Rồng", type: "LEGENDARY", rate: "5%", img: "/images/nft1.png" },
    { name: "Cầu Sông Hàn", type: "EPIC", rate: "10%", img: "/images/nft2.png" },
    { name: "Cầu Trần Thị Lý", type: "RARE", rate: "20%", img: "/images/nft3.png" },
    { name: "Cầu Thuận Phước", type: "UNCOMMON", rate: "30%", img: "/images/nft4.png" },
    { name: "Cầu Nguyễn Văn Trỗi", type: "COMMON", rate: "35%", img: "/images/nft5.png" },
  ];

  return (
    <section id="bo-suu-tap" className="py-10 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">Bộ sưu tập NFTs Brigde Era</h2>
          <p className="text-xl text-gray-600">Sưu tầm NFTs những cây cầu nổi tiếng của thành phố Đà Nẵng</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {NFTs.map((shop, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-6">
                <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider">{shop.type}</span>
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">{shop.name}</h3>
                <p className="text-gray-600 text-sm flex items-center">
                  <FaDragon className="text-yellow-500 mr-2" />
                  {shop.discount}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:text-indigo-800 transition">
            <span>Xem tất cả</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};


// 7. Footer & Support Info Section
const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Cột 1: Thông tin dự án */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <FaDragon className="text-yellow-400 text-3xl" />
            <span className="text-2xl font-bold text-white">TNT Loyalty Chain</span>
          </div>
          <p className="mb-6">
            Kết nối trải nghiệm du lịch và dịch vụ tại Đà Nẵng thông qua sức mạnh của công nghệ Blockchain và NFT.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Icons giả lập */}
            <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-yellow-500 hover:text-indigo-900 transition">F</a>
            <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-yellow-500 hover:text-indigo-900 transition">X</a>
            <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-yellow-500 hover:text-indigo-900 transition">D</a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Liên kết nhanh</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-yellow-400 transition">Hướng dẫn Mint NFT</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Danh sách đối tác</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Điều khoản sử dụng Smart Contract</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Whitepaper</a></li>
          </ul>
        </div>

        {/* Cột 3: Thông tin CSKH (Yêu cầu đề bài) */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <BiSupport className="mr-2 text-yellow-400" />
            Chăm sóc Khách hàng
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-indigo-400" />
              <span>Tầng 5, Tòa nhà Software Park, Quận Hải Châu, TP. Đà Nẵng (Gần Sông Hàn)</span>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-3 text-indigo-400" />
              <span>Hotline 24/7: 1900 xxxx (Hỗ trợ kỹ thuật Web3)</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-3 text-indigo-400" />
              <span>Email: support@tntchain.vn</span>
            </li>
            <li className="mt-4">
              <button className="w-full py-2 px-4 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-indigo-900 font-bold transition">
                Gửi yêu cầu hỗ trợ
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bản quyền */}
      <div className="border-t border-indigo-800 pt-8 text-center text-sm">
        <p>© 2025 TNT Loyalty Chain Network. Built with ❤️ in Da Nang on Blockchain.</p>
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  // State giả lập trạng thái kết nối ví
  // Trong thực tế, bạn sẽ dùng các thư viện như 'wagmi' hoặc 'ethers.js' để quản lý state này.
  const [isWalletConnected, setWalletConnected] = useState(false);

  // Hàm giả lập hành động kết nối ví (ví dụ: Metamask)
  const handleConnectWallet = async () => {
    console.log("Đang yêu cầu kết nối ví...");
    // Mô phỏng độ trễ mạng
    setTimeout(() => {
      setWalletConnected(true);
      alert("Đã kết nối ví thành công! (Chế độ Demo)");
    }, 1000);
  };

  return (
    <div className="font-sans bg-gray-50">
      <Navbar isConnected={isWalletConnected} connectWallet={handleConnectWallet} />

       <Routes>
          {/* ------- Trang chủ ------- */}
          <Route
            path="/"
            element={
              <main>
                <HeroSection />
                <StatsSection />
                <IntroSection />
                <ShopShowcase />
                <NFTShowcase/>
              </main>
            }
          />

          {/* ------- Trang Register ------- */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/NFT" element={<NFT />} /> 
          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/Wallet" element={<Wallet />} /> 
          <Route path="/Wallet2" element={<Wallet2 />} /> 
        </Routes>
      <Footer />
    </div>
  );
}

export default App;