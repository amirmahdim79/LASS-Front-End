import {default as cs} from 'classnames'
import { text } from './constants'
import styles from './style.module.scss'
import importIcon from 'assets/icons/arrow/import-2/dark-color.svg'
import { useModal } from 'hooks/useModal';
import Modal from 'components/global/modal';
import ElementsList from '../../modals/elementsList';
import useInput from 'hooks/useInputHandler';

export default function AddElementButton({milestones, setMilestones}) { 

    const [ openElementsModal, showElementsModal, closeElementsModal ] = useModal();

    const addNewMilestone = (e) => {
        e.stopPropagation()
        setMilestones([...milestones, {}])
        closeElementsModal()
    }

    const onClickElementsListModal = (e) => {
        if (openElementsModal) {
            if (e.currentTarget.id !== '#elements_modal') closeElementsModal();
        } else showElementsModal();
    }


    return (
        <div className={cs(styles['button'])} id='#add_btn' onClick={(e) => onClickElementsListModal(e)}>
            <div className={cs(styles['text_container'])}> 
                <p> {text.button_txt} </p> 
                <Modal
                    isOpen={openElementsModal} 
                    close={closeElementsModal} 
                    content={
                        <div className={cs(styles['elements_list_modal'])} style={{display: openElementsModal ? 'block' : 'none'}} id='#elements_modal'>
                            <ElementsList onClick={addNewMilestone}/>
                        </div>
                    }
                />
            </div>
            <img src={importIcon} alt='import icon'/>
        </div>
    )
}