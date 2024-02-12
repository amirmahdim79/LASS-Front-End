import {default as cs} from 'classnames'
import styles from './style.module.scss'
import cameraIcon from 'assets/icons/media/camera/light-color.svg';
import useUpload from 'hooks/useUpload';
import Preloader from 'components/global/preloaders';
import UploadPreloader from 'components/global/button/preloaders'



export default function ProfileV1({profile, loading, editable}) {  

    const {uploading , uploadFile } = useUpload(2000000)

    const handleUploadFile = (e) => {
        uploadFile(e)
        // const input = document.getElementById('my-file');
        // input.value = '';
    }

    return (
        <div className={cs(styles['container'])} >
            {/* <img src={profile} alt='avatar' className={cs(styles['avatar'])}/> */}

            {
                loading 
                    ? <div className={cs(styles['is_loading_avatar'])} />
                    : <div style={{backgroundImage:  `url(${profile})`}}  className={cs(styles['avatar'])}/>
            }

            {
                uploading 
                    ? (
                        <div className={cs(styles['upload_container'])}>
                            <UploadPreloader />
                            
                        </div>
                    ) : ( 
                        (profile && editable) && (
                            <div className={cs(styles['circle_container'])}>
                                <div className={cs(styles['circle'])}>
                                    <img src={cameraIcon} alt='camera icon' />     
                                </div>
                            </div>
                    ))
            }

            {editable && <input type="file" name='avatar' id='my-file' accept="image/* " onChange={() => editable ? handleUploadFile : {}}/> }

        </div>
    )
}

