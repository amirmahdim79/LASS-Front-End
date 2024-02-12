import { default as cs } from 'classnames'
import Button from 'components/global/button'
import TextInputV2 from 'components/global/inputs/textInputs/textInputV2'
import { text } from './constants'
import styles from './style.module.scss'
import colors from "styles/colors.module.scss"
import { useProfileActions } from '../../hooks/useProfileActions'
import useInput from 'hooks/useInputHandler'


export default function EditElementsModal({type, close,upDateData,  email}) {

    const { addSandToUser, addingSandToUser, addSmartiesToUser, addingSmartiesToUser } = useProfileActions();
    const { value: amount, setValue: setAmount } = useInput('');

    const onAdd = () => {
        upDateData();
        close();
        setAmount('')
    }

    const submit = () => {
        if (type === 'smarties') {
            addSmartiesToUser({email: email, smarties: +amount})
                .then(() => onAdd())
                .catch(err => console.log(err))
        } else if (type === 'sand') {
            addSandToUser({email: email, sand: +amount})
                .then(() => onAdd())
                .catch(err => console.log(err))
        }
        
    }
   
    return (
        <div className={cs(styles['container'])}>
            <p className={cs(styles['title'])}> {text.title[type]} </p>
            <div className={cs(styles['inputs_container'])}>
                <div className={cs(styles['inputs'])}>
                    <TextInputV2 
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        placeholder={text.input_1} 
                        dir={'rtl'}
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
                    disabled={!amount.trim().length || +amount <= 0 || isNaN(amount)}
                    load={type === 'smarties' ? addingSmartiesToUser : addingSandToUser}
                />
            </div>


        </div>
    )
}