import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams(); // Lấy ID người dùng từ URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetail(id); // Lấy thông tin người dùng khi trang được tải
  }, [id]);
  
  const fetchUserDetail = async (userId) => {
    const token = localStorage.getItem('jwt-token'); // Lấy token từ localStorage

    try {
      const response = await axios.get(`https://localhost:7177/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi tải thông tin người dùng');
    }
  };

  const handleBack = () => {
    navigate('/admin/users'); // Quay lại trang danh sách người dùng
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!user) return <div className="alert alert-info">Đang tải thông tin người dùng...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Chi tiết Người dùng</h2>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <strong>Họ tên:</strong> <span>{user.fullname}</span>
        </div>
        <div className="mb-3">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="mb-3">
          <strong>Tên đăng nhập:</strong> <span>{user.username}</span>
        </div>
        <div className="mb-3">
          <strong>Vai trò:</strong> <span>{user.role}</span>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={handleBack}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
