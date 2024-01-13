import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import UserAvatarCollage from 'components/global/usersAvatarCollage';


export default function EmailPreview({data, onClick=()=>{}}) {


    return (
        <div className={cs(styles['container'])} onClick={onClick}>
            <div className={cs(styles['header_container'])}>
                <p> {data?.title} </p>
            </div>
            <div className={cs(styles['info_container'])}>
                <span> {data?.desc}...{data?.creationDate} </span>
            </div>
            <div className={cs(styles['users'])}>
                <UserAvatarCollage users={data.participators} />
            </div>
        </div>
    )
}