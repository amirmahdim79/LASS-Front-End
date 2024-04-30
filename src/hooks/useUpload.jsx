import { UpdateSupsProfilePicAPI } from "api/sups";
import { UpdateUserProfilePicAPI } from "api/users";
import { useDispatch } from "react-redux";
import { addUser } from "store/userSlice";
import useAPI from "./useAPI";
import useToast from "./useToast";

const useUpload = (maxVolume=5*1024, userType='user') => {

    const dispatch = useDispatch();
    const { showToast } = useToast()

    const {pending:uploading , request: uploadImage} = useAPI({
        apiMethod: userType === 'user' ? UpdateUserProfilePicAPI : UpdateSupsProfilePicAPI,
        successCallback: (res) => { 
            dispatch(addUser(res.data));
            showToast(`پروفایل شما تغییر کرد`,'success')
        },
        failedCallback: (err) => console.log(err)
    })

    const uploadFile =  async (e) => {
        if(e.target.value) {
            const file = e.target.files[0];
            if(maxVolume >= file.size/1024){
                const fileData = new FormData();
                fileData.append('file',file);
                fileData.append('fileName',file.name)
                return uploadImage(fileData)
            }else {
                showToast(`The file size should not be more than ${maxVolume} KB`,'error')
            }
        }
    }

    return ( {uploading , uploadFile } );
}
 
export default useUpload;