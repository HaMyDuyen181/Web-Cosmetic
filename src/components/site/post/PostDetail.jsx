import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Sử dụng useParams để lấy id bài viết từ URL

const PostDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7177/api/Post/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Lỗi khi tải chi tiết bài viết');
        console.error(err);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Đang tải...</p>;

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.urlImage && <img src={post.urlImage} alt={post.title} className="post-detail-image" />}
      <p>Topic ID: {post.topicId}</p>
    </div>
  );
};

export default PostDetail;
