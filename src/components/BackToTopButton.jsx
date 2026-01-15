import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${visible ? "show" : ""}`}
      title="回到最上方"
    ><BsArrowUp />

    </button>
  );
};

export default BackToTopButton;
