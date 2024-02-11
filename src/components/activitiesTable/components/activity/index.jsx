import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { month } from 'utils/mapper';
import moment from 'moment';
import 'moment/locale/fa';
import { useSelector } from 'react-redux';
import colors from "styles/colors.module.scss"
import { toEnDigit } from 'utils/mapper';
import { useMemo } from 'react';

export default function Activity({dayNum=0, monthValue,  isHidden=false }) {  

    const activities = useSelector(state => state.lab.userActivities);

    const computedColor = useMemo(() => {
        
        const relevantActivities = activities.filter(activity => {
            const dateArr = moment(activity.createdAt)._d.toLocaleDateString('fa-IR').split(['/']);
            return month(dateArr[1]) === monthValue && +toEnDigit(dateArr[2]) === dayNum;
        });

        const num = relevantActivities.length;

        if (num === 0) {
            return {
                bg: 'transparent',
                borderColor: colors['light-accent-100']
            };
        } else if (num === 1) {
            return {
                bg: colors['main-color-25'],
                borderColor: colors['light-accent-25']
            };
        } else if (num === 2) {
            return {
                bg: colors['main-color-50'],
                borderColor: colors['light-accent-50']
            };
        } else if (num === 3) {
            return {
                bg: colors['main-color-75'],
                borderColor: colors['light-accent-60']
            };
        } else if (num > 4) {
            return {
                bg: colors['main-color-100'],
                borderColor: colors['light-accent-100']
            };
        }

        return {
            bg: 'transparent',
            borderColor: colors['light-accent-100']
        };
    }, [dayNum, monthValue, activities]);


    return (
        <div 
            className={cs(styles['container'])}
            style={isHidden ? {visibility: 'hidden'} : {visibility: 'visible', backgroundColor: computedColor.bg, borderColor: computedColor.borderColor}}
        />
    )
}