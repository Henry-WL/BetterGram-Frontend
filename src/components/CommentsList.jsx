import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CommentsList({ comment, showAllComments }) {
  const navigate = useNavigate()

  return (
    <div>
      {showAllComments ? (
        <div className="flex p-2">
          <img
            src={comment._id.avatarURL}
            className="h-8 w-8 object-cover rounded-full cursor-pointer"
            onClick={() => navigate(`/user/${comment._id._id}`)}
          />
          <h2 className="ml-2 font-bold cursor-pointer" onClick={() => navigate(`/user/${comment._id._id}`)}>{comment._id.username}</h2>
          <p className="ml-1">{comment.text}</p>
        </div>
      ) : (
        <div className="flex">
          <h2 className="font-bold cursor-pointer" onClick={() => navigate(`/user/${comment._id._id}`)}>{comment._id.username}</h2>
          <p className="ml-1">{comment.text}</p>
        </div>
      )}
    </div>
  );
}

export default CommentsList;
 