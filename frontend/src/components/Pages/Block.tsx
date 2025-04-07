import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Block.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface ArticleData { 
  id: number;
  heading: string;
  imgsrc: string;
  details: string;
  category: string;
  date_created: string;
  author: string;
}

// Define props interface
interface Props {
  blogs: ArticleData[];
  loading: boolean; // <-- new prop
}


function Block({ blogs, loading }: Props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [likedArticles, setLikedArticles] = useState<{ [key: number]: boolean }>(() => {
    const storedLikes: { [key: number]: boolean } = {};
    blogs.forEach((article) => {
      storedLikes[article.id] = localStorage.getItem(`liked-${article.id}`) === "true";
    });
    return storedLikes;
  });

  const toggleLike = (id: number) => {
    setLikedArticles((prev) => {
      const newLiked = { ...prev, [id]: !prev[id] };
      localStorage.setItem(`liked-${id}`, newLiked[id].toString());
      return newLiked;
    });
  };

  // ✅ Show loading while waiting for blogs
  if (loading) {
    return (
      <div className="loading-container">
        <h2>⏳ Loading blogs...</h2>
      </div>
    );
  }

  return (
    <div className="block">
      {blogs.map((article) => (
        <div key={article.id} className="block-container">
          <div className="block-image">
            <img
              src={article.imgsrc}
              alt={article.heading}
              className="block-img"
              onClick={() => navigate(`/blog/${article.id}`)}
            />
          </div>
          <div className="block-texts">
            <h2
              className="block-header"
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              {article.heading}
            </h2>
            <p className="block-details">
              {article.details.substring(0, 150) + "..."}
            </p>
            <p className="block-date">
              <strong>Date Created:</strong> {article.date_created.split("T")[0]}
            </p>
            <p className="block-author">
              <strong>Author:</strong> {article.author}
            </p>

            <div className="block-lower">
              <button
                className="ctaButton"
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                Show More
              </button>
              <span
                onClick={() => toggleLike(article.id)}
                style={{ cursor: "pointer" }}
              >
                {likedArticles[article.id] ? (
                  <AiFillHeart color="red" size={22} />
                ) : (
                  <AiOutlineHeart size={22} />
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Block;