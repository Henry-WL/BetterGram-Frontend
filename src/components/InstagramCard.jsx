import React from "react";
import { IoIosMore } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { CiPaperplane } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineBookmark } from "react-icons/hi";

function InstagramCard() {
  return (
    <div className="h-[40rem] shadow-2xl w-4/5 rounded-lg">
      <div className="flex mx-6 mb-2 justify-between">
        <div className="flex">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-8 flex-col justify-center inline-block">
            <p className="text-l font-bold text-left">Josh Smith</p>
            <p className="text-gray-400 text-left">@josh</p>
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
          <HiOutlineHeart className="text-3xl mr-2 stroke-black hover:stroke-red-500 hover:fill-red-500 stroke-[1.5px]" />

          {/* <CiHeart className="text-3xl mr-2 stroke-black fill-blue-500 hover:stroke-red-500 text-red-500 stroke-[0.5px]"/> */}
          {/* <FaRegComment className="text-3xl"/> */}
          <CiChat1 className="text-3xl mr-2 stroke-black stroke-[0.5px]" />

          <CiPaperplane className="text-3xl mr-2 stroke-black stroke-[0.5px]" />
        </div>

        <div>
          <HiOutlineBookmark className="text-3xl mr-2 stroke-black hover:fill-gray-900 stroke-[1.5px]" />
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="w-100 text-left">
          <p className="font-bold">29 Likes</p>
        </div>

        <div className="w-100 text-left flex">
          <p className="font-bold">Josh Smith</p>
          <p className="ml-2">Some Paris photos! 👀</p>
        </div>
        <div className="w-100 text-left">
          <p className="text-gray-400">View All Comments</p>
          <div className="flex-row">
            <div className="flex">
              <h2 className="font-bold">Tester</h2>
              <p className="ml-1">xxoxoxo</p>
            </div>

            <div className="flex">
              <h2 className="font-bold">johnsmith</h2>
              <p className="ml-1">Test</p>
            </div>
          </div>
        </div>

        <div className="border-t w-full mt-2 text-left">
            <div className="flex justify-between align-middle">
                <input className="pt-2 w-full outline-none" placeholder="Add a comment..."></input>
                <CiPaperplane className="text-2xl mr-2 stroke-black stroke-[0.25px] mt-1" />

            </div>
        </div>
      </div>
    </div>
  );
}

export default InstagramCard;
