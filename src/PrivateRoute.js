import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import auth from "./Component/Controller/Login/auth";

const PrivateRoute = ({ children, ...rest }) => {

  const navigate = useNavigate()
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const isAuthenticatedFunc = async () => {
    const res = await auth.isAuthenticated()
    if (res.data.isAuthenticated) {
      setIsAuthenticated(res.data.isAuthenticated)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    isAuthenticatedFunc()
  }, [])
  
  return ( 
    !isAuthenticated ?  <Navigate to="/login" /> : <Outlet /> 
  )
};
export default PrivateRoute;