import React from 'react';
// Sử dụng các icon từ lucide-react
import { Zap, Users, Wallet, Gem, ArrowRight } from 'lucide-react'; 

const NFTCollectionIntro = () => {
    // Dữ liệu mô phỏng các chỉ số quan trọng của bộ sưu tập
    const stats = [
        { label: "Tổng số NFT", value: "10", icon: Gem },
        { label: "Giá sàn (Floor Price)", value: "0.5 ETH", icon: Wallet },
        { label: "Số lượng Holders", value: "3,500", icon: Users },
        { label: "Volume Giao Dịch", value: "850 ETH", icon: Zap },
    ];

    return (
        // Hero Section với màu nền tối, tạo cảm giác cao cấp
        <section id="nft-intro" className="py-24 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    
                    {/* Khu vực giới thiệu và CTA */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-6xl font-extrabold mb-4 leading-tight text-indigo-400">
                            Bridge Era: <span className="block text-white">The Digital Bridge</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                            Bộ sưu tập NFT độc quyền kết nối thế giới ảo và thế giới thực, mang lại đặc quyền chăm sóc khách hàng VIP trong hệ sinh thái độc đáo NFT Loyalty của Thành phố Đà Nẵng.
                        </p>
                        
                        {/* Nút CTA */}
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center space-x-2">
                                <span>Mint ngay (Đang mở)</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition duration-300" onClick={() => window.open(
    "https://opensea.io",
    "_blank"
  )}>
                                Xem trên OpenSea
                            </button>
                        </div>
                    </div>

                    {/* Khu vực ảnh NFT nổi bật (hiệu ứng xếp chồng) */}
                    <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
                        {/* Ảnh lớn nổi bật, có hiệu ứng xoay nhẹ */}
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition duration-500">
                            <div className="aspect-square rounded-2xl overflow-hidden">
                                <img 
                                    src="/images/nft1.png" 
                                    alt="NFT nổi bật" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3 text-gray-800 text-center">
                                <h3 className="text-2xl font-bold">Dragon Bridge Legendary</h3>
                                <p className="text-sm text-indigo-600">ID #0001</p>
                            </div>
                        </div>

                        {/* Hiệu ứng nền mờ (Blur) */}
                        <div className="absolute top-0 right-0 lg:right-auto lg:left-0 w-32 h-32 bg-indigo-500 rounded-full opacity-30 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 lg:left-auto lg:right-0 w-48 h-48 bg-pink-500 rounded-full opacity-20 blur-2xl"></div>
                    </div>
                </div>

                {/* -------------------- Thanh chỉ số thống kê (Statistics Bar) -------------------- */}
                <div className="mt-20 bg-gray-800 p-6 rounded-2xl shadow-inner border border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center p-3 border-r md:border-r-0 border-r-gray-700 last:border-r-0">
                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
                                <p className="text-xs uppercase font-medium text-gray-400">{stat.label}</p>
                                <p className="text-3xl font-extrabold text-white mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default NFTCollectionIntro;