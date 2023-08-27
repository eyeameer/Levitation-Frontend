
import React from "react";
import {useNavigate } from "react-router-dom"
import { useAppSelector } from "./store/store";
export const ProtectedRoute=({Component})=>{
    const {isLoggedIn}=useAppSelector(state=>state.account)
    const navigate=useNavigate()
    React.useEffect(()=>{
        if(!isLoggedIn){
            navigate('/login')
        }
    })
    
    return(
<div>
    <Component/>
</div>
    )
}