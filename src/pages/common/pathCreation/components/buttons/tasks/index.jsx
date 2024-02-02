import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import importIcon from 'assets/icons/arrow/import-2/dark-color.svg'
import { useModal } from 'hooks/useModal';
import Modal from 'components/global/modal';
import ElementsList from '../../modals/elementsList';
import useInput from 'hooks/useInputHandler';
import TasksList from '../../modals/tasksList';

export default function AddTaskButton({milestoneId, milestones, setMilestones, taskInfo, setTaskInfo}) { 

    const [ openTasksModal, showAddTasksModal, closeTasksModal ] = useModal();

    const addNewTask = (type) => {
        let newMilestones = [...milestones];
        newMilestones[milestoneId].Tasks = [ ...newMilestones[milestoneId].Tasks, {activity: type, name: undefined, desc: undefined, type: 'fixed'}]
        setTaskInfo({milestoneId: milestoneId, taskId: newMilestones[milestoneId].Tasks.length - 1})
        setMilestones(newMilestones);
        closeTasksModal()
    }

    const onClickTasksListModal = (e) => {
        if (openTasksModal) {
            if (e.currentTarget.id !== '#tasks_modal') closeTasksModal();
        } else showAddTasksModal();
    }


    return (
        <div className={cs(styles['button'])} id='#add_btn' onClick={(e) => onClickTasksListModal(e)}>
            <div className={cs(styles['text_container'])}> 
                <p> {text.button_txt} </p> 
                <Modal
                    isOpen={openTasksModal} 
                    close={closeTasksModal} 
                    content={
                        <div className={cs(styles['tasks_list_modal'])} style={{display: openTasksModal ? 'block' : 'none'}} id='#tasks_modal'>
                            <TasksList onClick={addNewTask}/>
                        </div>
                    }
                />
            </div>
            <img src={importIcon} alt='import icon'/>
        </div>
    )
}