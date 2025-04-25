import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa"; // Icon thư mục

const Topic = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7177/api/Topic")
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải chủ đề:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🗂️ Danh sách chủ đề</h2>
      <div className="row">
        {topics.map((topic) => (
          <div key={topic.id} className="col-md-4 mb-4">
            <Link
              to={`/topics/${topic.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <FaFolderOpen className="me-2 text-primary" size={24} />
                    <h5 className="card-title mb-0">{topic.title}</h5>
                  </div>
                  <p className="card-text">{topic.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topic;
