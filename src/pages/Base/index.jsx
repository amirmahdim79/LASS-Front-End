import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";
import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";
import useToast from "hooks/useToast";

export default function Base({type}) {
    
    const { showToast } = useToast();
    
    const { checkAuth, checkSupAuth } = useBaseActions();
    const userType = useSelector(state => state.user.type);

    useEffect(() => {
        if ( userType === type ) {
            if (userType === 'user') {
                checkAuth()
                    .then(res => {})
                    .catch(err => {
                        
                    })
            }else if (userType === 'supervisor') {
                checkSupAuth()
                    .then(res => {})
                    .catch(err => {
                })
            } 
        }
    }, [])

    
    return (
        <>
            <SideBar type={userType}/>
            <Navbar />

            <Outlet />
        </>
    )
}