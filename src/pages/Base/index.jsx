import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";
import { addUser, setPermissions } from "store/userSlice/index"
import { setStudents } from "store/labSlice";
import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";

export default function Base({type}) {
        
    const dispatch = useDispatch();

    const { checkAuth, checkSupAuth, getMyLabs } = useBaseActions();
    const userType = localStorage.getItem('type');

    useEffect(() => {
        if ( userType === type ) {
            if (userType === 'user') {
                checkAuth()
                    .then(res => {
                        dispatch(addUser(res.data))
                        dispatch(setPermissions(res.data?.permissions))
                        getMyLabs()
                            .then(res =>  dispatch(setStudents(res.data?.Students)))
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }else if (userType === 'supervisor') {
                checkSupAuth()
                    .then(res => {
                        getMyLabs({}, '?sups=true')
                            .then(res =>  dispatch(setStudents(res.data?.Students)))
                            .catch(err => console.log(err))
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