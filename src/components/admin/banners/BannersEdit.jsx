import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BannersEdit = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState({ imageUrl: '', link: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7177/api/Banner/${id}`)
      .then(res => setBanner(res.data))
      .catch(() => alert('Không thể tải thông tin banner.'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7177/api/Banner/${id}`, banner);
      navigate('/admin/banners');
    } catch {
      alert('Cập nhật banner thất bại.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa Banner</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label>Link ảnh:</label>
    <input
      type="text"
      className="form-control"
      value={banner.imageUrl}
      onChange={(e) =>
        setBanner({ ...banner, imageUrl: e.target.value })
      }
      required
    />
    {banner.imageUrl && (
      <img
        src={banner.imageUrl}
        alt="Banner preview"
        width="100"
        height="60"
        style={{ objectFit: 'cover', marginTop: '10px' }}
      />
    )}
  </div>

  <div className="mb-3">
    <label>Link điều hướng:</label>
    <input
      type="text"
      className="form-control"
      value={banner.link}
      onChange={(e) => setBanner({ ...banner, link: e.target.value })}
    />
  </div>
  <button type="submit" className="btn btn-success">Cập nhật</button>
</form>

    </div>
  );
};

export default BannersEdit;
