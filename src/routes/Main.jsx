import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth-context'

function Main() {

    const [feed, setFeed] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // get feed for followed users posts

    const auth = useContext(authContext)

    console.log('in main')

    useEffect(() => {
        const fetchFeed = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/feed/${auth.userId}`)

            const data = await response.json()

            console.log(data)

            setFeed(data.posts)

            setIsLoading(false)
        }

        fetchFeed()
    }, [])
  return (
    <div>Main


        {isLoading && <p>Loading...</p>}


        <div>
            {!isLoading && feed.map((post) => {
                return (
                    <div>

                       
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{post.userID.username}</h2>
    <p>{post.status}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Like</button>
    </div>
  </div>
</div>
                        </div>
                )
            })}
        </div>
    </div>
  )
}

export default Main