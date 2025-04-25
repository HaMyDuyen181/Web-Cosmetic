import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    status: true,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Đổi từ userId sang id
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token-user");

  useEffect(() => {
    if (id && token) {
      fetch(`https://localhost:7177/api/User/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Không thể gọi API");
          return res.json();
        })
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy thông tin:", err);
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (!token) return;

    fetch(`https://localhost:7177/api/User/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const error = contentType?.includes("application/json")
            ? await res.json()
            : { message: "Lỗi không xác định" };
          throw new Error(error.message);
        }
        return res.json();
      })
      .then(() => {
        setMessage("Cập nhật thành công!");
        setTimeout(() => navigate("/profile-user"), 1500);
      })
      .catch((err) => {
        setMessage(err.message || "Lỗi khi cập nhật.");
        console.error(err);
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Đang tải...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Chỉnh sửa hồ sơ</h3>
              {message && (
                <div className="alert alert-info text-center">{message}</div>
              )}

              <div className="mb-3">
                <label className="form-label">
                  <FaUser className="me-2" />
                  Họ tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <FaUser className="me-2" />
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <FaEnvelope className="me-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => navigate("/profile-user")}>
                  <FaArrowLeft className="me-1" /> Quay lại
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                  <FaSave className="me-1" /> Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
