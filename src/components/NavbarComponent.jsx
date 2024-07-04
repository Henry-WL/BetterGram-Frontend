import React, { useContext } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  const auth = useContext(authContext);
  const logoutHandler = () => {
    auth.logout();
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1" onClick={() => navigate("/")}>
          <a className="btn btn-ghost text-xl">betterGram</a>
        </div>

          {auth.isLoggedIn && 
        <div>
          {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
          <button
            className="btn btn-success text-white mr-2"
            onClick={() => navigate("/allusers")}
          >
            All Users
          </button>
          

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={auth.avatarURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => navigate(`/user/${auth.userId}`)}>
                  <a className="justify-between">Profile</a>
                </li>

                <li onClick={() => navigate("/newpost")}>
                  <a>NewPost</a>
                </li>

                <li onClick={logoutHandler}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  );
}

export default NavbarComponent;
