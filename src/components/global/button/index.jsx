import {default as cs} from 'classnames'
import Preloader from './preloaders'
import styles from './style.module.scss'


export default function Button({
    color, 
    disabled = false,
    fontSize = '20px',
    borderRadius = '25px',
    fontWeight = 'normal',
    fontFamily = 'pinar_reg',
    height = '48px',
    onClick = () => {},
    outlined = false,
    text = '', 
    width = '100%',
    load,
   
}) {  
  
    // window.onload = function() {
    //     const btn = document.getElementById('#button'); 
    //     btn.onclick = function (e) { 
    //         let ripple = document.createElement("span"); 
    //         ripple.classList.add("ripple"); 
    //         this.appendChild(ripple); 
    //         let x = e.clientX - e.target.offsetLeft - 45; 
    //         let y = e.clientY - e.target.offsetTop + 12; 
    //         ripple.style.left = `${x}px`; 
    //         ripple.style.top = `${y}px`; 
    //         console.log(ripple);
    //         setTimeout(() => { 
    //             ripple.remove(); 
    //         }, 300); 
    //     }; 
    // };


    return (
        <button 
            className={outlined ? cs(styles['btn_outlined']) : cs(styles['btn'])} 
            disabled={ load || disabled }
            onClick={() => onClick()}
            style={{
                backgroundColor: outlined ? 'transparent' : ((load || disabled) ? `${color}33`  : color), 
                border: outlined ? `1px solid ${color}` : 'none',
                color: outlined ? color : '#ffffff',
                cursor: !disabled && 'pointer',
                fontSize: fontSize, 
                fontWeight: fontWeight, 
                fontFamily: fontFamily,
                width: width, 
                height: height,
                borderRadius: borderRadius,
            }}
            id='#button'
        >
            {load ? <Preloader type={outlined ? 'outlined' : 'filled'}/> : text}            
        </button>
    )
}