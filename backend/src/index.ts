import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth";
import { authMiddleware } from "./middleware/authMiddleware";
import User from "./models/Users"; // Import User model

const app = express();
app.use(cookieParser());
// Use CORS middleware with proper configuration
app.use(cors({
  origin: "https://blog-three-kappa-10.vercel.app", // exact match, no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,  // some legacy browsers choke on 204
  credentials:true
}));

// Middleware to parse JSON
app.use(express.json());

// Register routes before the database connection
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error connecting to database", err);
  });

// Blog Post Schema and Model
const BlogSchema = new mongoose.Schema({ 
  id: { type: Number, required: true },
  heading: { type: String, required: true },
  imgsrc: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  author: { type: String, required: true },
});
BlogSchema.index({ id: 1 });
const BlogPost = mongoose.model("BlogPost", BlogSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Fetch all blog posts
app.get("/api/posts", async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({id: -1});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// Fetch single blog post by ID
app.get("/api/posts/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const post = await BlogPost.findOne({ id: parseInt(req.params.id) });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
});

// Get total blog count
app.get("/api/blogs/count", async (req: Request, res: Response) => {
  try {
    const count = await BlogPost.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog count" });
  }
});


// Create a new blog post
app.post("/api/createblog", authMiddleware, async (req, res) => {
  try {
    const totalBlogs = await BlogPost.countDocuments();
    const { heading, imgsrc, details, category, author } = req.body;
    const dateOnly = new Date().toISOString().split('T')[0];

    const newBlog = new BlogPost({
      id: totalBlogs + 1,
      heading,
      imgsrc,
      details,
      category,
      date_created: dateOnly,
      author,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog Created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default error handler (for unhandled routes or errors)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
