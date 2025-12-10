import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 MERN Auth Demo. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
