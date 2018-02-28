/**
 * Chirit
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/chirit
 */

export default class Utility {

    static parseQueryString() {
        const params = {};
        if (window.location.search.length > 1) {
            const queries = window.location.search.substring(1).split('&');
            for (var i = 0; i < queries.length; i++) {
                const kv = queries[i].split('=');
                const key = decodeURIComponent(kv[0]);
                const value = kv[1] ? decodeURIComponent(kv[1]) : '';
                params[key] = value;
            }
        }
        return params;
    }

    static convertByteToHumanReadable(byte) {
        byte = parseFloat(byte);

        const kb = 1024;
        const mb = 1024 * kb;
        const gb = 1024 * mb;
        const tb = 1024 * gb;
        const pb = 1024 * tb;
        const eb = 1024 * pb;
        const zb = 1024 * eb;
        const yb = 1024 * zb;

        let text = '';
        if (byte < kb) {
            text = `${byte.toFixed(0)} B`;
        }
        else if (byte < mb) {
            text = `${(byte / kb).toFixed(2)} KB`;
        }
        else if (byte < gb) {
            text = `${(byte / mb).toFixed(2)} MB`;
        }
        else if (byte < tb) {
            text = `${(byte / gb).toFixed(2)} GB`;
        }
        else if (byte < pb) {
            text = `${(byte / tb).toFixed(2)} TB`;
        }
        else if (byte < eb) {
            text = `${(byte / pb).toFixed(2)} PB`;
        }
        else if (byte < zb) {
            text = `${(byte / eb).toFixed(2)} EB`;
        }
        else if (byte < yb) {
            text = `${(byte / zb).toFixed(2)} ZB`;
        }
        else if (byte >= yb) {
            text = `${(byte / yb).toFixed(2)} YB`;
        }
        return text;
    }

    static convertDatetimeToHumanReadable(datetime) {
        // Must be datetime in ISO 8601 format

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30 * day;
        const year = 365 * day;

        const today = new Date();
        const date = new Date(datetime);
        const timeDelta = today.getTime() - date.getTime();
        let timeDistance = 0;
        let timeUnit = '';

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

        let text = '';
        if (timeDistance === 0) {
            text = 'Just now';
        }
        else if (timeDistance === 1) {
            text = `${timeDistance} ${timeUnit} ago`;
        }
        else if (timeDistance > 1) {
            text = `${timeDistance} ${timeUnit}s ago`;
        }
        return text;
    }

    static generateRandomString(length = 16, addition = '') {
        length = parseInt(length, 10);

        const strings = '0123456789'
            + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            + 'abcdefghijklmnopqrstuvwxyz'
            + addition;
        const stringArray = strings.split('');
        let randomString = '';
        for (var i = 0; i < length; i++) {
            randomString += stringArray[Math.floor(Math.random() * stringArray.length)];
        }
        return randomString;
    }

}
