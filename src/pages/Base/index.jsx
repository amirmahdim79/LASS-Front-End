import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";
import { addUser, setPermissions } from "store/userSlice/index"
import { setStudents } from "store/labSlice";
import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";
import { setLabId } from "store/labSlice";
import { setLabGroups, setLabForums } from "store/labSlice";
import { setArticles } from "store/userSlice";
import { setForum } from "store/labSlice";

export default function Base({type}) {
        
    const dispatch = useDispatch();

    const { checkAuth, checkSupAuth, getMyLabs, getLabGroups, getLabForums, getOneForum } = useBaseActions();
    const userType = localStorage.getItem('type');
    const labId = useSelector(state => state.lab.labId);
    const params = useParams();


    useEffect(() => {
        if ( userType === type ) {
            if (userType === 'user') {
                checkAuth()
                    .then(res => {
                        // console.log("111111111111111111111111111111", res.data);
                        dispatch(addUser(res.data))
                        dispatch(setLabId(res.data.Labs[0]))
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
                            .then(res =>  {
                                // console.log("sssssssssssssss", res.data);
                                dispatch(setStudents(res.data?.Students))
                                dispatch(setLabId(res.data._id))
                                dispatch(setArticles(res.data?.Supervisor?.RecentFiles))

                                getLabGroups({}, `/${res.data._id}`)
                                    .then(res => {
                                        // console.log("///////////////////////", res.data);
                                        dispatch(setLabGroups(res.data))
                                    }).catch(err => {
                                        console.log(err);
                                    })
                            })
                            .catch(err => console.log(err))
                        dispatch(addUser(res.data))
                    })
                    .catch(err => {})
            } 
        }
    }, [])

    useEffect(() => {
        if (labId) {
            const interval = setInterval(() => {
                if (userType === 'supervisor') {
                    getLabForums({}, `/${labId}`)
                        .then(res => dispatch(setLabForums(res.data.reverse())))
                        .catch(err => console.log(err))
                }else {
                    getLabForums({}, `/user/${labId}`)
                        .then(res => dispatch(setLabForums(res.data.reverse())))
                        .catch(err => console.log(err))
                }
            }, 60000);
    
            return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (params.id) {
            const interval = setInterval(() => {
                getOneForum({}, `/${params.id}?type=${userType === 'supervisor' ? 'Supervisor' : 'User'}`)
                .then(res => dispatch(setForum(res.data)))
                .catch(err => console.log(err))
            }, 10000);
    
            return () => clearInterval(interval);
        }
    }, [params.id]);

    
    return (
        <>
            <SideBar type={userType}/>
            <Navbar type={type}/>

            <Outlet />
        </>
    )
}