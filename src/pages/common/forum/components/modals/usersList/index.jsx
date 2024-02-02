import {default as cs} from 'classnames'
import styles from './style.module.scss'
import closeIcon from 'assets/icons/essential/add/light-color.svg';

export default function UsersListModal({data, close}) { 

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <p> {`لیست اعضای  ${data?.name}`} </p>
                <img 
                    src={closeIcon}
                    alt='close icon'
                    className={cs(styles['icon'])}
                    onClick={() => close()}
                />
            </div>
            <div className={cs(styles['list'])}>
                {
                    data.users.map((u, i) => {
                        return (
                            <p key={i}> {u.firstName} {u.lastName} </p>
                        )
                    })
                }
            </div>
        </div>
    )
}
