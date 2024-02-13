import {default as cs} from 'classnames'

import styles from './style.module.scss'
import { text } from './constants'
import { useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersList/simpleVersion'
import { useNavigate } from 'react-router-dom';
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import editIcon from 'assets/icons/contents/edit_2/dark-color.svg';
import UserAvatarCollage from 'components/global/usersAvatarCollage'
import emptyList from 'assets/icons/users/user-remove/dark-color.svg';

export default function Groups() { 

    const navigate = useNavigate();

    const labGroups = useSelector(state => state.lab.labGroups);

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <div className={cs(styles['column'])}> 
                    <h2> {text.title} </h2>
                    <img 
                        src={addIcon}
                        alt='add icon'
                        onClick={() => navigate(`./create-group`)}
                    />
                </div>
                <div className={cs(styles['column'])}>
                    <img 
                        src={filterIcon}
                        alt='filter icon'
                    />
                    <img 
                        src={sortIcon}
                        alt='sort icon'
                    />
                </div>
                
            </div>
            <div className={cs(styles['groups'], !labGroups.length && styles['empty_groups'])}>
                { labGroups && !labGroups.length 
                    ?
                        <div className={cs(styles['empty_list'])}>
                            <img src={emptyList} alt='no groups exists'/>
                            <p> {text.empty_list} </p>
                        </div>
                    :
                        labGroups.map((group, i) => 
                        <div className={cs(styles['group_container'])}>
                            <div className={cs(styles['groups_data'])}>
                                <p className={cs(styles['groups_name'])}> {group.name} </p>
                                
                                <UserAvatarCollage users={group.Users} size={'25px'} alignment={'flex-start'} fontSize={'12px'} maxNum={6}/>
                            </div>
                            <img 
                                src={editIcon}
                                alt='edit icon'
                                onClick={() => navigate(`./group/${group._id}`)}
                            />
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}
