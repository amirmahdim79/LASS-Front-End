import {default as cs} from 'classnames'
import styles from './style.module.scss'
import search from 'assets/icons/search/search-normal/dark-color.svg';




export default function SearchBar({}) {  

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['searchBox'])}>
                <input className={cs(styles['searchInput'])} type="text" name="" placeholder="جست و جو کنید" />
                <button className={cs(styles['searchButton'])} href="#">
                    <img className={cs(styles['icon'])} src={search} alt='search icon' />
                </button>
            </div>
        </div>
    )
}

