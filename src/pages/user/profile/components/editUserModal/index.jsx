import { default as cs } from 'classnames'
import Button from 'components/global/button'
import SelectInputV2 from 'components/global/inputs/selectInputs'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import { useReducer } from 'react'
import { text } from './constants'
import { reducer } from './reducer'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { useProfileActions } from '../../hooks/useProfileActions'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from 'store/userSlice'
// import { useLabActions } from '../../hooks/useLabsActions'



export default function EditUserModal({close}) {

    const initialState = {
        firstName: undefined,
        lastName: undefined,
    }

    const [ state , dispatchData] = useReducer( reducer, initialState );
    const userInfo = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const { updateUserInfo, updatingUserInfo } = useProfileActions();

    const submit = () => {
        const data = {
            firstName: state.firstName,
            lastName: state.lastName,
        }
        updateUserInfo({...data})
            .then((res) => {
                console.log("res", res.data);
                dispatch(addUser(res.data))
                close()
            })
            .catch(err => {
                console.log(err)
                close()
            })
            // .finally(() => {
            //     dispatch({payload: {type: 'reset', value: initialState}})
            // })
    }


    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles['title'])}> {text.title} </p>
            <div className={cs(styles['inputs_container'])}>
                <div className={cs(styles['inputs'])}>
                    <TextInputV2 
                        value={state.firstName}
                        onChange={(e)=>dispatchData({payload: {type: 'firstName', value: e.target.value}})}
                        placeholder={text.input_1} 
                        dir={'rtl'}
                        opacity={'0.7'}
                        width={'245px'}
                        fontFamily={'pinar_light'}
                        fontWeight={'300'}
                        fontSize={'16px'}
                    />
                     <TextInputV2 
                        value={state.lastName}
                        onChange={(e)=>dispatchData({payload: {type: 'lastName', value: e.target.value}})}
                        placeholder={text.input_2} 
                        dir={'rtl'}
                        opacity={'0.7'}
                        width={'245px'}
                        fontFamily={'pinar_light'}
                        fontWeight={'300'}
                        fontSize={'16px'}
                    />
                </div>

                <Button
                    color={colors['main-color-100']} 
                    onClick={() => submit()}
                    text={text.button} 
                    disabled={ state.firstName && state.lastName && !state.firstName.trim().length && !state.lastName.trim().length}
                    load={updatingUserInfo}
                />
            </div>


        </div>
    )
}