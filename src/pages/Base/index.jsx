import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useBaseActions } from "./hooks/useBaseActions";
import { addUser } from "store/userSlice/index"
import { setStudents } from "store/labSlice";
import Navbar from "components/global/navbar";
import SideBar from "components/global/sidebar";
import { setLabId } from "store/labSlice";
import { setLabGroups, setLabForums } from "store/labSlice";
import { setArticles } from "store/userSlice";
import { setForum } from "store/labSlice";
import { setPermissions } from "store/userSlice";
import { sortForum } from "utils/mapper";
import { setPath } from "store/labSlice";
import { setMilestone } from "store/labSlice";
import { setLeaderboard } from "store/labSlice";
import { setUserActivities } from "store/labSlice";

export default function Base({type}) {
        
    const dispatch = useDispatch();

    const { checkAuth, checkSupAuth, getMyLabs, getLabGroups, getLabForums, getOneForum, getLeaderboard, getMyActivities } = useBaseActions();
    const userType = localStorage.getItem('type');
    const labId = useSelector(state => state.lab.labId);
    const params = useParams();
    const location = useLocation()

    useEffect(() => {
        if ( userType === type ) {
            if (userType === 'user') {
                checkAuth()
                    .then(res => {
                        // console.log("111111111111111111111111111111", res.data);
                        dispatch(addUser(res.data))
                        dispatch(setLabId(res.data.Labs[0]))
                        dispatch(setArticles([...res.data?.RecentFiles].reverse()))
                        dispatch(setPermissions(res.data?.permissions))

                        getMyLabs()
                            .then(res =>  {
                                // console.log("22222222222222", res.data);
                                dispatch(setStudents(res.data?.Students))
                                dispatch(setPath(res.data?.Paths[0]))
                                dispatch(setMilestone(res.data.Paths[0]?.Milestones))
                            })
                            .catch(err => console.log("err", err))

                        getLabGroups({}, `/${res.data.Labs[0]}`)
                            .then(res => {
                                // console.log("///////////////////////", res.data);
                                dispatch(setLabGroups(res.data))
                            }).catch(err => {
                                console.log(err);
                            })

                        getLeaderboard({}, `?lab=${res.data.Labs[0]}`)
                            .then(res => dispatch(setLeaderboard(res.data)))
                            .catch(err => console.log("leader err", err))

                        if (location.pathname === '/user/my-profile') {
                            getMyActivities()
                                .then(res => {
                                    dispatch(setUserActivities(res.data))
                                })
                                .catch(err => {
                                    console.log("err", err);
                                })
                        }
                    })
                    .catch(err => console.log("err", err))
            }else if (userType === 'supervisor') {
                checkSupAuth()
                    .then(res => {
                        dispatch(setArticles(res.data?.RecentFiles.reverse()))
                        getMyLabs({}, '?sups=true')
                            .then(res =>  {
                                // console.log("sssssssssssssss", res.data);
                                dispatch(setStudents(res.data?.Students))
                                dispatch(setLabId(res.data._id))

                                getLabGroups({}, `/${res.data._id}`)
                                    .then(res => {
                                        // console.log("///////////////////////", res.data);
                                        dispatch(setLabGroups(res.data))
                                    }).catch(err => {
                                        console.log(err);
                                    })

                                
                                getLeaderboard({}, `?lab=${res.data._id}`)
                                    .then(res => dispatch(setLeaderboard(res.data)))
                                    .catch(err => console.log("leader err", err))
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
                        .then(res => {
                            dispatch(setLabForums(sortForum(res.data)))
                        })
                        .catch(err => console.log(err))
                }else {
                    getLabForums({}, `/user/${labId}`)
                        .then(res => {
                            dispatch(setLabForums(sortForum(res.data)))
                        })
                        .catch(err => console.log(err))
                }
            }, 60000);
    
            return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (location.pathname.includes('forum')) {
            if (params.id) {
                const interval = setInterval(() => {
                    getOneForum({}, `/${params.id}?type=${userType === 'supervisor' ? 'Supervisor' : 'User'}`)
                    .then(res => dispatch(setForum(res.data)))
                    .catch(err => console.log(err))
                }, 10000);
        
                return () => clearInterval(interval);
            }
        }
    }, [params.id, location.pathname]);

    
    return (
        <>
            <SideBar type={userType}/>
            <Navbar type={type}/>

            <Outlet />
        </>
    )
}