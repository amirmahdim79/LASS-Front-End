import {default as cs} from 'classnames'
import UploadFile from 'components/uploadFile'
import downloadIcon from 'assets/icons/contents/download/main-color.svg'
import moreIcon from 'assets/icons/essential/more/dark-color.svg'
import styles from './articlesDataBase.module.scss'
import { text } from './constants'
import { useSelector } from 'react-redux'
import ArticlesList from 'components/articlesList'
import { useEffect } from 'react'
import { useArticlesActions } from './hooks/useArticlesActions'
import useInput from 'hooks/useInputHandler'
import { useSearchParams } from 'react-router-dom';

export default function UserArticlesDataBase() { 

    const [searchParams] = useSearchParams();
    const searchKeyword = searchParams.get('search');


    const articles = useSelector(state => state.user.articles);
    const searchedValue = useSelector(state => state.user.searchedValue);

    const { value: allPapers, setValue: setAllPapers } = useInput([]);

    const { getAllPapers, gettingAllPapers, searchPaper } = useArticlesActions();

    const updatePapers = () => {
        getAllPapers()
            .then(res => setAllPapers(res.data))
            .catch(err => console.log(err))
    }

    const searchPapers = (key) => {
        searchPaper({}, `?query=${key}`)
            .then(res => setAllPapers(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        updatePapers()
    }, [])

    useEffect(() => {
        if (searchKeyword) searchPapers(searchKeyword)
        else updatePapers()
    }, [searchKeyword])
    
    useEffect(() => {
        searchPapers(searchedValue)
    }, [searchedValue]);


        // redux , url update value when api call
    
    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['articles_container'])}>
                <div className={cs(styles['upload_container'])}>
                    <UploadFile updatePapers={updatePapers} />
                </div>

                <div className={cs(styles['all_articles'])}>
                    <ArticlesList data={allPapers} load={gettingAllPapers}/>
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
                
            </div>

        </div>
    )
}


