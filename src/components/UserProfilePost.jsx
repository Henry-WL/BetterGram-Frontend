import React from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePost({ post }) {
    console.log(post)
    const navigate = useNavigate()
  return (
    <div className="shadow-xl rounded-lg cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>
        {/* change bg to none just have image with no padding */}
        {/* flex center or padding so all aligned on full screen */}
      <img
        // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        src={post.imageURL}
        alt="Shoes"
        className="w-96 h-96 rounded-lg shadow-sm"
      />
    </div>
  );
}

export default UserProfilePost;
