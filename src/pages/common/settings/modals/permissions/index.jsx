import { default as cs } from 'classnames'
import { useEffect, useReducer } from 'react';
import { text } from './constants';
import { reducer } from './reducers';
import Button from 'components/global/button';
import SwitchV2 from 'components/global/toggleSwitchV2';
import Row from './components/row';
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"

export default function PermissionsModal({submit, data, permissions, userPermissions, isOpen, load}) {

    const initialState = {
        totalPermissions: false
    }

    const [ state , dispatch] = useReducer( reducer, initialState );

    const onClick = () => {
        submit(state)
    }

    const selectAll = () => {
        if (state.totalPermissions) {
            console.log("to reset");
            dispatch({payload: {type: 'totalPermissions', value: false}})
            permissions.map(p => dispatch({payload: {type: 'reset', value: p.value}}))
        }
        else {
            console.log("to set");
            dispatch({payload: {type: 'totalPermissions', value: true}})
            permissions.map(p => dispatch({payload: {type: 'set_all', value: p.value}}))
        }
    }

    useEffect(() => {
        if (isOpen) {
            permissions.map(p => dispatch({payload: {type: 'add_new_field', value: p.value, initialValue: userPermissions.includes(p.value)}}))
            dispatch({payload: {type: 'totalPermissions', value: userPermissions.length === permissions.length}})
        }
    }, [isOpen])

    
    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['header'])}>
                <p> {`${text.title} ${data.firstName} ${data.lastName}`} </p>
                <SwitchV2 
                    value={state.totalPermissions} 
                    onClick={() => selectAll()} 
                    name={'totalPermissions'} id={'totalPermissions'}
                />
            </div>
            <div className={cs(styles['content'])}>
                {
                    permissions && permissions.map((p, i) => 
                        <Row 
                            title={p?.name}
                            desc={p?.desc}
                            value={state[p?.value]}
                            onClick={() => dispatch({payload: {type: p?.value, value: !state[p?.value]}})}
                            name={p?.value}
                            id={p?.value}
                        />
                    )
                }
            </div>

            <div className={cs(styles['footer'])}>
                <Button
                    color={colors['main-color-100']} 
                    onClick={() => onClick()}
                    text={text.button} 
                    width={'255px'}
                    // disabled={checkSubmitIsDisable()}
                    load={load}
                />
            </div>
        </div>
    )
}