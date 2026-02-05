import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton";
import { BsArrowDownCircleFill } from "react-icons/bs";
import PageTitle from "../services/PageTitle";
import { FaLine, FaShare } from "react-icons/fa";

const INNER_API =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjtiNuDLG-8fjsjm4nFSfrUzF4e8XEkq7SsPDVuVmWECWWmgsroPIBaLsZjQYsY5FjbRoE3XaCnhWcZuCo-SbbRRREkWYnHlLwUaJU90wcREgIMmlLbkM0ZWB7_sPGSYXIoWw2AUoBMeLgoTEKm1HmFRDdMTMUPjdl9-jluX3CJNm-rlfasLpBLJlsNtlQzQk2ylkUcXTPvozYHEv-Ck7DDneuNedDbsjxeqHjZ1pvNbm95aXP_llIFzLVLItKGOzq3fZLeuGgx49OgpGhURx9UvhB1s2EuaYz1mnyNK4J5AgzEjMQ&lib=MQ72Ki0fvtNorzsYcWks6t3NlG5ygbIsO";

function cleanUrl(url) {
  return String(url ?? "")
    .trim()
    .replace(/\\"/g, "")
    .replace(/"/g, "");
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

        const res = await fetch(INNER_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load API: ${res.status}`);

        const rows = await res.json();

        const normalized = (Array.isArray(rows) ? rows : []).map((r) => ({
          ...r,
          id: String(r.id ?? "").trim(),
          name: String(r.name ?? "").trim(),
          keyword: String(r.keyword ?? "").trim(),
          describe: String(r.describe ?? "").trim(),
          hashtag: String(r.hashtag ?? "").trim(),
          cal: String(r.cal ?? "").trim(),

          cover1: cleanUrl(r.cover1),
          cover2: cleanUrl(r.cover2),
          inner1: cleanUrl(r.inner1),
          inner2: cleanUrl(r.inner2),
          ingredient: cleanUrl(r.ingredient),
        }));

        setItems(normalized);
        setErr("");
      } catch (e) {
        setErr(e.message || "Load API failed");
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
        <div className="content">
          {/* Header skeleton */}
          <div className="inner-header">
            <div className="inner-head">
              <div className="img">
                <div className="sk sk-img" />
              </div>

              <div className="text">
                <div className="top">
                  <div className="sk sk-title" />
                  <div className="sk sk-subtitle" />
                </div>

                <div className="bottom">
                  <div className="sk sk-line" />
                  <div className="sk sk-line sk-line--short" />
                </div>
              </div>
            </div>
          </div>

          {/* Describe skeleton */}
          <div className="inner-body">
            <div className="describeA">
              <div className="describe">
                <div className="sk sk-paragraph" />
                <div className="sk sk-paragraph" />
                <div className="sk sk-paragraph sk-paragraph--short" />
              </div>
            </div>

            {/* More-info skeleton */}
            <div className="more-info">
              <div className="btm-icon">
                <div className="sk sk-circle" />
              </div>
              <div className="sk sk-center-title" />
            </div>

            {/* Images skeleton */}
            <div className="info-img">
              <div className="sk sk-figure" />
              <div className="sk sk-figure" />
            </div>
          </div>
        </div>

        <BackToTopButton />
      </div>
    );
  }

  if (err) {
    return (
      <div className="inner-page">
        <div className="content">
          <p style={{ color: "crimson" }}>API 載入失敗：{err}</p>
          <Link to="/">回首頁</Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="inner-page">
        <div className="content">
          <p>找不到這個品項（id: {id}）</p>
          <Link to="/">回首頁</Link>
        </div>
      </div>
    );
  }
  const shareUrl = window.location.href;

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(lineUrl, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: "這款冰淇淋超好吃的！推薦給你！",
          url: shareUrl,
        });
      } catch (err) {
        // 使用者取消分享時不用做事
      }
    } else {
      // 桌機 fallback → LINE
      handleLineShare();
    }
  };

  return (
    <div className="inner-page">
      <PageTitle title={item.name} />
      <div className="content">
        <div className="inner-header">
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
                <p className="cal">{item.cal} kCal</p>
                <p className="hashtag">{item.hashtag}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="inner-share">
          <button
            className="share-btn line"
            onClick={handleLineShare}
            aria-label="Share on LINE"
          >
            <FaLine />
          </button>

          <button
            className="share-btn share"
            onClick={handleNativeShare}
            aria-label="Share"
          >
            <FaShare />
          </button>
        </div>

        <div className="inner-body">
          <div className="describeA">
            <div className="describe">
              <p>{item.describe}</p>
            </div>
          </div>
          <div className="more-info">
            <div className="btm-icon">
              <BsArrowDownCircleFill />
            </div>
            <p>Nutritional information</p>
          </div>

          <div className="info-img">
            {item.inner2 && (
              <img className="kCal-img" src={item.inner2} alt="kCal" />
            )}
            {item.ingredient && (
              <img
                className="ingr-img"
                src={item.ingredient}
                alt="ingredients"
              />
            )}
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default InnerPage;
