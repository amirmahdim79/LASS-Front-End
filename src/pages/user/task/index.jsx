import { default as cs } from 'classnames'
import { useParams } from 'react-router-dom';
import { text } from './constants';
import colors from "styles/colors.module.scss"
import styles from './task.module.scss'
import chartImg from 'assets/chart.svg';
import UploadReport from 'components/uploadReport';
import Button from 'components/global/button';
import CheckBoxV1 from 'components/global/checkbox/v1';


export default function Task() {

    const params = useParams();

    const constantText = text[params.type]

    return (
        <div className={cs(styles['container'])}>
            <div className={cs(styles['chart_container'])}>
                <p className={cs(styles['title'])}> {constantText.chart.title} </p>

                { params.type === 'upload' && <p className={cs(styles['subtitle'])}> تعداد گزارش‌کارهای تحویل شده در هفته گذشته </p> }
                { params.type === 'reading' &&  <span className={cs(styles['subtitle'])}> تعداد مقالات مطالعه شده با هشتگ <span>  {'E-Learning#'} </span> در هفته گذشته!</span> }

                <img  src={chartImg} alt='chart' />

                { params.type === 'upload' && <span className={cs(styles['info'])}> استریک آپلود به موقع گزارش کار شما <span>  {'7'} </span> دفعه می‌باشد </span> }
            </div>

            <div className={cs(styles['task_container'])}>
                <p className={cs(styles['title'])}> {constantText.title} </p>

                <div className={cs(styles['date_wrapper'])}>
                    <span> {constantText.date} :</span>
                    <span className={cs(styles['date'])}> {'1402/08/29'} </span>
                </div>

                {
                    params.type === 'upload' && 
                        <div className={cs(styles['upload_container'])}>

                            <p className={cs(styles['subtitle'])}> {constantText.subtitle} </p>
                            <div className={cs(styles['upload_wrapper'])}>
                                <UploadReport 
                                    text={'برای آپلود فایل کلیک کنید یا فایل را بر روی مستطیل بکشید'}
                                    info={'فرمت‌های قابل قبول عبارتند از: pdf، docx'}
                                />
                            </div>

                            <div className={cs(styles['btn_container'])}>
                                <Button
                                    color={colors['main-color_100']} 
                                    // onClick={() => createLab()}
                                    text={constantText.btn} 
                                    // disabled={!email || !password}
                                />
                            </div>
                        </div>
                }

                {
                    params.type === 'reading' && 
                        <div className={cs(styles['reading_articles_container'])}>
                            <div className={cs(styles['desc_container'])}>
                                <span className={cs(styles['desc'])}> پس از مطالعه {'10'}  مقاله با هشتگ <span>  {'E-Learning#'} </span> چک‌باکس را پر کنید. </span>
                                <CheckBoxV1 width={'30px'} height={'30px'} />
                            </div>                            
                        </div>
                }

            </div>
        </div>
    )

}