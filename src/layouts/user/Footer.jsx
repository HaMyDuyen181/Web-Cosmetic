// layouts/user/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-success text-white text-center py-5 mt-4">
      <div className="container">
        <div className="row">
          {/* Logo và Mô tả */}
          <div className="col-md-4">
            <img
              src="data:image/jpeg;base64,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"
              alt="Logo"
              style={{ height: "60px", marginRight: "60px" }}
            />
            <p>
              Địa chỉ đáng tin cậy cho các sản phẩm chất lượng. Khám phá những
              xu hướng mới nhất trong ngành mỹ phẩm và nhiều hơn nữa.
            </p>
          </div>

          {/* Phần Liên kết Nhanh */}
          <div className="col-md-4">
            <h5>Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-white">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-white">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white">
                  Điều Khoản Dịch Vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Phần Mạng Xã Hội */}
          <div className="col-md-4">
            <h5>Theo Dõi Chúng Tôi</h5>
            <div className="d-flex justify-content-center">
              <a
                href="https://facebook.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bản Quyền */}
        <div className="mt-4">
          <p className="mb-0">&copy; 2025 MyDuyen. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
