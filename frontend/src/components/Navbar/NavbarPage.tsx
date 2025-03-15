import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarPage.module.css";

interface NavbarPageProps {
  setCategory: (category: string) => void;
}

const NavbarPage: React.FC<NavbarPageProps> = ({ setCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰ <small>Open</small>
      </div>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}>
        <li>
          <Link to="/" onClick={() => { setCategory(""); setIsMenuOpen(false); }}>
            🔖 Blog 📔
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => { setCategory("Career & Productivity Motivation"); setIsMenuOpen(false); }}>
            Career & Productivity
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => { setCategory("Technology"); setIsMenuOpen(false); }}>
            Technology
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => { setCategory("Study Motivation"); setIsMenuOpen(false); }}>
            Study Motivation
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => { setCategory("Mental Health & Emotional Motivation"); setIsMenuOpen(false); }}>
            Life
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarPage;
