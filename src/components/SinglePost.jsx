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
import axios from "axios";

function SinglePost({ post, setFeed, feed, showAllComments }) {
  const [commentText, setCommentText] = useState("");
  const [showDelete, setShowDelete] = useState(false)
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const commentSubmitHandler = async (e, postID) => {
    e.preventDefault();
    console.log("first");
    console.log(postID);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/commentPost/${postID}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify({
          userID: auth.userId,
          text: commentText,
        }),
      }
    );

    setCommentText("");

    const data = await response.json();

    console.log(data, 'comment submit');

    const updatedFeed = feed.map((post) => {
      return post._id === postID ? { ...data.updatedPost } : post;
    });

    console.log(updatedFeed, 'updated FEED!');

    setFeed(updatedFeed);
  };

  const checkLiked = () => {
    return post.likes.some((user) => user._id === auth.userId) ? true : false;
  };

  const deletePostHandler = async () => {
    console.log('first')

    try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/posts/singlePost/${post._id}`
        )
        console.log(response, "deleted successfully!")

        navigate("/")
      } catch (error) {
        console.log("Something went wrong", error)
      }


  }

  const likePostHandler = async (postId) => {
    const checkLikedRun = checkLiked();
    if (checkLikedRun) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/unlikePost/${postId}`,
        {
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
        }
      );

      const data = await response.json();

      console.log(data);

      //   setFeed([data.updatedPost])
      const updatedFeed = feed.map((post) => {
        return post._id === postId ? { ...data.updatedPost } : post;
      });

      console.log(updatedFeed, "updated Feed");
      //   console.log('first', postId)
      setFeed(updatedFeed);
    } else {
      console.log("liffihoih");
      console.log(postId);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/likePost/${postId}`,
        {
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
        }
      );

      const data = await response.json();

      console.log(data);

      //   setFeed([data.updatedPost])
      const updatedFeed = feed.map((post) => {
        return post._id === postId ? { ...data.updatedPost } : post;
      });

      console.log(updatedFeed, "updated Feed");
      //   console.log('first', postId)
      setFeed(updatedFeed);
    }
  };

  return (
    <div className="shadow-xl pt-4 flex flex-col sm:flex-row">
      <div className="p-2">
        <img
          src={post.imageURL}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-col mx-6 mb-2 mt-4 justify-between sm:w-2/4">
        <div className="flex gap-8 w-full justify-center">
          <img
            src={post.userID.avatarURL}
            alt="Shoes"
            className="h-16 w-16 object-cover rounded-full shadow-md "
          />
          <div className="flex-col justify-center content-center inline-block">
            <p className="text-lg font-bold text-left">
              {post.userID.username}
            </p>
            <p className="text-gray-400 text-left">@{post.userID.username}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-400 mx-8">
            {post.status}
          </p>
        </div>

        <div className="flex-row mt-2 pt-2 border-t border-gray-300 overflow-auto max-h-80">
          {post.comments.length !== 0 &&
            post.comments.map((comment) => {
              return (
                <div className="overflow-auto">
                  <CommentsList comment={comment} showAllComments={true} />
                </div>
              );
            })}
        </div>
        <div className="flex justify-between p-2">
          <div className="flex">
            <HiOutlineHeart
              className={`text-3xl mr-2 stroke-black hover:stroke-red-500 hover:fill-red-500 stroke-[1.5px] cursor-pointer ${
                checkLiked() ? `fill-red-500 stroke-red-500` : ``
              }`}
              onClick={() => likePostHandler(post._id)}
            />

            <CiChat1 className="text-3xl mr-2 stroke-black stroke-[0.5px] hover:stroke-[1px] cursor-pointer" />

            <CiPaperplane className="text-3xl mr-2 stroke-black stroke-[0.5px] hover:stroke-[0.75px] cursor-pointer" />
          </div>
          {/* 
        <div>
          <HiOutlineBookmark className="text-3xl mr-2 stroke-black hover:fill-gray-900 stroke-[1.5px]" />
        </div> */}

          <div className="text-3xl flex-col content-center">
            <IoIosMore className="cursor-pointer" onClick={() => setShowDelete(!showDelete)}/>
            { showDelete && post.userID._id === auth.userId && 
                <button className="btn btn-outline btn-error" onClick={deletePostHandler}>Delete</button>

            }

          </div>
        </div>

        <div className="">
          <div className="w-100 text-left">
            <p className="font-bold">{post.likes.length} Likes</p>
          </div>
        </div>

        <div className="border-t w-full mt-2 text-left">
          <form
            onSubmit={(e) => commentSubmitHandler(e, post._id)}
            className="flex justify-between align-middle"
          >
            <input
              className="pt-2 w-full outline-none"
              placeholder="Add a comment..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            ></input>
            <CiPaperplane className="text-2xl mr-2 stroke-black stroke-[0.25px] mt-1" />
          </form>
        </div>
      </div>

      {/* <div className="px-6 py-2">
        // <div className="w-100 text-left">
        //   <p className="font-bold">{post.likes.length} Likes</p>
        // </div>

        <div className="w-100 text-left flex">
          <p className="font-bold">{post.userID.username}</p>
          <p className="ml-2">{post.status}</p>
        </div>
        <div className="w-100 text-left">
          {
            !showAllComments && <p className="text-gray-400 cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>View All Comments</p>
          }
          <div className="flex-row">
            {showAllComments ? post.comments.length !== 0 &&
              post.comments.map((comment) => {
                return <CommentsList comment={comment} />;
              }) : post.comments.length !== 0 &&
              post.comments.slice(0,3).map((comment) => {
                return <CommentsList comment={comment} />;
              })}
         
          </div>
        </div> */}

      {/* </div> */}
    </div>
  );
}

export default SinglePost;
