import BlogCard from "../components/molecules/BlogCard";
import { blogs } from "../data/blog";
import "../styles/pages/blogs.css";

const Blogs = () => {
    return (
        <main className="blogs-container">
            <h1 className="blogs-titulo">
                Noticias y datos curiosos
            </h1>
            <div className="blogs-grid">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                    />
                ))}
            </div>
        </main>
    );
}

export default Blogs;