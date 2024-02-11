import {default as cs} from 'classnames'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { useMemo } from 'react';

export default function Activity({dayNum=0, monthValue='',  isHidden=false, i=0, activitiesObj }) {  

    const computedColor = useMemo(() => {
        if (activitiesObj) {
            if (activitiesObj[monthValue][dayNum] === 0) {
                return {
                    bg: 'transparent',
                    borderColor: colors['light-accent-100']
                };
            } else if (activitiesObj[monthValue][dayNum] === 1) {
                return {
                    bg: colors['main-color-25'],
                    borderColor: colors['light-accent-25']
                };
            } else if (activitiesObj[monthValue][dayNum] === 2) {
                return {
                    bg: colors['main-color-50'],
                    borderColor: colors['light-accent-50']
                };
            } else if (activitiesObj[monthValue][dayNum] === 3) {
                return {
                    bg: colors['main-color-75'],
                    borderColor: colors['light-accent-60']
                };
            } else if (activitiesObj[monthValue][dayNum] > 4) {
                return {
                    bg: colors['main-color-100'],
                    borderColor: colors['light-accent-100']
                };
            }

            return {
                bg: 'transparent',
                borderColor: colors['light-accent-100']
            };
        }


    }, [dayNum, monthValue, activitiesObj]);


    if(computedColor && !isHidden) return (
        <div 
            className={cs(styles['container'])}
            style={{visibility: 'visible', backgroundColor: computedColor.bg, borderColor: computedColor.borderColor}}
        />
    ) 
    if(isHidden) return (
        <div 
            className={cs(styles['container'])}
            style={{visibility: 'hidden'}}
        />
    ) 
}