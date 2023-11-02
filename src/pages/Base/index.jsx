import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";
import useInput from "hooks/useInputHandler";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";

export default function Base() {

    const { checkAuth, checkSupAuth } = useBaseActions();

    const { value: type, setValue: setType } = useInput('');

    useEffect(() => {
        checkAuth().then(res => {
            setType('user')
        }).catch(err => {
        })

        checkSupAuth().then(res => {
            setType('supervisor')
        }).catch(err => {
        })
    }, [])

    
    return (
        <>
            <SideBar type={type}/>
            <Navbar />

            <Outlet />
        </>
    )
}