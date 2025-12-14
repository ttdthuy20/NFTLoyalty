import React from 'react';
// Sử dụng các icon từ lucide-react (hoặc Font Awesome)
import { MapPin, Tag, Briefcase } from 'lucide-react'; 

const ShopList = () => {
    // Dữ liệu mô phỏng cho các cửa hàng thành viên
    const memberShops = [
        { 
            name: "Coffee & Books Alpha", 
            category: "Quán Cà Phê", 
            discount: "Giảm 15% khi thanh toán bằng NFT", 
            location: "Phường Hải Châu, Đà Nẵng", 
            img: "/images/shop1.jpg" 
        },
        
         { 
            name: "Coffee Xanh", 
            category: "Quán Cà Phê", 
            discount: "Giảm 5% khi thanh toán bằng NFT", 
            location: "Phường Liên chiểu, Đà Nẵng", 
            img: "/images/shop7.jpg" 
        },
         { 
            name: "Pizza Bella Italia", 
            category: "Quán ăn Ý", 
            discount: "Giảm 10% cho toàn bộ hóa đơn", 
            location: "Phường An Hải, Đà Nẵng", 
            img: "/images/shop8.jpg" 
        },

        { 
            name: "Steak House Delta", 
            category: "Nhà hàng Cao cấp", 
            discount: "Giảm 10% cho toàn bộ hóa đơn", 
            location: "Phường An Hải, Đà Nẵng", 
            img: "/images/shop5.jpg" 
        },
        { 
            name: "Spa Relax Omega", 
            category: "Dịch Vụ Sức Khỏe", 
            discount: "Tặng 1 buổi massage miễn phí", 
            location: "Phường Thanh Khê, Đà Nẵng", 
            img: "/images/shop2.jpg" 
        },
       
        // Thêm nhiều cửa hàng hơn để hiển thị cuộn
        { 
            name: "Hải Sản Vàng", 
            category: "Nhà Hàng Hải Sản", 
            discount: "Giảm 5%", 
            location: "Quận Hải Châu, Đà Nẵng", 
            img: "/images/shop4.jpg" 
        },
    ];

    return (
        // Sử dụng py-20 và bg-indigo-50 để duy trì phong cách như các section trước
        <section id="shop-list" className="py-20 bg-indigo-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-indigo-900 mb-4 tracking-tight">Danh sách cửa hàng thành viên</h2>
                    <p className="text-xl text-gray-600">Sử dụng NFT thành viên để nhận các ưu đãi độc quyền tại các cửa hàng đối tác.</p>
                </div>

                {/* Grid bố cục responsive: 1 (mobile) -> 2 (tablet) -> 3 (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {memberShops.map((shop, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-gray-200 rounded-2xl shadow-xl transition duration-500 overflow-hidden group transform hover:scale-[1.02]"
                        >
                            {/* Khu vực ảnh (đảm bảo khổ vuông) */}
                            <div className="w-full aspect-square overflow-hidden bg-gray-100">
                                <img 
                                    src={shop.img || "https://placehold.co/400x400/e0e7ff/1f2937?text=Store+Image"} 
                                    alt={shop.name} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/e0e7ff/1f2937?text=Image+Error"; }}
                                />
                            </div>
                            
                            {/* Thông tin cửa hàng */}
                            <div className="p-6">
                                <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center mb-2">
                                    <Briefcase className="w-4 h-4 mr-1 text-pink-500" />
                                    {shop.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{shop.name}</h3>
                                
                                <div className="space-y-2 text-gray-700">
                                    {/* Ưu đãi */}
                                    <p className="flex items-start">
                                        <Tag className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                                        <span className="font-semibold">{shop.discount}</span>
                                    </p>
                                    {/* Vị trí */}
                                    <p className="flex items-start">
                                        <MapPin className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
                                        <span>{shop.location}</span>
                                    </p>
                                </div>
                                
                                <button className="mt-5 w-full bg-indigo-700 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition duration-300 shadow-md">
                                    Xem ưu đãi chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nút xem thêm */}
                <div className="text-center mt-12">
                    <button className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:text-indigo-800 transition text-lg border-b-2 border-indigo-600 pb-1">
                        <span>Tải thêm cửa hàng</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShopList;