import React, { useContext, useState } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from 'axios'


function login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const { login, setIsLoggedIn } = useContext(authContext);

  const navigate = useNavigate();

  const auth = useContext(authContext);

  console.log(auth);

  const login_signupHandler = async (event) => {
    event.preventDefault();

    let response;
    if (isSignup) {

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", avatar);
    
        const config = { headers: { "Content-Type": "multipart/form-data" } };
    
        try {
          const data = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
            formData,
            config
          );
          console.log(data);
        } catch (err) {
          console.log(err);
        }



    //   console.log(email, username, password);
    //   response = await fetch(
    //     `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: email,
    //         username: username,
    //         password: password,
    //       }),
    //     }
    //   );

      // auth.login('user')
    } else {
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
        console.log(data, 'userLOGINDATA')
      login(data.token, data._id, data.username, data.userAvatarURL);
      setIsLoggedIn(true);
      navigate("/");

      // set context token, setlogin etc....
    }

    const user = await response.json();

    //   setUser(user.username)
  };

  const loginAsGuestHandler = () => {
    setIsSignup(false);
    setEmail("yf@x.com");
    setPassword("123456789");

    login_signupHandler();
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://emoji.aranja.com/static/emoji-data/img-apple-160/1f3a8.png"
            alt="BetterGram"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            BetterGram
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login_signupHandler}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            {isSignup && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autocomplete="username"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>

                <div className="mt-2 flex flex-col">
                  <label
                    for="Avatar"
                    className="text-left block text-sm font-medium leading-6 text-gray-900 w-full"
                  >
                    Avatar
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-ghost max-w-xs "
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept="image/*"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSignup ? "Signup" : "Login"}
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                onClick={loginAsGuestHandler}
              >
                Login as guest
              </button>
            </div>
          </form>

          {!isSignup && (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setIsSignup(true)}
              >
                {" "}
                Signup now!
              </a>
            </p>
          )}

          {isSignup && (
            <p className="mt-10 text-center text-sm text-gray-500">
              Have an account?
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setIsSignup(false)}
              >
                {" "}
                Login now!
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default login;
