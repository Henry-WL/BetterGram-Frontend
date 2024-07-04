import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";
import SinglePost from "../components/SinglePost";
import InstagramCard from "../components/InstagramCard";
import UserProfilePost from "../components/UserProfilePost";
import { CiPaperplane } from "react-icons/ci";
import axios from "axios";

function SingleUserPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const { uid } = useParams();
  const auth = useContext(authContext);

  const fetchSingleUserFeed = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/singleUserFeed/${uid}`
    );

    const data = await response.json();

    console.log(data);

    setFeed(data.posts);

    setIsLoading(false);
  };

  const inputFile = useRef(null);

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

    fetchSingleUserFeed();
  }, []);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    console.log("edit profile handler");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("image", avatar);
    formData.append("password", password);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/users/user/updateUserProfile/${
        auth.userId
      }`,
      formData,
      config
    );
    //   console.log(response);

    // http://localhost:3000/api/users/user/updateUserProfile/1
    // const response = await fetch(
    //   `${import.meta.env.VITE_BACKEND_URL}/users/user/updateUserProfile/${
    //     auth.userId
    //   }`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       //   Authorization: "Bearer " + auth.token,
    //     },
    //     body: JSON.stringify({
    //       // sendinguserId: auth.userId,
    //       email: email,
    //       username: username,
    //       password: password,
    //     }),
    //   }
    // );
    // setIsLoading(true);
    setEmail("");
    setPassword("");
    inputFile.current.value = "";
    inputFile.current.type = "text";
    inputFile.current.type = "file";
    setUsername("");

    //   if (username !== "") {
    //     auth.setUsername(username);
    //   }
    console.log(response, "response");
    // const data = await response.json();
    // console.log(data, 'data');

    setUser(response.data.updatedUser);
    auth.setavatarURL(response.data.updatedUser.avatarURL)
    // fetchSingleUserFeed();
  };

  return (
    <div className="mt-4">
      <div>
        {/* <div>
                <h1>USER AVATAR on left</h1>

                <h2>User bio on right</h2>

                <h2>post, following, followers</h2>


                <h3>Feed for user</h3>

                <h4>Update info should be on seperate page or in a modal</h4>

                <br />
            </div> */}

        <div>
          {isLoading && <p>Loading...</p>}
          <div>
            {!isLoading && (
              <div className="m-2 card sm:w-96 md:w-full md:flex-row bg-base-100 shadow-xl">
                <figure className="">
                  <div className="w-full flex justify-center">
                    <img
                      src={user.avatarURL}
                      alt="Shoes"
                      className="rounded-full w-32 h-32"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  {auth.userId !== uid && (
                    <div className="flex gap-4 justify-center items-center content-center">
                      <button
                        className="font-bold px-8 py-4 rounded-3xl drop-shadow-md shadow-md"
                        onClick={() => followUserHandler(user._id)}
                      >
                        Follow
                      </button>

                      <CiPaperplane className="text-3xl mr-2 stroke-black stroke-[0.5px] hover:stroke-[0.75px]" />
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="pt-4">
                      <h2 className="font-bold text-3xl">{user.email}</h2>
                      <h2 className="font-semibold text-gray-400 text-xl">
                        @{user.username}
                      </h2>
                    </div>

                    <div className="flex justify-center gap-8">
                      <div>
                        <h2 className="font-bold text-xl">
                          {!isLoading && user.following.length}
                        </h2>
                        <h3 className="font-medium text-gray-400 text-lg">
                          Following
                        </h3>
                      </div>

                      <div>
                        <h2 className="font-bold text-xl">
                          {!isLoading && user.followers.length}
                        </h2>
                        <h3 className="font-medium text-gray-400 text-lg">
                          Followers
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

                  {auth.userId === uid && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Stop" : "Edit"}
                    </button>
                  )}

                  {auth.userId === uid && isEditing && (
                    <form onSubmit={editProfileHandler}>
                      <div>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                          >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                          </svg>
                          <input
                            type="text"
                            className="grow"
                            placeholder={user.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                          >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                          </svg>
                          <input
                            type="text"
                            className="grow"
                            placeholder={user.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                          >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                          </svg>
                          {/* <input
                            type="file"
                            className="grow"
                            placeholder={user.username}
                            value={username}
                            onChange={(e) => setAvatar(e.target.files[0])}
                          /> */}
                          <input
                            type="file"
                            className="file-input file-input-bordered file-input-ghost w-full max-w-xs"
                            //   value={avatar}
                            ref={inputFile}
                            onChange={(e) => setAvatar(e.target.files[0])}
                            accept="image/*"
                          />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <input
                            type="password"
                            className="grow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </label>

                        <button className="btn btn-primary m-2" type="submit">
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoading && <p>Loading...</p>}
        <div className="flex flex-wrap justify-center">
          {!isLoading &&
            feed.map((post) => {
              return (
                <div className="m-2">
                  {/* <InstagramCard post={post} setFeed={setFeed} feed={feed} showAllComments={false}/> */}
                  <UserProfilePost post={post} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SingleUserPage;
