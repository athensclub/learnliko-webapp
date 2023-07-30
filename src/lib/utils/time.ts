/**
 * 
 * @see https://stackoverflow.com/a/8888498
 * @param date 
 * @returns 
 */
export const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

/**
 * 
 * @see https://stackoverflow.com/a/1322771
 * @param seconds 
 */
export const secondsToHHMM = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}