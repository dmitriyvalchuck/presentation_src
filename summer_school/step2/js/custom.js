$.blog = $.blog || {};

$.blog.formatDate = function (timestamp, format) {
    // full names of months
    monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    var date = new Date(timestamp);

    function pad(value) {
        return (value.toString().length < 2) ? '0' + value : value;
    }

    return format.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
        var result = '';
        switch (fmtCode) {
            case 'Y':
                result = date.getUTCFullYear();
                break;
            case 'M':
                result = pad(date.getUTCMonth() + 1);
                break;
            case 'n':
                result = monthNames[date.getUTCMonth()];
                break;
            case 'd':
                result = pad(date.getUTCDate());
                break;
            case 'a':
                result = date.getUTCDate();
                break;
            case 'H':
                result = pad(date.getUTCHours());
                break;
            case 'm':
                result = pad(date.getUTCMinutes());
                break;
            case 's':
                result = pad(date.getUTCSeconds());
                break;
            case 'D':
                result = date.getUTCDay();
                break;
            case 'O':
                result = timestamp;
                break;
        }
        return result;
    });
};