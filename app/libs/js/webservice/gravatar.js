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
    if (!self.js.webservice) {
        self.js.webservice = {};
    }

    /**
     * Gravatar URI converter
     * Required: CybozuLabs.MD5
     */
    self.js.webservice.gravatar = {
        convertProfileUri: function(email, format) {
            var uri = '';
            if (email) {
                var uriSuffix = format ? '.' + format.toLowerCase() : '';
                uri = 'http://www.gravatar.com/'
                    + CybozuLabs.MD5.calc(email.toLowerCase()) + uriSuffix;
            }
            return uri;
        },
        convertImageUri: function(email, size, defaultImage) {
            var uri = '';
            if (email) {
                var uriSuffix = '.jpg';
                size = size ? size : '90';
                defaultImage = defaultImage ? encodeURIComponent(defaultImage) : 'mm';
                uri = 'http://www.gravatar.com/avatar/'
                    + CybozuLabs.MD5.calc(email.toLowerCase()) + uriSuffix
                    + '?s=' + size + '&d=' + defaultImage;
            }
            return uri;
        }
    };

})(typeof self !== 'undefined' ? self : this);
