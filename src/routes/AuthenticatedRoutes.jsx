import { useContext, useEffect, useState } from "react";

import { Route, Routes, useNavigate } from 'react-router-dom'

// import authContext, { AuthProvider } from "./context/auth-context";

import Login from './login'
import authContext from "../context/auth-context";

function AuthenticatedRoutes() {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  console.log(auth)
  const {isLoggedIn} = useContext(authContext)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }

  }, [auth.isLoggedIn])

  return (
    // <AuthProvider>
    //   <>
    //     <Login />
    //   </>
    // </AuthProvider>
    <Routes>
      <Route path='/' element={<h1>Front page!</h1>}/>
      <Route path='/login' element={<Login/>}/>


    </Routes>
  );
}

export default AuthenticatedRoutes;
