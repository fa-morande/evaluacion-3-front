import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button"; 
import "../../styles/molecules/BlogDetallesCard.css";
import React from "react"; 

const BlogDetallesCard = ({ blogDetalle }) => {
  const navigate = useNavigate();
  const volverBlogs = () => navigate("../blogs");

  return (
    <div className="blog-card">
      <img src={blogDetalle.image} />
      
      <p>{blogDetalle.description}</p>
      <Button text="Volver atrás" onClick={volverBlogs} />
    </div>
  );
};

export default BlogDetallesCard;