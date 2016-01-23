String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

String.prototype.upperCaseSplit = function() {
    return this.replace(/([A-Z])/g, ' $1');
};

String.prototype.toSentenceCase = function() {
    var split = this.toLowerCase().split('.');
    for (var i=0; i < split.length; i++) {
        if (!split[i]) continue;
        var t = split[i].trim();
        split[i] = split[i].replace(t, t[0].toUpperCase() + t.substring(1, t.length));
    }

    return split.join('.');
};

String.prototype.replaceAll = function (str1, str2) {
    var reg = new RegExp(str1, 'g');
    return this.replace(reg, str2);
};

String.generateRandom = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}