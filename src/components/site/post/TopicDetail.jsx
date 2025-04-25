import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { Card, Button, ListGroup } from 'react-bootstrap';

const TopicDetail = () => {
  const { id } = useParams(); // Lấy id của chủ đề từ URL
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]); // Mảng chứa các bài viết của chủ đề

  // Lấy thông tin chủ đề
  useEffect(() => {
    axios.get(`https://localhost:7177/api/Topic/${id}`)
      .then(res => {
        setTopic(res.data);
      })
      .catch(err => {
        console.error("Lỗi khi tải chi tiết chủ đề:", err);
      });
  }, [id]);

  // Lấy bài viết theo chủ đề
  useEffect(() => {
    axios.get(`https://localhost:7177/api/Post/ByTopic/${id}`)
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.error("Lỗi khi tải bài viết:", err);
      });
  }, [id]);

  // Nếu chưa tải dữ liệu
  if (!topic || posts.length === 0) return <div className="container mt-5">Đang tải dữ liệu...</div>;

  return (
    <div className="container mt-5">
      <Link to="/topics" className="btn btn-outline-secondary mb-4">
        <FaArrowLeft className="me-1" /> Quay lại danh sách
      </Link>

      {/* Card hiển thị chi tiết chủ đề */}
      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Text>{topic.description}</Card.Text>
          <hr />
          <Card.Subtitle className="mb-2 text-muted">
            <strong>Ngày tạo: </strong>{new Date(topic.createdAt).toLocaleString()}
          </Card.Subtitle>
        </Card.Body>
      </Card>

      {/* Tiêu đề bài viết liên quan */}
      <h4 className="mb-4">Bài viết liên quan</h4>
      <ListGroup variant="flush">
        {posts.map(post => (
          <ListGroup.Item key={post.id} className="list-group-item-action shadow-sm mb-3">
            <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <small className="text-muted">{new Date(post.publishedDate).toLocaleString()}</small>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TopicDetail;
