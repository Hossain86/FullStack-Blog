import { useState } from "react";
import ReactMarkdown from "react-markdown";
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

  const [showModal, setShowModal] = useState(false); // ✅ State for modal visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No authentication token found. Please log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/createblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    <div className="create-container container">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Create a Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Blog Heading:</label>
            <input
              type="text"
              className="form-control"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Online Image Address:</label>
            <input
              type="text"
              className="form-control"
              name="imgsrc"
              value={formData.imgsrc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Details Text:</label>
            <textarea
              className="form-control"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write your blog details using Markdown..."
            ></textarea>

            {/* ✅ "See how to write" Link */}
            <p
              className="mt-2 text-primary"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            >
              See how to write MarkDown Text 🥰😎
            </p>

            {/* ✅ Live Markdown Preview */}
            <div className="mt-3 p-3 border rounded bg-light">
              <h6 className="text-muted">Preview of Deatils Text:</h6>
              <div className="p-2 border rounded bg-white">
                <ReactMarkdown>{formData.details}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Career & Productivity">Career & Productivity</option>
            <option value="Technology">Technology</option>
            <option value="Study Motivation">Study Motivation</option>
            <option value="Life">Life</option>
            <option value="Entertainement">Entertainement</option>
          </select>
        </div>

          <div className="mb-3">
            <label className="form-label">Your Name:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Blog
          </button>
        </form>
      </div>

      {/* ✅ Markdown Guide Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="mb-3">Markdown Guide</h5>
            <pre className="bg-light p-3 border rounded">
{`# Heading 1
## Heading 2
### Heading 3

- Bullet List Item 1
- Bullet List Item 2

**Bold Text**
*Italic Text*
> Blockquote

\`Inline code\`
\`\`\`
Code block
\`\`\`
`}
            </pre>
            <button className="btn btn-danger mt-3" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Modal Styles */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
