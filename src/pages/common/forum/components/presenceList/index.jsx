import { default as cs } from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import close_inactive from 'assets/icons/essential/close-circle/dark-color.svg';
import close_active from 'assets/icons/essential/close-circle/error-color.svg';
import minus_inactive from 'assets/icons/essential/minus-circle/dark-color.svg';
import minus_active from 'assets/icons/essential/minus-circle/warning-color.svg';
import tick_inactive from 'assets/icons/essential/tick-circle/dark-color.svg';
import tick_active from 'assets/icons/essential/tick-circle/success-color.svg';
import { getFirstLetters } from 'utils/mapper';
import { useSelector } from 'react-redux';


export default function PresenceList({updatePresenceList, setMsg}) {

    const forum = useSelector(state => state.lab.forum);

    const getUserData = (id, targetField) => {
        if (id) {
            let data = forum.Users.find(u => u._id === id);
            return data[targetField]
        }    
    }

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}> 
                <h2> {text.title_1} </h2> 
                <h2> {text.title_2} </h2> 
            </div>
            <div className={cs(styles['content'])}> 
                {
                    Object.keys(forum?.PresenceForm?.list).length && Object.keys(forum?.PresenceForm?.list).map((userId, index) => 
                        <div className={cs(styles['data_container'])}> 
                            <div className={cs(styles['user_data'])} onClick={() => setMsg(prev => prev + `*${getUserData(userId, 'email')}*`)}> 
                                <div 
                                    style={getUserData(userId, 'profilePicture') && {backgroundImage: `url(${getUserData(userId, 'profilePicture')})`}} 
                                    className={cs(styles['avatar'], !getUserData(userId, 'profilePicture') && styles['empty_avatar'])}
                                >
                                    {!getUserData(userId, 'profilePicture') && <p>{getFirstLetters(`${getUserData(userId, 'firstName')} ${getUserData(userId, 'lastName')}`)}</p> }
                                </div>

                                <div className={cs(styles['info'])}> 
                                    <p className={cs(styles['name'])}> {`${getUserData(userId, 'firstName')} ${getUserData(userId, 'lastName')}`} </p>
                                    <p className={cs(styles['degree'])}> {getUserData(userId, 'type')} </p>
                                </div>
                            </div>

                            <div className={cs(styles['icons'])}> 
                                <img onClick={() => updatePresenceList('absent', userId)} src={forum?.PresenceForm?.list[`${userId}`].status === 'absent' ? close_active : close_inactive} alt='absence icon'/>
                                <img onClick={() => updatePresenceList('optional', userId)} src={forum?.PresenceForm?.list[`${userId}`].status === 'optional' ? minus_active : minus_inactive} alt='optional icon'/>
                                <img onClick={() => updatePresenceList('present', userId)} src={forum?.PresenceForm?.list[`${userId}`].status === 'present' ? tick_active : tick_inactive} alt='presence icon'/>
                            </div>
                        </div>
                    )
                }                    
            </div>
        </div>
    )
}