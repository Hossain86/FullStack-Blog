import { useEffect, useState } from "react";
import { fetchData } from "./api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Block from "./components/Pages/Block";
import NavbarPage from "./components/Navbar/NavbarPage";
import BlogDetails from "./components/Pages/BlogDetails";
import "./App.css"
import { CreateBlog } from "./components/Pages/CreateBlog";

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    fetchData()
      .then((data) => setBlogs(data))
      .catch((err) => setError(err.message)); 
  }, []);

  if (error) {
    return <h1>Error: {error}</h1>;
  }
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredArticles = selectedCategory
    ? blogs.filter((article) => article.category === selectedCategory)
    : blogs;

  return (
    <Router>
     <div className="app-container">
        <NavbarPage setCategory={setSelectedCategory} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Block blogs={filteredArticles} />} />
          <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
