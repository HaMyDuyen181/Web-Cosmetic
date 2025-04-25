import React from "react";
import { FaCartPlus, FaEye } from "react-icons/fa"; // Import các icon
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProductList = ({ categories }) => {
  const navigate = useNavigate();

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
      .then((res) => {
        alert("✅ Đã thêm vào giỏ hàng!");
      })
      .catch((err) => {
        console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
        alert("❌ Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
      });
  };
  
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "40px", color: "#2c3e50" }}>
        Sản phẩm theo danh mục
      </h2>
      {categories.map((category) => (
        <div key={category.id} className="category-section">
          <h3 style={{ marginTop: "30px", color: "#333" }}>{category.name}</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {category.products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  position: "relative",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "250px",
                  height: "480px", // 👈 CHIỀU CAO CỐ ĐỊNH
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // 👈 căn giữa nội dung
                  backgroundColor: "#fff",
                }}
              >
                {/* Badge giảm giá */}
                {product.discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "5px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    -{product.discount}%
                  </div>
                )}

                {/* Ảnh sản phẩm */}
                <img
                  src={
                    product.avatar && product.avatar.startsWith("http")
                      ? product.avatar
                      : `https://localhost:7177/${product.avatar}`
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px", // 👈 giữ chiều cao ảnh đồng đều
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                {/* Tên sản phẩm */}
                <h4
                  style={{
                    fontSize: "16px",
                    marginTop: "10px",
                    minHeight: "45px",
                  }}
                >
                  {product.name}
                </h4>

                {/* Mô tả */}
                <p
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    marginTop: "8px",
                    minHeight: "60px", // 👈 đảm bảo đủ chỗ
                  }}
                >
                  <strong>Mô tả:</strong> {truncate(product.description, 100)}
                </p>

                {/* Giá */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "16px",
                    marginTop: "8px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Giá:</span>
                  <span style={{ color: "black" }}>
                    {product.price && !isNaN(product.price)
                      ? product.price.toLocaleString()
                      : "Không xác định"}{" "}
                    VNĐ
                  </span>
                </div>

                {/* Nút xem chi tiết và Thêm vào giỏ hàng trong một hàng ngang */}
                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-primary w-48"
                  >
                    <FaEye /> {/* Icon con mắt cho Xem chi tiết */}
                  </Link>
                  <button
                    className="btn btn-success w-48"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <FaCartPlus /> {/* Icon Thêm vào giỏ hàng */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProductList;
