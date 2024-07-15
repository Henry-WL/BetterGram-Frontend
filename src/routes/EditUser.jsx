import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authContext from "../context/auth-context";
import axios from "axios";

function EditUser() {
  // check user is currently logged in before allowing editing, if not redirect
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState();

  const { uid } = useParams();
  const auth = useContext(authContext);
  const navigate = useNavigate();

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

  const handleImageSelect = (e) => {
    // e => setImage(e.target.files[0])
    setImage(e.target.files[0]);
    setAvatar(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const submitEditUserForms = (e) => {
    e.preventDefault()
    console.log('running')
  }

  const submitEditUserForm = async (e) => {
    e.preventDefault();
    console.log("edit profile handler");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("bio", bio);
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

    setEmail("");
    setBio("")
    setPassword("");
    
    // inputFile.current.value = "";
    // inputFile.current.type = "text";
    // inputFile.current.type = "file";
    setUsername("");


    console.log(response, "response");

    setUser(response.data.updatedUser);
    auth.setavatarURL(response.data.updatedUser.avatarURL)

    navigate(`/user/${auth.userId}`)
  };

  return (
    <div>
      <div className="flex justify-between w-full border-b-2">
        <button
          className="text-lg"
          onClick={() => navigate(`/user/${auth.userId}`)}
        >
          Cancel
        </button>

        <h2 className="font-semibold text-xl">Edit Profile</h2>

        <button className="text-lg font-semibold text-sky-500" type="submit" form="editUserForm">Done</button>
      </div>

      <div className="flex flex-col items-center mt-5">
        <img
          src={preview ? preview : user.avatarURL}
          alt="user avatar"
          className="h-36 w-36 rounded-full"
        />

        <div className="my-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleImageSelect}
          />
          <label
            htmlFor="file-upload"
            className="text-sky-500 text-lg font-semibold mt-z"
          >
            Change profile photo
          </label>
        </div>
      </div>

      <div>
        {/* Edit form */}

        {/* <form onSubmit={editProfileHandler}> */}
        <form className="border-t-2" id="editUserForm" onSubmit={submitEditUserForm}>
          <div>
            <label className=" input flex items-center gap-2 mt-1">
              <h3 className="w-20 text-left">Username</h3>
              <input
                type="text"
                className="grow border-b-2 py-2 border-gray-100"
                placeholder={user.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              <h3 className="w-20 text-left">Email</h3>
              <input
                type="text"
                className="grow border-b-2 py-2 border-gray-100"
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              <h3 className="w-20 text-left">Bio</h3>
              <input
                type="text"
                className="grow border-b-2 py-2 border-gray-100"
                placeholder={user.bio}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
            <label className="input flex items-center gap-2 mt-1">
              <h3 className="w-20 text-left">Password</h3>
              <input
                type="password"
                className="grow border-b-2 py-2 border-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </form>

        <div className="text-left pl-2">
          <h2 className="text-lg text-sky-500 font-medium  border-b-2 py-2 border-gray-100">
            Switch to professional account
          </h2>

          <h2 className="text-lg text-sky-500 font-medium  border-b-2 py-2 border-gray-100">
            Create avatar
          </h2>

          <h2 className="text-lg text-sky-500 font-medium  border-b-2 py-2 border-gray-100">
            Personal information settings
          </h2>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
