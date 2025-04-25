import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:7177/api/contact', formData);
      setStatus('Liên hệ thành công!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Gửi liên hệ thất bại. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <div className="contact-container" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Liên hệ với chúng tôi</h2>
      {status && <p style={{ color: 'green' }}>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Gửi liên hệ
        </button>
      </form>
    </div>
  );
};

export default Contact;
