import {default as cs} from 'classnames'
import { useModal } from 'hooks/useModal';
import styles from './style.module.scss'
import UploadIcon from 'assets/icons/contents/upload-light/dark-color.svg';
import Folder from 'assets/icons/files/folder-2/main-color.svg';
import axios from "axios";
import { GET_TOKEN } from 'utils/tokenHandler';
import useInput from 'hooks/useInputHandler';
import { formatFileSize } from 'utils/mapper';
import { useParams } from 'react-router-dom';
import Button from 'components/global/button';
import colors from "styles/colors.module.scss"
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { isEmptyObject } from 'utils/mapper';

const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_ROOT,
    timeout: 600000,
    withCredentials: true,
})

export default function UploadReport({text, info, btnText, type, disabled}) {

    const { showToast } = useToast();

    const [ openProgressBarModal, showProgressBarModal, closeProgressBarModal ] = useModal();

    const { value: fileData, setValue: setFileData } = useInput({});
    const { value: progress, setValue: setProgress } = useInput(0);
    const { value: loading, setValue: setLoading } = useInput(false);
    const params = useParams();

    const submitUpload = () => {

        const input = document.getElementById('file-input');
        const formData = new FormData();
        formData.append('file', fileData.data)
        if (type === 'usertask') formData.append('UserTask', params.id);
        else formData.append('Task', params.id);


        setLoading(true);
        $axios.post(`/api-lass/${type === 'usertask' ? 'userTasks' : 'task'}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': GET_TOKEN()
            },
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            }
        })
        .then((res) => {
            console.log("sucessssssssssssssssssss", res.data);
            showToast('آپلود موفقیت آمیز بود', 'success')
            closeProgressBarModal();         
            setProgress(0)       
        })
        .catch(err => {
            console.log(err)
            closeProgressBarModal();
        })
        .finally(() => {
            input.value = '';
            setLoading(false);
        })
    }


    const handleChange = (e) => {
        setFileData({});

        let data = e.target.files[0];
        setFileData({
            name: data.name,
            size: data.size,
            data: e.target.files[0],
        })
        showProgressBarModal();
        // submitUpload();
    }



    return (
        <div className={cs(styles['wrapper'])}>
            <div className={cs(styles['container'])} style={{...(!openProgressBarModal  && {justifyContent: 'center', paddingBottom:'30px'})}}>
                <div className={cs(styles['upload_btn_wrapper'])}>
                    <img 
                        src={UploadIcon}
                        alt='upload icon'
                    />
                    <div className={cs(styles['btn_wrapper'])}>
                        <button className={cs(styles['btn'])}> {text} </button>
                        <input type="file" id='file-input' name="myfile" disabled={disabled} onChange={(e) => handleChange(e)}  accept=".docx,.pdf"/>
                        <p className={cs(styles['upload_info'])}> {info} </p>
                    </div>
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

                            <div className={cs(styles['progress_bar_wrapper'])}>
                                <div className={cs(styles['progress_bar'])} style={{width: `${progress}%`}}/>
                            </div> 
                        </div>
                }
            </div>
                <div className={cs(styles['btn_container'])}>
                <Button
                    color={colors['main-color-100']} 
                    onClick={() => submitUpload()}
                    text={btnText} 
                    disabled={isEmptyObject(fileData)}
                    load={loading}
                />
            </div>
        </div>
    )

}