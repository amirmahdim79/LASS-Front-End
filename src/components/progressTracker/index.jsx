import { default as cs } from 'classnames'
import { useState } from 'react'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import CheckBoxV1 from 'components/global/checkbox/v1'
import download from "assets/icons/contents/download/main-color.svg"



export default function ProgressTracker() {

    const steps = [
        {
            label: 'عنوان مایلستون',
            step: 1,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 2,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                    hasFile: true,
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                    hasFile: true,
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 3,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 4,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'done',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 5,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
        {
            label: 'عنوان مایلستون',
            step: 6,
            details: [
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
                {
                    title: 'لورم ایپسوم متن ساز',
                    status: 'in progress',
                },
            ]
        },
    ]

    const [activeStep, setActiveStep] = useState(3)
    const totalSteps = steps.length

    const nextStep = () => {
        setActiveStep(activeStep + 1)
    }

    const prevStep = () => {
        setActiveStep(activeStep - 1)
    }

    const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`


    return (

        <div className={cs(styles['main_container'])}>
            <div className={cs(styles['steps_container'])}>
                <div className={cs(styles['line'])}>
                    <div className={cs(styles['line_filled'])} style={{width: width}}></div>
                </div>
                { steps.map(({ step, label, details }, ind) => {
                    return (
                        <div className={ind === 0 ? cs(styles['step_wrapper_first']) : (ind === steps.length-1 ? cs(styles['step_wrapper_last']) : cs(styles['step_wrapper']))}>
                            <div className={cs(styles['step_style'])} style={{...(activeStep >= step && {borderColor: colors['success-100']})}}>
                                <span 
                                    className={cs(styles['step_count'])} 
                                    style={{ ...(activeStep >= step && {color: colors['success-100']})}}
                                >
                                    {activeStep === step ? width : step}
                                </span>
                            </div>
                            <p className={cs(styles['milestone'])}> {label} </p>
                                <div className={cs(styles['details'])}>
                                    {
                                        details.map(({title, status, hasFile}) => {
                                            return (
                                                <div className={cs(styles['details_data'])}>
                                                    <CheckBoxV1 checked={status === 'done' ? true : false}/>
                                                    <p style={{...(status === 'done' && {color: colors['dark-shades']})}}> {title} </p>
                                                    {hasFile && 
                                                        <img 
                                                        src={download}
                                                        alt='download'
                                                        className={cs(styles['download_icon'])}
                                                    />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        </div>
                    )
                })}
            </div>

            <div className={cs(styles['buttons_container'])}>
                <button className={cs(styles['step_button'])} onClick={prevStep} disabled={activeStep === 1}>
                    prev
                </button>
                <button className={cs(styles['step_button'])} onClick={nextStep} disabled={activeStep === totalSteps}> 
                    next
                </button>
            </div>
        </div>


    )
}

