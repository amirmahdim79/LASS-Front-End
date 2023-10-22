import SideBar from "components/global/sidebar";
import { Outlet } from "react-router-dom";

export default function Base() {
    return (
        <>
            {/* <SideBar /> */}

            <Outlet />
        </>
    )
}