import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaFileAlt,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dữ liệu cho biểu đồ doanh thu hàng tháng
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: [500000, 700000, 600000, 800000, 950000, 1000000, 1100000],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Các tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()} VNĐ`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Container fluid style={{ padding: "30px" }}>
      <Row>
        {/* Card 1: Tổng sản phẩm */}
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body
              className="text-center p-4"
              style={{
                background: "linear-gradient(135deg, #007bff, #00c6ff)",
              }}
            >
              <FaBox size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Tổng sản phẩm</Card.Title>
              <Card.Text className="h2 text-white">350</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2: Tổng người dùng */}
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body
              className="text-center p-4"
              style={{
                background: "linear-gradient(135deg, #28a745, #6fdb8c)",
              }}
            >
              <FaUsers size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Tổng người dùng</Card.Title>
              <Card.Text className="h2 text-white">1,250</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3: Tổng đơn hàng */}
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body
              className="text-center p-4"
              style={{
                background: "linear-gradient(135deg, #ffc107, #ffca2d)",
              }}
            >
              <FaShoppingCart size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Tổng đơn hàng</Card.Title>
              <Card.Text className="h2 text-white">580</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu hàng tháng */}
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body>
              <h4 className="text-center mb-4">Doanh thu hàng tháng</h4>
              <Line data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
