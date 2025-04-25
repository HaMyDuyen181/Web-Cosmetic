import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaComments, FaTimes } from 'react-icons/fa'; // Import biểu tượng từ react-icons
import '../../css/AdminSidebar.css'; // Import file CSS
const AdminSidebar = () => {
  // State để theo dõi trạng thái mở/đóng sidebar
  const [isOpen, setIsOpen] = useState(true);

  // Hàm để chuyển trạng thái sidebar (mở/đóng)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Biểu tượng cho mở/đóng */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />} {/* Hiển thị icon tương ứng */}
      </button>

      {isOpen && (
        <>       
          <nav>
            <ul className="sidebar-nav">
              <li><Link to="/admin/dashboard" className="sidebar-link">Dashboard</Link></li>
              <li><Link to="/admin/banners" className="sidebar-link">Banner</Link></li> {/* Thêm Banner */}
              <li><Link to="/admin/categories" className="sidebar-link">Danh mục</Link></li>
              <li><Link to="/admin/contacts" className="sidebar-link">Liên hệ</Link></li> {/* Thêm Contact */}
              <li><Link to="/admin/products" className="sidebar-link">Sản phẩm</Link></li>
              <li><Link to="/admin/orders" className="sidebar-link">Đơn hàng</Link></li>
              <li><Link to="/admin/posts" className="sidebar-link">Bài viết</Link></li> {/* Thêm Post */}
              <li><Link to="/admin/topics" className="sidebar-link">Chủ đề</Link></li> {/* Thêm Topic */}
              <li><Link to="/admin/users" className="sidebar-link">Người dùng</Link></li>
            
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default AdminSidebar;