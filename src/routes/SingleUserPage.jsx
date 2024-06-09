import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authContext from '../context/auth-context'
import SinglePost from '../components/SinglePost'

function SingleUserPage() {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [feed, setFeed] = useState([])

    const {uid} = useParams()
    const auth = useContext(authContext)

    useEffect(() => {
        const fetchSingleUser = async () => {
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/users/user/${uid}`
            );
      
            const data = await response.json();
      
            console.log(data)
      
            setUser(data.foundUser);
      
            setIsLoading(false);
          };
      
          fetchSingleUser();

        const fetchSingleUserFeed = async() => {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users/singleUserFeed/${uid}`
              );
        
              const data = await response.json();
        
              console.log(data)
        
              setFeed(data.posts);
        
              setIsLoading(false);
        }

        fetchSingleUserFeed()
    }, [])

  return (
    <div>SingleUserPage



        <h1 className='text-3xl'>{uid}</h1>


        <div>

            <div>
                <h1>USER AVATAR on left</h1>

                <h2>User bio on right</h2>

                <h2>post, following, followers</h2>


                <h3>Feed for user</h3>

                <h4>Update info should be on seperate page or in a modal</h4>

                <br />
            </div>


            <div>
      {isLoading && <p>Loading...</p>}
      <div>
        {!isLoading &&
          
            
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
                  <h3>Posts: FIX THIS</h3>


                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

                    {auth.userId !== uid && <button className="btn btn-primary" onClick={() => followUserHandler(user._id)}>Follow</button>}

                    {auth.userId === uid && (
                <form>
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
                        placeholder={user.username}
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
                      Update
                    </button>
                  </div>
                </form>
              )}
                
                </div>
              </div>
            
          }
      </div>
    </div>
            
        </div>

        



        <div>SingleUserFeed for


        {isLoading && <p>Loading...</p>}


        <div className='flex flex-wrap'>
            {!isLoading && feed.map((post) => {
                return (
                    <div className='m-2'>

                        <SinglePost post={post} setFeed={setFeed} feed={feed}/>
                    </div>
                )
            })}
        </div>
    </div>
    </div>
  )
}

export default SingleUserPage