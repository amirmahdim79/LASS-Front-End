import {default as cs} from 'classnames'
import styles from './style.module.scss'

export default function Button({
    color, 
    disabled = false,
    fontSize = '20px',
    fontWeight = 'normal',
    height = '48px',
    onClick = () => {},
    text = '', 
    width = '100%'
}) {  
  
    window.onload = function() {
        const btn = document.getElementById('#button'); 
        btn.onclick = function (e) { 
            let ripple = document.createElement("span"); 
            ripple.classList.add("ripple"); 
            this.appendChild(ripple); 
            let x = e.clientX - e.target.offsetLeft; 
            let y = e.clientY - e.target.offsetTop; 
            ripple.style.left = `${x}px`; 
            ripple.style.top = `${y}px`; 
            setTimeout(() => { 
                ripple.remove(); 
            }, 300); 
        }; 
    };



    return (
        <button 
            className={cs(styles['btn'])} 
            disabled={disabled}
            onClick={onClick}
            style={{
                backgroundColor: disabled ? `${color}33`  : color, 
                cursor: !disabled && 'pointer',
                fontSize: fontSize, 
                fontWeight: fontWeight, 
                width: width, 
                height: height
            }}
            id='#button'
        >
            {text}
        </button>
    )
}

