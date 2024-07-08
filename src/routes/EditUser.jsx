import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import authContext from '../context/auth-context';

function EditUser() {
    // check user is currently logged in before allowing editing, if not redirect
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()

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
  return (
    <div>
        {isLoading && <p>Loading...</p>}

        
        <div className='flex justify-between w-full border-b-2'>
            <button>Cancel</button>

            <h2>Edit Profile</h2>

            <button>Done</button>
        </div>

        <div className='flex flex-col items-center mt-5'>

            <img src={user.avatarURL} alt="user avatar" className='h-36 w-36 rounded-full'/>


            <h2 className='text-sky-500 text-lg font-semibold mt-2'>Change profile photo</h2>
        </div>

        <div>
            {/* Edit form */}

            <form >
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
                            // placeholder={user.email}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
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
                            // placeholder={user.username}
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
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
                            // ref={inputFile}
                            // onChange={(e) => setAvatar(e.target.files[0])}
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
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                          />
                        </label>

                        <button className="btn btn-primary m-2" type="submit">
                          Save
                        </button>
                      </div>
                    </form>

        </div>
    </div>
  )
}

export default EditUser