import {default as cs} from 'classnames'
import styles from './style.module.scss'
import search from 'assets/icons/search/search-normal/dark-color.svg';




export default function SearchBar({
    fontSize,
    height='48px', 
    borderRadius='15px', 
    placeholder='جست و جو کنید',
    value,
    setValue
}) {  

    return (
        <div className={cs(styles['container'])}>
            <div 
                className={cs(styles['searchBox'])} 
                style={{height: height, borderRadius: borderRadius}}
            >
                <input 
                    className={value ? cs(styles['nonEmptysearchInput']) : cs(styles['searchInput'])} 
                    style={{fontSize: fontSize}} 
                    type="text" 
                    placeholder={placeholder} 
                    onChange={(e) => setValue(e.target.value)} 
                    value={value}
                />
                <button className={cs(styles['searchButton'])} href="#">
                    <img className={cs(styles['icon'])} src={search} alt='search icon' />
                </button>
            </div>
        </div>
    )
}

