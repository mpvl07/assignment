// src/components/PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts?page=${page}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        if (response.data.length === 0) setHasMore(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Post List</h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">By {post.author}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
