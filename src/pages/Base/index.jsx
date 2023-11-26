import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";
import { addUser, setPermissions } from "store/userSlice/index"
import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";

export default function Base({type}) {
        
    const dispatch = useDispatch();

    const { checkAuth, checkSupAuth } = useBaseActions();
    const userType = localStorage.getItem('type');

    useEffect(() => {
        if ( userType === type ) {
            if (userType === 'user') {
                checkAuth()
                    .then(res => {
                        dispatch(addUser(res.data))
                        dispatch(setPermissions(res.data?.permissions))
                    })
                    .catch(err => { })
            }else if (userType === 'supervisor') {
                checkSupAuth()
                    .then(res => {
                        dispatch(addUser(res.data))
                    })
                    .catch(err => {})
            } 
        }
    }, [])

    
    return (
        <>
            <SideBar type={userType}/>
            <Navbar type={type}/>

            <Outlet />
        </>
    )
}