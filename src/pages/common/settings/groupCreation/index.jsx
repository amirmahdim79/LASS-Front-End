
import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import backArrow from 'assets/icons/arrow/arrow-left/dark-color2.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import infoIcon from 'assets/icons/essential/info-circle/dark-color.svg'
import { useNavigate } from 'react-router-dom';
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2';
import { useReducer } from 'react';
import { reducer } from './reducer';
import SearchBar from 'components/global/searchbar';
import useInput from 'hooks/useInputHandler';
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useSelector } from 'react-redux'
import { getFirstLetters } from 'utils/mapper'
import { degreeMapper } from 'utils/mapper'
import UsersList from 'components/usersList/simpleVersion'
import colors from "styles/colors.module.scss"
import { useSettingsActions } from '../hooks/useSettingsActions'
import { useModal } from 'hooks/useModal'
import Modal from 'components/global/modal'

export default function GroupCreation() { 

    const navigate = useNavigate();
    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);

    const initialState = {
        name: '',
        currentUsers: [],
        selectAllUsers: false,
    }

    const [ state , dispatch] = useReducer( reducer, initialState );
    const { value: searchKey, setValue: setSearchKey } = useInput('');

    const [openInfoBox, showInfoBox, closeInfoBox] = useModal();

    const { createGroup, groupCreation } = useSettingsActions();



    const addUser = (id) => {
        let usersId = state.currentUsers;
        const index = usersId.indexOf(id);

        if (index > -1) usersId.splice(index, 1);
        else usersId.push(id);
        dispatch({payload: {type: 'currentUsers', value: usersId}})

        if (usersId.length !== 0 && usersId.length !== students.length) {
            dispatch({payload: {type: 'selectAllUsers', value: false}})
        }
    }

    const removeUser = (id) => {
        let usersId = state.currentUsers;
        const index = usersId.indexOf(id);
        usersId.splice(index, 1);
        dispatch({payload: {type: 'currentUsers', value: usersId}})

        if (usersId.length !== 0 && usersId.length !== students.length) {
            dispatch({payload: {type: 'selectAllUsers', value: false}})
        }
    }

    const selectAllUsers = (selectAll) => {
        dispatch({payload: {type: 'selectAllUsers',value: selectAll}})

        if (selectAll) {
            let result = students.map(s => s._id);
            dispatch({payload: {type: 'currentUsers', value: result}})
        } else dispatch({payload: {type: 'currentUsers', value: []}})
    }

    const createNewGroup = () => {
        const data = {
            Users: state.currentUsers,
            Lab: labId,
            name: state.name,
        }
        createGroup({...data})
            .then(() => navigate('../settings'))
            .catch(err => console.log(err))
    }

    const checkCreateBtnIsDisabled = () => {
        return !state.name.trim().length || state.currentUsers.length < 2
    }


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['main_panel'])}>
                <div className={cs(styles['header'])}>
                    <p> {text.main_title} </p>
                    <img src={backArrow} alt='back icon' onClick={() => navigate('../settings')}/>
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
                                <p> {text.list_title_1} </p>
                                <div className={cs(styles['info_icon_container'])}>
                                    <img 
                                        src={infoIcon} 
                                        alt='info icon' 
                                        onClick={() => showInfoBox()}
                                    />
                                    <Modal
                                        isOpen={openInfoBox} 
                                        close={closeInfoBox} 
                                        content={
                                            <div 
                                                id='#info_box'
                                                style={{display: openInfoBox ? 'block' : 'none'}} 
                                                className={cs(styles['info_box'])} 
                                            >
                                                <div className={cs(styles['info_text_container'])}>
                                                    <p> {text.info} </p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cs(styles['tools_wrapper'], styles['items'])}>
                                <div> 
                                    <SearchBar
                                        height={'40px'} 
                                        borderRadius={'12px'} 
                                        placeholder={`نام فرد را جست و جو کنید`} 
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
                                onClick={() => selectAllUsers(!state.selectAllUsers)}
                            >
                                <CheckBoxV1 value={state.selectAllUsers}/>
                                <p> {text.header_1} </p>
                            </div>
                            <div className={cs(styles['cols'])}>
                                <p> {text.header_2} </p>
                            </div>
                        </div>

                    
                    </div>

                    <div className={cs(styles['list_body'])}>
                        {
                            students && students.map((student,i) => 
                                <div className={cs(styles['row'])} key={i}> 
                                    <div className={cs(styles['user_name'])}>
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
                        }
                    </div>
                </div>

            </div>
           
            <UsersList
                title={text.side_title}
                btnText={text.side_btn}
                btnColor={colors['dark-shades-100']}
                students={students && students.filter(s => state.currentUsers.includes(s._id)).map(s => s)}
                canDeleteMember={true}
                hasSubmitBtn={true}
                btnDisabled={checkCreateBtnIsDisabled()}
                btnLoad={groupCreation}
                onClickBtn={createNewGroup}
                deleteOnClickHandler={removeUser}
                type={'createGroup'}
            />
            
           
        </div>
    )
}