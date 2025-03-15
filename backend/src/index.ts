import express, {Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";

const app= express();
app.use(cors({
  origin:"http://localhost:5175",
  methods:["GET","POST","PUT", "DELETE"], 
}));
app.use(express.json());

mongoose.connect("mongodb://localhost/blogDatabase")
  .then(()=>{
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err)=>{
    console.error("❌ Error connecting database", err)
  })

const BlogSchema= new mongoose.Schema({
  id:{type: Number, required: true},
  heading: { type: String, required: true },
  imgsrc: { type: String , required: true },
  details: { type: String , required: true },
  category: { type: String , required: true },
  date_created: { type: Date, default: Date.now },
  author: { type: String, required: true },
});

const BlogPost = mongoose.model("BlogPost", BlogSchema);

app.get("/api/posts", async(req: Request,res: Response)=>{
  try{
    const posts= await BlogPost.find();
    res.json(posts);
  }
  catch(error){
    res.status(500).json({message: "Error fetching posts", error});
  }
});

app.get("/api/posts/:id", async(req: Request, res: Response): Promise<any>=>{
  try{
    const post= await BlogPost.findOne({id: parseInt(req.params.id)});
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    res.json(post);
  }
  catch(error){
    res.status(500).json({message: "Error fetching post", error});
  }
});

app.get("/api/blogs/count",async(req:Request, res: Response)=>{
  try{
    const count = await BlogPost.countDocuments();
    res.json({count});
  }
  catch(error){
    res.status(500).json({error: "Error fetching blog count"});
  }
});

app.post("/api/createblog", async(req, res)=>{
  try{
    const totalBlogs= await BlogPost.countDocuments();
    const {heading,imgsrc,details,category,author}= req.body;
    const newBlog= new BlogPost({
      id: totalBlogs + 1, // Assign ID dynamically
      heading,
      imgsrc,
      details,
      category,
      date_created: new Date(),
      author,
    });
    await newBlog.save();
    res.status(201).json({message:"Blog Created successfully", blog:newBlog});
  }
  catch(error){
    res.status(500).json({error: "Internal server error"});
  }
});

const PORT= process.env.PORT || 3030;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
