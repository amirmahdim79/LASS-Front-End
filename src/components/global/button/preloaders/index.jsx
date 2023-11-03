import preloader1 from 'assets/gifs/btn_preloader_1.gif'
import preloader2 from 'assets/gifs/btn_preloader_2.gif'
import preloader3 from 'assets/gifs/btn_preloader_3.gif'

export default function Preloader({type='filled', color}) {

    return (
        type === 'filled' 
            ?
                <img 
                    src={preloader1}
                    alt='loading gif'
                    style={{width: '24px', height: '24px'}}
                />
            :
                <img 
                    src={preloader1}
                    alt='loading gif'
                    style={{width: '24px', height: '24px'}}
                />
    )
}