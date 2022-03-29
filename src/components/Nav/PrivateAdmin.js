import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../UI/Loading";



const PrivateAdmin = () => {
  const authCtx = useContext(AuthContext);
  let [info, setInfo] = useState({ auth: null });
  let [loading, setLoading] = useState(true);
  const verify = async () => {
    try {
      let x = await axios.get(`${process.env.BACKEND}api/auth/validateAdmin`, {
        headers: { Authorization: authCtx.token }, });
      setInfo(x.data);
      setLoading(false);
    } catch (error) {
      setInfo({ message: "Authentication error." });
      setLoading(false)
      return;
    }
  };
  useEffect(() => {
    
    verify();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{loading === true ? <Loading/>: info.auth === true ? <Outlet /> : <Navigate to="/login"/>}</>;
};
export default PrivateAdmin;
