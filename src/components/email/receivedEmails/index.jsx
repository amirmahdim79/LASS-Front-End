import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import { text } from './constants';
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'

import user1 from 'assets/user3.svg';
import user2 from 'assets/user1.svg';
import user3 from 'assets/user4.svg';
import user4 from 'assets/user2.svg';
import user5 from 'assets/user5.svg';
import user6 from 'assets/user6.svg';
import user7 from 'assets/user7.svg';
import EmailPreview from '../emailPreview';


export default function ReceivedEmails() {

    const emails = [
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: '[عنوان ایمیل]',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        {
            title: 'جلسه هفتگی بررسی پیشرفت دانشجویان کارشناسی',
            desc: 'لورم ایپسوم یک سری توضیحات که چی شد این تاپیک را درست کردیم',
            creationDate: 'در تاریخ 16 آذر 1402 ساخته شد',
            participators: [
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user1,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user2,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user3,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user4,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user5,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user6,
                },
                {
                    name: 'علیرضا ابراهیمی',
                    avatar: user7,
                },
            ]
        },
        
    ]

    return (
        <div className={cs(styles['emails_container'])}>
            <div className={cs(styles['header'])}>
                <h5> {text.title} </h5>
                <div className={cs(styles['icons_container'])}>
                    <img 
                        src={addIcon}
                        alt='add icon'
                        // onClick={() => openAddIcon()}
                    />
                    <img 
                        src={filterIcon}
                        alt='filter icon'
                    />
                    <img 
                        src={sortIcon}
                        alt='sort icon'
                    />
                </div>
            </div>
            <div className={cs(styles['emails'])}>
                {
                    emails.map((e, i) => 
                        <EmailPreview key={i} data={e} />
                    )
                }
            </div>
        </div>
    )
}