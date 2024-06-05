import { createContext, useState } from "react";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    username: '',
    isLoggedIn: false,
    token: null,
    userId: null
  });

  const [token, setToken] = useState()
  const [userId, setUserId] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState()

  // functions to update the state

//   const setUser = (user) => {
//     setState({
//       user:user
//     })
//   }

  const login = (token, uid, username, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setUsername(username)

    localStorage.setItem("userData", JSON.stringify({
      userId: uid,
      username: username,
      token: token,    

    }))
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    setIsLoggedIn(false)
    setUsername('')

    localStorage.removeItem("userData")
  }



  return (
    <authContext.Provider value={{ state, login, setIsLoggedIn, isLoggedIn, username, logout, userId, setUsername, token }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;