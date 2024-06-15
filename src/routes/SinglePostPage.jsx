import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth-context'
import { useParams } from 'react-router-dom'
import InstagramCard from '../components/InstagramCard'

function SinglePostPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [singlePost, setSinglePost] = useState([])
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

            setSinglePost(data.post)

            setIsLoading(false)
        }

        fetchFeed()
    }, [])


  return (
    <div>
        {isLoading && <p>Loading...</p>}
        SinglePostPage

        {!isLoading &&
        
        <InstagramCard post={singlePost[0]}/>
        }
        </div>
  )
}

export default SinglePostPage