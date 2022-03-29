import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../UI/Loading";

const PrivateClient = () => {
  const authCtx = useContext(AuthContext);
  let [info, setInfo] = useState({ message: "null" });
  let x;
  let [loading, setLoading] = useState(true);
  const verify = async () => {
    try {
      x = await axios.get(`${process.env.REACT_APP_BACKEND}api/auth/validateUser`, {
        headers: { Authorization: authCtx.token },
      });
      setInfo(x.data);
      setLoading(false);
    } catch (error) {
      setInfo({ message: "Authentication error." });
      return;
    }
  };

  useEffect(() => {
    verify();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
     <>{loading === true ? <Loading/> : info.auth === true ? <Outlet /> : <Navigate to="/login"/>}</>
   
  );
};
export default PrivateClient;
