import {default as cs} from 'classnames'
import styles from './style.module.scss'
import crownIcon from 'assets/icons/essential/crown/main-color.svg';
import { getFirstLetters } from 'utils/mapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard({list}) { 

    const userInfo = useSelector(state => state.user.user);
    const permissions = useSelector(state => state.user.permissions);

    const navigate = useNavigate();
    const userType = localStorage.getItem('type');


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['chart'])}>

                <div className={cs(styles['champion_podium_2'], styles['champion_podium'])} style={list[1] ? {visibility: 'visible'} : {display: 'none'}}>
                    <p className={cs(styles['name'])}> {list[1]?.firstName} {list[1]?.lastName} </p>
                    <p className={cs(styles['score'])}> {list[1]?.smarties} </p>
                </div>

                <div className={cs(styles['champion_podium_1'], styles['champion_podium'])} style={list[0] ? {visibility: 'visible'} : {display: 'none'}}>
                    {/* <div className={cs(styles['shine'])}> <ShiningStar left={'22px'} top={'-23px'}/> </div>
                    <div className={cs(styles['shine'])}> <ShiningStar left={'55px'} top={'-7px'}/> </div> */}

                    <div className={cs(styles['shine'])} />
                    <img src={crownIcon} alt='crown icon'/>
                   
                    <p className={cs(styles['name'])}> {list[0]?.firstName} {list[0]?.lastName} </p>
                    <p className={cs(styles['score'])}> {list[0]?.smarties} </p>
                </div>

                <div className={cs(styles['champion_podium_3'], styles['champion_podium'])} style={list[2] ? {visibility: 'visible'} : {display: 'none'}}>
                    <p className={cs(styles['name'])}> {list[2]?.firstName} {list[2]?.lastName} </p>
                    <p className={cs(styles['score'])}> {list[2]?.smarties} </p>
                </div>
            </div>

            <div className={cs(styles['top_users'])}>
                {
                    list && list.map((user, i) => 
                    <div 
                        className={cs(styles['user'], user?._id === userInfo?._id && styles['user_is_logged_in'],
                            ((userType === 'user' && permissions && permissions.indexOf('lab') > -1) || userType === 'supervisor') && styles['can_hover']
                        )} 
                        key={i}
                        onClick={() => (userType === 'user' && (permissions && permissions.indexOf('lab') > -1) || userType === 'supervisor' ? navigate(`../user_profile/${user._id}`) : {})}
                    >
                        <p className={cs(styles['num'])}> {i+1}. </p>
                        <div 
                            style={{backgroundImage:  `url(${user?.profilePicture})`}} 
                            className={cs(styles['avatar'], !user?.profilePicture && styles['empty_avatar'])} 
                            alt='avatar' 
                        >
                            {!user?.profilePicture &&
                                <p className={cs(styles['user_name'])}>{getFirstLetters(`${user?.firstName} ${user?.lastName}`)}</p>
                            }
                        </div>
                        <p> {user?.firstName} {user?.lastName}</p>
                    </div>
                    )
                }

            </div> 
        </div>
    )

}