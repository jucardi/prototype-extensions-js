Date.compare = function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
        isFinite(a = this.convert(a).valueOf()) &&
        isFinite(b = this.convert(b).valueOf()) ?
        (a > b) - (a < b) :
            NaN
    );
};

Date.inRange = function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return (
        isFinite(d = this.convert(d).valueOf()) &&
        isFinite(start = this.convert(start).valueOf()) &&
        isFinite(end = this.convert(end).valueOf()) ?
        start <= d && d <= end :
            NaN
    );
};

Date.parseEx = function (str) {
    // Attempts to parse depending on the browser. Solve parsing issues with I. E. < 10
    var ret = new Date(str);
    ret = isNaN(ret) ? new Date(str.replace(/-/g, '/')) : ret;

    return ret;
};

Date.getDiff = function(date1, date2) {
    if (date2 >= date1) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, totalMs: 0 };
    }

    var diff = date1 - date2;
    var ret = {};

    ret.totalMs      = diff;
    ret.days         = Math.floor(diff / (1000 * 60 * 60 * 24));
    ret.hours        = Math.floor((diff / (1000 * 60 * 60)) - (ret.days * 24));
    ret.minutes      = Math.floor((diff / (1000 * 60)) - (ret.days * 24 * 60) - (ret.hours * 60));
    ret.seconds      = Math.floor((diff / 1000) - (ret.days * 24 * 60 * 60) - (ret.hours * 60 * 60) - (ret.minutes * 60));
    ret.milliseconds = diff % 1000;

    return ret;
};

Date.getMonthString = function (month, shortMode) {
    switch (month) {
        case 1:  return shortMode ? 'Jan' : 'January';
        case 2:  return shortMode ? 'Feb' : 'February';
        case 3:  return shortMode ? 'Mar' : 'March';
        case 4:  return shortMode ? 'Apr' : 'April';
        case 5:  return shortMode ? 'May' : 'May';
        case 6:  return shortMode ? 'Jun' : 'June';
        case 7:  return shortMode ? 'Jul' : 'July';
        case 8:  return shortMode ? 'Aug' : 'August';
        case 9:  return shortMode ? 'Sep' : 'September';
        case 10: return shortMode ? 'Oct' : 'October';
        case 11: return shortMode ? 'Nov' : 'November';
        case 12: return shortMode ? 'Dec' : 'December';
    }

    return 'Invalid month';
};

Date.isValidDate = function(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]")
        return false;
    return !isNaN(d.getTime());
};

Date.prototype.toStringEx = function (expression) {
    // Converts the value of the current Date object to its equivalent string representation using the specified format
    // and the formatting conventions following the ISO 8601 standard.
    //
    // Example: "yyyy-MM-dd HH:mm:ss"

    if (!Date.isValidDate(this))
        return 'invalid';

    var ret   = expression;
    var day   = this.getDate();
    var month = this.getMonth() + 1; // For JS 0 is January and 11 December which is the reason for the +1
    var year  = this.getFullYear();
    var hour  = this.getHours();
    var min   = this.getMinutes();
    var sec   = this.getSeconds();

    var parsedHour12 = hour > 12 ? hour - 12 : hour;

    ret = ret.replace('HH', hour < 10 ? '0' + hour : hour);
    ret = ret.replace('H', hour);
    ret = ret.replace('hh', parsedHour12 == 0 ? 12 : (parsedHour12 < 10 ? '0' : '') + parsedHour12);
    ret = ret.replace('h',  parsedHour12 == 0 ? 12 : parsedHour12);
    ret = ret.replace('mm', min < 10 ? '0' + min : min);
    ret = ret.replace('m', min);
    ret = ret.replace('ss', sec < 10 ? '0' + sec : sec);
    ret = ret.replace('s', sec);
    ret = ret.replace('dd', day < 10 ? '0' + day : day);
    ret = ret.replace('d', day);
    ret = ret.replace('yyyy', year);
    ret = ret.replace('yy', year.toString().substring(2,4));
    ret = ret.replace('y', parseInt(year.toString().substring(2,4)));
    ret = ret.replace(/M/g, 'Mx');
    ret = ret.replace('MxMxMxMx', Date.getMonthString(month, false));
    ret = ret.replace('MxMxMx', Date.getMonthString(month, true));
    ret = ret.replace('MxMx', month < 10 ? '0' + month : month);
    ret = ret.replace('Mx', month);
    ret = ret.replace('tt', hour >= 12 ? 'PM' : 'AM');

    return ret;
};
