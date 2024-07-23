import React, { useContext } from "react";
import authContext from "../context/auth-context";
import { NavLink } from "react-router-dom";

function BottomNav() {
  const auth = useContext(authContext);


  return (
    <div>
      {/* bottom nav */}
      {auth.isLoggedIn && (
        <div className="btm-nav sm:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-t-2 border-black" : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </NavLink>
          <NavLink
            to="/newpost"
            className={({ isActive }) =>
              isActive ? "border-t-2 border-black" : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </NavLink>
          <NavLink
            to={`/user/${auth.userId}`}
            className={({ isActive }) =>
              isActive ? "border-t-2 border-black" : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 448 512"
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default BottomNav;
