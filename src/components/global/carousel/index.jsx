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

    console.log("items", items);
    // console.log("cheecked", cheecked);


    const arr = [
        {
            item: <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" />,
            id: 1,
            checked: true,
        },
        {
            item: <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song"/>,
            id: 2,
            checked: false,
        },
        {
            item: <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" />,
            id: 3,
            checked: false,
        },
        // {
        //     item: <img src="https://ix-www.imgix.net/examples/moon.jpg?ixlib=js-3.8.0&fit=crop&crop=entropy&auto=compress%2Cformat&ar=400%3A300&w=689" alt="song" />,
        //     id: 4,
        //     checked: false,
        // },
    ];

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