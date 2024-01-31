import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import routingIcon from 'assets/icons/location/routing/light-color.svg';
import docIcon from 'assets/icons/contents/document-normal/light-color.svg';
import docTextIcon from 'assets/icons/contents/document-text/light-color.svg';
import editIcon from 'assets/icons/contents/edit_1/dark-color.svg';
import delIcon from 'assets/icons/essential/trash/dark-color.svg'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2';
import TextAreaV1 from 'components/global/inputs/textareas/textareaV1';
import SelectInputV2 from 'components/global/inputs/selectInputs';
import { reducer } from './reducer';
import { useEffect, useReducer } from 'react';
import AddElementButton from './components/buttons/elements';
import { useModal } from 'hooks/useModal';
import useInput from 'hooks/useInputHandler';
import AddTaskButton from './components/buttons/tasks';
import Modal from 'components/global/modal';
import MilestoneInfo from './components/modals/milestoneInfo';


export default function PathCreation() { 

    const initialState = {
        name: '',
        typeDependency: undefined,
        desc: ''
    }

    const [ state , dispatch] = useReducer( reducer, initialState );
    const { value: milestones, setValue: setMilestones } = useInput([]);
    const { value: milestoneModalId, setValue: setMilestoneModalId } = useInput('');

    const [ openMilestoneModal, showAddMilestoneModal, closeMilestoneModal ] = useModal();


    

    // console.log("-ssss", state);
    console.log("milestones", milestones);
    console.log("milestoneModalId", milestoneModalId);

    const closeAddMilestoneModal = () => {
        setMilestoneModalId('-1')
    }

    const openAddMilestoneModal = (id) => {
        setMilestoneModalId(id)
    }


    useEffect(() => {
        setMilestoneModalId(milestones.length-1)
    }, [milestones])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['sidebar'])}>
                <p> {text.side_title} </p>
                <div className={cs(styles['items_list'])}>
                    <div className={cs(styles['item'])}>
                        <div className={cs(styles['header'])}>
                            <img 
                                src={routingIcon}
                                alt='routing icon'
                                className={cs(styles['icon'])}
                                // onClick={() => addEvent()}
                            />
                            <p> {text.side_subtitle_1} </p>
                        </div>
                        <p> {text.side_desc_1} </p>
                    </div>

                    <div className={cs(styles['item'])}>
                        <div className={cs(styles['header'])}>
                            <img 
                                src={docIcon}
                                alt='doc icon'
                                className={cs(styles['icon'])}
                                // onClick={() => addEvent()}
                            />
                            <p> {text.side_subtitle_2} </p>
                        </div>
                        <p> {text.side_desc_2} </p>
                    </div>

                    <div className={cs(styles['item'])}>
                        <div className={cs(styles['header'])}>
                            <img 
                                src={docTextIcon}
                                alt='text icon'
                                className={cs(styles['icon'])}
                                // onClick={() => addEvent()}
                            />
                            <p> {text.side_subtitle_3} </p>
                        </div>
                        <p> {text.side_desc_3} </p>
                    </div>
                </div>

            </div>
            <div className={cs(styles['main_panel'])}>
                <p> {text.main_title} </p>
                <div className={cs(styles['inputs_container'])}>
                    <div>
                        <TextInputV2 
                            value={state.name}
                            onChange={ (e) => dispatch({payload: {type: 'name', value: e.target.value}}) }
                            placeholder={text.input_1} 
                            dir={'rtl'}
                            width={'330px'}
                            fontFamily={'pinar_light'}
                            fontWeight={'300'}
                            fontSize={'16px'}
                        />
                        <SelectInputV2 
                            value={state.typeDependency}
                            setValue={ (e) => dispatch({payload: {type: 'typeDependency', value: e}}) }
                            width={'340px'}
                            dir={'rtl'}
                            fontWeight={'300'}
                            fontSize={'16px'}
                            fontFamily={'pinar_light'}
                            placeholder={text.input_2} 
                            suggestions={['کارشناسی', 'کارشناسی ارشد', 'دکترا', 'فوق دکترا', 'کارآموز']}
                        />
                        <TextInputV2 
                            value={state.desc}
                            onChange={ (e) => dispatch({payload: {type: 'desc', value: e.target.value}}) }
                            placeholder={text.input_3} 
                            dir={'rtl'}
                            width={'330px'}
                            fontFamily={'pinar_light'}
                            fontWeight={'300'}
                            fontSize={'16px'}
                        />
                    </div>
                    <div>
                        <TextAreaV1
                            name={'description'}
                            value={state.desc}
                            onChange={ (e) => dispatch({payload: {type: 'desc', value: e.target.value}}) }
                            placeholder={text.input_4} 
                            rows={'6'}
                            width={'500px'}
                            fontFamily={'pinar_light'}
                            fontWeight={'300'}
                            fontSize={'16px'}
                            resizable={false}
                        />
                        
                    </div>
                </div>
                <div  className={cs(styles['buttons_container'])}>
                    {
                        milestones && milestones.map((m, i) => 
                            <div  className={cs(styles['new_milestone'])} key={i}>
                                <div className={cs(styles['header'])} >
                                    <div className={cs(styles['title_container'])}>
                                        <img 
                                            src={routingIcon}
                                            alt='routing icon'
                                            className={cs(styles['icon'])}
                                            onClick={() => openAddMilestoneModal(i)}
                                        />
                                        <p onClick={() => openAddMilestoneModal(i)}> {text.side_subtitle_1} </p>
                                        <Modal
                                            isOpen={milestoneModalId === i} 
                                            close={closeAddMilestoneModal} 
                                            content={
                                                <div className={cs(styles['milestone_modal'])} style={{display: milestoneModalId === i ? 'block' : 'none'}} id='#milestone_modal'>
                                                    <MilestoneInfo 
                                                        close={closeAddMilestoneModal} 
                                                        id={milestoneModalId}
                                                        milestones={milestones} 
                                                        setMilestones={setMilestones}
                                                    />
                                                </div>
                                            }
                                        />

                                    </div>
                                    <div className={cs(styles['edit_buttons'])}>
                                        <img src={editIcon} alt='edit icon'/>
                                        <img src={delIcon} alt='trash icon'/>
                                    </div>
                                </div>
                                <div className={cs(styles['button_container'])} >
                                    <AddTaskButton milestones={milestones} setMilestones={setMilestones}/>

                                </div>
                            </div>
                        )
                    }
                    <AddElementButton milestones={milestones} setMilestones={setMilestones}/>

                </div>
            </div>
        </div>
    )
}