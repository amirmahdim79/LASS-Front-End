import {default as cs} from 'classnames'
import styles from './style.module.scss'
import UploadIcon from 'assets/icons/contents/upload/dark-color.svg';
import { text } from './constants';
import { useModal } from 'hooks/useModal';
import useInput from 'hooks/useInputHandler';
import Minus from 'assets/icons/essential/minus/main_color.svg';
import Add from 'assets/icons/essential/add/main_color.svg';
import DarkAdd from 'assets/icons/essential/add/dark-color.svg';
import Folder from 'assets/icons/files/folder-2/main-color.svg';
import More from 'assets/icons/settings/more-2/dark-color.svg';
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"
import { formatFileSize } from 'utils/mapper';
import TextInput from 'components/global/inputs/textInput';
import { useEffect } from 'react';
import { useArticlesActions } from 'pages/user/articlesDataBase/hooks/useArticlesActions';
import axios from "axios";
import { GET_TOKEN } from 'utils/tokenHandler';


const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT,
    timeout: 600000,
    withCredentials: true,
})


export default function UploadFile({updatePapers}) { 
    
    const [ openUploadModal, showUploadModal, closeUploadModal ] = useModal();
    const [ openTagsListModal, showTagsListModal, closeTagsListModal ] = useModal();
    const [ openProgressBarModal, showProgressBarModal, closeProgressBarModal ] = useModal();

    const { value: fileData, setValue: setFileData } = useInput({});
    const { value: tag, onChange: onChangeTag, setValue: setTag } = useInput('');
    const { value: debouncedTag, setValue: setDebouncedTag } = useInput('');

    const { value: tags, setValue: setTags } = useInput([]);
    const { value: suggestedTags, setValue: setSuggestedTags } = useInput([]);
    const { value: progress, setValue: setProgress } = useInput(0);
    const { value: hasTag, setValue: setHasTag } = useInput(false);
    
    const { searchTags } = useArticlesActions();


    const handleChange = (e) => {
        setFileData({});

        let data = e.target.files[0];
        setFileData({
            name: data.name,
            size: data.size,
            tags: [],
            data: e.target.files[0],
        })
        showUploadModal();
    }

    const cancelUpload = () => {
        const input = document.getElementById('file-input');
        input.value = '';
        setFileData({});
        setTag('');
        setDebouncedTag('');
        setTags([])
        closeUploadModal();
        setHasTag(false);
        closeTagsListModal();
    }

    const submitUpload = () => {
        closeUploadModal();
        showProgressBarModal();

        const input = document.getElementById('file-input');
        const formData = new FormData();
        formData.append('file', fileData.data)


        console.log(formData);
        console.log(fileData);

        fileData.tags
            .filter((item, index) => fileData.tags.indexOf(item) === index)
            .forEach((t) => formData.append("tags[]", t))

        $axios.post('/api-lass/files/paper', formData, {
            headers: {
                'x-auth-token': GET_TOKEN()
            },
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            }
        })
        .then(() => {
            closeProgressBarModal();
            updatePapers();
        })
        .catch(err => {
            console.log(err)
            closeProgressBarModal();
        })
        .finally(() => {
            input.value = '';
            setHasTag(false);
            setFileData({});
            setTags([])
            closeTagsListModal();
            
        })
    }

    const openTagsModal = () => {
        !openTagsListModal ? showTagsListModal() : closeTagsListModal()
    }

    const addTag = () => {
        setHasTag(true)
        let tagsList = tags;
        tagsList.push(tag);
        setTags(tagsList)
        setTag('')
        let data = fileData;
        data.tags = tagsList;
        setFileData(data)
    }  
    
    const removeTag = (name) => {
        let data = {...fileData};
        const index = data.tags.indexOf(name);
        if (index > -1) data.tags.splice(index, 1);
        setFileData(data);
    }



    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTag(tag);
        }, 200); 
    
        return () => {
            clearTimeout(timer);
        };
    }, [tag])

    useEffect(() => {
        searchTags({}, `?query=${debouncedTag}`)
            .then(res => setSuggestedTags(res.data))
            .catch(err => console.log(err))
      }, [debouncedTag]);



    return (
        <div className={cs(styles['container'])} style={{...(!openProgressBarModal  && {justifyContent: 'center'})}}>
            <div className={cs(styles['upload-btn-wrapper'])}>
                <img 
                    src={UploadIcon}
                    alt='upload icon'
                />
                <button className={cs(styles['btn'])}> {text.title} </button>
                <input type="file" id='file-input' name="myfile" onChange={(e) => handleChange(e)}/>
            </div>


            {
                openProgressBarModal &&
                    <div className={cs(styles['upload_progress_bar_wrapper'])}>
                        <div className={cs(styles['folder_icon'])}>
                            <img 
                                src={Folder}
                                alt='folder icon'
                            />
                        </div>

                        <p className={cs(styles['file_name'])}> {fileData?.name && fileData?.name.substring(0, fileData?.name.indexOf('.'))} </p>

                        <div className={cs(styles['progress_data'])}> 
                            <span> {`${progress}%`} </span>
                            <span> {formatFileSize(fileData?.size)} </span>
                        </div>

                        <div className={cs(styles['tags_wrapper'])}> 
                            <div className={cs(styles['inner_wrapper'])}>
                                {
                                    (fileData.tags && fileData?.tags.length !== 0) && fileData.tags.map((tag, i) => 
                                        <span> {`#${tag}`} </span>
                                    )
                                }
                            </div>
                        </div>

                        <div className={cs(styles['more_icon'])}>
                            <img 
                                src={More}
                                alt = 'more icon'
                            />
                        </div>

                        <div className={cs(styles['progress_bar_wrapper'])}>
                            <div className={cs(styles['progress_bar'])} style={{width: `${progress}%`}}/>
                        </div>
                    </div>
            }

            <div className={cs(styles['upload-file_preview'] , styles['opacity'])} style={{display: openUploadModal ? 'block' : 'none'}}>
                <div className={cs(styles['modal_content'])}>
                    <div className={cs(styles['modal_data'])}>
                        <div className={cs(styles['col_1'])}>
                            <div className={cs(styles['header'])}> {text.header_1} </div>
                            <div className={cs(styles['body'], styles['col_1_body'])}>
                                <span> {fileData?.name} </span>
                            </div>
                        </div>
                        <div className={cs(styles['col_2'])}>
                            <div className={cs(styles['header'])}> {text.header_2} </div>
                            <div className={cs(styles['body'], styles['col_2_body'])}>
                                {formatFileSize(fileData?.size)}
                            </div>
                        </div>
                        <div className={cs(styles['col_3'])}>
                            <div className={cs(styles['header'])}> {text.header_3} </div>
                            <div className={cs(styles['body'], styles['col_3_body'])} style={{...(hasTag && {display: 'flex'})}}>
                                {
                                    fileData.tags && fileData.tags.map((tag, i) => {
                                        return (
                                            <div className={cs(styles['tag_name'])}>
                                                <p> {`#${tag}`} </p>
                                                <img 
                                                    src={Minus}
                                                    alt='minus icon'
                                                    onClick={() => removeTag(tag)}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            <div className={cs(styles['add_tag_container'])}> 
                                    <img 
                                        src={Add}
                                        alt='add icon'
                                        className={openTagsListModal && cs(styles['active_add_icon'])}
                                        onClick={() => openTagsModal()}
                                    /> 
                                    {openTagsListModal && 

                                        <div className={cs(styles['tags_modal'])}>
                                            <div className={cs(styles['header'])}>
                                                { tag && 
                                                    <img 
                                                        src={DarkAdd}
                                                        alt='close icon'
                                                        className={cs(styles['active_add_icon'])}
                                                        onClick={() => setTag('')}
                                                    /> 
                                                }
                                               
                                                <TextInput
                                                    value={tag}
                                                    onChange={onChangeTag}
                                                    dir={'ltr'}
                                                    height={'38px'}
                                                    fontSize={'12px'}
                                                    fontWeight={'600'}
                                                    color={colors['dark-shades-100']}
                                                />
                                            </div>
                                            <div className={cs(styles['tags_list'])}>
                                                {
                                                    suggestedTags.length !== 0 && 
                                                        suggestedTags.map((tag, i) => 
                                                            <p key={i} onClick={(e) => onChangeTag(e.target.textContent)}>{tag}</p>
                                                        )
                                                }
                                            </div>
                                            <div className={cs(styles['add_button_container'])}>
                                                <img 
                                                    src={DarkAdd}
                                                    alt='add icon'
                                                    onClick={() => addTag()}
                                                />
                                            </div>
                                            
                                        </div> 
                                    }
                                                                  
                                </div>
                        </div>
                    </div>



                    <div className={cs(styles['btns_container'])}>
                        <Button
                            color={colors['main-color-100']} 
                            onClick={() => submitUpload()}
                            text={text.button_1} 
                            width={'355px'}
                            // disabled={ !state.email }
                        />
                        <Button
                            color={colors['main-color-100']} 
                            outlined={true}
                            onClick={() => cancelUpload()}
                            text={text.button_2} 
                            width={'355px'}
                        />
                    </div>


                </div>
            </div>

            

            



        </div>
    )
}

