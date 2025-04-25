import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Home.css";
import CategoryProductList from "../site/products/CategoryProductList";
import ProductNew from "./products/ProductNew";
import Post from "../site/post/Post"
const Home = () => {
  const [banners, setBanners] = useState([]);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  useEffect(() => {
    fetchBanners();
    fetchCategoriesWithProducts();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("https://localhost:7177/api/Banner");
      setBanners(res.data);
    } catch (error) {
      console.error("Lỗi khi tải banner:", error);
    }
  };

  const fetchCategoriesWithProducts = async () => {
    try {
      const categoryRes = await axios.get(
        "https://localhost:7177/api/Category"
      );
      const categories = categoryRes.data;

      const categoriesData = await Promise.all(
        categories.map(async (category) => {
          try {
            const productRes = await axios.get(
              `https://localhost:7177/api/Product/category/${category.id}`
            );
            return {
              ...category,
              products: productRes.data,
            };
          } catch (error) {
            console.error(
              `Lỗi khi tải sản phẩm của danh mục ${category.name}:`,
              error
            );
            return {
              ...category,
              products: [],
            };
          }
        })
      );

      setCategoriesWithProducts(categoriesData);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  return (
    <div className="home">


      {/* Hiển thị Banner */}
      <div className="banner">
        {banners.map((banner) => (
          <div key={banner.id} style={{ padding: "0 10px", marginBottom: "20px" }}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  banner.imageUrl && banner.imageUrl.startsWith("http")
                    ? banner.imageUrl
                    : `https://localhost:7177/${banner.imageUrl}`
                }
                alt="Banner"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </a>
          </div>
        ))}
      </div>
      <ProductNew />
      {/* Danh sách sản phẩm theo danh mục */}
      <CategoryProductList categories={categoriesWithProducts} />
      <Post />
    </div>
  );
};

export default Home;
