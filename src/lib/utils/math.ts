/**
 * 
 * @param x the number to round.
 * @param digits the number of decimal places to keep.
 * @returns x rounded to digits'th decimal place.
 */
export const round = (x: number, digits: number) => {
    const tenPow = Math.pow(10, digits);
    return Math.round((x + Number.EPSILON) * tenPow) / tenPow;
}