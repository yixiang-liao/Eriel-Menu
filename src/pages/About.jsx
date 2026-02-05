import React from "react";
import BackToTopButton from "../components/BackToTopButton";
import PageTitle from "../services/PageTitle";

const About = () => {
  return (
    <div className="about-page">
      <PageTitle title="關於我們" />
      <h1 className="about-title">關於我們</h1>
      <div className="about-header">
        <img src="https://i.meee.com.tw/AOw2Mon.jpg" />
      </div>
      <div className="about-content">
        <p>您好呀~歡迎光臨愛莉兒!</p>
        <p>
          我們冰淇淋都是手工製作，持續開發新口味，每天供應 10 ~14
          種，很多都是在心情差的時候想出來，希望你吃完也能變得開心~
          添加膠原蛋白來取代穩定劑，低脂低熱量!
        </p>
        <p>希望有你喜歡的口味，也可以跟我們許願，讓我們有靈感</p>
        <hr />
        <p className="eng">Hi there! Welcome to ERIEL’s!</p>
        <p className="eng">
          Handcrafted | Freshly Made | Daily Selection We serve 10–14 flavors
          every day, all made with fish collagen instead of stabilizers. Explore
          our flavors and find your favorite! Have a dream flavor in mind? Let
          us know—we’d love to bring your inspiration to life.
        </p>
      </div>
        <BackToTopButton />
    </div>
  );
};

export default About;
