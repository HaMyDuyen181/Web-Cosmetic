import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../Button/BackButton';

const EditUser = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    username: '',
    role: 'user',
  });
  const [originalUser, setOriginalUser] = useState(null); // Giữ bản gốc của người dùng
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(id); // Gọi hàm lấy thông tin người dùng khi trang được tải
  }, [id]);

  const fetchUser = async (userId) => {
    const token = localStorage.getItem('jwt-token');
    
    try {
      const response = await axios.get(`https://localhost:7177/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setUser(response.data); // Lưu thông tin người dùng vào state
      setOriginalUser(response.data); // Lưu bản gốc
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi tải thông tin người dùng');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu không có thay đổi nào (negative check)
    if (
      user.fullname === originalUser.fullname &&
      user.email === originalUser.email &&
      user.username === originalUser.username &&
      user.role === originalUser.role
    ) {
      setError('Không có thay đổi nào để cập nhật');
      return; // Dừng lại nếu không có thay đổi
    }

    const token = localStorage.getItem('jwt-token');
    
    try {
      const response = await axios.put(
        `https://localhost:7177/api/User/${id}`,
        user, // Dữ liệu chỉnh sửa
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Nếu thành công, chuyển hướng về trang quản lý người dùng
      if (response.status === 200) {
        navigate('/admin/users');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Lỗi khi cập nhật người dùng');
      } else {
        setError('Lỗi kết nối với server');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chỉnh sửa Người dùng</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <div className="form-group mb-3">
          <label htmlFor="fullname" className="form-label">Họ Tên</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-control"
            value={user.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="role" className="form-label">Vai trò</label>
          <input
            type="text"
            id="role"
            name="role"
            className="form-control"
            value={user.role}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Cập nhật Người dùng
        </button>
      </form>
      <div className="mt-3 text-center">
        <BackButton />
      </div>
    </div>
  );
};

export default EditUser;
