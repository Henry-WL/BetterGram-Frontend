import React, { useContext, useState } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function SuggestFollowerCard({ user }) {
    const auth = useContext(authContext);
    const navigate = useNavigate()
    const [following, setFollowing] = useState(user.followers.some(
        (follower) => follower._id === auth.userId
      ))

  const followUserHandler = async (uid, following) => {
    if (following) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/unfollow/${uid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            loggedInUser: auth.userId,
          }),
        }
      );

      const data = await response.json();

      setFollowing(false)

    } 
    else {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/follow/${uid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            loggedInUser: auth.userId,
          }),
        }
      );

      setFollowing(true)
    }
  };

  return (
    <div className="flex mx-6 mb-2 justify-between w-full">
      <div className="flex">
        <img
          src={user.avatarURL}
          alt="Shoes"
          className="h-12 w-12 rounded-full cursor-pointer"
          onClick={() => navigate(`/user/${user._id}`)}
        />
        <div className="ml-8 flex-col justify-center inline-block">
          <p className="text-l font-bold text-left cursor-pointer" onClick={() => navigate(`/user/${user._id}`)}>{user.username}</p>
          <p className="text-gray-400 text-left cursor-pointer" onClick={() => navigate(`/user/${user._id}`)}>@{user.username}</p>
        </div>
      </div>

      <div className="flex-col content-center">
        <p
          className={`text-sm font-bold cursor-pointer 
          ${following ? `text-gray-500` : `text-blue-600`}`}
          onClick={(e) => followUserHandler(user._id, following)}
        >
          {following ? "Unfollow" : "Follow"}
        </p>
      </div>
    </div>
  );
}

export default SuggestFollowerCard;
