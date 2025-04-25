import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Thêm Link để điều hướng
import '../../../css/Post.css'; // Đảm bảo tạo file CSS tương ứng

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    urlImage: '',
    topicId: 1,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://localhost:7177/api/Post');
        setPosts(response.data);
      } catch (err) {
        setError('Lỗi khi tải bài viết');
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7177/api/Post', newPost);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setNewPost({ title: '', content: '', urlImage: '', topicId: 1 });
    } catch (err) {
      setError('Lỗi khi tạo bài viết');
      console.error(err);
    }
  };

  const truncateContent = (content, length = 100) => {
    return content.length > length ? content.slice(0, length) + '...' : content;
  };

  return (
    <div className="post-container">
      <h2>Bài viết mới nhất</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{truncateContent(post.content)}</p>
            {post.urlImage && <img src={post.urlImage} alt={post.title} className="post-image" />}
            <p>Topic ID: {post.topicId}</p>
            {/* Thêm Link để điều hướng đến trang chi tiết bài viết */}
            <Link to={`/post/${post.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
