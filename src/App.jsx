import { useContext, useEffect, useState } from "react";

import "./App.css";
import Login from "./routes/login";
import { Route, Routes, useNavigate } from "react-router-dom";

import authContext, { AuthProvider } from "./context/auth-context";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  const navigate = useNavigate();
  // const auth = useContext(authContext)
  // console.log(auth)
  // const {isLoggedIn} = useContext(authContext)

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login')
  //   }

  // }, [auth.isLoggedIn])

  return (
    <AuthProvider>
      <>
        <NavbarComponent />
        <AuthenticatedRoutes />
      </>
    </AuthProvider>
    // <Routes>
    //   <Route path='/' element={<h1>Front page!</h1>}/>
    //   <Route path='/login' element={<Login/>}/>

    // </Routes>
  );
}

export default App;
