import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import useInput from 'hooks/useInputHandler';
import { useSelector } from 'react-redux';
import { text } from './constants';
import {useRef} from 'react';
import ComposeEmail from 'components/email/composeEmail';


import sendIconDark from 'assets/icons/essential/send/send-2/dark-color.svg'
import sendIconLight from 'assets/icons/essential/send/send-2/light-color.svg'

import sentEmailsIconDark from 'assets/icons/messages/direct-send/dark-color.svg'
import sentEmailsIconLight from 'assets/icons/messages/direct-send/light-color.svg'

import settingsIconDark from 'assets/icons/settings/settings-2/dark-color.svg'
import settingsIconLight from 'assets/icons/settings/settings-2/light-color.svg'

import infoIcon from 'assets/icons/essential/info-circle/dark-color.svg'
import ReceivedEmails from 'components/email/receivedEmails';

// import ForumPreview from 'components/forum/forumPreview';


export default function Email() {

    const navigate = useNavigate();
    const location = useLocation();
    const currentURL = location.pathname.split('/').slice(-1)[0];
    const params = useParams();

    console.log("currentURL", currentURL);



    return (
        <div className={cs(styles['container'])}> 
            {
                currentURL === 'new-email' && (
                    <div className={cs(styles['page_content'])}>
                        <ComposeEmail />
                    </div>
                )
            }
            {
                currentURL === 'received-emails' && (
                    <div className={cs(styles['page_content'])}>
                        <ReceivedEmails />
                    </div>
                )
            }


        
            <div className={cs(styles['email_sidebar'])}>
                <div className={cs(styles['sidebar_item'], currentURL === 'new-email' && styles['active'])} onClick={() => navigate('../new-email')}>
                    <img src={currentURL === 'new-email' ? sendIconLight : sendIconDark} alt='send new email icon'/>
                    <p> {text.sidebar_item_1} </p>
                </div>
                <div className={cs(styles['sidebar_item'], currentURL === 'received-emails' && styles['active'])} onClick={() => navigate('../received-emails')}>
                    <img src={currentURL === 'received-emails' ? sentEmailsIconLight : sentEmailsIconDark} alt='send emails icon'/>
                    <p> {text.sidebar_item_2} </p>
                </div>
                <div className={cs(styles['sidebar_item'], currentURL === 'email-settings' && styles['active'])} onClick={() => navigate('../email-settings')}>
                    <img src={currentURL === 'email-settings' ? settingsIconLight : settingsIconDark} alt='settings icon'/>
                    <p> {text.sidebar_item_3} </p>
                </div>
                {
                    currentURL === 'new-email' && (
                        <div className={cs(styles['help_section'])}>
                            <div className={cs(styles['header'])}> 
                                <img src={infoIcon} alt='info icon'/>
                                <p> {text.sidebar_item_4} </p>
                            </div>
                            <div className={cs(styles['help_text'])}>
                                <span> {text.help_text_1} </span>
                                <span> {text.help_text_2} </span>
                                <ul>
                                    <li> {text.help_text_item_1} </li>
                                    <li> {text.help_text_item_2} </li>
                                    <li> {text.help_text_item_3} </li>
                                    <li> {text.help_text_item_4} </li>
                                    <ul style={{paddingRight:'12px'}}>
                                        <li> {text.help_text_item_4_1} </li>
                                        <li> {text.help_text_item_4_2} </li>
                                        <li> {text.help_text_item_4_3} </li>
                                        <li> {text.help_text_item_4_4} </li>
                                    </ul>
                                </ul>

                            </div>

                        </div>
                    )
                }

            </div>
        
        </div>
    )

}