import { useHistory, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { default as cs } from 'classnames'
import styles from './style.module.scss'
import useInput from 'hooks/useInputHandler';
import { useDispatch, useSelector } from 'react-redux';
import { text } from './constants';
import {useRef} from 'react';
import addIcon from 'assets/icons/essential/add/dark-color.svg'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import sortIcon from 'assets/icons/essential/sort/dark-color.svg'
import backArrow from 'assets/icons/arrow/arrow-left/dark-color2.svg'
import emptyMsg from 'assets/icons/messages/no-message/dark-color.svg'
import send from 'assets/icons/arrow/send/main-color.svg'
import ForumPreview from 'components/forum/forumPreview';
import { useForumsActions } from './hooks/useForumsActions';
import moment from 'moment';
import 'moment/locale/fa';
import { setLabForums } from 'store/labSlice';
import { getFirstLetters } from 'utils/mapper';
import { setForum } from 'store/labSlice';
import PresenceList from './components/presenceList';
import Preloader from 'components/global/preloaders'
import { sortForum } from 'utils/mapper';


export default function Forum() {

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const forumRef = useRef(null);
    const inputRef = useRef(null);
    const location = useLocation()

    const userType = localStorage.getItem('type');

    const { 
        getLabForums, gettingLabForums,
        getOneForum, gettingOneForum,
        sendMsgInForum,
        updatePresenceForm
    
    } = useForumsActions();
    
    const permissions = useSelector(state => state.user.permissions);
    const labId = useSelector(state => state.lab.labId);
    const forums = useSelector(state => state.lab.labForums);
    const forum = useSelector(state => state.lab.forum);
    const userInfo = useSelector(state => state.user.user);


    const { value: msg, setValue: setMsg } = useInput('');
    const { value: list, setValue: setList } = useInput([]);
    const { value: isInForumsList, setValue: setIsInForumsList } = useInput(false);

    const openForum = (id) => {
        navigate(`../forum/${id}`)
    }

    const onText = (inputMessage) => {
        const emailRegex = /\*([^*]+)\*/g;

        // Replace emails with @email format
        const formattedMessage = inputMessage.replace(emailRegex, (_, email) => `@${email}`);
        
        setMsg(formattedMessage);
    }

    const getForumData = () => {
        getOneForum({}, `/${params.id}?type=${userType === 'supervisor' ? 'Supervisor' : 'User'}`)
            .then(res =>  {
                setList(res.data?.PresenceForm?.list)
                dispatch(setForum(res.data))
            })
            .catch(err => console.log(err))
    }

    const getForums = () => {
        if (userType === 'supervisor') {
            getLabForums({}, `/${labId}`)
                .then(res =>  dispatch(setLabForums(sortForum(res.data))))
                .catch(err => console.log(err))
        }else {
            getLabForums({}, `/user/${labId}`)
                .then(res =>  dispatch(setLabForums(sortForum(res.data))))
                .catch(err => console.log(err))
        }
    }
    const updatePresenceList =  () => {
        let data = {
            list: list,
            Forum: forum._id
        }

        updatePresenceForm({...data}, `?lab=${labId}`)
            .then(() => {
                // getForumData()
                setIsInForumsList(false)
            })
            .catch(err => {
                console.log( err);
            })
    }

    const sendMessage = () => {
        let data = {
            Forum: params.id,
            text: msg,
            senderType: userType === 'supervisor' ? 'Supervisor' : 'User'
        }
        sendMsgInForum({...data})
            .then(() => getForumData())
            .catch(err => console.log(err))
            .finally(() => setMsg(''))
    }

    const getSenderData = (id, targetField) => {
        if (id) {
            let data = forum.Users.find(u => u._id === id);
            return data[targetField]
        }    
    }

    const showMentionedUsers = (text) => {
        // if (text.includes('@gmail.com*')) {
        //     const regex = /\*([^*]+)\*/g;

        //     const replacedText = text.replace(regex, (match, keyword) => {

        //         console.log(<span > {keyword} </span>);
        //         return <span style={{color: 'blue'}}> {keyword} </span>
        //     })
        //     console.log("replacedText",replacedText);
        //     return replacedText
        // }

        return text
    }

    useEffect(() => {
        if (isInForumsList === true && list && forum) {
            updatePresenceList()
        }
        
      }, [isInForumsList]) 


    useEffect(() => {
        if(labId) getForums();
    }, [labId])

    useEffect(() => {
        if (forumRef.current) forumRef.current.scrollTo({ top: forumRef.current.scrollHeight, behavior: 'smooth' });
    }, [forum])

    useEffect(() => {
        if (forumRef.current) forumRef.current.scrollTo({ top: forumRef.current.scrollHeight, behavior: 'smooth' });
        if (params.id) {
            setIsInForumsList('isIn')
            getForumData();
        } else {
            if (isInForumsList === 'isIn') setIsInForumsList(true)
           
        }  
    }, [params.id])



    return (
        <div className={cs(styles['container'])}>
            {
                params.id 
                    ? (
                        <div className={cs(styles['forum'])}> 
                            <div className={cs(styles['header'])}>
                                {forum ? <h5> {forum.name} </h5> : <div className={cs(styles['is_loading_name'])} /> }
                                { forum
                                    ? (
                                        <img 
                                            src={backArrow}
                                            alt='back icon'
                                            onClick={() => {getForums(); dispatch(setForum(undefined)); navigate(`../forum`)}}
                                        />
                                    ) : <div className={cs(styles['is_loading_back'])} /> 
                                }
                            </div>

                            <div className={cs(styles['messages'])}> 
                                {
                                    forum && userInfo
                                        ? (
                                            <>
                                                <div className={cs(styles['messages_wrapper'])} ref={forumRef}> 
                                                    {
                                                        forum.Messages.length
                                                            ? (
                                                                forum.Messages.map((msg, i) => 
                                                                    userInfo._id === msg.Sender ? (
                                                                        <div className={cs(styles['message'], styles['sent_message'])} key={i}> 
                                                                            {showMentionedUsers(msg.text)} 
                                                                        </div>
                                                                    ) : (<div className={cs(styles['recieved_message'])} key={i}> 
                                                                            <div 
                                                                                style={{
                                                                                    backgroundImage: `url(${
                                                                                        msg.Sender === forum.Supervisor._id 
                                                                                            ? (forum.Supervisor.profilePicture ? forum.Supervisor.profilePicture : undefined)
                                                                                            : getSenderData(msg.Sender, 'profilePicture')
                                                                                        })`
                                                                                    }} 
                                                                                className={cs(
                                                                                        styles['avatar'],
                                                                                        msg.Sender === forum.Supervisor._id 
                                                                                            ? !forum.Supervisor.profilePicture && styles['empty_avatar']
                                                                                            : !getSenderData(msg.Sender, 'profilePicture') && styles['empty_avatar']
                                                                                    )}
                                                                            >
                                                                                {msg.Sender === forum.Supervisor._id && <div className={cs(styles['is_supervisor'])}/> }
                                                                                { msg.Sender === forum.Supervisor._id 
                                                                                    ? !forum.Supervisor.profilePicture && <p>{getFirstLetters(`${forum.Supervisor?.firstName} ${forum.Supervisor?.lastName}`)}</p>
                                                                                    : !getSenderData(msg.Sender, 'profilePicture') && <p>{getFirstLetters(`${getSenderData(msg.Sender, 'firstName')} ${getSenderData(msg.Sender, 'lastName')}`)}</p>
                                                                                }
                                                                            </div>
                                                                            <div className={cs(styles['message'], styles['content'])}>
                                                                                <p> {
                                                                                        msg.Sender === forum.Supervisor._id 
                                                                                            ? `${forum.Supervisor.firstName} ${forum.Supervisor.lastName}` 
                                                                                            : `${getSenderData(msg.Sender, 'firstName')} ${getSenderData(msg.Sender, 'lastName')}`
                                                                                    }
                                                                                    </p>
                                                                                <p> {showMentionedUsers(msg.text)} </p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )
                                                            ) : (
                                                                <div className={cs(styles['empty_message'])}>
                                                                    <img src={emptyMsg} alt='no message exists'/>
                                                                    <p> {text.no_msg} </p>
                                                                </div>
                                                            )
                                                    }
                                                    {}
                                                </div>

                                                <div className={cs(styles['chatbox'])}>
                                                    <div className={cs(styles['content'])}>
                                                        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'محل وارد کردن پیام ...'}/>
                                                        {/* <div>
                                                            {
                                                                msg.split(/@(\S+)/g).map((part, index) => (
                                                                    console.log("partttt", part),
                                                                    /@(\S+)/g.test(part) ? (
                                                                      <span key={index} style={{ color: 'blue' }}>@{part}</span>
                                                                    ) : (
                                                                      <span key={index}>{part}</span>
                                                                    )
                                                                
                                                            ))}
                                                        </div>
                                                        <input
                                                            value={msg}
                                                            onChange={(e) => setMsg(e.target.value)}
                                                            placeholder={'محل وارد کردن پیام ...'}
                                                        />
                                                        
                                                        <ChatBox message={msg}/> */}
                                                    </div>
                                                    <img 
                                                        src={send}
                                                        alt='send icon'
                                                        onClick={() => sendMessage()}
                                                    />
                                                </div>
                                            </>
                                        ) : <Preloader />
                                }
                            </div>
                        </div>

                    ) : (
                        <div className={cs(styles['forums_container'])}>
                            <div className={cs(styles['header'])}>
                                {forums ? <h5> {text.forum_title} </h5> : <div className={cs(styles['is_loading_title'])} />}
                                
                                {
                                    forums
                                        ? (
                                            <div className={cs(styles['icons_container'])}>
                                                {
                                                    ((userType === 'user' && permissions && permissions.indexOf('forums') > -1) || userType === 'supervisor') && (
                                                        <img 
                                                            src={addIcon}
                                                            alt='add icon'
                                                            onClick={() => navigate('../create-forum')}
                                                        />
                                                    )
                                                }
                                                <img 
                                                    src={filterIcon}
                                                    alt='filter icon'
                                                />
                                                <img 
                                                    src={sortIcon}
                                                    alt='sort icon'
                                                />
                                            </div>
                                        ) : <div className={cs(styles['is_loading_icons'])} />
                                }
                                
                            </div>

                            <div className={cs(styles['forums'])}>
                                {
                                    forums 
                                        ? (
                                            forums.length 
                                                ? forums.map((f, i) => moment(f.start).isBefore(moment()) && <ForumPreview key={i} data={f} onClick={() => openForum(f._id)}/>)
                                                : <div className={cs(styles['empty_page'])}>
                                                    <img src={emptyMsg} alt='no chats exists'/>
                                                    <p> {text.no_forum} </p>
                                                </div>
                                            
                                        ) : (
                                            [...Array(5)].map((num, i) => (
                                                <div className={cs(styles['is_loading_Preview'])} key={i}/>
                                            ))
                                        )      
                                }
                            </div>
                        </div>
                    )
            }

            {
                params.id 
                    && (
                        (forum && (permissions.includes('forums') || userType === 'supervisor' ))
                            ? <PresenceList updatePresenceList={updatePresenceList} setMsg={setMsg} list={list} setList={setList}/> 
                            : <div className={cs(styles['is_loading_presence_list'])}/> 
                    )
            }     

        </div>
    )
}