import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import moreIcon from 'assets/icons/essential/more/dark-color.svg'
import styles from './articlesDataBase.module.scss'
import { text } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import { useArticlesActions } from './hooks/useArticlesActions'
import useInput from 'hooks/useInputHandler'
import { useSearchParams } from 'react-router-dom';
import { setArticles } from 'store/userSlice'

export default function UserArticlesDataBase() { 

    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get('search');


    const articles = useSelector(state => state.user.articles);
    const searchedValue = useSelector(state => state.user.searchedValue);
    const labId = useSelector(state => state.lab.labId);

    const { value: allPapers, setValue: setAllPapers } = useInput([]);
    const { getAllPapers, gettingAllPapers, searchPaper, addRecentFile } = useArticlesActions();

    const updatePapers = () => {
        getAllPapers()
            .then(res => setAllPapers(res.data))
            .catch(err => console.log(err))
    }

    const searchPapers = (key) => {

        searchPaper({}, `?query=${key}`)
            .then(res => {
                setAllPapers(res.data)
            })
            .catch(err => console.log(err))
    }

    const addRecentFiles = (id) => {
        addRecentFile({File: id, Lab: labId})
            .then(res => {
                console.log("---res.data",res.data);
                dispatch(setArticles(res.data.reverse()))
            }).catch(err => {
                console.log("eeeeeeeeeeee", err);
            })
    }

    useEffect(() => {
        if (searchParams.size === 0) {
            // if (searchKeyword) searchPapers(searchKeyword)
            // else updatePapers()
            updatePapers()
        }
    }, [])

    useEffect(() => {
        if (searchParams.size === 0) {
            // if (searchKeyword) searchPapers(searchKeyword)
            // else updatePapers()
            updatePapers()
        }
    }, [searchParams])


    useEffect(() => {
        if (searchParams.size !== 0){
            if (searchKeyword) {
                searchPapers(searchKeyword)
            }else {
                updatePapers()
            }
            // if (searchKeyword) searchPapers(searchKeyword)
            // else updatePapers()
        }
    }, [searchKeyword])
    
    // useEffect(() => {
    //     console.log("use effect3", searchedValue);
    //     searchPapers(searchedValue)
    // }, [searchedValue]);


        // redux , url update value when api call
        
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['articles_container'])}>
                <div className={cs(styles['upload_container'])}>
                    <UploadFile updatePapers={updatePapers} />
                </div>

                <div className={cs(styles['all_articles'])}>
                    <ArticlesList data={allPapers} load={gettingAllPapers} userType={'user'} addRecentFile={addRecentFiles}/>
                </div>
            </div>
            <div className={cs(styles['current_articles_container'])}>
                <h6> {text.current_articles} </h6>
                {
                    articles && 
                        <div className={cs(styles['articles'])}>
                            {
                                articles.map((article, i) => 
                                    <div className={cs(styles['article_wrapper'])} key={i}>
                                        <div className={cs(styles['icon_wrapper'])}>
                                            <img src={downloadIcon} alt='download icon'/>
                                        </div>
                                        <div className={cs(styles['name_wrapper'])}>
                                            <span> {article?.name} </span>
                                        </div>
                                        <div className={cs(styles['more_info_wapper'])}>
                                            <img src={moreIcon} alt='more icon'/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }

                { (articles && articles.length!==0) && <div className={cs(styles['border_bottom'])}/> }

            </div>

        </div>
    )
}


