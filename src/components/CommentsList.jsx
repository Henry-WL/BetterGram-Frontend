import React, { useState } from "react";
import { format } from "date-fns";

function CommentsList({ comment }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex p-2">
        {/* user image will go here */}
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className="h-8 w-8 rounded-full"/>
      <h2 className="ml-2 font-bold">{comment._id.username}</h2>
      <p className="ml-1">{comment.text}</p>
      {/* {showMore ? comment.text : `${comment.text.substring(0,20)}`}
              <br/>
              {comment.text.length > 20 &&
                  <button onClick={() => setShowMore(!showMore)} className="text-gray-600">{showMore ? 'Show less' : 'Show more'}</button>
        
              }
              <h3>Date: {format(new Date(comment.time), "dd-MM-yyyy h:mm a")}</h3>
              <p>{comment._id.username}</p> */}
    </div>
  );
}

export default CommentsList;
