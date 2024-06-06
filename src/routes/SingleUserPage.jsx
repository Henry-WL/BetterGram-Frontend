import React from 'react'
import { useParams } from 'react-router-dom'

function SingleUserPage() {
    const {uid} = useParams()

  return (
    <div>SingleUserPage



        <h1 className='text-3xl'>{uid}</h1>
    </div>
  )
}

export default SingleUserPage