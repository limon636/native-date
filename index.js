

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

module.exports.add = (d, days, type = 'YYYY-MM-DD') => {
    const now = new Date(d);
    return set_format(now.setDate(now.getDate() + days), type);
}

module.exports.sub = (d, days, type = 'YYYY-MM-DD') => {
    const now = new Date(d);
    return set_format(now.setDate(now.getDate() - days), type);
}
module.exports.format = (d, type = 'YYYY-MM-DD') => {
    return set_format(d, type);
}

function set_format(d, type = 'YYYY-MM-DD'){
    // return new Date(d).toISOString().slice(0, 10);
    const date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? '0'+month : month;
    let short_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let long_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let short_month = date.toLocaleString('en-us', {month: 'short'});
    let long_month = date.toLocaleString('en-us', {month: 'long'});
    let day_number = date.getDay();
    let formatted = '';
    let char = '';
    let type_arr = [];
    let comma_pos = -1;
    if(type.indexOf('-') != -1){
        day = day < 10 ? '0'+day : day;
        char = '-';
    } else if(type.indexOf('/') != -1){
        day = day < 10 ? '0'+day : day;
        char = '/';
    } else if(type.indexOf(' ') != -1){
        char = ' ';
    }
    if(type == 'll'){
        return short_month + ' ' + day + ', ' + year;
    }else if(type == 'LL'){
        return long_month + ' ' + day + ', ' + year;
    }else{
        if(char != ''){
            type_arr = type.split(char);
        }else{
            type_arr = [type];
        }
        let type_arr_length = type_arr.length - 1;
        type_arr.map((val,index) => {
            comma_pos = val.indexOf(',');
            val = val.replace(',', '');
            if(val == 'YYYY'){
                formatted += year;
            }else if(val == 'MM'){
                formatted += month;
            }else if(val == 'MMM'){
                formatted += short_month;
            }else if(val == 'MMMM'){
                formatted += long_month;
            }else if(val == 'DD'){
                formatted += day;
            }else if(val == 'dd'){
                formatted += short_days[day_number];
            }else if(val == 'dddd'){
                formatted += long_days[day_number];
            }

            if(comma_pos != -1){
                formatted += ',';
            }
            if(type_arr_length != index){
                formatted += char;
            }
        });
    }
    return formatted;
}

