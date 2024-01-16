import {default as cs} from 'classnames'
import styles from './style.module.scss'
import crownIcon from 'assets/icons/essential/crown/main-color.svg';
import { getFirstLetters } from 'utils/mapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import ShiningStar from './components';

export default function Leaderboard({list}) { 

    let leaderboard = [
        {
            "_id": "65322b1e95e0d4f18a0563cf",
            "Labs": [
                "6536c75ce127100f5138aa3a"
            ],
            "Tags": [],
            "firstName": "امیرمهدی",
            "lastName": "ابراهیمی",
            "email": "therealamirmahdi79@gmail.com",
            "permissions": [
                "events",
                "forums",
                "lab"
            ],
            "url": "c2a891",
            "createdAt": "2023-10-20T07:24:15.158Z",
            "updatedAt": "2024-01-15T00:00:00.062Z",
            "__v": 18,
            "type": "masters",
            "MODEL_TYPE": "User",
            "RecentFiles": [
                "654376d09f942ebcbb5ea27d",
                "6543a11d9f942ebcbb5ea6da",
                "65439c2d9f942ebcbb5ea59d",
                "65439ff19f942ebcbb5ea67c",
                "653d75ad406735972b0b87fd",
                "65436c539f942ebcbb5ea190",
                "6543aa1a9f942ebcbb5ea82e",
                "653d750fdc3fcf0c5554eaed",
                "653d702dcb466832b6107f1d",
                "653d6f90b4c01fd2d29d27c4"
            ],
            "profilePicture": "https://lass.s3.ir-thr-at1.arvanstorage.ir/profiles/e3d1197f0471.jpg",
            "sand": 32,
            "smarties": 40
        },
        {
            "_id": "653bc740f2cf6ab7787279e1",
            "Labs": [
                "6536c75ce127100f5138aa3a"
            ],
            "Tags": [],
            "firstName": "fateme",
            "lastName": "esmaili",
            "email": "fati78@gmail.com",
            "permissions": [],
            "url": "51c564",
            "createdAt": "2023-10-27T14:20:48.379Z",
            "updatedAt": "2024-01-15T00:00:00.079Z",
            "__v": 2,
            "type": "phd",
            "MODEL_TYPE": "User",
            "RecentFiles": [],
            "sand": 22,
            "smarties": 0
        },
        {
            "_id": "653bc740f2cf6ab7787279e1",
            "Labs": [
                "6536c75ce127100f5138aa3a"
            ],
            "Tags": [],
            "firstName": "اتی",
            "lastName": "اتی زاده",
            "email": "etiii@gmail.com",
            "permissions": [],
            "url": "51c564",
            "createdAt": "2023-10-27T14:20:48.379Z",
            "updatedAt": "2024-01-15T00:00:00.079Z",
            "__v": 2,
            "type": "phd",
            "MODEL_TYPE": "User",
            "RecentFiles": [],
            "sand": 22,
            "smarties": 0
        },
        {
            "_id": "653bc740f2cf6ab7787279e1",
            "Labs": [
                "6536c75ce127100f5138aa3a"
            ],
            "Tags": [],
            "firstName": "ابی",
            "lastName": "ابی زاده",
            "email": "etiii@gmail.com",
            "permissions": [],
            "url": "51c564",
            "createdAt": "2023-10-27T14:20:48.379Z",
            "updatedAt": "2024-01-15T00:00:00.079Z",
            "__v": 2,
            "type": "phd",
            "MODEL_TYPE": "User",
            "RecentFiles": [],
            "sand": 22,
            "smarties": 0
        }
    ]
    const userInfo = useSelector(state => state.user.user);
    const navigate = useNavigate();

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['chart'])}>

                <div className={cs(styles['champion_podium_2'], styles['champion_podium'])} style={leaderboard[1] ? {visibility: 'visible'} : {display: 'none'}}>
                    <p className={cs(styles['name'])}> {leaderboard[1]?.firstName} {leaderboard[1]?.lastName} </p>
                    <p className={cs(styles['score'])}> {leaderboard[1]?.smarties} </p>
                </div>

                <div className={cs(styles['champion_podium_1'], styles['champion_podium'])} style={leaderboard[0] ? {visibility: 'visible'} : {display: 'none'}}>
                    {/* <div className={cs(styles['shine'])}> <ShiningStar left={'22px'} top={'-23px'}/> </div>
                    <div className={cs(styles['shine'])}> <ShiningStar left={'55px'} top={'-7px'}/> </div> */}

                    <div className={cs(styles['shine'])} />
                    <img src={crownIcon} alt='crown icon'/>
                   
                    <p className={cs(styles['name'])}> {leaderboard[0]?.firstName} {leaderboard[0]?.lastName} </p>
                    <p className={cs(styles['score'])}> {leaderboard[0]?.smarties} </p>
                </div>

                <div className={cs(styles['champion_podium_3'], styles['champion_podium'])} style={leaderboard[2] ? {visibility: 'visible'} : {display: 'none'}}>
                    <p className={cs(styles['name'])}> {leaderboard[2]?.firstName} {leaderboard[2]?.lastName} </p>
                    <p className={cs(styles['score'])}> {leaderboard[2]?.smarties} </p>
                </div>
            </div>

            <div className={cs(styles['top_users'])}>
                {
                    leaderboard && leaderboard.map((user, i) => 
                    <div 
                        className={cs(styles['user'], user?._id === userInfo?._id && styles['user_is_logged_in'])} 
                        key={i}
                        onClick={() => navigate(`../user_profile/${user._id}`)}
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