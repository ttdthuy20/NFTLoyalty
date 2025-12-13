import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const RegisterForm = () => {
    // 1. STATE MANAGEMENT
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });
    const [wallet, setWallet] = useState(null); // Lưu địa chỉ ví
    const [hasNFT, setHasNFT] = useState(false); // Trạng thái xác minh NFT
    const [message, setMessage] = useState(''); // Thông báo lỗi/thành công
    const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

    // 2. FORM HANDLERS
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage('');
    };

    const isFormValid = formData.fullName && formData.email;
    const isReadyToRegister = isFormValid && wallet && hasNFT;

    // 3. WEB3 HANDLERS (Mô phỏng)
    const handleConnectWallet = () => {
        if (wallet) return; // Đã kết nối

        setIsLoading(true);
        setMessage('Đang kết nối ví...');

        // *** THAO TÁC WEB3: Yêu cầu kết nối ví (MetaMask) ***
        setTimeout(() => {
            const mockAddress = '0xNFTUser...E45aBc1'; 
            setWallet(mockAddress);
            setMessage(`✅ Đã kết nối ví: ${mockAddress}. Bắt đầu xác minh NFT...`);
            
            // Tự động chuyển sang xác minh NFT
            handleVerifyNFT(mockAddress);
        }, 1500);
    };

    const handleVerifyNFT = (address) => {
        // *** THAO TÁC WEB3: Kiểm tra NFT (ERC-721/ERC-1155) ***
        // Trong thực tế: Gọi API của blockchain để kiểm tra số dư NFT của địa chỉ này
        
        // Mô phỏng logic kiểm tra NFT: 80% thành công
        const hasRequiredNFT = Math.random() < 0.8; 

        setTimeout(() => {
            setIsLoading(false);
            setHasNFT(hasRequiredNFT);
            
            if (hasRequiredNFT) {
                setMessage('🥳 Xác minh NFT thành công! Bạn đủ điều kiện đăng ký.');
            } else {
                setMessage('❌ Lỗi: Ví này không giữ NFT Thành viên. Vui lòng thử ví khác.');
                setWallet(null); // Yêu cầu kết nối lại nếu không có NFT
            }
        }, 2500);
    };

    // 4. FINAL REGISTRATION HANDLER
    const handleFinalRegistration = async(e) => {
        e.preventDefault();
        
        if (!isReadyToRegister) {
            setMessage('Vui lòng hoàn thành đủ 3 bước (Form, Kết nối ví, Xác minh NFT) trước khi đăng ký.');
            return;
        }

        setIsLoading(true);
        setMessage('Đang gửi dữ liệu đăng ký và ghi nhận thông tin lên Blockchain...');

        // *** THAO TÁC WEB2 & WEB3 CUỐI CÙNG ***
        // Trong thực tế: Gửi formData lên máy chủ Web2, sau đó ghi log giao dịch lên Blockchain.
try {
    const payload = {
        fullName: formData.fullName,
        email: formData.email,
        walletAddress: wallet,
        hasNFT: hasNFT // Backend sẽ tự chuyển true/false thành 1/0
    };

    const response = await fetch('http://localhost:5173/api/register', { // Đảm bảo đúng URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
// ...
} catch (error) {

    } finally {
        setTimeout(() => {
            setIsLoading(false);
            setMessage(`🎉 Đăng ký thành công! Chào mừng ${formData.fullName} đến với hệ sinh thái NFT CC. Địa chỉ ví của bạn (${wallet}) đã được ghi nhận.`);
            // Xóa form và vô hiệu hóa nút
            setFormData({ fullName: '', email: '' });
        }, 3000);
    };
}
    return (
        
        <div className="container py-20">
            <h1>💎 Đăng ký Thành viên NFT Loyalty Chain System</h1>
            <p>
                Hoàn thành 3 bước sau để trở thành thành viên của dịch vụ chăm sóc khách hàng độc quyền. **Yêu cầu sở hữu NFT Thành viên.**
            </p>

            <form onSubmit={handleFinalRegistration}>
                {/* -------------------- BƯỚC 1: ĐIỀN FORM -------------------- */}
                <div className="web3-step">
                    <h2>1. Thông tin cơ bản</h2>
                    <div className="form-group">
                        <label htmlFor="fullName">Tên đầy đủ</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                </div>
      

                {/* -------------------- BƯỚC 2: KẾT NỐI VÍ & XÁC MINH NFT -------------------- */}
                <div className="web3-step" style={{ borderColor: wallet ? '#28a745' : '#007bff' }}>
                    <h2>2. Kết nối và Xác minh NFT</h2>
                    <p>Kết nối ví chứa NFT Thành viên của bạn.</p>
                    
                    <button 
                        type="button"
                        className={`button-link ${wallet ? 'disabled-button' : ''}`}
                        onClick={handleConnectWallet}
                        disabled={!isFormValid || wallet || isLoading}
                        style={{ backgroundColor: wallet ? '#28a745' : '' }}
                    >
                        {wallet ? `✅ Ví đã kết nối (${wallet.slice(0, 6)}...)` : 'Kết nối Ví MetaMask'}
                    </button>

                    {wallet && (
                        <p style={{ marginTop: '10px' }}>
                            Trạng thái NFT: <strong>{hasNFT ? 'Đã xác minh' : 'Đang kiểm tra...'}</strong>
                        </p>
                    )}
                </div>

                {/* -------------------- BƯỚC 3: HOÀN TẤT ĐĂNG KÝ -------------------- */}
                <div className="web3-step" style={{ borderColor: isReadyToRegister ? '#17a2b8' : '#007bff' }}>
                    <h2>3. Hoàn tất Đăng ký</h2>
                    <button 
                        type="submit"
                        className={`button-link ${!isReadyToRegister || isLoading ? 'disabled-button' : ''}`}
                        disabled={!isReadyToRegister || isLoading}
                        style={{ width: '100%', padding: '15px' }}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Gửi Đăng ký thành viên'}
                    </button>
                </div>
            </form>

            {/* MESSAGE AREA */}
            {message && <div className={`error-message`} style={{ color: message.startsWith('✅') || message.startsWith('🥳') || message.startsWith('🎉') ? '#28a745' : '#dc3545' }}>{message}</div>}

            <Link to="/" style={{ display: 'block', marginTop: '30px', color: '#007bff', textDecoration: 'none' }}>
                &larr; Quay lại Trang chủ
            </Link>
        </div>
    );
};

export default RegisterForm;