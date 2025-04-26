import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Button/BackButton';

const CreateUser = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Lấy token từ localStorage
    const token = localStorage.getItem('jwt-token');
    
    // Kiểm tra nếu thông tin chưa đầy đủ
    if (!fullname || !email || !username || !role || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const userData = {
      fullname,
      email,
      username,
      password,
      role,
    };

    try {
      const response = await axios.post('https://localhost:7177/api/User', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      // Điều hướng về trang danh sách người dùng sau khi tạo thành công
      setTimeout(() => {
        navigate('/admin/users');
      }, 2000); // Thêm delay 2s trước khi điều hướng
    } catch (err) {
      if (err.response && err.response.status === 409 && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Lỗi khi tạo người dùng. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Thêm Người dùng</h2>

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {success && <div className="alert alert-success text-center">Người dùng đã được tạo thành công!</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input
            type="text"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Vai trò</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Chọn vai trò</option>
            <option value="user">User</option>
            <option value="admin">Admin</option> {/* Thêm lựa chọn Admin */}
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary w-100 mt-3">Thêm Người dùng</button>
      </form>

      <div className="mt-4 text-center">
        <BackButton />
      </div>
    </div>
  );
};

export default CreateUser;
