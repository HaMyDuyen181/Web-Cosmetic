import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTags, FaMoneyBillWave, FaPercent, FaFolderOpen } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7177/api/Product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      });
  }, [id]);
  
  const handleAddToCart = () => {
    const userId = localStorage.getItem('userId'); // đảm bảo bạn lưu user id khi login
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      navigate("/login-user");
      return;
    }

    axios.post('https://localhost:7177/api/Cart/add-item', {
      userId: parseInt(userId),
      productId: product.id,
      quantity: 1
    })
    .then(res => {
      alert("✅ Đã thêm vào giỏ hàng!");
      navigate("/carts");
    })
    .catch(err => {
      console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
      alert("❌ Không thể thêm vào giỏ hàng");
    });
  };
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Chi tiết sản phẩm</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://localhost:7177${product.avatar}`}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>💰 Giá: {product.price.toLocaleString()} đ</strong></p>
          {product.discount > 0 && (
            <p><FaPercent /> Giảm giá: {product.discount}%</p>
          )}
          <p><FaFolderOpen /> Danh mục: {product.categoryName}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </div>
      </div>
    </div>
  );
};

export default ProductDetail;
