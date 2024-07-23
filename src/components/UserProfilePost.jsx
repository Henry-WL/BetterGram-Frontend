import React from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePost({ post }) {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-xl rounded-lg cursor-pointer"
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <img
        src={post.imageURL}
        alt="Shoes"
        className="w-96 h-96 rounded-lg shadow-sm"
      />
    </div>
  );
}

export default UserProfilePost;
