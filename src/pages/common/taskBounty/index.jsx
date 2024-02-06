import {default as cs} from 'classnames'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { text } from './constants'
import { useBountyActions } from './hooks/useBountyActions'
import { reducer } from './reducer'
import trashIcon from 'assets/icons/essential/trash/dark-color.svg'
import usersIcon from 'assets/icons/users/people/dark-color.svg'
import styles from './style.module.scss'
import { useModal } from 'hooks/useModal'
import CheckBoxV2 from 'components/global/checkbox/v2'
import { degreeMapper } from 'utils/mapper'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1'
import SwitchV2 from 'components/global/toggleSwitchV2'
import Button from 'components/global/button'
import colors from "styles/colors.module.scss"

export default function TaskBounty() { 
    
    const { getLabBounties, addNewBounty } = useBountyActions();

    const [ openDeleteModal, showDeleteModal, closeDeleteModal ] = useModal();

    const initialState = {
        activities: [],
        filteredActivities: [],
        groups: [],
        users: [],
        name: '',
        desc: '',
        smarties: undefined,
        hasFile: undefined,

        types: 'doing',
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const labId = useSelector(state => state.lab.labId);
    const labGroups = useSelector(state => state.lab.labGroups);
    const students = useSelector(state => state.lab.Students);

console.log("state", state);

    const getBounties = () => {
        getLabBounties({}, `?lab=${labId}`)
            .then(res => {
                dispatch({payload: {type: 'activities', value: res.data}})
            })
            .catch(err => {
                console.log("eeeeeeeeeeeeeeeeeeeee", err);
            })
    }
    
    const addGroup = (group) => {
        let groupsData = [...state.groups];

        const index = state.groups.findIndex(g => g._id === group._id);
        if (index === -1) {
            groupsData.push(group);
        }else {
            groupsData.splice(index, 1);
        }
        dispatch({payload: {type: 'groups', value: groupsData}})
    }

    const addUser = (id) => {
        let usersData = [...state.users];
        if (state.users.includes(id)) {
            const index = usersData.indexOf(id);
            if (index > -1) usersData.splice(index, 1);
        } else {
            usersData.push(id)
        }
        dispatch({payload: {type: 'users', value: usersData}})
    }

    const addTask = () => {
        let groupsUsersId = state.groups.map(g => g.Users.map(u => u._id));
        groupsUsersId = [].concat(...groupsUsersId)
        let allUsersId = [...groupsUsersId, ...state.users]

        const data = {
            Lab: labId,
            PotentialList:  [...new Set(allUsersId)],
            name: state.name,
            desc: state.desc,
            smarties: state.smarties,
            hasFile: state.hasFile
        }

        addNewBounty({...data})
            .then(res => getBounties())
            .catch(err => console.log(err))

    }

    const changeBountyType = (value) => {
        dispatch({payload: {type: 'types', value: value}})
    }
    
    useEffect(() => {
        if (labId) getBounties();
    }, [labId])

    useEffect(() => {
        const filteredList = state.activities.filter((activity) => activity.status === state.types);
        dispatch({payload: {type: 'filteredActivities', value: filteredList}})
    }, [state.types, state.activities])

    return (
        <div className={cs(styles['container'])}>

            <div className={cs(styles['header'])}> {text.title} </div>

            <div className={cs(styles['main_panel'])}>
                <div className={cs(styles['activity_list'])}>
                    <div className={cs(styles['header'])}>
                        <p> {text.subtitle_1} </p>
                        <div className={cs(styles['switch_types'])}>
                            <p className={cs(state.types === 'none' && styles['is_active'])} onClick={() => changeBountyType('none')}> {text.mode_1} </p>
                            <p className={cs(state.types === 'doing' && styles['is_active'])} onClick={() => changeBountyType('doing')}> {text.mode_2} </p>
                            <p className={cs(state.types === 'done' && styles['is_active'])} onClick={() => changeBountyType('done')}> {text.mode_3} </p>
                        </div>
                    </div>
                    <div className={cs(styles['list'])}>
                        {
                            state.filteredActivities && state.filteredActivities.map((activity, i) => 
                            
                                <div className={cs(styles['activity'])} key={i}> 
                                    <div className={cs(styles['activity_header'])}>
                                        <div className={cs(styles['info'])}>
                                            <p> {activity?.name} </p>
                                        </div>
                                        <div className={cs(styles['tools'])}>
                                            <img src={trashIcon} alt='trash icon' onClick={() => showDeleteModal()}/>
                                        </div>
                                    </div>
                                    <div className={cs(styles['activity_desc'])}>
                                        {activity?.desc ? activity?.desc : '-'}
                                    </div>
                                </div>
                                
                            )
                        }
                    </div>

                </div>
                <div className={cs(styles['new_activity_panel'])}>
                    <div className={cs(styles['header'])}> {text.subtitle_2} </div>
                    <div className={cs(styles['inputs_container'])}>
                        <div className={cs(styles['users_list'])}>
                            <p> {text.subtitle_2_1} </p>
                            <div className={cs(styles['list'])}>
                                <div className={cs(styles['list_header_1'])}>
                                    <img src={usersIcon} alt='users icon' />
                                    <p > {text.text_2_1} </p>
                                </div>
                                <div className={cs(styles['users_name'])}>
                                    {
                                        labGroups && labGroups.map((group, ind) => 
                                            <div className={cs(styles['username'])} key={ind}>
                                                <CheckBoxV2 borderColor={'dark'} value={state.groups.findIndex(g => g._id === group._id) !== -1} onClick={() => addGroup(group)}/>
                                                <p> {group?.name} </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={cs(styles['list_header_2'])}>
                                    <p > {text.text_2_2} </p>
                                </div>
                                <div className={cs(styles['users_name'])}>
                                    {
                                        students && students.map((student, ind) => 
                                            <div className={cs(styles['username'])} key={ind}>
                                                <CheckBoxV2 borderColor={'dark'} value={state.users.includes(student._id)} onClick={() => addUser(student._id)}/>
                                                <div className={cs(styles['data'])}>
                                                    <p> {student?.firstName} {student?.lastName}</p>
                                                    <p> {degreeMapper(student?.type)} </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                    
                                
                            </div>

                        </div>
                        <div className={cs(styles['inputs'])}>
                            <div className={cs(styles['text_inputs'])}>                            
                                <TextInputV2
                                    value={state.name}
                                    onChange={ (e) => dispatch({payload: {type: 'name', value: e.target.value}}) }
                                    placeholder={text.input_1} 
                                    dir={'rtl'}
                                    width={'245px'}
                                    fontFamily={'pinar_light'}
                                    fontWeight={'300'}
                                    fontSize={'16px'}
                                />
                                <TextInputV2
                                    value={state.smarties}
                                    onChange={ (e) => dispatch({payload: {type: 'smarties', value: e.target.value}}) }
                                    placeholder={text.input_2} 
                                    dir={'rtl'}
                                    width={'245px'}
                                    fontFamily={'pinar_light'}
                                    fontWeight={'300'}
                                    fontSize={'16px'}
                                />
                                <div className={cs(styles['switch_container'])}>
                                    <p> {text.input_3} </p>
                                    <SwitchV2
                                        value={state.hasFile} 
                                        onClick={ () => dispatch({payload: {type: 'hasFile', value: !state.hasFile}}) }
                                        name={'hasFile'} id={'hasFile'}
                                        isDark={false}
                                    />
                                </div>
                                <div className={cs(styles['textarea'])}>
                                    <TextAreaV1
                                        name={'description'}
                                        value={state.desc}
                                        onChange={ (e) => dispatch({payload: {type: 'desc', value: e.target.value}}) }
                                        placeholder={text.input_4} 
                                        rows={3}
                                        fontFamily={'pinar_light'}
                                        fontWeight={'300'}
                                        fontSize={'16px'}
                                        resizable={false}
                                    />
                                </div>
                            </div>
                            <div className={cs(styles['btn_container'])}>
                                <Button
                                    color={colors['main-color-100']} 
                                    onClick={() => addTask()}
                                    text={text.button} 
                                    width={'255px'}
                                    // disabled={!state.name.trim().length}
                                    // load={eventCreation}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}