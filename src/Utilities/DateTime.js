
export const getJSDateFromDb = (dbDate) =>{
    console.log('DB DATE: ', dbDate)
    dbDate = dbDate.toString().replace('Z', '').replace('T', ' ')
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = dbDate.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    return d
}

