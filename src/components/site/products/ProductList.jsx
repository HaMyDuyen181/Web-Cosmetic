import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFolderOpen, FaCartPlus, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7177/api/Product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sản phẩm:", err);
      });
  }, []);

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      navigate("/login-user");
      return;
    }

    axios
      .post("https://localhost:7177/api/Cart/add-item", {
        userId: parseInt(userId),
        productId,
        quantity: 1,
      })
      .then(() => {
        alert("✅ Đã thêm vào giỏ hàng!");
      })
      .catch((err) => {
        console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
        alert("❌ Không thể thêm vào giỏ hàng");
      });
  };

  // Lọc sản phẩm dựa trên từ khóa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Danh sách sản phẩm</h2>

      {/* Ô tìm kiếm */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm rounded position-relative overflow-hidden">
                {product.discount > 0 && (
                  <div
                    className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1"
                    style={{ fontSize: "0.9rem", borderBottomLeftRadius: "8px" }}
                  >
                    -{product.discount}%
                  </div>
                )}

                <img
                  src={`https://localhost:7177${product.avatar}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{product.name}</h5>
                  <p className="card-text flex-grow-1">
                    {product.description?.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Giá:</span>
                    <span className="text-black fw-bold">
                      {product.price.toLocaleString()} VNĐ
                    </span>
                  </div>

                  <p className="mb-0 text-muted small">
                    <FaFolderOpen className="me-2" />
                    {product.categoryName}
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-primary w-48"
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="btn btn-success w-48"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <FaCartPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
