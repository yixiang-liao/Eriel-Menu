import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton";
import { BsArrowDownCircleFill } from "react-icons/bs";

// ✅ 跟 HomePage 一樣的簡易 CSV parser
function parseCSV(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? "";
    });
    return obj;
  });
}

const InnerPage = () => {
  const { id } = useParams(); // 例如 "1"
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("./data.csv", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load CSV: ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);

        // 可選：整理欄位（避免空白、型態問題）
        const normalized = rows.map((r) => ({
          ...r,
          id: String(r.id ?? "").trim(),
          name: (r.name ?? "").trim(),
          keyword: (r.keyword ?? "").trim(),
          describe: (r.describe ?? "").trim(),
          hashtag: (r.hashtag ?? "").trim(),
          cal: (r.cal ?? "").trim(),
          cover1: (r.cover1 ?? "").trim(),
          cover2: (r.cover2 ?? "").trim(),
          inner1: (r.inner1 ?? "").trim(),
          inner2: (r.inner2 ?? "").trim(),
          ingredient: (r.ingredient ?? "").trim(),
        }));

        setItems(normalized);
        setErr("");
      } catch (e) {
        setErr(e.message || "Load CSV failed");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const item = useMemo(() => {
    return items.find((d) => String(d.id) === String(id));
  }, [items, id]);

  if (loading) {
    return (
      <div className="inner-page">
        <div className="content" style={{ paddingTop: 80 }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="inner-page">
        <div className="content" style={{ paddingTop: 80 }}>
          <p style={{ color: "crimson" }}>CSV 載入失敗：{err}</p>
          <Link to="/">回首頁</Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="inner-page">
        <div className="content" style={{ paddingTop: 80 }}>
          <p>找不到這個品項（id: {id}）</p>
          <Link to="/">回首頁</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="inner-page">
      <div className="content">
        <div className="inner-head">
          <div className="img">
            <img src={item.inner1} alt={item.name} />
          </div>

          <div className="text">
            <div className="top">
              <h1>{item.name}</h1>
              <h2>{item.keyword}</h2>
            </div>
            <div className="bottom">
              <p className="cal">{item.cal}</p>
              <p className="hashtag">{item.hashtag}</p>
            </div>
          </div>
        </div>

        <div className="inner-body">
          <div className="describe">
            <p>{item.describe}</p>
          </div>

          <div className="more-info">
            <div className="btm-icon">
              <BsArrowDownCircleFill />
            </div>
            <p>Nutritional information</p>
          </div>

          <div className="info-img">
            {item.inner1 && <img className="kCal-img" src={item.inner2} alt="kCal" />}
            {item.inner2 && <img className="ingr-img" src={item.ingredient} alt="ingredients" />}
            {/* 如果你 ingredient 也要顯示，就加這行 */}
            {/* {item.ingredient && <img className="ingredient-img" src={item.ingredient} alt="ingredient" />} */}
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default InnerPage;
