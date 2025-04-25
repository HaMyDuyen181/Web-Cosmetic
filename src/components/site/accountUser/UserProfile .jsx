import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token-user");

    if (userId && token) {
      fetch(`https://localhost:7177/api/User/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Không thể gọi API");
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-warning text-center">
          Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4 text-primary">
                Hồ sơ
              </h3>
              <hr />
              <p>
                <FaUser className="me-2 text-secondary" />
                <strong>Họ tên:</strong> {userData.fullname}
              </p>
              <p>
                <FaUser className="me-2 text-secondary" />
                <strong>Tên đăng nhập:</strong> {userData.username}
              </p>
              <p>
                <FaEnvelope className="me-2 text-secondary" />
                <strong>Email:</strong> {userData.email}
              </p>
              <Link to="/edit-profile" className="btn btn-outline-primary">Chỉnh sửa</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
