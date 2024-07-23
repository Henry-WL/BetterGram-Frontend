import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth-context";
import SuggestFollowerCard from "./SuggestFollowerCard";

function SuggestFollowers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/allusers`
      );

      const data = await response.json();

      setUsers(data.allUsers);

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div className="flex flex-wrap gap-2">
        <div className="flex mx-6 mb-2 justify-between w-full">
          <h2 className="font-medium text-gray-400 m">Suggestions For You</h2>
          <h3 className="cursor-pointer" onClick={() => navigate("/allusers")}>
            See All
          </h3>
        </div>

        {!isLoading &&
          users
            .filter((user) => user._id !== auth.userId)
            .slice(0, 5)
            .map((user) => {
              return <SuggestFollowerCard user={user} />;
            })}
      </div>
    </div>
  );
}

export default SuggestFollowers;
