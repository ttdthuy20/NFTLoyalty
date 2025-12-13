import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: 20 }}>Trang chủ</Link>
      <Link to="/login" style={{ marginRight: 20 }}>Đăng nhập</Link>
      <Link to="/greeter">Greeter Demo</Link>
      
    </nav>
  );
}
    