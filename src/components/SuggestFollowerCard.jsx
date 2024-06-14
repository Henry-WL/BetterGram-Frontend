import React, { useContext } from "react";
import { IoIosMore } from "react-icons/io";
import authContext from "../context/auth-context";

function SuggestFollowerCard({ user }) {
  const auth = useContext(authContext);
  const followUserHandler = async (uid, e) => {
    e.currentTarget.disabled = true;
    console.log(uid);
    console.log("click on frontend");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/follow/${uid}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify({
          loggedInUser: auth.userId,
          // loggedInUserUsername,
          // addedUser: uid,
          // addedUserUsername,
          // loggedInUser: authuid
        }),
      }
    );
  };
  return (
    <div className="flex mx-6 mb-2 justify-between w-full">
      <div className="flex">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-8 flex-col justify-center inline-block">
          <p className="text-l font-bold text-left">{user.username}</p>
          <p className="text-gray-400 text-left">@{user.username}</p>
        </div>
      </div>

      <div className="flex-col content-center">
        <p
          className={`text-sm font-bold cursor-pointer 
          ${user.followers.some(follower => follower._id === auth.userId) ? `text-gray-500` : `text-blue-600`}`}
            // disabled={user.followers.some(
            //   (follower) => follower._id === auth.userId
            // )}
          onClick={(e) => followUserHandler(user._id, e)}
        >
          Follow
        </p>
      </div>
    </div>
  );
}

export default SuggestFollowerCard;
