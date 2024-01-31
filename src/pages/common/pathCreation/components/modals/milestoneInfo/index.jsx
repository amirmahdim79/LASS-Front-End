import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import closeIcon from 'assets/icons/essential/add/light-color.svg';
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2';
import { useReducer } from 'react';
import { reducer } from 'pages/common/pathCreation/reducer';
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1';
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"


export default function MilestoneInfo({close, milestones, setMilestones, id}) { 

    const initialState = {
        name: '',
        sandGain: '',
        desc: ''
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const saveMilestone = () => {
        let data = milestones;
        data[id] = {
            name: state.name,
            sandGain: state.sandGain,
            desc: state.desc,
        }
        setMilestones(data)
    }


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <p> {text.title} </p>
                <img 
                    src={closeIcon}
                    alt='close icon'
                    className={cs(styles['icon'])}
                    onClick={() => close()}
                />
            </div>

            <div className={cs(styles['inputs'])}>
                <TextInputV2
                    value={state.name}
                    onChange={ (e) => dispatch({payload: {type: 'name', value: e.target.value}}) }
                    placeholder={text.input_1} 
                    dir={'rtl'}
                    width={'245px'}
                    fontFamily={'pinar_light'}
                    fontWeight={'300'}
                    fontSize={'16px'}
                />
                <TextInputV2
                    value={state.sandGain}
                    onChange={ (e) => dispatch({payload: {type: 'sandGain', value: e.target.value}}) }
                    placeholder={text.input_2} 
                    dir={'rtl'}
                    width={'245px'}
                    fontFamily={'pinar_light'}
                    fontWeight={'300'}
                    fontSize={'16px'}
                />
                <TextAreaV1
                    name={'description'}
                    value={state.desc}
                    onChange={ (e) => dispatch({payload: {type: 'desc', value: e.target.value}}) }
                    placeholder={text.input_3} 
                    rows={'6'}
                    width={'353px'}
                    fontFamily={'pinar_light'}
                    fontWeight={'300'}
                    fontSize={'16px'}
                    resizable={false}
                />

            </div>

            <div className={cs(styles['footer'])}>
                <Button
                    color={colors['main-color-100']} 
                    onClick={() => saveMilestone()}
                    text={text.button} 
                    width={'255px'}
                    // disabled={checkSubmitIsDisable()}
                    // load={eventCreation}
                />
            </div>
            
        </div>
    )
}