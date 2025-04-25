import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = 'https://localhost:7177/api/Post';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => { setPosts(res.data); setLoading(false); })
      .catch(() => { setError('Lỗi khi tải bài viết'); setLoading(false); });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này không?')) {
      axios.delete(`${API_URL}/${id}`).then(() => {
        setPosts(posts.filter(p => p.id !== id));
      });
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Quản lý Bài viết</h4>
        <Link to="/admin/posts/create" className="btn btn-primary">Thêm</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Ngày xuất bản</th>
            <th className="text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td className="text-truncate" style={{ maxWidth: 200 }}>{p.content}</td>
              <td>{new Date(p.publishedDate).toLocaleDateString()}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <Link to={`/admin/posts/${p.id}`} className="btn btn-sm btn-info"><FaEye /></Link>
                  <Link to={`/admin/posts/${p.id}/edit`} className="btn btn-sm btn-warning"><FaEdit /></Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}><FaTrashAlt /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
