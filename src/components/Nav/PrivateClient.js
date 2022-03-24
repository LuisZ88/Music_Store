import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";

const PrivateClient = () => {
  const authCtx = useContext(AuthContext);
  let [info, setInfo] = useState({ message: "null" });
  let x;
  let [load, setLoad] = useState(true);
  const verify = async () => {
    try {
      x = await axios.get("http://localhost:5000/api/auth/validateUser", {
        headers: { Authorization: authCtx.token },
      });
      setInfo(x.data);
      setLoad(false);
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
     <>{console.log(info)}{load ? <></> : info.auth === true ? <Outlet /> : <Navigate to="/login"/>}</>
   
  );
};
export default PrivateClient;
