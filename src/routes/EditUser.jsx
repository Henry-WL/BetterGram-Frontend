import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";

function EditUser() {
  // check user is currently logged in before allowing editing, if not redirect
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const { uid } = useParams();
  const auth = useContext(authContext);

  useEffect(() => {
    const fetchSingleUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/user/${uid}`
      );

      const data = await response.json();

      console.log(data);

      setUser(data.foundUser);

      setIsLoading(false);
    };

    fetchSingleUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <div className="flex justify-between w-full border-b-2">
        <button>Cancel</button>

        <h2>Edit Profile</h2>

        <button>Done</button>
      </div>

      <div className="flex flex-col items-center mt-5">
        <img
          src={user.avatarURL}
          alt="user avatar"
          className="h-36 w-36 rounded-full"
        />

        <h2 className="text-sky-500 text-lg font-semibold mt-2">
          Change profile photo
        </h2>
      </div>

      <div>
        {/* Edit form */}

        {/* <form onSubmit={editProfileHandler}> */}
        <form>
          <div>
            <label className="input flex items-center gap-2 mt-1">
              Username
              <input
                type="text"
                className="grow"
                placeholder={user.username}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              Email
              <input
                type="text"
                className="grow"
                placeholder={user.email}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              Bio
              <input
                type="text"
                className="grow"
                placeholder="Freelance photographer"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              Password
              <input
                            type="password"
                            className="grow"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                          />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
