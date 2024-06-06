import React, { useEffect, useState } from "react";

function Main() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/`
      );

      const data = await response.json();

    //   console.log(data)

      setUsers(data.allUsers);

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      Main
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
             
                    <button className="btn btn-primary">Follow</button>
                
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Main;
