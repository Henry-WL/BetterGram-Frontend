import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfileCard() {
    const naviate = useNavigate()
  return (
    <div className='w-full m-4'>
        <div>
        <div className="flex">
        <div
         
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-24 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        <div className="ml-8 flex-col justify-center inline-block">
          <p className="text-l font-bold text-left">John</p>
          <p className="text-gray-400 text-left">@John</p>
        </div>
      </div>
        </div>

        <div className='flex w-full justify-evenly  rounded-3xl shadow-md py-1 mt-4'>
            <div className='m-1'>
                <p className='font-bold'>5</p>
                <p className='text-gray-500 text-sm '>Following</p>
            </div>
            <div className='m-1'>
                <p className='font-bold'>5</p>
                <p className='text-gray-500 text-sm'>Followers</p>
            </div>
            <div className='m-1'>
                <p className='font-bold'>4</p>
                <p className='text-gray-500 text-sm'>Posts</p>
            </div>
            <div className='m-1 cursor-pointer' onClick={() => naviate('/newpost')}>
                <p className='font-bold'>+</p>
                <p className='text-gray-500 text-sm'>New Post</p>
            </div>
        </div>
    </div>
  )
}

export default UserProfileCard