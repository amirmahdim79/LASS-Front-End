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

    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
    if(typeof monthNum === 'string')
    {
        for(let i=0; i<10; i++)
        {
        monthNum = monthNum.replace(persianNumbers[i], i);
        }
    }

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
