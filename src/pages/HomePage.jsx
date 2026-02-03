import React, { useEffect, useMemo, useState } from "react";
import CreamBox from "../layouts/CreamBox";
import BackToTopButton from "../components/BackToTopButton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DATA_API =
  "https://script.google.com/macros/s/AKfycbyCLP_t_UWKtYAf_kW2YdO262X6SKbuYn7Shbre7sCr6y_1Ig6_OJ4W8agiRuSFvkkwvA/exec";

const HEADER_API =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLh0L3HPUUYgGlu6WL-oZG3H2xxQYx2HU05SY81KXq6W5huE4oBInvUoe2vRRQVx6O08-gOJICMQGbRDxguRwP4HFKBvpn-vvBQ0imOAh7Ayv-mn-KTthCXkjAYGDOP5n3tGzNYHT9aSCz8HTW0jkyvf140r5waaDp-GAiiyWhEvD2ZBfwjZM52hLkLsOy8Qq4CBd7iKHUZPKTmpJenjN3rnVOQrm6sN2Ddz63NZUd3kI7WL0kbWYxkk2zgeJRgjmaA8halx8pVg3ARor9nHhJ6L82UZ3T3Wli28z8H6ha9PoZWlXfc&lib=MQ72Ki0fvtNorzsYcWks6t3NlG5ygbIsO";

// 清掉你資料裡那種多出來的 \" 或 "（避免圖片壞掉）
function cleanUrl(url) {
  return String(url ?? "")
    .trim()
    .replace(/\\"/g, "") // 移除 \"
    .replace(/"/g, "");  // 移除 "
}

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [headerImages, setHeaderImages] = useState([]);

  const [errMenu, setErrMenu] = useState("");
  const [errHeader, setErrHeader] = useState("");

  // 1) 抓 header images
  useEffect(() => {
    const loadHeader = async () => {
      try {
        const res = await fetch(HEADER_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Header API error: ${res.status}`);

        const rows = await res.json();
        const normalized = (Array.isArray(rows) ? rows : []).map((r) => ({
          id: String(r.id ?? "").trim(),
          src: cleanUrl(r.img),
          alt: String(r.alt ?? "").trim() || "header image",
        }));

        setHeaderImages(normalized.filter((x) => x.id && x.src));
      } catch (e) {
        setErrHeader(e.message || "Load header failed");
      }
    };

    loadHeader();
  }, []);

  // 2) 抓 menu items
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch(DATA_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Menu API error: ${res.status}`);

        const rows = await res.json();

        // 你可以在這裡做一點欄位整理（例如 id 轉字串、空白處理）
        const normalized = (Array.isArray(rows) ? rows : []).map((r) => ({
          ...r,
          id: String(r.id ?? "").trim(),
          name: String(r.name ?? "").trim(),
          cover1: cleanUrl(r.cover1),
          cover2: cleanUrl(r.cover2),
        }));

        setItems(normalized.filter((x) => x.id && x.name));
      } catch (e) {
        setErrMenu(e.message || "Load menu failed");
      }
    };

    loadMenu();
  }, []);

  const content = useMemo(() => items, [items]);

  return (
    <div className="home-page">
      <div className="header">
        {errHeader && (
          <p style={{ color: "crimson", margin: "8px 0" }}>
            Header API 載入失敗：{errHeader}
          </p>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          speed={700}
          className="homeSwiper"
        >
          {headerImages.map((img) => (
            <SwiperSlide key={img.id}>
              <img src={img.src} alt={img.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="content">
        <h1>Explore Different Flavor</h1>

        {errMenu && (
          <p style={{ color: "crimson" }}>
            Menu API 載入失敗：{errMenu}
          </p>
        )}

        <div className="ice-cream-menu">
          {content.map((item) => (
            <CreamBox
              key={item.id}
              id={item.id}
              name={item.name}
              cover1={item.cover1}
              cover2={item.cover2}
            />
          ))}
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default HomePage;
