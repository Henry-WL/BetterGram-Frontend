import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth-context'
import { useParams } from 'react-router-dom'
import InstagramCard from '../components/InstagramCard'

function SinglePostPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [feed, setFeed] = useState([])
    // get feed for followed users posts
    const {pid} = useParams()
    console.log(pid)

    const auth = useContext(authContext)

    console.log('in main')

    useEffect(() => {
        const fetchFeed = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/singlePost/${pid}`)

            const data = await response.json()

            console.log(data)

            setFeed(data.post)

            setIsLoading(false)
        }

        fetchFeed()
    }, [])


  return (
    <div className='flex justify-center'>
        {isLoading && <p>Loading...</p>}


        {!isLoading && feed.map((post) => {
                return (
                    // <SinglePost post={post} setFeed={setFeed} feed={feed}/>
                    
                    
                    <InstagramCard post={post} setFeed={setFeed} feed={feed} showAllComments={true}/>
                )
            })}
        </div>
  )
}

export default SinglePostPage