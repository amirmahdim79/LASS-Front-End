import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';
import settings from 'assets/icons/settings/settings-2/dark-color.svg';
import notification from 'assets/icons/notifications/notification/dark-color.svg';
import logoutIcon from 'assets/icons/arrow/logout/dark-color.svg';
import SearchBar from '../searchbar';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { useSearchParams ,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavSearchedValue } from 'store/userSlice'
import { REMOVE_TOKEN } from "utils/tokenHandler";
import useToast from 'hooks/useToast';

export default function Navbar({type}) {  
    
    const navigate = useNavigate();
    const location = useLocation();  
    const { showToast } = useToast();  
    const dispatch = useDispatch();
    
    const searchedValue = useSelector(state => state.user.navSearchedValue);
    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get('search');

    const { value: searchKey, setValue: setSearchKey } = useInput('');


    // check window location here
    // update url after api call


    useEffect(() => {
        if (searchKey) {
            dispatch(setNavSearchedValue(searchKey))
            const keyDownHandler = event => {    
              if (event.key === 'Enter') {
                if (searchKey) navigate(`../${localStorage.getItem('type')}/articles-database/?search=${searchKey}`)
                else navigate(`../${localStorage.getItem('type')}/articles-database`)
              }
            };
            document.addEventListener('keydown', keyDownHandler);
        
            return () => {
              document.removeEventListener('keydown', keyDownHandler);
            };
        }
    }, [searchKey]);


    useEffect(() => {
        if(searchedValue) setSearchKey(searchedValue)
        else setSearchKey('')
    }, [searchedValue])
    

    useEffect(() => {
        dispatch(setNavSearchedValue(searchKeyword))
    }, [location])


    const logout = () => {
        navigate('/')
        REMOVE_TOKEN()
        localStorage.removeItem("type")
        showToast('با موفقیت خارج شدید', 'success')
    }



    // hover animation

    return (
        <nav className={cs(styles['container'])}>
            <div className={cs(styles['icons_container'])}>
                <img className={cs(styles['icon'])} src={logoutIcon} alt='logout icon' onClick={() => logout()}/>
                <img className={cs(styles['icon'])} src={notification} alt='notification icon' />
                <img className={cs(styles['icon'])} src={settings} alt='settings icon' />
            </div>
            <div className={cs(styles['searchbar_container'])}>
                <SearchBar value={searchKey} setValue={setSearchKey} />
            </div>
        </nav>
    )
}

