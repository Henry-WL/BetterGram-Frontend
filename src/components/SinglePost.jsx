import React, { useContext, useState } from "react";
import authContext from "../context/auth-context";
import { format } from 'date-fns';
import CommentsList from "./CommentsList";


function SinglePost({post, setFeed, feed}) {
    const [commentText, setCommentText] = useState('')
    const auth = useContext(authContext)

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
          
          const data = await response.json()
          
          console.log(data)

          const updatedFeed = feed.map((post) => {
            return post._id === postID ? {...data.updatedPost} : post
          })

          console.log(updatedFeed)

          setFeed(updatedFeed)
          
    }

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

  return (
    <div key={post._id} className="">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">posted by: {post.userID.username}</h2>
          <h3>Date: {format(new Date(post.createdAt), "dd-MM-yyyy h:mm a")}</h3>
          <p>{post.status}</p>
          <p>Likes: {post.likes.length}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => likePostHandler(post._id)}
            >
              Like
            </button>
          </div>
          <div>
            Comments: {post.comments.length}
            {post.comments.length !== 0 &&
              post.comments.map((comment) => {
                return <CommentsList comment={comment}/>
                // return <div className="border-2 border-green-500 p-2 m-2 rounded-lg">{comment.text}
                //           <h3>Date: {format(new Date(comment.time), "dd-MM-yyyy h:mm a")}</h3>
                //           <p>{comment._id.username}</p>

                // </div>;
              })}

         
          </div>

          <form onSubmit={(e) => commentSubmitHandler(e, post._id)}>
            <div className="join">
              <input
                className="input input-bordered join-item"
                placeholder="Comment"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <button className="btn join-item rounded-r-full" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
