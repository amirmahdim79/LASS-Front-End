import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";

export default function Base() {

    
    return (
        <>
            <SideBar />
            <Navbar />

            <Outlet />
        </>
    )
}