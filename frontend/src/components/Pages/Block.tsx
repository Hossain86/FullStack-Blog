import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Block.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

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
}

function Block({ blogs }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Manage likes in a state object
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

  return (
    <div className="block">
      {blogs.slice().reverse().map((article) => (
        <div key={article.id} className="block-container">
          <div className="block-image">
            <img src={article.imgsrc} alt={article.heading} className="block-img"  onClick={() => navigate(`/blog/${article.id}`)} />
          </div>
          <div className="block-texts">
            <h2 className="block-header" onClick={() => navigate(`/blog/${article.id}`)}>{article.heading}</h2>
            <p className="block-details">  {article.details.substring(0, 150) + "..."}</p>
            {/* <div className="cat-dat" > </div>
              <p><strong>Category:</strong> {article.category}</p> */}
              <p className="block-date"><strong>Date:</strong> {article.date_created}</p>
            
            <p className="block-author"><strong>Author:</strong> {article.author}</p>

            
            

            <div className="block-lower">
              <button className="ctaButton" onClick={() => navigate(`/blog/${article.id}`)}>
              Show More
            </button>
              <span onClick={() => toggleLike(article.id)} style={{ cursor: "pointer" }}>
                {likedArticles[article.id] ? <AiFillHeart color="red" size={22} /> : <AiOutlineHeart size={22} />}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Block;