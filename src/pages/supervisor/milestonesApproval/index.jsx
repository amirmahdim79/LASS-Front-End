import styles from './style.module.scss'
import { default as cs } from 'classnames'
import { text } from './constants'
import SearchBar from 'components/global/searchbar'
import useInput from 'hooks/useInputHandler'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import approveIcon from 'assets/icons/essential/tick-circle/success-color.svg'
import rejectIcon from 'assets/icons/essential/close-circle/error-color.svg'
import docIcon from 'assets/icons/contents/document-text/main-color.svg'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useEffect } from 'react'
import { useLabActions } from '../dashboard/hooks/useLabsActions'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getFirstLetters } from 'utils/mapper'
import { degreeMapper } from 'utils/mapper'
import { waitingTimeColorDecider } from 'utils/mapper'
import ColoredString from 'components/global/coloredText'
import colors from "styles/colors.module.scss"

export default function ApproveMilestones() {

    const params = useParams();
    const navigate = useNavigate();

    const { value: searchKey, setValue: setSearchKey } = useInput('');
    const { value: taskInfo, setValue: setTaskInfo } = useInput('');

    const { getSupsTask, acceptSupsTask } = useLabActions();

    const approveTask = () => {
        acceptSupsTask({Milestone: taskInfo.Milestone._id, User: taskInfo.User._id, taskId: params.id })
            .then(res => {
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        getSupsTask({}, `/${params.id}`)
            .then(res => {
                setTaskInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}> 
                <p> {text.title} </p>
                <p> {text.desc} </p>
            </div>

            <div className={cs(styles['milestones_list'])}>
                <div className={cs(styles['list_header'])}>
                    <div className={cs(styles['row_1'])}>
                        <div className={cs(styles['titles_wrapper'], styles['items'])}>
                            <p> {text.list_title_1} </p>
                            <p> {text.list_title_2} </p>
                        </div>
                        <div className={cs(styles['tools_wrapper'], styles['items'])}>
                            <div> 
                                <SearchBar
                                    height={'40px'} 
                                    borderRadius={'12px'} 
                                    placeholder={'نام دانشجو را جست و جو کنید'} 
                                    fontSize={'14px'}
                                    value={searchKey}
                                    setValue={setSearchKey}
                                /> 
                            </div>
                            <div className={cs(styles['filter_icon'])}> 
                                <img 
                                    src={filterIcon}
                                    alt='filter icon'
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cs(styles['row_2'])}>
                        <div className={cs(styles['cols'], styles['col_1'])}>
                            <CheckBoxV1 checked={false}/>
                            <p> {text.header_1} </p>
                        </div>
                        <div className={cs(styles['cols'], styles['col_2'])}>
                            <p> {text.header_2} </p>
                        </div>
                        <div className={cs(styles['cols'], styles['col_3'])}>
                            <p> {text.header_3} </p>
                        </div>
                        <div className={cs(styles['cols'], styles['col_4'])}>
                            <p> {text.header_4} </p>
                        </div>
                        <div className={cs(styles['cols'], styles['col_5'])}>
                            <p> {text.header_5} </p>
                        </div>
                        <div className={cs(styles['cols'], styles['col_6'])}>
                            <p> {text.header_6} </p>
                        </div>
                    </div>
                </div>

                <div className={cs(styles['data'])}>
                    {
                        taskInfo && taskInfo.Milestone.Tasks.map((t,i) => 
                            <div className={cs(styles['row'])} key={i} style={{...(i === taskInfo.Milestone.Tasks.length - 1 && {borderBottomColor: `${colors['light-accent-50']}`})}}>

                                <div className={cs(styles['user_info_container'])} style={i === 0 ? {visibility:'visible'} : {visibility:'hidden'}}>
                                    <div 
                                        style={taskInfo.User?.profilePicture && {backgroundImage: `url(${taskInfo.User?.profilePicture})`}} 
                                        className={cs(styles['avatar'], !taskInfo.User?.profilePicture && styles['empty_avatar'])}
                                    >
                                        {!taskInfo.User?.profilePicture &&
                                            <p>{getFirstLetters(`${taskInfo.User?.firstName} ${taskInfo.User?.lastName}`)}</p>
                                        }
                                    </div>

                                    <div className={cs(styles['name_container'])}>
                                        <p> {taskInfo.User?.firstName} {taskInfo.User?.lastName} </p>
                                    </div>
                                </div>

                                <div className={cs(styles['degree'])} style={i === 0 ? {visibility:'visible'} : {visibility:'hidden'}}> {degreeMapper(taskInfo.User?.type)} </div>

                                <div className={cs(styles['task_name'])}> 
                                    {
                                        t.activity === 'upload' 
                                            ? <p> {t.name} </p>
                                            : <ColoredString 
                                                text={t.name} 
                                                delimiter={'**'} 
                                                color={colors['main-color-100']}
                                                clickableWord={true}
                                                showHashtag={true}
                                                onClickColoredWord={(word) => navigate(`../articles-database/?search=${word.trim()}`)}
                                            />
                                    }
                                    
                                </div>

                                <div className={cs(styles['file_name'])}> 
                                    <a href={t.status[0].File.url} target="_blank" download={t.status[0].File.name}>
                                        {t.status[0].File.name.substring(0,t.status[0].File.name.lastIndexOf("."))}
                                    </a>
                                    <img 
                                        src={docIcon}
                                        alt='doc icon'
                                    />
                                </div>

                                <div className={cs(styles['waiting_time'])} style={{color: waitingTimeColorDecider(t.status[0]?.doneDate).color}}> 
                                    {waitingTimeColorDecider(t.status[0]?.doneDate).text}
                                </div>

                                <div className={cs(styles['buttons_container'])}  style={i === 0 ? {visibility:'visible'} : {visibility:'hidden'}}> 
                                    <img 
                                        src={approveIcon}
                                        alt='approve icon'
                                        onClick={() => approveTask()}
                                    />
                                    <img 
                                        src={rejectIcon}
                                        alt='reject icon'
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>


            </div>
        </div>
    )

}