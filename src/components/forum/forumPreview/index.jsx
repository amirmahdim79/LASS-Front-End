import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import UserAvatarCollage from 'components/global/usersAvatarCollage';
import moment from 'moment';
import 'moment/locale/fa';
import { month } from 'utils/mapper';
import { useSelector } from 'react-redux';
import useInput from 'hooks/useInputHandler';


export default function ForumPreview({data, onClick}) {

    const creationDate = moment(data.start)._d.toLocaleDateString('fa-IR').split('/')
    const userInfo = useSelector(state => state.user.user);

    const { value: unreadMsgs, setValue: setUnreadMsgs } = useInput(0);


    useEffect(() => {
        if (data.MessagesStatus && userInfo) {
            const index = data.Messages.findIndex(msg => msg._id ===  data.MessagesStatus[userInfo._id]?.lastMessageSeen)
            setUnreadMsgs(data.Messages.length -1 - index)
        }
    }, [data])


    return (
        <div className={cs(styles['container'])} onClick={onClick}>
            <div className={cs(styles['header_container'])}>
                <p> {data?.name} </p>
                {(data.MessagesStatus && unreadMsgs !== 0) &&  <div className={cs(styles['unread_messages'])}> <span> {unreadMsgs} </span> </div>}
            </div>
            <div className={cs(styles['info_container'])}>
                <span className={cs(styles['desc_container'])}>
                    <span> {data?.desc} </span>
                    <span> ... </span>
                    <span> {`در تاریخ ${creationDate[2]} ${month(creationDate[1])} ${creationDate[0]} ساخته شد`} </span>
                </span>
                <span> {data?.Messages.length} نظر </span>
            </div>
            <div className={cs(styles['users'])}>
                <UserAvatarCollage users={data.Users} />
            </div>
        </div>
    )
}