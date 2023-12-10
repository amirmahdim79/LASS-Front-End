import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'



export default function ForumPreview({data, onClick}) {


    return (
        <div className={cs(styles['container'])} onClick={onClick}>
            <div className={cs(styles['header_container'])}>
                <p> {data?.title} </p>
                {data?.unreadMsg!== 0 &&  <div className={cs(styles['unread_messages'])}> <span> {data?.unreadMsg} </span> </div>}
            </div>
            <div className={cs(styles['info_container'])}>
                <span> {data?.desc}...{data?.creationDate} </span>
                <span> {data?.messages.length} نظر </span>
            </div>
            <div className={cs(styles['users'])}>

                {
                    data.participators.map((user, i) => 
                    <div 
                        style={{
                            background: `url(${user?.avatar})`, 
                            backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center center', 
                            left: `${(data.participators.length - i - 1)*26.5}px`,
                            zIndex: data.participators.length - i,
                        }} 
                        className={cs(styles['avatar'])}
                        key={i}
                    />)
                }

            </div>
        </div>
    )
}