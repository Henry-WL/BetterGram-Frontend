import React from "react";

function SingleUserTopCard({ user }) {
  return (
    <div className="w-96">
      <h1>{user.username}</h1>
      <div className="flex gap-4">
        <div className="">
          <img src={user.avatarURL} className="h-20 w-20 rounded-full" alt="" />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col">
            <h3>1500</h3>
            <h2>posts</h2>
          </div>

          <div className="flex flex-col">
            <h3>2000</h3>
            <h2>followers</h2>
          </div>

          <div className="flex flex-col">
            <h3>1700</h3>
            <h2>following</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserTopCard;
