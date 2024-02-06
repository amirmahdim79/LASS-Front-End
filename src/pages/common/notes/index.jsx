import {default as cs} from 'classnames'
import SearchBar from 'components/global/searchbar'
import useInput from 'hooks/useInputHandler';
import { text } from './constants'
import styles from './style.module.scss'
import filterIcon from 'assets/icons/essential/filter/dark-color.svg'
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"
import { useEffect } from 'react';
import { useNotesActions } from './hooks/useNotesActions';
import { useSelector } from 'react-redux';
import UserAvatarCollage from 'components/global/usersAvatarCollage';
import moment from 'moment';
import 'moment/locale/fa';
import { useModal } from 'hooks/useModal';
import AddDocModal from './components/modals/addDoc';
import Modal from 'components/global/modal';

export default function NotesPage() { 

    moment.locale('fa');

    const [ openAddDocModal, showAddDocModal, closeAddDocModal ] = useModal();

    const { value: searchKey, setValue: setSearchKey } = useInput('');
    const { value: documents, setValue: setDocuments } = useInput([]);

    const { getLabDocs } = useNotesActions();
    const labId = useSelector(state => state.lab.labId);

    const navigateToGoogleDocs = (docId) => {
        const externalUrl = `https://docs.google.com/document/d/${docId}`; 
        window.location.href = externalUrl;
    };

    const getDocuments = () => {
        if (labId) {
            getLabDocs({}, `?lab=${labId}`)
            .then(res => {
                setDocuments(res.data);
            })
            .catch(err => {
                console.log("errrrrrrrrr", err);
            })
        }
    }


    useEffect(() => {
        getDocuments();
    }, [labId])


    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                {text.title}
            </div>
            <div className={cs(styles['list_header'])}>
                <div className={cs(styles['row_1'])}>
                    <div className={cs(styles['titles_wrapper'], styles['items'])}>
                        <p> {text.list_title_1} </p>
                        <Button
                            height={'30px'}
                            color={colors['main-color-100']} 
                            onClick={() => showAddDocModal()}
                            text={text.add_btn} 
                            fontSize={'12px'}
                            fontWeight={'500'}
                            fontFamily={'pinar_medium'}
                            borderRadius={'12px'}
                        />
                    </div>
                    <div className={cs(styles['tools_wrapper'], styles['items'])}>
                        <div> 
                            <SearchBar
                                height={'40px'} 
                                borderRadius={'12px'} 
                                placeholder={`نام فایل را جست و جو کنید`} 
                                fontSize={'14px'}
                                value={searchKey}
                                setValue={setSearchKey}
                            /> 
                        </div>
                        <div className={cs(styles['filter_icon'])}> 
                            <img 
                                src={filterIcon}
                                alt='filter icon'
                            />
                        </div>
                    </div>
                </div>
                <div className={cs(styles['row_2'])}>
                    <div className={cs(styles['cols'])}  >
                        <p> {text.header_1} </p>
                    </div>
                    <div className={cs(styles['cols'])}>
                        <p> {text.header_2} </p>
                    </div>
                    <div className={cs(styles['cols'], styles['col_3'])}>
                        <p> {text.header_3} </p>
                    </div>
                </div>

            </div>
            <div className={cs(styles['list_body'])} style={{...(documents.length > 5 && {paddingLeft: '30px'})}}>
                {
                    documents && documents.map((doc, i) => 
                        <div className={cs(styles['row'])} key={i} onClick={() => navigateToGoogleDocs(doc?.documentId)}> 
                            <div className={cs(styles['doc_name'])}> {doc?.name} </div>
                            <div className={cs(styles['doc_users'])}>
                                <UserAvatarCollage users={doc?.Users} />
                            </div>
                            <div className={cs(styles['doc_creationDate'])}> {moment(doc?.createdAt)._d.toLocaleDateString('fa-IR')} </div>
                        </div>
                    )
                }
            
            </div>
            
            <Modal
                isOpen={openAddDocModal} 
                close={closeAddDocModal} 
                content={
                    <div className={cs(styles['add_doc_modal'])} style={{display: openAddDocModal ? 'block' : 'none'}} id='#users_modal'>
                        <AddDocModal close={closeAddDocModal} updateDocs={getDocuments}/>
                    </div>
                }
            />
        </div>
    )
}