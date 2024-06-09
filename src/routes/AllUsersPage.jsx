import React, { useContext, useEffect, useState } from "react";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const auth = useContext(authContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/allusers`
      );

      const data = await response.json();

      console.log(data)

      setUsers(data.allUsers);

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const followUserHandler = async (uid, e) => {
    e.currentTarget.disabled = true;
    console.log(uid)
    console.log('click on frontend')
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/follow/${uid}`, {
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
    })
  }

  const userIDObj = {_id: auth.userId}

  return (
    <div>
      All users....
      {isLoading && <p>Loading...</p>}
      <div>
        {!isLoading &&
          users.map((user) => {
            return (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{user.email}</h2>
                  <h2 className="card-title">{user.username}</h2>
                  <h3>Followers: {user.followers.length}</h3>
                  <h3>Following: {user.following.length}</h3>


                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                  <button className="btn btn-primary" onClick={() => navigate(`/user/${user._id}`)}>Go to page</button>
                  {console.log(user.followers.includes({_id: auth.userId}, 0))}
                  {user.followers.some(follower => follower._id === auth.userId) && <p>INSIDE</p>}
                    <button className="btn btn-primary" disabled={user.followers.some(follower => follower._id === auth.userId)} onClick={(e) => followUserHandler(user._id, e)}>Follow</button>
                
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllUsersPage;
