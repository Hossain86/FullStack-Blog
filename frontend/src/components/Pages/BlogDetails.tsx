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
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const foundBlog = blogs.find((b) => b.id === Number(id));
    if (foundBlog) {
      setBlog(foundBlog);
      setLoading(false);
    } else {
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

  useEffect(() => {
    if (blog) {
      document.title = blog.heading;
    }
  }, [blog]);

  if (loading) return <h2>Loading...</h2>;
  if (error || !blog) return <h2 className="error">{error || "Blog not found!"}</h2>;

  return (
    <div className="blog-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅ Back
      </button>
      <img src={blog.imgsrc} alt={blog.heading} className="blog-img" />
      <h2 className="blog-header">{blog.heading}</h2>

      <div className="blog-details">
        <ReactMarkdown
          children={blog.details}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </div>

      <div className="extended-info">
        <p><strong>Category:</strong> {blog.category}</p>
        <p><strong>Date:</strong> {blog.date_created}</p>
        <p><strong>Author:</strong> {blog.author}</p>
      </div>

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
