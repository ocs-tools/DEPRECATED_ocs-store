/**
 * js
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/js
 */

(function(self) {
    'use strict';

    if (!self.js) {
        self.js = {};
    }
    if (!self.js.utility) {
        self.js.utility = {};
    }

    /**
     * Utility functions
     */
    self.js.utility.utility = {
        parseQueryString: function() {
            var params = {};
            if (window.location.search.length > 1) {
                var queries = window.location.search.substring(1).split('&');
                for (var i = 0; i < queries.length; i++) {
                    var kv = queries[i].split('=');
                    var key = decodeURIComponent(kv[0]);
                    var value = '';
                    if (kv[1]) {
                        value = decodeURIComponent(kv[1]);
                    }
                    params[key] = value;
                }
            }
            return params;
        },
        convertByteToHumanReadable: function(byte) {
            byte = parseFloat(byte);
            var kb = 1024;
            var mb = 1024 * kb;
            var gb = 1024 * mb;
            var tb = 1024 * gb;
            var pb = 1024 * tb;
            var eb = 1024 * pb;
            var zb = 1024 * eb;
            var yb = 1024 * zb;

            var text = '';
            if (byte < kb) {
                text = byte.toFixed(0) + ' B';
            }
            else if (byte < mb) {
                text = (byte / kb).toFixed(2) + ' KB';
            }
            else if (byte < gb) {
                text = (byte / mb).toFixed(2) + ' MB';
            }
            else if (byte < tb) {
                text = (byte / gb).toFixed(2) + ' GB';
            }
            else if (byte < pb) {
                text = (byte / tb).toFixed(2) + ' TB';
            }
            else if (byte < eb) {
                text = (byte / pb).toFixed(2) + ' PB';
            }
            else if (byte < zb) {
                text = (byte / eb).toFixed(2) + ' EB';
            }
            else if (byte < yb) {
                text = (byte / zb).toFixed(2) + ' ZB';
            }
            else if (byte >= yb) {
                text = (byte / yb).toFixed(2) + ' YB';
            }
            return text;
        },
        convertDatetimeToHumanReadable: function(datetime) { // Must be datetime in ISO 8601 format
            var minute = 60 * 1000;
            var hour = 60 * minute;
            var day = 24 * hour;
            var week = 7 * day;
            var month = 30 * day;
            var year = 365 * day;

            var today = new Date();
            var date = new Date(datetime);
            var timeDelta = today.getTime() - date.getTime();
            var timeDistance = 0;
            var timeUnit = '';

            if (timeDelta >= year) {
                timeDistance = timeDelta / year;
                timeUnit = 'year';
            }
            else if (timeDelta >= month) {
                timeDistance = timeDelta / month;
                timeUnit = 'month';
            }
            else if (timeDelta >= week) {
                timeDistance = timeDelta / week;
                timeUnit = 'week';
            }
            else if (timeDelta >= day) {
                timeDistance = timeDelta / day;
                timeUnit = 'day';
            }
            else if (timeDelta >= hour) {
                timeDistance = timeDelta / hour;
                timeUnit = 'hour';
            }
            else if (timeDelta >= minute) {
                timeDistance = timeDelta / minute;
                timeUnit = 'minute';
            }
            timeDistance = Math.floor(timeDistance);

            var text = '';
            if (timeDistance == 0) {
                text = 'Just now';
            }
            else if (timeDistance == 1) {
                text = timeDistance + ' ' + timeUnit + ' ago';
            }
            else if (timeDistance > 1) {
                text = timeDistance + ' ' + timeUnit + 's ago';
            }
            return text;
        },
        generateRandomString: function(length, addition) {
            length = length ? parseInt(length, 10) : 10;
            addition = addition ? addition : '';
            var strings = '0123456789'
                + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                + 'abcdefghijklmnopqrstuvwxyz'
                + addition;
            var arrayString = strings.split('');
            var randomString = '';
            for (var i = 0; i < length; i++) {
                randomString += arrayString[Math.floor(Math.random() * arrayString.length)];
            }
            return randomString;
        }
    };

})(typeof self !== 'undefined' ? self : this);
