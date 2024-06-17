import React from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePost({ post }) {
    console.log(post)
    const navigate = useNavigate()
  return (
    <div className="bg-green-300 rounded-lg shadow-lg cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        // src={img.url}
        alt="Shoes"
        className="w-96 py-16 px-10 shadow-sm"
      />
    </div>
  );
}

export default UserProfilePost;
