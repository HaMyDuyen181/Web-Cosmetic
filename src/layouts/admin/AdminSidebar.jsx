import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaComments, FaTimes, FaHome, FaImages, FaTags, FaBoxOpen, FaClipboardList, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import '../../css/AdminSidebar.css';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <nav>
          <ul className="sidebar-nav">
            <li><Link to="/admin/dashboard" className="sidebar-link"><FaHome className="icon" /> Dashboard</Link></li>
            <li><Link to="/admin/banners" className="sidebar-link"><FaImages className="icon" /> Banner</Link></li>
            <li><Link to="/admin/categories" className="sidebar-link"><FaTags className="icon" /> Danh mục</Link></li>
            <li><Link to="/admin/contacts" className="sidebar-link"><FaComments className="icon" /> Liên hệ</Link></li>
            <li><Link to="/admin/products" className="sidebar-link"><FaBoxOpen className="icon" /> Sản phẩm</Link></li>
            <li><Link to="/admin/orders" className="sidebar-link"><FaClipboardList className="icon" /> Đơn hàng</Link></li>
            <li><Link to="/admin/posts" className="sidebar-link"><FaFileAlt className="icon" /> Bài viết</Link></li>
            <li><Link to="/admin/topics" className="sidebar-link"><FaTags className="icon" /> Chủ đề</Link></li>
            <li><Link to="/admin/users" className="sidebar-link"><FaUserFriends className="icon" /> Người dùng</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminSidebar;
