import React, { useState, useEffect } from 'react';
// Sử dụng các icon từ lucide-react
import { CreditCard, Zap, Coins, Clock, UserCheck, ShoppingBag, Landmark } from 'lucide-react'; 
import { Link } from 'react-router-dom';

// Dữ liệu mô phỏng hoạt động gần đây
const mockActivity = [
    { id: 1, type: "Ưu đãi", description: "Giảm 15% tại Coffee & Books Alpha", date: "2 giờ trước", amount: "-120,000 VND", status: "Thành công" },
    { id: 2, type: "Hội viên", description: "Đăng ký thành công dịch vụ VIP", date: "1 ngày trước", amount: "0 VND", status: "Thành công" },
    { id: 3, type: "Ưu đãi", description: "Sử dụng ưu đãi tại Steakhouse Delta", date: "3 ngày trước", amount: "-350,000 VND", status: "Thành công" },
    { id: 4, type: "Lỗi", description: "Thanh toán thất bại tại Tech Solutions Zeta", date: "5 ngày trước", amount: "0 VND", status: "Thất bại" },
];

const Dashboard = () => {
    // 1. Dữ liệu mô phỏng trạng thái người dùng (thực tế sẽ lấy từ Auth và Blockchain)
    const [userWallet, setUserWallet] = useState("0xNFTUser...E45aBc1");
    const [nftTier, setNftTier] = useState("Legendary Tier 1");
    const [isConnected, setIsConnected] = useState(true);
    
    // 2. Dữ liệu thống kê KPI
    const stats = [
        { label: "Lợi ích đã sử dụng", value: "8 lần", icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-100" },
        { label: "Tổng tiết kiệm", value: "2,500,000 VND", icon: Coins, color: "text-green-500", bg: "bg-green-100" },
        { label: "Giá sàn NFT (Floor Price)", value: "0.5 ETH", icon: Landmark, color: "text-yellow-600", bg: "bg-yellow-100" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-10 sm:p-8">
            <div className="container mx-auto">
                {/* -------------------- TIÊU ĐỀ & TRẠNG THÁI VÍ -------------------- */}
                <header className="mb-10 p-10 bg-white rounded-xl shadow-lg">
                    <div className="flex justify-between items-center flex-wrap">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Thành viên</h1>
                            <p className="text-gray-500 mt-1">Tổng quan về hoạt động và đặc quyền NFT của bạn.</p>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right">
                            <div className="flex items-center space-x-2 bg-indigo-50 p-2 rounded-full border border-indigo-200">
                                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Ví đã kết nối:</span>
                                <span className="text-sm font-bold text-indigo-700">{userWallet.substring(0, 6)}...{userWallet.substring(userWallet.length - 4)}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* -------------------- PHẦN 1: CHỈ SỐ KPI -------------------- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <div className={`p-2 rounded-full ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* -------------------- PHẦN 2: THÔNG TIN NFT & HOẠT ĐỘNG -------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* KHỐI TRÁI: THẺ NFT VÀ ĐẶC QUYỀN */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">NFT Thành viên</h2>
                        
                        {/* Thẻ NFT */}
                        <div className="bg-gray-900 p-4 rounded-xl text-white text-center">
                            <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                                <img 
                                    src="https://placehold.co/400x400/6366f1/ffffff?text=Bridge+Era+NFT" 
                                    alt="Member NFT" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-3">
                                <span className="text-sm font-medium text-indigo-400">Hạng Thành Viên</span>
                                <span className="text-xl font-extrabold text-yellow-400">{nftTier}</span>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Đặc quyền của bạn</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center"><UserCheck className="w-4 h-4 mr-2 text-green-500" />Truy cập kênh hỗ trợ VIP 24/7.</li>
                                <li className="flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-blue-500" />Giảm giá độc quyền tại hơn 50 đối tác.</li>
                                <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-purple-500" />Tham gia sự kiện Mint NFT thế hệ mới.</li>
                            </ul>
                        </div>
                    </div>

                    {/* KHỐI PHẢI: HOẠT ĐỘNG GẦN ĐÂY */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
                        <div className="space-y-4">
                            {mockActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg transition duration-150">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-indigo-50 rounded-full">
                                            <Clock className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{activity.description}</p>
                                            <span className="text-xs text-gray-500">{activity.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${activity.status === 'Thành công' ? 'text-green-600' : 'text-red-600'}`}>
                                            {activity.amount}
                                        </p>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${activity.status === 'Thành công' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="mt-6 w-full text-indigo-600 font-bold py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition">
                            Xem tất cả giao dịch
                        </button>
                    </div>
                </div>

                 <Link to="/" className="mt-10 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;