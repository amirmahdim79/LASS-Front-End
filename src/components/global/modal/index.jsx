import { default as cs } from 'classnames'
import styles from './style.module.scss'


export default function Modal({
    isOpen=false, 
    close=()=>{}, 
    content
}) {


    return (
        <>
            <div 
                className={cs(styles['modal'])} style={{display: isOpen ? 'block' : 'none'}} 
                onClick={() => close()}
            />
            {content}
        </>
    )
}