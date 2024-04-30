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
import { setLabName } from "store/labSlice";
import { getTime } from "utils/mapper";
import { setCurrentTime } from "store/userSlice";
import useInput from "hooks/useInputHandler";
import { setCurrentMilestone } from "store/labSlice";
import { setPrevInd } from "store/labSlice";
import { setSupHasLab } from "store/userSlice";
import { setLabDesc } from "store/labSlice";

export default function Base({type}) {
        
    const dispatch = useDispatch();

    const { checkAuth, checkSupAuth, getMyLabs, getLabGroups, getLabForums, getOneForum, getLeaderboard, getMyActivities } = useBaseActions();
    const userType = localStorage.getItem('type');
    const labId = useSelector(state => state.lab.labId);
    const params = useParams();
    const location = useLocation()
    const { value: now, setValue: setNow } = useInput();

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
                                // console.log("res.data",res.data);
                                if (res.data._id) {
                                    dispatch(setLabName(res.data.name))
                                    dispatch(setStudents(res.data?.Students))
                                    dispatch(setPath(res.data?.Paths))
                                    dispatch(setMilestone(res.data.Paths[0]?.Milestones))

                                    for (const [i, milestone] of res.data.Paths[0].Milestones.entries()) {
                                        if (milestone.status[0] === null) {
                                            dispatch(setCurrentMilestone(milestone));
                                            if (i === 0) dispatch(setPrevInd(0))
                                            else dispatch(setPrevInd(i-1))
                                            break;
                                        }
                                    }
                                }                                
                            })
                            .catch(err => console.log(err))

                            
                        if (res.data.Labs[0]) {

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
                        }

                            // getMyActivities()
                            //     .then(res => {
                            //         // console.log("rrrrrrrrrrrr1111111111111111111111111111111111111111", res.data);
                            //         dispatch(setUserActivities(res.data))
                            //     })
                            //     .catch(err => {
                            //         console.log("er1111111111111111111111111111111111111111111111111111r", err);
                            //     })

                            
                        })
                    .catch(err => console.log("err", err))
            }else if (userType === 'supervisor') {
                checkSupAuth()
                    .then(res => {
                       
                        dispatch(setArticles(res.data?.RecentFiles.reverse()))
                        getMyLabs({}, '?sups=true')
                            .then(res =>  {
                                console.log("///////////////////////", res.data);
                                 
                                if (res.data._id) {
                                    dispatch(setSupHasLab(true));    
                                    dispatch(setStudents(res.data?.Students))
                                    dispatch(setPath(res.data.Paths))
                                    dispatch(setLabId(res.data._id))
                                    dispatch(setLabName(res.data.name))
                                    dispatch(setLabDesc(res.data?.desc))
                                    getLabGroups({}, `/${res.data._id}`)
                                    .then(res => {
                                        // console.log("///////////////////////", res.data);
                                        dispatch(setLabGroups(res.data))
                                    }).catch(err => {
                                        console.log(err);
                                    })

                                    
                                    getLeaderboard({}, `?lab=${res.data._id}`)
                                        .then(res => dispatch(setLeaderboard(res.data)))
                                        .catch(err => console.log(err))
                                } else dispatch(setSupHasLab(false));                               
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
            // console.log("labIdlabId", labId);
            const interval = setInterval(() => {
                if (userType === 'supervisor') {
                    getLabForums({}, `/${labId}`)
                        .then(res => {
                            // console.log("rsssssssssssss", res.data);
                            dispatch(setLabForums(sortForum(res.data)))
                        })
                        .catch(err => console.log("errrrrr", err))
                }else {
                    getLabForums({}, `/user/${labId}`)
                        .then(res => {
                            dispatch(setLabForums(sortForum(res.data)))
                        })
                        .catch(err => console.log(err))
                }
            }, 60000);
    
            return () => clearInterval(interval);
        } else dispatch(setLabForums([]))
    }, []);

    useEffect(() => {
        if (location.pathname.includes('forum')) {
            if (params.id && labId) {
                const interval = setInterval(() => {
                    getOneForum({}, `/${params.id}?type=${userType === 'supervisor' ? 'Supervisor' : 'User'}`)
                        .then(res => dispatch(setForum(res.data)))
                        .catch(err => console.log(err))
                }, 10000);
        
                return () => clearInterval(interval);
            }
        }
    }, [params.id, location.pathname]);

    useEffect(() => {
        if (location.pathname.includes('my-profile') && labId) {
            getMyLabs()
                .then(res =>  {
                    dispatch(setPath(res.data?.Paths))
                    dispatch(setMilestone(res.data.Paths[0]?.Milestones))

                    for (const [i, milestone] of res.data.Paths[0].Milestones.entries()) {
                        if (milestone.status[0] === null) {
                            dispatch(setCurrentMilestone(milestone));
                            if (i === 0) dispatch(setPrevInd(0))
                            else dispatch(setPrevInd(i-1))
                            break;
                        }
                    }
                })
                .catch(err => console.log(err))

            getLeaderboard({}, `?lab=${labId}`)
                .then(res => dispatch(setLeaderboard(res.data)))
                .catch(err => console.log(err))
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