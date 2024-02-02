import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import closeIcon from 'assets/icons/essential/add/light-color.svg';
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2';
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1';
import { useReducer } from 'react';
import { reducer } from 'pages/common/pathCreation/reducer';
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"
import { isEmptyObject } from 'utils/mapper';
import { useEffect } from 'react';

export default function TaskInfo({close, type, milestones, setMilestones, info, editingTask, setEditingTask}) { 

    const initialState = {
        name: '',
        desc: '',
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const saveTask = () => {
        let data = [...milestones];
        let task = [...data[info.milestoneId].Tasks][info.taskId];
        task['name'] = state.name;
        task['desc'] = state.desc;
        setMilestones(data);
        close();
    }

    

    useEffect(() => {
        if (!isEmptyObject(editingTask)) {
            dispatch({payload: {type: 'name', value: editingTask.name}})
            dispatch({payload: {type: 'desc', value: editingTask.desc}})
        }
    }, [editingTask])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <p> {text[type].title} </p>
                {/* <img 
                    src={closeIcon}
                    alt='close icon'
                    className={cs(styles['icon'])}
                    onClick={() => close()}
                /> */}
            </div>
            <div className={cs(styles['inputs'])}>
                {
                    type === 'upload'
                        ? (
                            <>
                                <TextInputV2
                                    value={state.name}
                                    onChange={ (e) => dispatch({payload: {type: 'name', value: e.target.value}}) }
                                    placeholder={text[type].input_1} 
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
                                    placeholder={text[type].input_2} 
                                    rows={'6'}
                                    width={'353px'}
                                    fontFamily={'pinar_light'}
                                    fontWeight={'300'}
                                    fontSize={'16px'}
                                    resizable={false}
                                />
                            </>
                        ) : (
                            <>
                                <TextInputV2
                                    value={state.name}
                                    onChange={ (e) => dispatch({payload: {type: 'name', value: e.target.value}}) }
                                    placeholder={text[type].input_1} 
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
                                    placeholder={text[type].input_2} 
                                    rows={'6'}
                                    width={'353px'}
                                    fontFamily={'pinar_light'}
                                    fontWeight={'300'}
                                    fontSize={'16px'}
                                    resizable={false}
                                />
                            </>
                        )
                }
            </div>

            <div className={cs(styles['footer'])}>
                <Button
                    color={colors['main-color-100']} 
                    onClick={() => saveTask()}
                    text={text.button} 
                    width={'255px'}
                    disabled={!state.name.trim().length}
                    // load={eventCreation}
                />
            </div>
        </div>
    )
}