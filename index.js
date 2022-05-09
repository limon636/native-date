class native_date{
    constructor(){}

    is_date (d) {
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

    is_leap_year (d) {
        let year = new Date(d).getFullYear();
        return new Date(year, 1, 29).getDate() === 29;
    }

    last_date(d, type='YYYY-MM-DD'){
        let date = new Date(d);
        let res = '';
        res = new Date(date.getFullYear(), date.getMonth()+1, 0);
        return this.format(res, type);
    }

    diff (d1, d2) {
        return Math.ceil((new Date(d1) - new Date(d2)) / 1000 / 60 / 60 / 24);
    }

    add (d, num, dmy='day', type = 'YYYY-MM-DD') {
        const now = new Date(d);
        if(dmy=='day'){
            return this.format(now.setDate(now.getDate() + num), type);
        }else if(dmy=='month'){
            return this.format(now.setMonth(now.getMonth() + num), type);
        }else if(dmy=='year'){
            return this.format(now.setFullYear(now.getFullYear() + num), type);
        }else {
            return this.format(now, type);
        }
    }

    sub (d, num, dmy='day', type = 'YYYY-MM-DD') {
        const now = new Date(d);
        if(dmy=='day'){
            this.format(now.setDate(now.getDate() - num), type);
        }else if(dmy=='month'){
            return this.format(now.setMonth(now.getMonth() - num), type);
        }else if(dmy=='year'){
            return this.format(now.setFullYear(now.getFullYear() - num), type);
        }else {
            return this.format(now, type);
        }
    }

    format (d, type = 'YYYY-MM-DD') {
        if(!this.is_date(d)){
            return 'invalid date';
        }
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
        let hours =  date.getHours() + 1;
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
        }else if(type == 'YYYY-MM-DD HH:mm:ss' || type == 'YYYY-MM-DD hh:mm:ss'){
            return year + '-' + month + '-' + day + ' ' + date.getHours() + ':'+ date.getMinutes() + ':' + date.getSeconds();
        }else if(type='DD/MM/YYYY hh:mm:ss'){
			return day + '/' + month + '/' + year + ' ' + date.getHours() + ':'+ date.getMinutes() + ':' + date.getSeconds();
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
                }else if(val == 'YY'){
					year = year.toString();
                    formatted += year.substring(2);
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
                }else if(val == 'Do'){
                    formatted += day + this.nth(day);
                }else if(val == 'HH:mm:ss'){
                    formatted += hours + ':'+date.getMinutes()+':'+date.getSeconds();
                }else if(val == 'h:mm'){
                    let hour = (date.getHours() %12) + 1;
                    formatted += hour + ':'+date.getMinutes();
                }else if(val == 'A'){
                    let hour = date.getHours();
                    if(hour < 12){
                        formatted += 'AM';
                    }else{
                        formatted += 'PM';
                    }
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
    nth(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    }
}
module.exports = new native_date();

