import React, { useContext, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { CiPaperplane } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineBookmark } from "react-icons/hi";
import CommentsList from "./CommentsList";
import authContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function InstagramCard({ post, setFeed, feed }) {
    const [commentText, setCommentText] = useState('')
    const auth = useContext(authContext)
    const navigate = useNavigate()

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

    const checkLiked = () => {
        return post.likes.some(user => user._id === auth.userId) ? true : false
    }

    const likePostHandler = async(postId) => {

        const checkLikedRun = checkLiked()
        if (checkLikedRun) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/unlikePost/${postId}`, {
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
        } else {

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
    }

 
  return (
    <div className="shadow-xl w-4/5 rounded-lg my-6">
      <div className="flex mx-6 mb-2 justify-between">
        <div className="flex">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-8 flex-col justify-center inline-block">
            <p className="text-l font-bold text-left">{post.userID.username}</p>
            <p className="text-gray-400 text-left">@{post.userID.username}</p>
          </div>
        </div>

        <div className="text-3xl flex-col content-center">
          <IoIosMore />
        </div>
      </div>
      <div className="">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className=""
        />
      </div>
      <div className="pl-5 flex justify-between p-2">
        <div className="flex">
          <HiOutlineHeart
            className={`text-3xl mr-2 stroke-black hover:stroke-red-500 hover:fill-red-500 stroke-[1.5px] ${checkLiked() ? `fill-red-500 stroke-red-500` : ``}`}
            onClick={() => likePostHandler(post._id)}
          />

          {/* <CiHeart className="text-3xl mr-2 stroke-black fill-blue-500 hover:stroke-red-500 text-red-500 stroke-[0.5px]"/> */}
          {/* <FaRegComment className="text-3xl"/> */}
          <CiChat1 className="text-3xl mr-2 stroke-black stroke-[0.5px] hover:stroke-[1px]" />

          <CiPaperplane className="text-3xl mr-2 stroke-black stroke-[0.5px] hover:stroke-[0.75px]" />
        </div>

        <div>
          <HiOutlineBookmark className="text-3xl mr-2 stroke-black hover:fill-gray-900 stroke-[1.5px]" />
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="w-100 text-left">
          <p className="font-bold">{post.likes.length} Likes</p>
        </div>

        <div className="w-100 text-left flex">
          <p className="font-bold">{post.userID.username}</p>
          <p className="ml-2">{post.status}</p>
        </div>
        <div className="w-100 text-left">
          <p className="text-gray-400 cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>View All Comments</p>
          <div className="flex-row">
            {post.comments.length !== 0 &&
              post.comments.slice().map((comment) => {
                return <CommentsList comment={comment} />;
              })}
          </div>
        </div>

        <div className="border-t w-full mt-2 text-left">
          {/* <div className="flex justify-between align-middle"> */}
            <form onSubmit={(e) => commentSubmitHandler(e, post._id)} className="flex justify-between align-middle">
              <input
                className="pt-2 w-full outline-none"
                placeholder="Add a comment..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              ></input>
              <CiPaperplane className="text-2xl mr-2 stroke-black stroke-[0.25px] mt-1" />
            </form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default InstagramCard;
