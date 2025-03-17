import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../LandingPage/AuthContext";
import styles from "./NavbarPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface NavbarPageProps {
  setCategory: (category: string) => void;
}

const NavbarPage: React.FC<NavbarPageProps> = ({ setCategory }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Use context to get user and loading
  // Check if context is available
  if (!authContext) {
    return <p>Error: AuthContext is not available.</p>;
  }
  const { user, loading } = authContext; // Destructure values from context

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰ <small>Open</small>
      </div>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}>
        <li>
          <Link to="/" onClick={() => { setCategory(""); setIsMenuOpen(false); }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => { setCategory(""); setIsMenuOpen(false); }}>
            🔖All Blog 📔
          </Link>
        </li>

        {/* Categories Button with Hover */}
        <li className={styles.categoriesButton}>
       <b>Categories <FontAwesomeIcon icon={faChevronDown} /></b>
          <div className={styles.categoriesDropdown}>
          <Link to="/blogs" onClick={() => { setCategory("Computer Science"); setIsMenuOpen(false); }}>
              Computer Science
            </Link>
            <Link to="/blogs" onClick={() => { setCategory("Career & Productivity Motivation"); setIsMenuOpen(false); }}>
              Career & Productivity
            </Link>
            <Link to="/blogs" onClick={() => { setCategory("Technology"); setIsMenuOpen(false); }}>
              Technology
            </Link>
            <Link to="/blogs" onClick={() => { setCategory("Study Motivation"); setIsMenuOpen(false); }}>
              Study Motivation
            </Link>
            <Link to="/blogs" onClick={() => { setCategory("Life"); setIsMenuOpen(false); }}>
              Life
            </Link>
            <Link to="/blogs" onClick={() => { setCategory("Entertainment"); setIsMenuOpen(false); }}>
              Entertainment
            </Link>
          </div>
        </li>
      </ul>

      <div className={styles.authSection}>
        {/* Show login button if user is not logged in */}
        {user ? (
          <div className={styles.profileContainer}>
            <button onClick={() => navigate('/create')} className="me-2">Create Post</button>
            <img
              src={user.profilePic || 'https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png'}
              alt="Profile"
              className={styles.profilePic} onClick={() => navigate(`/dashboard`)}
            />
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <button onClick={() => navigate('/login')}>Login</button>
            {/* Show register button or other options if needed */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarPage;
