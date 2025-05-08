import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes=({children})=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/Login" />;
}
export default ProtectedRoutes;