import React from "react";
import { IoIosMore } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { CiPaperplane } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineHeart } from "react-icons/hi";


function InstagramCard() {
  return (
    <div className="h-[40rem] shadow-lg w-4/5 rounded-lg">
      <div className="flex mx-6 mb-2 justify-between">
        <div className="flex">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-8 flex-col justify-center inline-block">
            <p className="text-l">Josh Smith</p>
            <p className="text-gray-400">@josh</p>
          </div>
        </div>

        <div className="text-3xl">
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
      <div className="flex justify-between p-2">
        <div className="flex">
        <HiOutlineHeart className="text-3xl mr-2 stroke-black hover:stroke-red-500 hover:fill-red-500 stroke-[1.5px]"/>

        {/* <CiHeart className="text-3xl mr-2 stroke-black fill-blue-500 hover:stroke-red-500 text-red-500 stroke-[0.5px]"/> */}
        {/* <FaRegComment className="text-3xl"/> */}
        <CiChat1 className="text-3xl mr-2 stroke-black stroke-[0.5px]"/>

        <CiPaperplane className="text-3xl mr-2 stroke-black stroke-[0.5px]"/>
        </div>

        <div>
        <CiBookmark className="text-3xl mr-2 stroke-black stroke-[0.5px]"/>
        </div>
      </div>
      <div>Likes</div>
      <div>Caption</div>
      <div>Comments</div>
    </div>
  );
}

export default InstagramCard;
