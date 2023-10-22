import { default as cs } from 'classnames'
import styles from './style.module.scss'
import arrowLeft from 'assets/icons/arrow/arrow-left-main-color.svg'
import arrowRight from 'assets/icons/arrow/arrow-right-main-color.svg'

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};


export default function Pagination({currentPage=1, maxPageNum=2, next, prev, jump}) {
    const DOTS = '...'

    const pageNumbersList = range(1, maxPageNum);
    let numbersArray = [];

    if(maxPageNum <= 8) {
        numbersArray = pageNumbersList
    }else if (currentPage <= 4) {
        numbersArray = [...pageNumbersList.slice(0, 5), DOTS, maxPageNum]
    }else if (currentPage >= maxPageNum - 3) {
        numbersArray = [1, DOTS, ...pageNumbersList.slice(maxPageNum-5, maxPageNum)]
    }else {
        numbersArray = [1, DOTS , currentPage-1 , currentPage, currentPage+1, DOTS, maxPageNum]
    }



    return (
        <div className={cs(styles['container'])}>
            {
                maxPageNum !== 0 && (
                    <>
                        <div onClick={prev}>
                            <img src={arrowLeft} alt='arrow left' className={cs(styles['arrow-icon'])}/>
                        </div>
                        <div className={cs(styles['page_numbers'])}>
                            {numbersArray.map((num, index) => {
                                return (
                                    <p 
                                        key={index} 
                                        className={num === currentPage ? cs(styles['active_number']) : cs(styles['number'])} 
                                        // onClick={()=>jump(num)}
                                    > 
                                        {num} 
                                    </p>
                                )
                            })}
                        </div>
                        <div onClick={next}>
                            <img src={arrowRight} alt='arrow right' className={cs(styles['arrow-icon'])}/>
                        </div>
                    </>
                )
            }
        </div>
    )
}

// , num === currentPage && cs(styles['active_number'])