import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import ways from 'assets/ways.svg'
import styles from './style.module.scss'
import { text } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import useInput from 'hooks/useInputHandler'
import UsersList from 'components/usersList/simpleVersion'
import { useNavigate } from 'react-router-dom';
import Groups from 'components/groupsList'
import { useSettingsActions } from './hooks/useSettingsActions'
import { setLabGroups } from 'store/labSlice'
import Carousel from 'components/global/carousel'
import { setNewName } from 'store/labSlice'

export default function SupSettings() { 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        getLabGroups, 
        updateLabGroup, 
        updatingLabGroup 
    } = useSettingsActions();


    const articles = useSelector(state => state.user.articles);
    const students = useSelector(state => state.lab.Students);
    const labId = useSelector(state => state.lab.labId)


    const { value: allPapers, setValue: setAllPapers } = useInput([]);



    const onClickUser = (userId) => {
        navigate(`../user_profile/${userId}`)
    }

    useEffect(() => {
        getLabGroups({}, `/${labId}`)
        .then(res => {
            // console.log("///////////////////////", res.data);
            dispatch(setLabGroups(res.data))
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            dispatch(setNewName(undefined))
        })
    }, [])

    


    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['settings_main_panel'])}>
                <div className={cs(styles['goups_container'])}>
                    <Groups />
                </div>
                <div className={cs(styles['path_container'])}>
                    <p> مسیر‌راه‌ها </p>

                    <Carousel 
                        name = 'path-ways'    
                    />
                </div>
                <div className={cs(styles['calendar_container'])}>
                    {/* <Carousel 
                        name = 'path-ways2'    
                    /> */}
                </div>
            </div>
            <UsersList 
                canDeleteMember={true}
                students={students}
                userHasClickOption={true}
                height={'770px'}
                userOnClickHandler={(uId) => navigate(`../user_profile/${uId}`)}
            />
        </div>
    )
}
