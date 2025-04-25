import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus, FaEye } from 'react-icons/fa';

const ProductNew = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7177/api/Product/new');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm mới:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const isLoggedIn = () => {
    const userId = localStorage.getItem("userId");
    return userId !== null;
  };

  const handleAddToCart = (productId) => {
    if (!isLoggedIn()) {
      alert("⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login-user");
      return;
    }

    const userId = parseInt(localStorage.getItem("userId"));

    axios
      .post("https://localhost:7177/api/Cart/add-item", {
        userId,
        productId,
        quantity: 1,
      })
      .then(() => {
        alert("✅ Đã thêm vào giỏ hàng!");
      })
      .catch((err) => {
        console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
        alert("❌ Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
      });
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Đang tải sản phẩm mới...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Sản phẩm mới</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              width: '250px',
              height: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            {/* Badge giảm giá */}
            {product.discount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'red',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                -{product.discount}%
              </div>
            )}

            <img
              src={
                product.avatar && product.avatar.startsWith('http')
                  ? product.avatar
                  : `https://localhost:7177/${product.avatar}`
              }
              alt={product.name}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />

            <h4 style={{ fontSize: '16px', marginTop: '10px', minHeight: '45px' }}>
              {product.name}
            </h4>

            <p
              style={{
                color: '#555',
                fontSize: '14px',
                marginTop: '8px',
                minHeight: '60px',
              }}
            >
              <strong>Mô tả:</strong> {truncate(product.description, 100)}
            </p>
            <p style={{ margin: '5px 0 0', fontStyle: 'italic' }}>
              Danh mục: {product.categoryName}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '16px',
                marginTop: '8px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Giá:</span>
              <span>
                {product.price && !isNaN(product.price)
                  ? product.price.toLocaleString()
                  : 'Không xác định'}{' '}
                VNĐ
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '12px' }}>
              <Link to={`/products/${product.id}`} className="btn btn-outline-primary w-100">
                <FaEye />
              </Link>
              <button className="btn btn-success w-100" onClick={() => handleAddToCart(product.id)}>
                <FaCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductNew;
