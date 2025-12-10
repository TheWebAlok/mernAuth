import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const token = localStorage.getItem("token"); // 👉 Check if user logged in

  const toggleMenu = () => setIsOpen((s) => !s);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">MERN Auth Demo</div>

      <ul ref={menuRef} className={`navbar-list ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/services" onClick={handleLinkClick}>Services</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
      </ul>

      {/* CONDITIONAL BUTTONS BASED ON LOGIN */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {token ? (
          <button onClick={handleLogout} className="logout-btn btn btn-outline-primary">Logout</button>
        ) : (
          <>
            <Link to="/register" onClick={handleLinkClick}>Register</Link>
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
          </>
        )}
      </div>

      <button
        ref={burgerRef}
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
