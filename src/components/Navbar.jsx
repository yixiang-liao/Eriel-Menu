import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0); // 一往下滑就變白
    };

    onScroll(); // 初始先判斷一次
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "navbarEriel",
          open ? "is-open" : "",
          isScrolled ? "is-scrolled" : "",
        ].join(" ")}
      >
        {/* Left: Hamburger */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Center: Logo */}
        <div className="navbar-center">
          <Link to="/" onClick={() => setOpen(false)} className="navbar-logoLink">
            <img
              src="./logo/Eriel.logo_black.png"
              alt="Eriel"
              className="navbar-logoImg"
            />
          </Link>
        </div>

        {/* Right spacer */}
        <div className="navbar-rightSpacer" />
      </header>

      {/* Overlay */}
      <div className={`menuOverlay ${open ? "open" : ""}`}>
        <button
          className={`overlayHamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="menuPanel">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About us</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact us</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
