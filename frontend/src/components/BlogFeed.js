// src/components/BlogFeed.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts/"); // adjust if proxy is set
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.response || err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0) return <div>No posts yet.</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Blog Feed</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
          >
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 150)}...</p>
            <p>
              <em>By {post.author.username}</em>
            </p>
            <Link to={`/post/${post.id}`} style={{ color: "#007bff" }}>
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
