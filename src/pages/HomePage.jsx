import React, { useEffect, useMemo, useState } from "react";
import CreamBox from "../layouts/CreamBox";
import BackToTopButton from "../components/BackToTopButton";

// ✅ 簡單 CSV 解析（支援基本逗號分隔；若欄位內有逗號/引號會比較麻煩，見下方備註）
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

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("./data.csv", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load CSV: ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);

        // 你可以在這裡做一點欄位整理（例如 id 轉字串、空白處理）
        const normalized = rows.map((r) => ({
          ...r,
          id: String(r.id ?? "").trim(),
          name: (r.name ?? "").trim(),
          cover1: (r.cover1 ?? "").trim(),
          cover2: (r.cover2 ?? "").trim(),
        }));

        setItems(normalized.filter((x) => x.id && x.name));
      } catch (e) {
        setErr(e.message || "Load CSV failed");
      }
    };

    load();
  }, []);

  const content = useMemo(() => items, [items]);

  return (
    <div className="home-page">
      <div className="header">
        {/* 建議改成 /light_board.png (放 public) */}
        <img src="./light_board.png" alt="light board" />
      </div>

      <div className="content">
        <h1>Explore Different Flavor</h1>

        {err && (
          <p style={{ color: "crimson" }}>
            CSV 載入失敗：{err}（請確認 public/data.csv 是否存在）
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
