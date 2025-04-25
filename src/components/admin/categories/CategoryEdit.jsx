import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../Button/BackButton";

const CategoryEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7177/api/Category/${id}`).then((res) => {
      const { name, description } = res.data;
      setForm({ name, description });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7177/api/Category/${id}`, form);
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error.response?.data || error.message);
      alert("Đã có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="form-container" style={styles.formContainer}>
      <h3 style={styles.header}>Chỉnh sửa danh mục</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tên danh mục</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mô tả</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitBtn}>
          Lưu
        </button>
      </form>

      <BackButton />
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "1.8em",
    color: "#333",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 20px",
    fontSize: "1.1em",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
};

export default CategoryEdit;
