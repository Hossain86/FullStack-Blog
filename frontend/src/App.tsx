import { useEffect, useState } from "react";
import { fetchData } from "./api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Block from "./components/Pages/Block";
import NavbarPage from "./components/Navbar/NavbarPage";
import BlogDetails from "./components/Pages/BlogDetails";
import "./App.css";
import { CreateBlog } from "./components/Pages/CreateBlog";
import Login from "./components/LandingPage/Login";
import Registration from "./components/LandingPage/Regisreation";
import Dashboard from "./components/Pages/Dashboard";
import { AuthProvider } from "./components/LandingPage/AuthContext";

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    fetchData()
      .then((data) => {
        setBlogs(data);
        setLoading(false); // ✅ stop loading after fetch
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredArticles = selectedCategory
    ? blogs.filter((article) => article.category === selectedCategory)
    : blogs;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavbarPage setCategory={setSelectedCategory} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/blogs"
              element={<Block blogs={filteredArticles} loading={loading} />} // ✅ pass loading
            />
            <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
