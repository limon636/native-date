
module.exports.is_date = (d) => {
    let date_instance = new Date(d) instanceof Date;
    let year = new Date(d).getFullYear();
    let month = new Date(d).getMonth();
    let day = new Date(d).getDate();
    let year_valid = new Date(year, month, day).getFullYear() === year;
    let month_valid = new Date(year, month, day).getMonth() === month;
    let day_valid = new Date(year, month, day).getDate() === day;
    if(date_instance && year_valid && month_valid && day_valid){
        return true;
    }else{
        return false;
    }
}

module.exports.is_leap_year = (d) => {
    let year = new Date(d).getFullYear();
    return new Date(year, 1, 29).getDate() === 29;
}

module.exports.is_after = (d1, d2) => {
    return new Date(d1) > new Date(d2);
}

module.exports.is_before = (d1, d2) => {
    return new Date(d1) < new Date(d2);
}

module.exports.diff = (d1, d2) => {
    return Math.ceil((new Date(d1) - new Date(d2)) / 1000 / 60 / 60 / 24);
}

module.exports.add = (d, days) => {
    const now = new Date(d);
    return set_format(now.setDate(now.getDate() + days));
}

module.exports.sub = (d, days) => {
    const now = new Date(d);
    return set_format(now.setDate(now.getDate() - days));
}
module.exports.format = (d) => {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? '0'+month : month;
    day = day < 10 ? '0'+day : day;
    return year + '-' + month + '-' + day;
}

function set_format(d){
    // return new Date(d).toISOString().slice(0, 10);
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? '0'+month : month;
    day = day < 10 ? '0'+day : day;
    return year + '-' + month + '-' + day;
}
