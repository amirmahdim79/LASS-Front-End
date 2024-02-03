import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import trashIcon from 'assets/icons/essential/trash/error-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import moreIcon from 'assets/icons/essential/more/dark-color.svg'
import { useReducer } from 'react'
import { reducer } from './reducer'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import SearchBar from 'components/global/searchbar'
import useInput from 'hooks/useInputHandler'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useSelector } from 'react-redux'
import CheckBoxV2 from 'components/global/checkbox/v2'
import UserAvatarCollage from 'components/global/usersAvatarCollage'
import Modal from 'components/global/modal'
import { useModal } from 'hooks/useModal'
import UsersListModal from '../components/modals/usersList'
import { getFirstLetters } from 'utils/mapper'
import { degreeMapper } from 'utils/mapper'
import colors from "styles/colors.module.scss"
import UsersList from 'components/usersListG'
import { useEffect } from 'react'
import { useForumsActions } from '../hooks/useForumsActions'
import moment from 'moment';
import 'moment/locale/fa';
import { useNavigate } from 'react-router-dom';

export default function ForumCreation() { 

    const navigate = useNavigate();


    const initialState = {
        name: '',
        usersId: [],
        users: [],

        groupUsers: [],
        labGroups: [],

        selectAllUsers: false,
        selectAllGroups: false,
        listType: 'groups',

        currentUsers: [],


        usersUnique: []




    }

    const [ openShowUsersModal, showShowUsersModal, closeShowUsersModal ] = useModal();


    const [ state , dispatch] = useReducer( reducer, initialState );
    const { value: searchKey, setValue: setSearchKey } = useInput('');
    const { value: groupData, setValue: setGroupData } = useInput({name:'', users:[]});
    // 65322b1e95e0d4f18a0563cf

    const labGroups = useSelector(state => state.lab.labGroups);
    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);

    const { createForum, forumCreation } = useForumsActions();

    console.log("currentUsers", state.currentUsers);
    // console.log("labGroups", state.labGroups);
    // console.log("students", students);

    const addGroup = (group) => {
        let groups = [...state.labGroups];
        let usersId = [...state.currentUsers];
        const index = groups.findIndex(g => g._id === group._id);
        if (index === -1) {
            groups.push(group);
            group.Users.map(u => {
                // const uInd = usersId.indexOf(u._id);
                // console.log("uInd", uInd);
                // if (uInd === -1) usersId.push(u._id)
                usersId.push(u._id)
                // const unique = usersId.filter((u, i) => i === usersId.findIndex(o => u._id === o._id));
                // usersId = [...unique]
            })
        } else {
            group.Users.map(u => {
                const index = usersId.indexOf(u._id);
                usersId.splice(index, 1);
            })
            groups.splice(index, 1);
        }

        
        dispatch({payload: {type: 'labGroups', value: groups}})
        dispatch({payload: {type: 'currentUsers', value: usersId}})
        // let groups = [...state.labGroups];
        // let groupUsers = [...state.groupUsers];

        // const index = state.labGroups.findIndex(g => g._id === group._id);
        // if (index === -1) {
        //     groups.push(group);
        //     groupUsers = [...groupUsers, ...group.Users];

        //     const unique = groupUsers.filter((g, i) => i === groupUsers.findIndex(o => g._id === o._id));
        //     groupUsers = [...unique]

        // }else {
        //     let updatedUsers = []
        //     groups.splice(index, 1);
        //     groups.map(g => {
        //         g.Users.map(u => {
        //             updatedUsers.push(u)
        //         })
        //     })
        //     const unique = updatedUsers.filter((g, i) => i === updatedUsers.findIndex(o => g._id === o._id));
        //     groupUsers = [...unique]
        // }
        // dispatch({payload: {type: 'labGroups', value: groups}})
        // dispatch({payload: {type: 'groupUsers', value: groupUsers}})
    }

    const addUser = (id) => {
        let usersId = state.currentUsers;
        let labGroups = [...state.labGroups];
        let updatedGroups = [];
        const index = usersId.indexOf(id);

        if (index > -1) {
            usersId.splice(index, 1);
            usersId.map(uId => {
                if (uId === id) {
                    const index2 = usersId.indexOf(uId);
                    usersId.splice(index2, 1);
                }
            })

            // labGroups.forEach(function (g) {
            //     const index2 = g.Users.findIndex(u => u._id === id);
            //     console.log("index2", index2);
            //     if (index2 > -1) updatedGroups.push(g)
            // });

            
            for (const [i, g] of labGroups.entries()) {
                const index2 = g.Users.findIndex(u => u._id === id);
                if (index2 === -1) updatedGroups.push(g)
          
            }

            // labGroups.map((g, gInd) => {
            //     console.log("ggggggg", g);
            //     [...g.Users].map(u => {
            //         console.log("uuuuuuu", u);
            //         // console.log("idid", id);
            //         if (u._id === id) labGroups.splice(gInd, 1);
            //     })
            // })
            

        } else {
            usersId.push(id);
        }
        dispatch({payload: {type: 'currentUsers', value: usersId}})
        dispatch({payload: {type: 'labGroups', value: updatedGroups}})

        // let usersId = state.usersId;
        // let users = [...state.users];
        // const index = usersId.indexOf(id);
        // const index2 = users.findIndex(u => u._id === id);

        // if (index > -1) {
        //     usersId.splice(index, 1);
        //     users.splice(index2, 1);
        // }
        // else {
        //     let obj = students.find(s => s._id === id);
        //     usersId.push(id);
        //     users.push(obj);
        // }
        // dispatch({payload: {type: 'usersId', value: usersId}})
        // dispatch({payload: {type: 'users', value: users}})
    }

    const removeUser = (id) => {
        // let users = [...state.currentUsers];
        // console.log("users", users);
        // let groupUsers = [...state.groupUsers];
        // let usersId = state.usersId;
        // const index = users.findIndex(u => u._id === id);
        // const index2 = usersId.indexOf(id);
        // const index3 = groupUsers.indexOf(id);
        // users.splice(index, 1);
        // usersId.splice(index2, 1);
        // groupUsers.splice(index3, 1)
        // console.log("after",users);
        // dispatch({payload: {type: 'currentUsers', value: users}})
        // dispatch({payload: {type: 'users', value: users}})
        // dispatch({payload: {type: 'usersId', value: usersId}})
        // dispatch({payload: {type: 'groupUsers', value: groupUsers}})
    }

    const createNewForum = () => {
        let data = {
            name: state.name,
            Collaborators: state.currentUsers,
            Lab: labId,
            start:  moment(),

        }

        createForum({...data})
            .then(() => navigate(-1))
            .catch(err => {
                console.log("errrrrrrrrrrrrrrrrrrrr", err);
            })
    }

    useEffect(() => {
        if (state.selectAllUsers) {
            let result = students.map(s => s._id);
            dispatch({payload: {type: 'currentUsers', value: result}})
            // dispatch({payload: {type: 'usersId', value: result}})
            // dispatch({payload: {type: 'users', value: students}})
        }else {
            dispatch({payload: {type: 'currentUsers', value: []}})
            // dispatch({payload: {type: 'usersId', value: []}})
            // dispatch({payload: {type: 'users', value: []}})
        }
    }, [state.selectAllUsers])

    useEffect(() => {
        let usersId = [...state.currentUsers];
        if (state.selectAllGroups) {
            dispatch({payload: {type: 'labGroups', value: labGroups}});
            labGroups.map(g => {
                g.Users.map(u => {
                    // const uInd = usersId.indexOf(u._id);
                    // console.log("uInd", uInd);
                    // if (uInd === -1) usersId.push(u._id)
                    usersId.push(u._id)
                })
            })
        } else {
            dispatch({payload: {type: 'labGroups', value: []}});
            // here ater removing all groups users get removed
            // labGroups.map(g => {
            //     g.Users.map(u => {
            //         const uInd = usersId.indexOf(u._id);
            //         if (uInd > -1) usersId.splice(uInd, 1);
            //     })
            // })
        }
        dispatch({payload: {type: 'currentUsers', value: usersId}})
        // let groupUsers = []
        // if (state.selectAllGroups) {
        //     dispatch({payload: {type: 'labGroups', value: labGroups}})
        //     labGroups.map(group => {
        //         group.Users.map(user => {
        //             groupUsers.push(user)
        //         })
        //     })

        //     const unique = groupUsers.filter((g, i) => i === groupUsers.findIndex(o => g._id === o._id));
        //     groupUsers = [...unique]
        //     dispatch({payload: {type: 'groupUsers', value: groupUsers}})
        // }else {
        //     dispatch({payload: {type: 'labGroups', value: []}})
        //     dispatch({payload: {type: 'groupUsers', value: []}})
        // }
    }, [state.selectAllGroups])

    
    useEffect(() => {
        let mySet = new Set(state.currentUsers);
        let myArr = Array.from(mySet);
        dispatch({payload: {type: 'usersUnique', value: myArr}})
        if (state.labGroups.length === 0) dispatch({payload: {type: 'selectAllGroups', value: false}})
        // let allUsersId = [...state.groupUsers, ...state.users];
        // const unique = allUsersId.filter((g, i) => i === allUsersId.findIndex(o => g._id === o._id));
        // dispatch({payload: {type: 'currentUsers', value: unique}})
    }, [state.labGroups, state.currentUsers])
    

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['main_panel'])}>
                <div className={cs(styles['header'])}>
                    <p> {text.main_title} </p>
                    <img src={trashIcon} alt='trash icon' />
                </div>
                <div className={cs(styles['users_list'])}>
                    <TextInputV2
                        value={state.name}
                        onChange={(e)=>dispatch({payload: {type: 'name', value: e.target.value}})}
                        placeholder={text.input_1} 
                        dir={'rtl'}
                        width={'300px'}
                        fontFamily={'pinar_light'}
                        fontWeight={'300'}
                        fontSize={'16px'}
                    />
                    <div className={cs(styles['list_header'])}>
                        <div className={cs(styles['row_1'])}>
                            <div className={cs(styles['titles_wrapper'], styles['items'])}>
                                <p className={cs(state.listType === 'users' && styles['clicked_title'])} onClick={() => dispatch({payload: {type: 'listType', value: 'users'}})}> {text.list_title_1} </p>
                                <p className={cs(state.listType === 'groups' && styles['clicked_title'])} onClick={() => dispatch({payload: {type: 'listType', value: 'groups'}})}> {text.list_title_2} </p>
                            </div>
                            <div className={cs(styles['tools_wrapper'], styles['items'])}>
                                <div> 
                                    <SearchBar 
                                        height={'40px'} 
                                        borderRadius={'12px'} 
                                        placeholder={`نام ${state.listType === 'users' ? 'فرد' : 'گروه'} را جست و جو کنید`} 
                                        fontSize={'14px'}
                                        value={searchKey}
                                        setValue={setSearchKey}
                                    /> 
                                </div>
                                <div className={cs(styles['filter_icon'])}> 
                                    <img 
                                        src={filterIcon}
                                        alt='filter icon'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cs(styles['row_2'])}>
                            <div 
                                className={cs(styles['cols'])} 
                                onClick={() => state.listType === 'users' 
                                    ? dispatch({payload: {type: 'selectAllUsers',value: !state.selectAllUsers}}) 
                                    : dispatch({payload: {type: 'selectAllGroups',value: !state.selectAllGroups}})
                                }
                            >
                                <CheckBoxV1 value={state.listType === 'users' ? state.selectAllUsers : state.selectAllGroups}/>
                                <p> {text[state.listType].header_1} </p>
                            </div>
                            <div className={cs(styles['cols'])}>
                                <p> {text[state.listType].header_2} </p>
                            </div>
                        </div>
                    </div>

                    <div className={cs(styles['list_body'])}>
                        {
                            state.listType === 'groups'
                                ? (
                                    labGroups && labGroups.map((group,i) => 
                                    <>
                                        <div className={cs(styles['row'], styles['group'])} key={i} onClick={() => {showShowUsersModal(); setGroupData({users:group.Users, name: group.name})}}>
                                            <div className={cs(styles['data_name'])}>
                                                {/* <CheckBoxV2  */}
                                                <CheckBoxV1 value={state.labGroups.findIndex(g => g._id === group._id) !== -1} onClick={(e) => {e.stopPropagation(); addGroup(group)}}/>
                                                <p> {group?.name} </p>
                                            </div>
                                            <div className={cs(styles['group_users'])}>
                                                <UserAvatarCollage users={group.Users} size={'25px'} alignment={'flex-start'} fontSize={'12px'}/>
                                                <img src={moreIcon} alt='more icon'/>
                                            </div>
                                        </div>
                                    </>
                                         
                                    )
                                ) : (
                                    students && students.map((student,i) => 
                                        <div className={cs(styles['row'])} key={i}>
                                            <div className={cs(styles['data_name'])}>
                                                <CheckBoxV1 value={state.currentUsers.includes(student._id)} onClick={() => addUser(student._id)}/>
                                                <div 
                                                    style={student?.profilePicture && {backgroundImage: `url(${student?.profilePicture})`}} 
                                                    className={cs(styles['avatar'], !student?.profilePicture && styles['empty_avatar'])}
                                                >
                                                    {!student?.profilePicture &&
                                                        <p>{getFirstLetters(`${student?.firstName} ${student?.lastName}`)}</p>
                                                    }
                                                </div>
                                                <p> {student?.firstName} {student?.lastName}</p>
                                            </div>
                                            <div className={cs(styles['user_degree'])}>
                                                {degreeMapper(student?.type)}
                                            </div>
                                        </div>
                                    )
                                )
                        }

                    </div>


                </div>
            </div>

            <UsersList
                title={text.side_title}
                btnText={text.side_btn}
                btnColor={colors['main-color-100']}
                students={state.currentUsers}
                canDeleteMember={true}
                hasSubmitBtn={true}
                btnDisabled={false}
                btnLoad={forumCreation}
                onClickBtn={createNewForum}
                deleteOnClickHandler={removeUser}
                type={'createForum'}
            />

            <Modal
                isOpen={openShowUsersModal} 
                close={closeShowUsersModal} 
                content={
                    <div className={cs(styles['users_list_modal'])} style={{display: openShowUsersModal ? 'block' : 'none'}} >
                        <UsersListModal data={groupData} close={closeShowUsersModal}/>
                    </div>
                }
            />
        </div>
    )
}