import {default as cs} from 'classnames'
import SearchBar from 'components/global/searchbar'
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import docIcon from 'assets/icons/contents/document-text/main-color.svg'
import moreIcon from 'assets/icons/essential/more/dark-color.svg'
import CheckBoxV1 from 'components/global/checkbox/v1'
import { useSelector } from 'react-redux'
import { formatFileSize } from 'utils/mapper'
import { useArticlesActions } from 'pages/user/articlesDataBase/hooks/useArticlesActions'
import Preloader from 'components/global/preloaders'


export default function ArticlesList({data, load}) { 

    const articles = useSelector(state => state.user.articles);

    const { searchTags } = useArticlesActions();

    // const dispatch = useDispatch();
    // const [ openUploadModal, showUploadModal, closeUploadModal ] = useModal();

    // const { value: fileData, setValue: setFileData } = useInput({});

    // const search = () => {
    //     searchTags({}, `?query=${debouncedTag}`).then(res => {
    //         console.log("sssssssssssssssss", res);
    //     }).catch(err => {
    //         console.log("eeeeeeeeeeeeeeeeeeeeeeeee", err);
    //     })
    // }


    return (
        <div className={cs(styles['container'])}>

            <div className={cs(styles['header'])}>
                <div className={cs(styles['row_1'])}>
                    <div className={cs(styles['tools_wrapper'])}>
                        <div> <SearchBar height={'40px'} borderRadius={'12px'} placeholder={'نام فایل را جست و جو کنید'}/> </div>
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
                                data.map((paper, i) => 
                                    <div key={i} className={cs(styles['row'])}>
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
                                            <img src={moreIcon} alt='more icon'/>
                                            <span className={cs(styles['tags'])}> 
                                                { paper.Tags.length 
                                                    ? paper.Tags.map((tag, i) => <span> {tag?.name ? `#${tag?.name}` : '-'} </span>)
                                                    : <p>...</p>
                                                } 
                                            </span>
                                        </div>
            
                                    </div>
                                )
                    }
                    
                </div>
            </div>


        </div>
    )
}

