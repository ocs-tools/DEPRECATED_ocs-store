/**
 * Chirit
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/chirit
 */

export default class WebStorage {

    constructor(type = 'session', prefix = '') {
        // "type" will be set 'session' or 'local'
        this._storage = (type === 'local') ? window.localStorage : window.sessionStorage;
        this._prefix = prefix;
    }

    get length() {
        return this._storage.length;
    }

    key(index) {
        return this._storage.key(index);
    }

    setItem(key, value) {
        this._storage.setItem(
            this._prefix + key,
            JSON.stringify({_key: key, _value: value})
        );
    }

    getItem(key) {
        const value = this._storage.getItem(this._prefix + key);
        if (value) {
            const deserializedValue = JSON.parse(value);
            if (deserializedValue
                && deserializedValue._key === key
                && typeof deserializedValue._value !== 'undefined'
            ) {
                return deserializedValue._value;
            }
            return value;
        }
        return null;
    }

    removeItem(key) {
        this._storage.removeItem(this._prefix + key);
    }

    clear() {
        this._storage.clear();
    }

}
