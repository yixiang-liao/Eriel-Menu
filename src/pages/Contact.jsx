import React from "react";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="page-title">聯絡我們</h1>
      <p className="page-subtitle">
        我們重視您的意見與反饋。若您有任何問題或合作提案，歡迎隨時與我們聯繫。
      </p>

      <div className="contact-card">
        <p className="section-title">社群平台</p>

        <ul className="contact-list">
          <li>
            <a
              href="https://www.facebook.com/Eriel.Collagen.Taiwan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-wrap">
                <FaFacebook className="icon" />
              </span>
              <span className="text-wrap">
                <span className="label">Facebook</span>
                <span className="value">Eriel.Collagen.Taiwan</span>
              </span>
            </a>
          </li>

          <li>
            <a
              href="https://www.threads.com/@eriel.gelato"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-wrap">
                <FaThreads className="icon" />
              </span>
              <span className="text-wrap">
                <span className="label">Threads</span>
                <span className="value">@eriel.gelato</span>
              </span>
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/eriel.gelato/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-wrap">
                <FaInstagram className="icon" />
              </span>
              <span className="text-wrap">
                <span className="label">Instagram</span>
                <span className="value">@eriel.gelato</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="divider" />

        <p className="section-title">聯絡方式</p>

        <ul className="contact-list">
          <li>
            <a href="mailto:eriel.gelato@gmail.com">
              <span className="icon-wrap">
                <FaEnvelope className="icon" />
              </span>
              <span className="text-wrap">
                <span className="label">Email</span>
                <span className="value">eriel.gelato@gmail.com</span>
              </span>
            </a>
          </li>

          <li>
            <div className="contact-row">
              <span className="icon-wrap">
                <FaPhone className="icon" />
              </span>
              <span className="text-wrap">
                <span className="label">Phone</span>
                <span className="value">07-2382899</span>
              </span>
            </div>
          </li>
        </ul>

        <p className="hint">我們會盡快回覆您的訊息，感謝支持 Eriel。</p>
      </div>
    </div>
  );
};

export default Contact;
