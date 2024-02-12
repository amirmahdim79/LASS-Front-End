import {default as cs} from 'classnames'
import { useState } from 'react';
import CarouselItem from './items/paths';
import styles from './style.module.scss'


export default function Carousel({
    items = [],
    typ='path',
    name = 'slider'
}) {  

    const [cheecked, setCheecked] = useState(1)


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['items_container'])}>
                {items.map((item, i) => 
                    <>
                        <input type="radio" name={name} id={`item-${i+1}`} value={cheecked === item.i+1 ? true : false} onClick={() => setCheecked(i+1)}/>
                    </>
                )}
                <div className={cs(styles['cards'])}>
                    {items.map((item, i) => 
                        <label 
                            className={cs(
                                styles['card'], 
                                cheecked === i+1 && styles['checked'], 
                                (items.length > 1 &&  (cheecked === 1 ? i+1 === items.length : cheecked-1 === i+1) && styles['prev']),
                                (items.length > 1 &&  (cheecked === items.length ? i+1 === 1 : cheecked+1 === i+1) && styles['after']),                               
                            )} 
                            for={`item-${i+1}`} 
                            id={`card-${i+1}`} 
                            onClick={() => setCheecked(i+1)}
                        >
                            <CarouselItem item={item}/>
                        </label>
                    )}
                </div>
            </div>
        </div>
    )
}