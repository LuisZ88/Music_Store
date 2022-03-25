import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggenIn: false,
  name: "",
  logout: () => {},
  logIn: (token,name, role, expirationTime) => {},
  role: "",
  expiresIn: "",
});
// const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
const calculateRemainingTime = (expirationTime) =>{
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime()
  const remainingDuration= adjExpirationTime - currentTime;
  return remainingDuration
}
export const AuthContextProvider = (props) => {
  
  const initialRole = localStorage.getItem('role')
  const initialToken = localStorage.getItem('token')
  const initialName = localStorage.getItem('name')
  const [role, setRole] = useState(initialRole)
  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialName);
  const userIsLoggedIn = !!token; // transforma el valor a boleano//
  
 
  const logoutHandler = () => {
    setUserName(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('role')

  };
  const loginHandler = (token, name, role, expirationTime) => {
    setToken(token);
    setUserName(name);
    setRole(role);
    localStorage.setItem('name', name)
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    const remainingTime = calculateRemainingTime(expirationTime)
    console.log(remainingTime)
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
