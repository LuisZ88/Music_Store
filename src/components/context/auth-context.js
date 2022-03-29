import React, { useState } from "react";
import Cookies from 'universal-cookie'
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  logout: () => {},
  logIn: (token,name, role, expirationTime) => {},
  role: "",
  expiresIn: "",
});
const cookies = new Cookies()
// const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
const calculateRemainingTime = (expirationTime) =>{
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime()
  const remainingDuration= adjExpirationTime - currentTime;
  return remainingDuration
}
export const AuthContextProvider = (props) => {
  
  const initialRole = cookies.get('role')
  const initialToken = cookies.get('token')
  const initialName = cookies.get('name')
  const [role, setRole] = useState(initialRole)
  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialName);
  const userIsLoggedIn = !!token; // transforma el valor a boleano//
  
 
  const logoutHandler = () => {
    setUserName(null);
    setToken(null);
    setRole(null);
    cookies.remove('token')
    cookies.remove('name')
    cookies.remove('role')

  };
  const loginHandler = (token, name, role, expirationTime) => {
    setToken(token);
    setUserName(name);
    setRole(role);
    cookies.set('name', name, {path:'/'})
    cookies.set('token', token, {path:'/'})
    cookies.set('role', role, {path:'/'})
    const remainingTime = calculateRemainingTime(expirationTime)
    setTimeout(logoutHandler, remainingTime)
  };
  const contextValue = {
    token:token,
    name: userName,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logout: logoutHandler,
    role: role,
  }



  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
