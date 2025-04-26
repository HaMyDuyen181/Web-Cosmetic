import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaTags,
  FaMoneyBillWave,
  FaPercent,
  FaFolderOpen,
  FaStar,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://localhost:7177/api/Product/${id}`);
        setProduct(res.data);

        const relatedRes = await axios.get(
          `https://localhost:7177/api/Product/related-by-category/${res.data.categoryId}`
        );

        // Lọc bỏ chính sản phẩm hiện tại khỏi danh sách liên quan
        const filtered = relatedRes.data.filter((p) => p.id !== res.data.id);

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết hoặc sản phẩm liên quan:", err);
      }
    };

    fetchProduct();
  }, [id]); // ⚠️ Quan trọng: thêm [id] để reload khi ID thay đổi

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId"); // đảm bảo bạn lưu user id khi login
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      navigate("/login-user");
      return;
    }

    axios
      .post("https://localhost:7177/api/Cart/add-item", {
        userId: parseInt(userId),
        productId: product.id,
        quantity: 1,
      })
      .then((res) => {
        alert("✅ Đã thêm vào giỏ hàng!");
        navigate("/carts");
      })
      .catch((err) => {
        console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
        alert("❌ Không thể thêm vào giỏ hàng");
      });
  };

  if (!product) return <div>Loading...</div>;

  // Hàm để tạo số sao, mặc định 4 sao
  const renderStars = (rating = 4) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "#FFD700" : "#ddd"} />);
    }
    return stars;
  };

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
          <p>
            <strong>💰 Giá: {product.price.toLocaleString()} VNĐ</strong>
          </p>
          {product.discount > 0 && (
            <p>
              <FaPercent /> Giảm giá: {product.discount}%
            </p>
          )}
          <p>
            <FaFolderOpen /> Danh mục: {product.categoryName}
          </p>

          {/* Hiển thị số sao (mặc định 4 sao) */}
          <div>
            <strong>Đánh giá: </strong>
            {renderStars(4)} {/* Hiển thị 4 sao mặc định */}
          </div>

          <button className="btn btn-primary" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <h3 className="mt-5">Sản phẩm liên quan</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="col">
              <div className="card h-100">
                <img
                  src={`https://localhost:7177${relatedProduct.avatar}`}
                  className="card-img-top"
                  alt={relatedProduct.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{relatedProduct.name}</h5>
                  <p className="card-text flex-grow-1">
                    {relatedProduct.description.length > 100
                      ? relatedProduct.description.slice(0, 100) + "..."
                      : relatedProduct.description}
                  </p>
                  <p className="card-text">
                    <strong>
                      {" "}
                      💰 Giá: {relatedProduct.price.toLocaleString()} VNĐ
                    </strong>
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm liên quan.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
