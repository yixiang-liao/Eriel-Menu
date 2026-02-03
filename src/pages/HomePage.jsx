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

function cleanUrl(url) {
  return String(url ?? "")
    .trim()
    .replace(/\\"/g, "")
    .replace(/"/g, "");
}

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [headerImages, setHeaderImages] = useState([]);

  const [errMenu, setErrMenu] = useState("");
  const [errHeader, setErrHeader] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [loadingHeader, setLoadingHeader] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);

  // ✅ 1) 抓 header images（只處理 header 欄位）
  useEffect(() => {
    const loadHeader = async () => {
      setLoadingHeader(true);
      try {
        const res = await fetch(HEADER_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Header API error: ${res.status}`);

        const rows = await res.json();
        const normalized = (Array.isArray(rows) ? rows : [])
          .map((r) => ({
            id: String(r.id ?? "").trim(),
            src: cleanUrl(r.img),
            alt: String(r.alt ?? "").trim() || "header image",
          }))
          .filter((x) => x.id && x.src);

        setHeaderImages(normalized);
        setErrHeader("");
      } catch (e) {
        setErrHeader(e.message || "Load header failed");
      } finally {
        setLoadingHeader(false);
      }
    };

    loadHeader();
  }, []);

  // ✅ 2) 抓 menu items（在這裡做 online + types）
  useEffect(() => {
    const loadMenu = async () => {
      setLoadingMenu(true);
      try {
        const res = await fetch(DATA_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Menu API error: ${res.status}`);

        const rows = await res.json();

        const normalized = (Array.isArray(rows) ? rows : [])
          .map((r) => ({
            ...r,
            id: String(r.id ?? "").trim(),
            name: String(r.name ?? "").trim(),

            // ✅ online 可能是 boolean / "true"/"false" 字串，都能吃
            online:
              typeof r.online === "boolean"
                ? r.online
                : String(r.online ?? "").toLowerCase() === "true",

            types: String(r.type ?? "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),

            cover1: cleanUrl(r.cover1),
            cover2: cleanUrl(r.cover2),
          }))
          .filter((x) => x.id && x.name && x.online === true); // ⭐ 只顯示 online

        setItems(normalized);
        setErrMenu("");
      } catch (e) {
        setErrMenu(e.message || "Load menu failed");
      } finally {
        setLoadingMenu(false);
      }
    };

    loadMenu();
  }, []);

  const content = useMemo(() => {
    if (activeType === "all") return items;
    return items.filter((item) => item.types?.includes(activeType));
  }, [items, activeType]);

  return (
    <div className="home-page">
      <div className="header">
        {errHeader && (
          <p style={{ color: "crimson", margin: "8px 0" }}>
            Header API 載入失敗：{errHeader}
          </p>
        )}

        {loadingHeader ? (
          <div className="header-skeleton" aria-label="loading header" />
        ) : (
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
        )}
      </div>

      <div className="content">
        <h1>Explore Different Flavor</h1>

        <div className="menu-filter">
          <span
            className={activeType === "all" ? "active" : ""}
            onClick={() => setActiveType("all")}
          >
            全部
          </span>
          <span
            className={activeType === "經典款" ? "active" : ""}
            onClick={() => setActiveType("經典款")}
          >
            經典款
          </span>
          <span
            className={activeType === "水果款" ? "active" : ""}
            onClick={() => setActiveType("水果款")}
          >
            水果款
          </span>
          <span
            className={activeType === "茶款" ? "active" : ""}
            onClick={() => setActiveType("茶款")}
          >
            茶款
          </span>
          <span
            className={activeType === "特別款" ? "active" : ""}
            onClick={() => setActiveType("特別款")}
          >
            特別款
          </span>
        </div>

        {errMenu && (
          <p style={{ color: "crimson" }}>Menu API 載入失敗：{errMenu}</p>
        )}

        <div className="ice-cream-menu">
          {loadingMenu
            ? Array.from({ length: 9 }).map((_, i) => (
                <div className="cream-skeleton" key={i}>
                  <div className="cream-skeleton__img" />
                  <div className="cream-skeleton__text" />
                </div>
              ))
            : content.map((item) => (
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
