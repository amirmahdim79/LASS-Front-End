import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { month } from 'utils/mapper';
import jaMoment from 'jalali-moment'
import moment from 'moment';
import 'moment/locale/fa';
import { useSelector } from 'react-redux';
import colors from "styles/colors.module.scss"
import useInput from 'hooks/useInputHandler';
import { toEnDigit } from 'utils/mapper';

export default function Activity({dayNum=0, monthValue,  isHidden=false }) {  

    const activities = useSelector(state => state.lab.userActivities);
    const { value: dateActivities, setValue: setDateActivities } = useInput([]);


    // console.log("activities", activities);

    const getColor = () => {
        let arr = [];
        let num = 0;
        activities.map(act => {
            let dateArr = moment(act.createdAt)._d.toLocaleDateString('fa-IR').split(['/'])
            if (month(dateArr[1]) === monthValue && +toEnDigit(dateArr[2]) == dayNum) {
                num += 1
            }
        })
        // setDateActivities(arr)

        if (num === 0) return {
            bg: 'transparent',
            borderColor: colors['light-accent-100']
        }
        else if (num === 1) return {
            bg: colors['main-color-25'],
            borderColor:  colors['light-accent-25']
        }
        else if (num === 2) return {
            bg: colors['main-color-50'],
            borderColor:  colors['light-accent-50']
        }
        else if (num === 3) return {
            bg: colors['main-color-75'],
            borderColor:  colors['light-accent-60']
        }
        else if (num > 4) return {
            bg: colors['main-color-100'],
            borderColor:  colors['light-accent-100']
        }
    }


    return (
        <div 
            className={cs(styles['container'])}
            style={isHidden ? {visibility: 'hidden'} : {visibility: 'visible', backgroundColor: getColor().bg, borderColor: getColor().borderColor}}
        />
    )

}