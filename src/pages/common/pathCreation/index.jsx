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
import colors from "styles/colors.module.scss"
import TaskInfo from './components/modals/taskInfo';
import DeleteModal from './components/modals/deleteModal';
import useToast from 'hooks/useToast';
import Button from 'components/global/button';
import { degreeMapper } from 'utils/mapper';
import { usePathActions } from './hooks/usePathActions';


export default function PathCreation() { 

    const { showToast } = useToast();

    const initialState = {
        name: '',
        typeDependency: undefined,
        sandGain: '',
        desc: ''
    }

    const [ state , dispatch] = useReducer( reducer, initialState );
    const { value: milestones, setValue: setMilestones } = useInput([]);
    // const { value: tasks, setValue: setTasks } = useInput([]);
    const { value: milestoneModalId, setValue: setMilestoneModalId } = useInput('');
    // const { value: uploadTaskModalId, setValue: setUploadTaskModalId } = useInput('');
    // const { value: paperTaskModalId, setValue: setPaperTaskModalId } = useInput('');
    // const { value: taskModalId, setValue: setTaskModalId } = useInput('');
    const { value: taskInfo, setValue: setTaskInfo } = useInput('');
    const { value: editingMilestone, setValue: setEditingMileStone } = useInput({});
    const { value: editingTask, setValue: setEditingTask } = useInput({});
    const { value: deletingItem, setValue: setDeletingItem } = useInput('');
    const { value: deletingInfo, setValue: setDeletingInfo } = useInput(null);
    const { value: clickSaveBtn, setValue: setClickSaveBtn } = useInput(false);

    const [ openMilestoneModal, showAddMilestoneModal, closeMilestoneModal ] = useModal();
    const [ openDeleteModal, showDeleteModal, closeDeleteModal ] = useModal();

    const { createPath, pathCreation } = usePathActions();


    

    // console.log("-ssss", state);
    // console.log("milestones", milestones);
    // console.log("clickSaveBtn", clickSaveBtn);
    // console.log("openMilestoneModal", openMilestoneModal);
    // console.log("editingTask", editingTask);
    // console.log("editingMilestone", editingMilestone);

    const closeAddMilestoneModal = () => {
        setMilestoneModalId('-1')
    }

    const openAddMilestoneModal = (id) => {
        setMilestoneModalId(id)
    }

    // const openAddModal = (id, type) => {
    //     if (type === 'milestone') setMilestoneModalId(id)
    //     else setTaskModalId(id)
    // }

    const cancelAddMilestone = () => {
        let data = [...milestones];
        data.splice(-1);
        setMilestones(data);
        setMilestoneModalId('-1');
        closeMilestoneModal();
    }

    const cancelAddTask = () => {
        let data = [...milestones];
        let tasks = data[taskInfo.milestoneId].Tasks;

        tasks.splice(-1);
        setMilestones(data);
        setTaskInfo('-1')
    }

    const closeAddModal = () => {
        setMilestoneModalId('-1')
        // setTaskModalId('-1');
        closeMilestoneModal()
        setClickSaveBtn(false)
    }

    const closeTasksModal = () => {
        setTaskInfo('-1')
        setClickSaveBtn(false)
    }

    const deleteTask = () => {
        let data = [...milestones];
        if (deletingItem === 'task') {
            let tasks = data[deletingInfo.milestoneId].Tasks;
            tasks.splice(deletingInfo.taskId, 1);
        } else {
            data.splice(deletingInfo, 1);
        }
        setMilestones(data)
        showToast(`${deletingItem === 'task' ? 'تسک' : 'مایلستون'} با موفقیت حذف شد`, 'success')
        closeDeleteModal();
    }

    const savePath = () => {
        setClickSaveBtn(true);
        let data = {
            ...state,
            typeDependency: degreeMapper(state.typeDependency),
            Milestones: milestones
        }

        // console.log("data",data);
        const emptyMilestoneInd = milestones.findIndex((m) => m.Tasks.length === 0);
        // console.log("emptyMilestoneInd",emptyMilestoneInd);

        if (emptyMilestoneInd === -1) {
            createPath({...data})
                .then(res => {
                    console.log("rrr-------", res.data);
                })
                .catch(err => {
                    console.log("-----eee--",err);
                })
        }
    }

    // const editMilestone = (i) => {
    //     openAddModal(i, 'milestone')
    // }


    useEffect(() => {
        if (openMilestoneModal)  setMilestoneModalId(milestones.length-1)
    }, [milestones.length, openMilestoneModal])

    // useEffect(() => {
    //     setTaskModalId(tasks.length-1)
    // }, [tasks])


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
                            value={state.sandGain}
                            onChange={ (e) => dispatch({payload: {type: 'sandGain', value: e.target.value}}) }
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
                                            // onClick={() => openAddModal(i, 'milestone')}
                                        />
                                        {/* <p onClick={() => openAddModal(i, 'milestone')}> {text.side_subtitle_1} </p> */}
                                        <p> {text.side_subtitle_1} </p>
                                        <Modal
                                            isOpen={milestoneModalId === i} 
                                            close={cancelAddMilestone} 
                                            content={
                                                <div className={cs(styles['milestone_modal'])} style={{display: milestoneModalId === i ? 'block' : 'none'}} id='#milestone_modal'>
                                                    <MilestoneInfo 
                                                        close={closeAddModal} 
                                                        id={milestoneModalId}
                                                        milestones={milestones} 
                                                        setMilestones={setMilestones}
                                                        editingMilestone={editingMilestone} 
                                                        setEditingMileStone={setEditingMileStone}
                                                    />
                                                </div>
                                            }
                                        />

                                    </div>
                                    <div className={cs(styles['edit_buttons'])}>
                                        <img src={editIcon} alt='edit icon' onClick={() => {setMilestoneModalId(i); setEditingMileStone(m)} }/>
                                        <img src={delIcon} alt='trash icon' onClick={() => {setDeletingInfo(i); setDeletingItem('milestone'); showDeleteModal()}}/>
                                    </div>
                                </div>

                                {
                                    m.Tasks && (
                                        <div  className={cs(styles['new_tasks'])}> 
                                            {
                                                m.Tasks.map((t, tInd) => 
                                                    <div className={cs(styles['inner_header'])} key={tInd}>
                                                        <div className={cs(styles['title_container'])}>

                                                            <img 
                                                                src={t.activity === 'upload' ? docIcon : docTextIcon}
                                                                style={t.activity === 'upload' ? {backgroundColor: colors['light-accent-100']} : {backgroundColor: colors['warning-dark-100']}}
                                                                alt='task icon'
                                                                className={cs(styles['icon'])}
                                                                // onClick={() => openAddModal(tInd, t.type)}
                                                            />

                                                            {/* <p onClick={() => openAddModal(tInd, t.type)}> {t.type === 'upload' ? text.side_subtitle_2 : text.side_subtitle_3} </p> */}
                                                            <p> {t.activity === 'upload' ? text.side_subtitle_2 : text.side_subtitle_3} </p>

                                                            <Modal
                                                                isOpen={taskInfo?.milestoneId === i && taskInfo?.taskId === tInd} 
                                                                close={cancelAddTask} 
                                                                content={
                                                                    <div 
                                                                        className={cs(styles['task_modal'])} 
                                                                        style={{display: (taskInfo?.milestoneId === i && taskInfo?.taskId === tInd) ? 'block' : 'none'}} id='#task_modal'
                                                                    >
                                                                        <TaskInfo 
                                                                            close={closeTasksModal} 
                                                                            milestones={milestones}
                                                                            setMilestones={setMilestones}
                                                                            info={taskInfo}
                                                                            type={t.activity}
                                                                            editingTask={editingTask} 
                                                                            setEditingTask={setEditingTask}
                                                                        />
                                                                    </div>
                                                                }
                                                            />
                                                        </div>
                                                        <div className={cs(styles['edit_buttons'])}>
                                                            <img 
                                                                src={editIcon} 
                                                                alt='edit icon' 
                                                                onClick={() => {setTaskInfo({milestoneId: i, taskId: tInd}); setEditingTask(t)} }
                                                            />
                                                            <img 
                                                                src={delIcon} 
                                                                alt='trash icon' 
                                                                onClick={() => {setDeletingInfo({milestoneId: i, taskId: tInd}); setDeletingItem('task'); showDeleteModal()}}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }

                                <div className={cs(styles['button_container'])} >
                                    <AddTaskButton 
                                        milestoneId={i} 
                                        milestones={milestones} 
                                        setMilestones={setMilestones}
                                        taskInfo={taskInfo} 
                                        setTaskInfo={setTaskInfo}
                                    />
                                </div>
                                {(!m.Tasks.length && clickSaveBtn) && <p className={cs(styles['error_msg'])}> {text.error_msg} </p>}
                            </div>
                        )
                    }
                    <AddElementButton milestones={milestones} setMilestones={setMilestones} openModal={showAddMilestoneModal}/>

                </div>
                <div className={cs(styles['footer'])}>
                    <Button
                        color={colors['main-color-100']} 
                        onClick={() => savePath()}
                        text={text.button} 
                        width={'355px'}
                        // disabled={!state.name.trim().length || !state.sandGain.trim().length}
                        // load={eventCreation}
                    />
                </div>
            </div>

            <Modal
                isOpen={openDeleteModal} 
                close={closeDeleteModal} 
                content={
                    <div className={cs(styles['delete_modal'])} style={{display: openDeleteModal ? 'block' : 'none'}} >
                        <DeleteModal
                            onCancel={closeDeleteModal}
                            onSubmit={deleteTask}
                            type={deletingItem}
                            // submitLoad={deleteType === 'group' ? deletingLabGroup : updatingLabGroup}
                        />
                    </div>
                }
            />
        </div>
    )
}