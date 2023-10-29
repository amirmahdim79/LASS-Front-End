import styles from './style.module.scss'
import {default as cs} from 'classnames'
import colors from "styles/colors.module.scss"
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import arrowDown from "assets/icons/arrow/arrow-down/dark-shade-color.svg"


const SelectInputV2 = ({
    type = 'text',
    title = '',
    width = '100%',
    dir = 'rtl',
    opacity = '1',
    fontSize = '20px' ,
    fontWeight = '400',
    isValid = true,
    showError = true,
    disabled = false,
    placeholder = '' ,
    errorMessage = '', 
    suggestions = [],
    addedOptions = [],
    ref,
    value ,
    setValue,
}) => {

    const [possibleChoices, setPossibleChoices] = useState(suggestions);
    const [toggle, setToggle] = useState(false);

    const inputElement = useRef();
    
    const closeChoices = () => {
        setToggle(false)
    }

    const openToggle = () => {
        if(!disabled) setToggle(true)
    }

    const filter = (event) => {
        const keyword = event.target.value;
        if (keyword !== '') {
            const results = suggestions.filter((x) => {
                return x.startsWith(keyword);
            });
            setPossibleChoices(results);
        } else {
            setPossibleChoices(suggestions);
            // If the text field is empty, show all suggestions
        }
        setValue(keyword)
    };

    const handleChangeSelect = (selected) => {
        setValue(selected)
        closeChoices();
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputElement.current && !inputElement.current.contains(event.target)) {
                closeChoices()
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);

    useEffect(() => {
        if(value === '') setPossibleChoices(suggestions)
    }, [suggestions]);

    return ( 
        <div ref={inputElement} className= {cs(styles['container'])} style={{ width:width , direction:dir}} >
            { title &&  <p style={{fontSize:fontSize, fontWeight:fontWeight}}> {title} </p> }
            
            <div onClick={openToggle} className={cs(styles['input_container'])}  scrollbar={true} style={{ opacity: opacity}}>
                <input 
                    value={value} 
                    type={type} 
                    onChange={filter} 
                    ref={ref} 
                    className={cs(styles['input'])} 
                    style={{fontSize: fontSize}}
                    disabled={disabled} 
                    placeholder={placeholder}
                />
                <div className={cs(styles['icons'], toggle && styles['upside'])}>
                    <img 
                        src={arrowDown}
                        alt='arrow down'
                    />
                </div>
            </div>
            {toggle && <div className={cs(styles['choices'])} style={{...(title.trim().length === 0 ? {top: '55px'} : {top: '88px'})}}>
                {possibleChoices && possibleChoices.map((e, i) => {
                    return (
                        <div className={cs(styles['choice'])} key={i} onClick={()=>{handleChangeSelect(e)}}>
                            <button disabled={addedOptions.includes(e)} className={cs(styles['choice_content'])}> {e} </button>
                        </div>
                    )
                })}
            </div>}
            
            {(!isValid && showError) && <p className={cs(styles['error_text'])}>{errorMessage}</p>}

        </div>
     );
}
 
export default SelectInputV2;