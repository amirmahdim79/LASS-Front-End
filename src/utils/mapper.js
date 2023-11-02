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

