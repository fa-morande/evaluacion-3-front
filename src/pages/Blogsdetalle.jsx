import { useParams } from "react-router-dom";
import BlogDetallesCard from "../components/molecules/BlogDetallesCard";
import { blogsdetalle } from "../data/blogDetalle";
import "../styles/pages/blogdetalle.css";

const BlogsDetalle = () => {
  const { id } = useParams(); // obtiene el ID de la URL
  const blog = blogsdetalle.find((b) => b.id === parseInt(id)); // busca el blog correspondiente

  if (!blog) {
    return <h2>Blog no encontrado 😿</h2>;
  }

  return (
    <main className="blogs-container">
      <h1 className="blogsDetalle-titulo">{blog.name || "Detalle del blog"}</h1>
      <div className="blogs-grid">
        <BlogDetallesCard blogDetalle={blog} />
      </div>
    </main>
  );
};

export default BlogsDetalle;