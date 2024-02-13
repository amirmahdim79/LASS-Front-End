import {default as cs} from 'classnames'
import SearchBar from 'components/global/searchbar'
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import docIcon from 'assets/icons/contents/document-text/main-color.svg'
import downloadIcon from 'assets/icons/arrow/import/dark-color.svg'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useSelector } from 'react-redux'
import { formatFileSize } from 'utils/mapper'
import Preloader from 'components/global/preloaders'
import useInput from 'hooks/useInputHandler'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedValue } from 'store/userSlice'
import { setNavSearchedValue } from 'store/userSlice'
import emptyList from 'assets/icons/contents/notes-remove/dark-color.svg'

export default function ArticlesList({
    data, 
    load, 
    userType='user', 
    addRecentFile=() => {}
}) { 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navSearchedValue = useSelector(state => state.user.navSearchedValue);
    const searchedValue = useSelector(state => state.user.searchedValue);

    const { value: searchKeyword, setValue: setSearchKeyword } = useInput('');
    const { value: debouncedsearchKeyword, setValue: setDebouncedSearchKeyword } = useInput('');

    const downloadPaper = (paper, index) => {
        addRecentFile(paper._id);
        var link = document.createElement('a');
        link.href = paper.url;
        link.download = paper.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchKeyword(searchKeyword);
        }, 200); 
    
        return () => {
            clearTimeout(timer);
        };
    }, [searchKeyword])

    useEffect(() => {
        // inja update state
        dispatch(setSearchedValue(debouncedsearchKeyword))
        
      }, [debouncedsearchKeyword]);

    useEffect(() => {
        if (navSearchedValue) {
            setSearchKeyword('')
        }
    }, [navSearchedValue])

    useEffect(() => {
        if (searchKeyword) {
            dispatch(setNavSearchedValue(null))
            navigate(`../articles-database`)
        }
    }, [searchedValue]);



    return (
        <div className={cs(styles['container'])}>

            <div className={cs(styles['header'])}>
                <div className={cs(styles['row_1'])}>
                    <div className={cs(styles['tools_wrapper'])}>
                        <div> 
                            <SearchBar 
                                height={'40px'} 
                                borderRadius={'12px'} 
                                placeholder={'نام فایل را جست و جو کنید'} 
                                fontSize={'14px'}
                                value={searchKeyword}
                                setValue={setSearchKeyword}
                            /> 
                        </div>
                        <div className={cs(styles['filter_icon'])}> 
                            <img 
                                src={filterIcon}
                                alt='filter icon'
                            />
                        </div>
                    </div>
                    <div className={cs(styles['titles_wrapper'])}>
                        <p> {text.title_1} </p>
                        <p> {text.title_2} </p>
                    </div>
                    
                </div>
            </div>

            <div className={cs(styles['body'])}>
                <div className={cs(styles['col_1'])}>
                    <CheckBoxV1 checked={false}/>
                    <p> {text.header_1} </p>
                </div>
                <div className={cs(styles['col_2'])}>
                    <p> {text.header_2} </p>
                </div>
                <div className={cs(styles['col_3'])}>
                    <p> {text.header_3} </p>
                </div>
                <div className={cs(styles['col_4'])}>
                    <p> {text.header_4} </p>
                </div>

                <div className={cs(styles['data'])}>
                    {
                        load   
                            ? <Preloader/>
                            : 
                                data && data.length === 0 
                                    ? 
                                    <div className={cs(styles['empty_list'])}> 
                                        <img src={emptyList} alt='no papers exists'/>
                                        <p> {text.empty_list} </p>
                                    </div>
                                    : (
                                        data.map((paper, i) => 
                                            <div key={i} className={cs(styles['row'])} onClick={() => downloadPaper(paper, i)}>
                                                <div className={cs(styles['name_wrapper'])}>
                                                    <CheckBoxV1 checked={false}/>
                                                    <img 
                                                        src={docIcon}
                                                        alt='doc icon'
                                                    />
                                                    <span> {paper?.name} </span>
                                                </div>
                                            
                                                <div className={cs(styles['size_wrapper'])}>
                                                    <p> {formatFileSize(paper?.size)} </p>
                                                </div>
                                                <div className={cs(styles['date_wrapper'])}>
                                                    <p> 2019/06/18 </p>
                                                </div>
                                                <div className={cs(styles['tags_wrapper'])}>
                                                    <img src={downloadIcon} alt='download icon'/>
                                                    <span className={cs(styles['tags'])}> 
                                                        { paper.Tags.length 
                                                            ? paper.Tags.map((tag, i) => <span> {tag?.name ? `#${tag?.name}` : '-'} </span>)
                                                            : <p>...</p>
                                                        } 
        
                                                        <div className={cs(styles['tooltip'])}>
                                                            { paper.Tags.length 
                                                                ? paper.Tags.map((tag, i) => <span> {tag?.name ? `#${tag?.name}` : '-'} </span>)
                                                                : <p>...</p>
                                                            }
                                                        </div>
                                                    </span>
                                                </div>
                    
                                            </div>
                                        )
                                    )

                    }
                    
                </div>
            </div>


        </div>
    )
}

