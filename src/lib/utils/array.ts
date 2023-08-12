/**
 * 
 * @see https://bost.ocks.org/mike/shuffle/
 * @param array 
 * @returns 
 */
export function shuffle<T>(array: T[]) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

/**
 * 
 * @see https://stackoverflow.com/a/5915122
 * @param array 
 * @returns 
 */
export function getRandomItem<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}