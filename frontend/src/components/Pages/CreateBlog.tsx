import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createBlog.css";

export function CreateBlog() {
  const [formData, setFormData] = useState({
    heading: "",
    imgsrc: "",
    details: "",
    category: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3030/api/createblog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Blog posted successfully!");
        setFormData({ heading: "", imgsrc: "", details: "", category: "", author: "" });
      } else {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        alert("Failed to post blog.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Create a Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Blog Heading:</label>
            <input type="text" className="form-control" name="heading" value={formData.heading} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Online Image Address:</label>
            <input type="text" className="form-control" name="imgsrc" value={formData.imgsrc} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Details Text:</label>
            <textarea className="form-control" name="details" value={formData.details} onChange={handleChange} required rows={3}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Name:</label>
            <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Blog</button>
        </form>
      </div>
    </div>
  );
}
