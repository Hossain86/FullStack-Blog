import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./BlogDetails.css"; // Optional: create this file for styling
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw"; 
import axios from "axios";

interface Blog {
  id: number;
  heading: string;
  imgsrc: string;
  details: string;
  category: string;
  date_created: string;
  author: string;
}

interface Props {
  blogs: Blog[];
}
const API_URL = "https://full-stack-blog-api.vercel.app/api/posts";

function BlogDetails({ blogs }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if the blog is available in the passed props
    let foundBlog = blogs.find((b) => b.id === Number(id));

    if (foundBlog) {
      setBlog(foundBlog);
      setLoading(false);
    } else {
      // Fetch the blog from the API if not found in the props
      axios
        .get(`${API_URL}/${id}`)
        .then((response) => {
          setBlog(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          setError("Blog not found!");
          setLoading(false);
        });
    }
  }, [id, blogs]);
  
  // Find the selected game using the id from the URL
  const game = blogs.find((g) => g.id === Number(id));
  const [rating, setRating] = useState<number>(0);
  
  if (!game) return <h2>Blog not found!</h2>;
  useEffect(() => {
    if (game) {
      document.title = game.heading; // Set the document title to the blog heading
    }
  }, [game]);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;
  return (
    <div className="blog-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅ Back
      </button>
<p className="text-danger" style={{ fontSize: "12px" }}>Please don't reload the page!! Otherwise the page will be gone 🙃. Go back and enter again if u face error </p>
      <img src={game.imgsrc} alt={game.heading} className="blog-img" />
      <h2 className="blog-header">{game.heading}</h2>

      <div className="blog-details">
      <ReactMarkdown 
        children={game.details} 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} // ✅ Enable HTML parsing
      />

      </div>

      {/* Extended Blog Information */}
      <div className="extended-info">
        <p>
          <strong>Category:</strong> {game.category}
        </p>
        <p>
          <strong>Date:</strong> {game.date_created}
        </p>
        <p>
          <strong>Author:</strong> {game.author}
        </p>
      </div>

      {/* Rating System */}
      <div className="rating-section">
        <h3>Rate this Blog:</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            {rating >= star ? (
              <FaStar color="gold" />
            ) : (
              <FaRegStar color="gold" />
            )}
          </span>
        ))}
        {rating > 0 && <p>Your rating: {rating} / 5</p>}
      </div>
    </div>
  );
}

export default BlogDetails;
