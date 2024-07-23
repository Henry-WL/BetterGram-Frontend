import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth-context";

function UserProfileCard() {
  const [user, setUser] = useState();
  const [postCount, setPostCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(authContext);
  useEffect(() => {
    const fetchSingleUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/user/${auth.userId}`
      );

      const data = await response.json();

      setUser(data.foundUser);
      setPostCount(data.postCount);

      setIsLoading(false);
    };

    fetchSingleUser();
  }, []);

  const naviate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full m-4">
      <div>
        <div className="flex">
          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-24 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.avatarURL} />
            </div>
          </div>
          <div className="ml-8 flex-col justify-center inline-block">
            <p className="text-l font-bold text-left">{user.email}</p>
            <p className="text-gray-400 text-left">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-evenly  rounded-3xl shadow-md py-1 mt-4">
        <div className="m-1">
          <p className="font-bold">{user.following.length}</p>
          <p className="text-gray-500 text-sm ">Following</p>
        </div>
        <div className="m-1">
          <p className="font-bold">{user.followers.length}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="m-1">
          <p className="font-bold">{postCount}</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
        <div className="m-1 cursor-pointer" onClick={() => naviate("/newpost")}>
          <p className="font-bold">+</p>
          <p className="text-gray-500 text-sm">New Post</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
