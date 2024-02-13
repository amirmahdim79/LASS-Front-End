import { default as cs } from 'classnames'
import Button from 'components/global/button'
import SelectInputV2 from 'components/global/inputs/selectInputs'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import { useReducer } from 'react'
import { text } from './constants'
import { reducer } from './reducer'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { useLabActions } from '../../hooks/useLabsActions'
import { useDispatch } from 'react-redux'
import { setStudents } from 'store/labSlice'
import { setSupHasLab } from 'store/userSlice'
import { setLabGroups } from 'store/labSlice'
import { setPath } from 'store/labSlice'



export default function AddUserModal({close}) {

    const dispatchLab = useDispatch();

    const initialState = {
        email: '',
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const { enrollUser, userEnrollment, getLabStudents, getMyLabs } = useLabActions();

    const updateLab = () => {
        getMyLabs({}, '?sups=true')
            .then(res =>  {
                    
                if (res.data._id) {
                    dispatchLab(setStudents(res.data?.Students))
                    dispatchLab(setPath(res.data.Paths))
                } else dispatchLab(setSupHasLab(false));                               
            })
            .catch(err => console.log(err))
    }

    const submit = () => {
        const data = {
            email: state.email
        }
        enrollUser({...data})
            .then(res => {
                close();
                updateLab();
                // getLabStudents()
                //     .then(res => dispatchLab(setStudents(res.data)))
                //     .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                dispatch({payload: {type: 'reset', value: initialState}})
            })
    }


    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles['title'])}> {text.title} </p>
            <div className={cs(styles['inputs_container'])}>
                <p className={cs(styles['title'])}> {text.text} </p>
                <div className={cs(styles['inputs'])}>
                    <TextInputV2 
                        value={state.email}
                        onChange={(e)=>dispatch({payload: {type: 'email', value: e.target.value}})}
                        placeholder={text.input_1} 
                        dir={'rtl'}
                    />
                    

                    <Button
                        color={colors['main-color-100']} 
                        onClick={() => submit()}
                        text={text.button} 
                        disabled={ !state.email }
                        load={userEnrollment}
                    />
                </div>
            </div>
        </div>
    )
}