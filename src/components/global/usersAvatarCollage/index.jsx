import { default as cs } from 'classnames'
import { getFirstLetters } from 'utils/mapper';
import styles from './style.module.scss'



export default function UserAvatarCollage({
    users, 
    size = '50px',
    fontSize = '16px',
    alignment = 'center',
    maxNum = 10
}) {

    let list = users.length > maxNum ? users.slice(0, maxNum) : users

    return (
        
        <div className={cs(styles['container'])} style={{alignItems: alignment}}>
            {
                list.length !== 0 && list.map((user, i) => 
                    <div 
                        className={cs(styles['avatar'], !user?.profilePicture && styles['empty_avatar'])}
                        style={{
                            background: user?.profilePicture && `url(${user?.profilePicture})`, 
                            backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center center', 
                            left: `${(list.length - i - 1) * ((+size.slice(0, -2)/2) + 1.5 )}px`,
                            zIndex: list.length - i,
                            maxWidth: size, minWidth: size, maxHeight: size, minHeight: size,
                        }} 
                        
                        key={i}
                    >
                        {!user?.profilePicture && <p style={{fontSize: fontSize}}>{getFirstLetters(`${user?.firstName} ${user?.lastName}`)}</p> }
                    </div>
                )
            }
        </div>
        
    )
}