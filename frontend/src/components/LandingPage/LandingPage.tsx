import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.LandingPageContainer}>
      <div className={styles.landingSection}>
        <div className={styles.content}>
          <h1 className={styles.gameheader}>
            Unleash Your Potential: The Power of Relentless Motivation 🚀
          </h1>
          <p className={styles.gamedetails}>
            Are You Ready to Break Barriers and Achieve More? We all have
            dreams. Some seem impossible, some feel too distant, and some get
            lost in the noise of everyday life. The decision to keep pushing
            forward, even when motivation fades. In this blog, we’ll dive into:{" "}
            <br />
            ✅ The science of motivation—how to create unstoppable drive.
            <br /> ✅ Real-life stories of resilience and success that will
            inspire you.
            <br />
            ✅ Practical strategies to overcome self-doubt and procrastination.
            <br />
            ✅ The habits of high achievers and how you can implement them
            today. <br /> Let’s begin this journey together! 🚀🔥
          </p>
          <div className="d-flex flex-column gap-3">
            <button className="" onClick={() => navigate("/blogs")}>
              Get Started
            </button>
            <button className="" onClick={() => navigate("/create")}>
              Create New Post
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img /*https://rawg.io/assets/images/cover.117cc320ec2800b9b12092ca23d6e86d.png */
            src="https://www.univariety.com/blog/wp-content/uploads/2014/08/motivational-goals.jpg"
            alt="Motivation Preview"
            className={styles.heroImage}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
