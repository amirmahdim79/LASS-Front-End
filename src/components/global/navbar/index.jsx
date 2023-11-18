import {default as cs} from 'classnames'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom';
import settings from 'assets/icons/settings/settings-2/dark-color.svg';
import notification from 'assets/icons/notifications/notification/dark-color.svg';
import settings2 from 'assets/icons/settings/settings-4/dark-color.svg';
import SearchBar from '../searchbar';
import useInput from 'hooks/useInputHandler';
import { useEffect } from 'react';
import { useSearchParams ,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavSearchedValue } from 'store/userSlice'

export default function Navbar({type}) {  
    
    const navigate = useNavigate();
    const location = useLocation();    
    const dispatch = useDispatch();
    const searchedValue = useSelector(state => state.user.navSearchedValue);
    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get('search');

    const { value: searchKey, setValue: setSearchKey } = useInput('');


    // check window location here
    // update url after api call


    useEffect(() => {
        dispatch(setNavSearchedValue(searchKey))
        const keyDownHandler = event => {    
          if (event.key === 'Enter') {
            if (searchKey) navigate(`../user/articles_database/?search=${searchKey}`)
            else navigate(`../user/articles_database`)
          }
        };
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    }, [searchKey]);


    useEffect(() => {
        if(searchedValue) setSearchKey(searchedValue)
        else setSearchKey('')
    }, [searchedValue])
    

    useEffect(() => {
        dispatch(setNavSearchedValue(searchKeyword))
    }, [location])



    // hover animation

    return (
        <nav className={cs(styles['container'])}>
            <div className={cs(styles['icons_container'])}>
                <img className={cs(styles['icon'])} src={settings} alt='settings icon' />
                <img className={cs(styles['icon'])} src={notification} alt='notification icon' />
                <img className={cs(styles['icon'])} src={settings2} alt='settings icon' onClick={() => type === 'user' && navigate('./my_profile')}/>
            </div>
            <div className={cs(styles['searchbar_container'])}>
                <SearchBar value={searchKey} setValue={setSearchKey} />
            </div>
        </nav>
    )
}

