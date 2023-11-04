import {default as cs} from 'classnames'
import styles from './profile.module.scss'
import avatar from 'assets/avatar.svg';
import user1 from 'assets/user1.svg';
import user3 from 'assets/user3.svg';
import user4 from 'assets/user4.svg';
import editIcon from 'assets/icons/contents/edit/dark-color.svg';
import routingIcon from 'assets/icons/location/routing-2/dark-color.svg';
import infoIcon from 'assets/icons/essential/info-circle/dark-color.svg';
import activities from 'assets/user-activities.svg';
import leaderboard from 'assets/leaderboard.svg';
import developmentChart from 'assets/developChart.svg';
import ProfileV1 from 'components/global/profile/v1';
import { useSelector } from 'react-redux';
import LinearProgressBar from 'components/global/progressbar';
import colors from "styles/colors.module.scss"
import Card from './components/card';
import { useParams } from 'react-router-dom';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';



export default function Profile({}) {  

    const params = useParams();
    const userInfo = useSelector(state => state.user.user);

    const { value: edit, setValue: setEdit } = useInput(false);

    useEffect(() => {
        if(params?.id === undefined) setEdit(true)
    }, [params])

    const topUsers = [
        {
            name: 'امیرمهدی محمدیان',
            avatar: user1,
        },
        {
            name: 'فاطمه اسماعیلی',
            avatar: avatar,
        },
        {
            name: 'علیرضا ابراهیمی',
            avatar: user3,
        },
        {
            name: 'آبتین هیدجی',
            avatar: user4,
        },
    ]

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['user_data'])}>
                <ProfileV1 profile={avatar} width={'17vw'} height={'17vw'}/>
                
                <div className={cs(styles['wrapper'], styles['name_wrapper'])}>
                    <div className={cs(styles['name'])}>
                        {/* <p> {userInfo?.firstName} {userInfo?.lastName} </p> */}
                        <p> امیرمهدی محمدیان </p>
                        <img src={editIcon} alt='edit icon' className={cs(styles['edit_icon'], edit && styles['edit_mode'])}/>
                    </div>
                    <div className={cs(styles['education_info'])}>
                        <p> دانشجوی کارشناسی </p>
                        <p> 810197664 </p>
                    </div>
                </div>

                <div className={cs(styles['wrapper'] , styles['development_wrapper'])}>
                    <div className={cs(styles['title'])}>
                        <p>میزان پیشرفت در راه </p>
                        <img src={routingIcon} alt='route icon'/>
                    </div>
                    <LinearProgressBar width={'100%'} height={'10px'} progress={40} color={colors['main-color_100']}/>
                </div>

                <div className={cs(styles['wrapper'] , styles['user_development_wrapper'])}>
                    <div className={cs(styles['title'])}>
                        <p> توسعه دانشجو </p>
                    </div>
                    <div className={cs(styles['cards'])}>
                        <Card value={35} title={'سکه'}/>
                        <Card value={17} title={'مقاله'}/>
                        <Card value={8}  title={'استریک'}/>
                    </div>
                </div>

                <div className={cs(styles['wrapper'] , styles['last_activity_wrapper'])}>
                    <div className={cs(styles['right_column'])}>
                        <p className={cs(styles['title'])}> آخرین فعالیت‌ها </p>
                        <p> تحویل نمونه اولیه </p>
                        <p> تحویل گزارش کار </p>
                        <p> مطالعه مقاله </p>
                    </div>
                    <div className={cs(styles['left_column'])}>
                        <p> تاریخ </p>
                        <p> 1402/08/29 </p>
                        <p> 1402/08/29 </p>
                        <p> 1402/08/29 </p>
                    </div>
                </div>
            </div>

            <div className={cs(styles['user_activities'])}>
                <p className={cs(styles['title'])}> فعالیت دانشجو </p>
                <img src={activities} alt='activities chart'/>
            </div>
            <div className={cs(styles['user_path'])}>
                user_path
            </div>
            <div  className={cs(styles['righ_col'])}>
                <div className={cs(styles['leaderboard'])}>
                    <div className={cs(styles['title'])}>
                        <p> لیدربورد </p>
                        <img src={infoIcon} alt='info icon'/>
                    </div>
                    <img src={leaderboard} alt='leaderboard chart'/>
                    <div className={cs(styles['top_users'])}>
                        {
                            topUsers.map((user, i) => 
                                <div className={cs(styles['user'])} key={i}>
                                    <p> {i+1}. </p>
                                    <img src={user.avatar} alt='avatar' />
                                    <p> {user.name} </p>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
                <div className={cs(styles['development_chart'])}>
                    <p> نمودار توسعه </p>
                    <img src={developmentChart} alt='developmentChart'/>
                </div>
            </div>
        </div>
    )
}

