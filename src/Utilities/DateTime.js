 const getJSDateFromDb = (dbDate) =>{
    console.log('DB DATE: ', dbDate)
    dbDate = dbDate.toString().replace('Z', '').replace('T', ' ')
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = dbDate.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    return d
}

const getAgeFromBod = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getDbDate =(value) =>{
    const date = new Date(value)
    const year = date.getFullYear()
    const month = date.getMonth() +1
    const day = date.getDate()
    return year + '-' + month +'-' + day
}
export {
    getJSDateFromDb,
    getAgeFromBod,
    getDbDate
}