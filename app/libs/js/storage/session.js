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
    if (!self.js.storage) {
        self.js.storage = {};
    }

    /**
     * Web Storage API wrapper
     */
    self.js.storage.session = {
        config: {
            prefix: '',
            throwException: false
        },
        length: function() {
            return window.sessionStorage.length;
        },
        key: function(index) {
            return window.sessionStorage.key(index);
        },
        setItem: function(key, value) {
            try {
                window.sessionStorage.setItem(
                    this.config.prefix + key,
                    JSON.stringify({_key: key, _value: value})
                );
            }
            catch (exception) {
                if (this.config.throwException) {
                    throw exception;
                }
            }
        },
        getItem: function(key) {
            var value = window.sessionStorage.getItem(this.config.prefix + key);
            if (value) {
                var deserializedValue = JSON.parse(value);
                if (deserializedValue
                    && deserializedValue._key == key
                    && typeof deserializedValue._value !== 'undefined'
                ) {
                    return deserializedValue._value;
                }
                return value;
            }
            return null;
        },
        removeItem: function(key) {
            window.sessionStorage.removeItem(this.config.prefix + key);
        },
        clear: function() {
            window.sessionStorage.clear();
        }
    };

})(typeof self !== 'undefined' ? self : this);
