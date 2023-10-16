import {default as cs} from 'classnames'
import LogoWhite from '../../../assets/images/Fanni_logo1.svg';
import LogoBlue from '../../../assets/images/Fanni_logo2.svg';


export default function Logo({width='65px', height='48px', color='blue'}) {
    return (
        <img 
            // className={cs(styles['login_page_image'])}
            style={{width: width, height: height}}
            src={color === 'light' ? LogoWhite : LogoBlue}
            alt='Fanni logo'
        />
    )
}