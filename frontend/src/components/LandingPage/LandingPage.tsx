import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../LandingPage/AuthContext"; // Import AuthContext
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Use context to get user and loading

  // Check if context is available
  if (!authContext) {
    return <p>Error: AuthContext is not available.</p>;
  }

  const { user, loading } = authContext; // Destructure values from context

  if (loading) return <p>Loading...</p>; // Display loading state while fetching user data

  return (
    <div className={styles.LandingPageContainer}>
      <div className={styles.landingSection}>
        <div className={styles.content}>
          <h1 className={styles.gameheader}>
          Ignite Your Ambition: A Journey to Success and Beyond 🚀
          </h1>
          <p className={styles.gamedetails}>
          What’s holding you back from your dreams? Some aspirations feel impossible, others seem out of reach, and many get drowned out by the demands of daily life. But here's the truth: the journey to success isn’t about avoiding challenges—it’s about showing up, time and time again, even when motivation starts to waver. In this blog, we’ll dive into:{" "}
            <br />
            ✅ The science of motivation—how to create unstoppable drive.
            <br /> ✅ Real-life stories of resilience and success that will inspire you.
            <br />
            ✅ Practical strategies to overcome self-doubt and procrastination.
            <br />
            ✅ The habits of high achievers and how you can implement them today.
            <br /><p className="mt-2"><b> Your future self is counting on you—let’s embark on this journey to greatness! 🚀🔥</b></p>
          </p>

          <div className="d-flex flex-column gap-3">
            <button onClick={() => navigate("/blogs")}>Get Started</button>

            {/* ✅ Show "Create New Post" only if user is logged in */}
            {user && (
              <button onClick={() => navigate("/create")}>Create New Post</button>
            )}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="https://img.pikbest.com/png-images/20240922/poster-t-shirt-with-the-words-never-you-give-up_10872804.png!w700wp"
            alt="Motivation Preview"
            className={styles.heroImage}
          />
        </div>
      </div>

      <div className={styles.authSection}>
        {/* Show login button if user is not logged in */}
        {user ? (
          <div className={styles.profileContainer}>
            
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <button onClick={() => navigate('/login')}>Login</button>
            {/* Show register button or other options if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
