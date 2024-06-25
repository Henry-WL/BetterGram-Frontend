import React, { useContext, useState } from "react";
import authContext from "../context/auth-context";
import axios from 'axios'

function NewPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const auth = useContext(authContext);

  const submitStatusHandler = async (e) => {
    e.preventDefault();

    console.log("submit status");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text)

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts/post/${auth.userId}`,
        formData,
        config
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    /*
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/post/${auth.userId}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            //   Authorization: "Bearer " + auth.token,
            },
            body: JSON.stringify({
              uid: auth.userId,
              text: text
            //   loggedInUserUsername,
            //   addedUser: uid,
            //   addedUserUsername,
              // loggedInUser: authuid
            }),
          });

          setText('')
            */

    // body, uid, text
  };

  return (
    <>
      <div className="m-4">NewPost</div>

      <div className="w-full flex justify-center">
        <div class="w-full max-w-xs">
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full w-96"
            onSubmit={submitStatusHandler}
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Status
              </label>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-60"
                id="username"
                type="text"
                placeholder="Status..."
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>



            <input
              type="file"
              className="file-input file-input-bordered file-input-success w-full max-w-xs"
              onChange={e => setImage(e.target.files[0])} 
              accept="image/*"

            />
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPost;
