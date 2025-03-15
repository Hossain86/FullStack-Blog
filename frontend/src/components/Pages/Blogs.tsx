import React from "react";
import Block from "./Block";

interface BlogsProps {
  filteredArticles: any[];  
}

const Blogs: React.FC<BlogsProps> = ({ filteredArticles }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Block blogs={filteredArticles} />
    </div>
  );
};

export default Blogs;
