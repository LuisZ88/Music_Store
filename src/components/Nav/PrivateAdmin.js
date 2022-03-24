import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";



const PrivateAdmin = () => {
  const authCtx = useContext(AuthContext);
  let [info, setInfo] = useState({ auth: null });
  let [load, setLoad] = useState(true);
  const verify = async () => {
    try {
      let x = await axios.get("http://localhost:5000/api/auth/validateAdmin", {
        headers: { Authorization: authCtx.token }, });
      setInfo(x.data);
      setLoad(false);
    } catch (error) {
      setInfo({ message: "Authentication error." });
      setLoad(false)
      return;
    }
  };
  useEffect(() => {
    
    verify();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{load ? <></> : info.auth === true ? <Outlet /> : <Navigate to="/login"/>}</>;
};
export default PrivateAdmin;
