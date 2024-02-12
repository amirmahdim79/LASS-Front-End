import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { text } from './constants'
import usersIcon from 'assets/icons/users/people/light-color.svg';
import { useSelector } from 'react-redux';
import useInput from 'hooks/useInputHandler';
import CheckBoxV2 from 'components/global/checkbox/v2';
import { degreeMapper } from 'utils/mapper';
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"
import { useEffect } from 'react';
import { useNotesActions } from 'pages/common/notes/hooks/useNotesActions';
import { useModal } from 'hooks/useModal';
import info from 'assets/icons/essential/info-circle/light-color.svg'
import Modal from 'components/global/modal';

export default function AddDocModal({close, updateDocs}) { 

    const labGroups = useSelector(state => state.lab.labGroups);
    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId);

    const { value: groups, setValue: setGroups } = useInput([]);
    const { value: users, setValue: setUsers } = useInput([]);
    const { value: selectAllUsers, setValue: setSelectAllUsers } = useInput(false);

    const { addNewDoc, addingNewDoc } = useNotesActions();
    const [openShowInfoBox, showShowInfoBox, closeShowInfoBox] = useModal();


    const addGroup = (group) => {
        let groupsData = [...groups];

        const index = groups.findIndex(g => g._id === group._id);
        if (index === -1) {
            groupsData.push(group);
        }else {
            groupsData.splice(index, 1);
        }

        setGroups(groupsData)
    }

    const addUser = (id) => {
        let usersData = [...users];
        if (users.includes(id)) {
            const index = usersData.indexOf(id);
            if (index > -1) usersData.splice(index, 1);
        } else {
            usersData.push(id)
        }
        setUsers(usersData)
    }


    const addDocument = () => {
        let groupsUsersId = groups.map(g => g.Users.map(u => u._id));
        groupsUsersId = [].concat(...groupsUsersId)
        let allUsersId = [...groupsUsersId, ...users]

        addNewDoc({Lab: labId, Users: [...new Set(allUsersId)]})
            .then(res => {
                close();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setGroups([])
                setUsers([])
                updateDocs()
            })
    }

    const checkSubmitIsDisable = () => {
        return groups.length === 0 && users.length === 0
    }

    useEffect(() => {
        if (selectAllUsers) {
            let result = students.map(s => s._id);
            setUsers(result)
        }else {
            setUsers([])
        }
    }, [selectAllUsers])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['info_icon_container'])}>
                <img 
                    src={info} 
                    alt='info icon' 
                    onClick={() => showShowInfoBox()}
                />
                <Modal
                    isOpen={openShowInfoBox} 
                    close={closeShowInfoBox} 
                    content={
                        <div 
                            id='#info_box'
                            style={{display: openShowInfoBox ? 'block' : 'none'}} 
                            className={cs(styles['info_box'])} 
                        >
                            <div className={cs(styles['info_text_container'])}>
                                <p> {text.info} </p>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className={cs(styles['title'])}>
                <img src={usersIcon} alt='users icon' />
                <p> {text.title_1} </p>
            </div>  
            <div className={cs(styles['users_list'])}>
                <div className={cs(styles['header'])}>
                    <p> {text.title_2} </p>
                </div>
                <div className={cs(styles['users_name'])}>
                    {
                        labGroups && labGroups.map((group, ind) => 
                            <div className={cs(styles['username'])} key={ind}>
                                <CheckBoxV2 value={groups.findIndex(g => g._id === group._id) !== -1} onClick={() => addGroup(group)}/>
                                <p> {group?.name} </p>
                            </div>
                        )
                    }
                </div>
                <div className={cs(styles['header'])} style={{paddingTop: '20px'}}>
                    <p> {text.title_3} </p>
                    <div className={cs(styles['checkbox'])} onClick={() => setSelectAllUsers(!selectAllUsers)}>
                        <CheckBoxV2 value={selectAllUsers}  onClick={() => setSelectAllUsers(!selectAllUsers)}/>
                        {text.input_1}
                    </div>
                </div>
                <div className={cs(styles['users_name'])}>
                    {
                        students && students.map((student, ind) => 
                            <div className={cs(styles['username'])} key={ind}>
                                <CheckBoxV2 value={users.includes(student._id)} onClick={() => addUser(student._id)}/>
                                <div className={cs(styles['data'])}>
                                    <p> {student?.firstName} {student?.lastName}</p>
                                    <p> {degreeMapper(student?.type)} </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={cs(styles['btn_container'])}>
                <Button
                    color={colors['dark-shades-100']} 
                    onClick={() => addDocument()}
                    text={text.button} 
                    width={'255px'}
                    disabled={checkSubmitIsDisable()}
                    load={addingNewDoc}
                />
            </div>
        </div>
    )

}