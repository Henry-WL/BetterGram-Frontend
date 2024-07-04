import { useContext, useEffect, useState } from "react";

import { Route, Routes, useNavigate } from 'react-router-dom'

// import authContext, { AuthProvider } from "./context/auth-context";

import Login from './login'
import authContext from "../context/auth-context";
import Main from "./Main";
import Profile from "./Profile";
import NewPost from "./NewPost";
import AllUsersPage from "./AllUsersPage";
import SingleUserPage from "./SingleUserPage";
import SinglePostPage from "./SinglePostPage";

function AuthenticatedRoutes() {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  console.log(auth)
  const {isLoggedIn} = useContext(authContext)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }

  }, [auth.isLoggedIn, navigate])

  return (
    // <AuthProvider>
    //   <>
    //     <Login />
    //   </>
    // </AuthProvider>
    <Routes>
        <Route path='/' element={<Main/>}/>
      <Route path='/allusers' element={<AllUsersPage/>}/>
      <Route path='/user/:uid' element={<SingleUserPage/>}/>
      <Route path='/post/:pid' element={<SinglePostPage/>}/>


      <Route path='/login' element={<Login/>}/>
      {/* <Route path='/profile' element={<Profile/>} /> */}
      <Route path='/newpost' element={<NewPost/>}/>


    </Routes>
  );
}

export default AuthenticatedRoutes;
