import React, { useContext, useEffect, useState } from 'react'
import authContext from '../context/auth-context'

function Main() {

    const [feed, setFeed] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentText, setCommentText] = useState('')
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


    const likePostHandler = async(postId) => {
        console.log('liffihoih')
        console.log(postId)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/likePost/${postId}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            //   Authorization: "Bearer " + auth.token,
            },
            body: JSON.stringify({
              userID: auth.userId,
            //   loggedInUserUsername,
            //   addedUser: uid,
            //   addedUserUsername,
              // loggedInUser: authuid
            }),
          });

          const data = await response.json()

          console.log(data)

        //   setFeed([data.updatedPost])
          const updatedFeed = feed.map((post) => {
            return post._id === postId ? {...data.updatedPost} : post
          })
          
          console.log(updatedFeed, 'updated Feed')
          //   console.log('first', postId)
            setFeed(updatedFeed)
          

    }

    const commentSubmitHandler = async (e, postID) => {
        e.preventDefault()
        console.log('first')
        console.log(postID)

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/commentPost/${postID}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            //   Authorization: "Bearer " + auth.token,
            },
            body: JSON.stringify({
              userID: auth.userId,
              text: commentText
            }),
          });

          setCommentText('')

    }

  return (
    <div>Main


        {isLoading && <p>Loading...</p>}


        <div>
            {!isLoading && feed.map((post) => {
                return (
                    <div key={post._id}>

                       
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{post.userID.username}</h2>
    <p>{post.status}</p>
    <p>Likes: {post.likes.length}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => likePostHandler(post._id)}>Like</button>
    </div>
    <div>
        Comments: {post.comments.length}

        {post.comments.length !== 0 &&
        post.comments.map((comment) => {
            return (
                <div>
                    {comment.text}
                </div>
            )
        })        
        }
    </div>

    <form onSubmit={(e) => commentSubmitHandler(e, post._id)}>

    <div className="join">
  <input className="input input-bordered join-item" placeholder="Comment" onChange={(e) => setCommentText(e.target.value)} value={commentText}/>
  <button className="btn join-item rounded-r-full" type='submit'>Post</button>
</div>

    </form>
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