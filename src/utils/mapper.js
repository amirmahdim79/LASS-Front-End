import moment from 'moment';
import 'moment/locale/fa';
import colors from "styles/colors.module.scss"

export const truncateText = (string, length) => {
    if (string.length > length)
        return string.substring(0,length)+'...';
    else
        return string;
}

export const formatFileSize = (bytes,decimalPoint) => {
    if(bytes == 0) return '0 Bytes';
    var k = 1000,
        dm = decimalPoint || 2,
        sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const toEnDigit = (number) => {
    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
    if(typeof number === 'string')
    {
        for(let i=0; i<10; i++)
        {
        number = number.replace(persianNumbers[i], i);
        }
    }

    return number
}

export const weekday = (dayNum) => {
    if (dayNum === 0) return 'شنبه'
    else if (dayNum === 1) return 'یکشنبه'
    else if (dayNum === 2) return 'دوشنبه'
    else if (dayNum === 3) return 'سه شنبه'
    else if (dayNum === 4) return 'چهارشنبه'
    else if (dayNum === 5) return 'پنج شنبه'
    else if (dayNum === 6) return 'جمعه'
}

export const month = (monthNum) => {

    monthNum = toEnDigit(monthNum)

    if (monthNum == 1) return 'فروردین'
    else if (monthNum == 2) return 'اردیبهشت'
    else if (monthNum == 3) return 'خرداد'
    else if (monthNum == 4) return 'تیر'
    else if (monthNum == 5) return 'مرداد'
    else if (monthNum == 6) return 'شهریور'
    else if (monthNum == 7) return 'مهر'
    else if (monthNum == 8) return 'آبان'
    else if (monthNum == 9) return 'آذر'
    else if (monthNum == 10) return 'دی'
    else if (monthNum == 11) return 'بهمن'
    else if (monthNum == 12) return 'اسفند'
}

export const getFirstLetters = (inputString) => {
    const words = inputString.split(' ');
    const firstLetters = words.map(word => word[0]);
    return firstLetters.join(' ');
}

export const sortForum = (arr) => {
    let sortedArr = [...arr].sort(function(a, b) {
        let keyA = moment(a.start);
        let keyB = moment(b.start);
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    return sortedArr
}

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const isBefore = (date) => {
    const today = moment();
    if (moment(date).diff(today) < 0) return true;
    else return false
}

export const degreeMapper = (degree) => {
    switch (degree) {
        case 'کارشناسی':
            return 'undergrad'
        case 'کارشناسی ارشد':
            return 'masters'
        case 'دکترا':
            return 'phd'
        case 'فوق دکترا':
            return 'postDoc'
        case 'کارآموز':
            return 'intern'
        case 'undergrad':
            return 'کارشناسی'
        case 'masters':
            return 'کارشناسی ارشد'
        case 'phd':
            return 'دکترا'
        case 'postDoc':
            return 'فوق دکترا'
        case 'intern':
            return 'کارآموز'
        default:
            return 'کارشناسی'
    }
}

export const waitingTimeColorDecider = (time) => {
    const today = moment();

    let diff = moment.duration(moment(time).diff(moment(today)));

    if (diff._data.years !== 0) {
        return {
            text: `${Math.abs(diff._data.years)} سال`,
            color: `${colors['error-100']}`
        }
    } else if (diff._data.months !== 0) {
        return {
            text: `${Math.abs(diff._data.months)} ماه`,
            color: `${colors['error-100']}`
        }
    } else if (diff._data.days !== 0) {
        let ms = Math.abs(diff._milliseconds)
        return {
            text: `${Math.abs(diff._data.days)} روز`,
            color: `${ ms >= 604800000 ? `${colors['error-100']}` : ( ms >= 172800000 ?  `${colors['warning-dark-100']}` : `${colors['success-100']}`)}`
        }
    } else if (diff._data.hours !== 0) {
        return {
            text: `${Math.abs(diff._data.hours)} ساعت`,
            color: `${colors['success-100']}`
        }
    } else if (diff._data.minutes !== 0) {
        return {
            text: `${Math.abs(diff._data.minutes)} دقیقه`,
            color: `${colors['success-100']}`
        }
    } else if (diff._data.seconds !== 0) {
        return {
            text: `${Math.abs(diff._data.seconds)} ثانیه`,
            color: `${colors['success-100']}`
        }
    }
}
  