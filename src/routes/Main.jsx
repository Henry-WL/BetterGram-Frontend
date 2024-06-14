import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth-context'
import SinglePost from '../components/SinglePost'
import SuggestFollowers from '../components/SuggestFollowers'
import InstagramCard from '../components/InstagramCard'
import UserProfileCard from '../components/UserProfileCard'

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
    <div className='flex'>

        

        {isLoading && <p>Loading...</p>}


        <div className='sm:w-4/6 flex flex-wrap gap-2 m-4'>
            {!isLoading && feed.map((post) => {
                return (
                    // <SinglePost post={post} setFeed={setFeed} feed={feed}/>
                    
                    
                    <InstagramCard post={post} setFeed={setFeed} feed={feed}/>
                )
            })}
        </div>

        <div className='hidden sm:block sm:w-2/6'>
            <>
            <UserProfileCard/>
            <SuggestFollowers/>
            </>
        </div>
    </div>
  )
}

export default Main