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
     * Web API resource handler
     * Required: $ as jQuery
     */
    self.js.webservice.resource = {
        config: {
            baseUri: '',
            data: {},
            ajaxOptions: {},
            timeout: 60000,
            methodAttribute: 'data-resource-method',
            uriAttribute: 'data-resource-uri',
            dataAttribute: 'data-resource-data',
            ajaxOptionsAttribute: 'data-resource-ajax-options'
        },
        cache: {},
        request: function(method, uri, data, ajaxOptions) {
            method = method ? method : 'GET';
            var methodUcfirst = method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
            // Keep parameters into cache
            if (this.cache.currentRequest) {
                this.cache.previousRequest = this.cache.currentRequest;
            }
            if (this.cache['current' + methodUcfirst + 'Request']) {
                this.cache['previous' + methodUcfirst + 'Request']
                    = this.cache['current' + methodUcfirst + 'Request'];
            }
            this.cache.currentRequest = {
                method: method,
                uri: uri,
                data: data,
                ajaxOptions: ajaxOptions
            };
            this.cache['current' + methodUcfirst + 'Request'] = this.cache.currentRequest;
            // Set timer for cross-domain and JSONP limitation workaround
            var requestTimerId = null;
            if (typeof this['on' + methodUcfirst + 'RequestTimeout'] === 'function') {
                requestTimerId = setTimeout(
                    this['on' + methodUcfirst + 'RequestTimeout'],
                    this.config.timeout
                );
            }
            // Send request
            return $.ajax($.extend({}, this.config.ajaxOptions, {
                type: method,
                url: this.config.baseUri + uri,
                data: $.extend({}, this.config.data, data),
                context: this,
                beforeSend: function() {
                    if (typeof this['on' + methodUcfirst + 'RequestBeforeSend'] === 'function') {
                        this['on' + methodUcfirst + 'RequestBeforeSend']();
                    }
                },
                success: function(data, textStatus, jqXhr) {
                    if (requestTimerId) {
                        clearTimeout(requestTimerId);
                    }
                    if (typeof this['on' + methodUcfirst + 'RequestSuccess'] === 'function') {
                        this['on' + methodUcfirst + 'RequestSuccess'](data, textStatus, jqXhr);
                    }
                },
                error: function(jqXhr, textStatus, errorThrown) {
                    if (requestTimerId) {
                        clearTimeout(requestTimerId);
                    }
                    if (typeof this['on' + methodUcfirst + 'RequestError'] === 'function') {
                        this['on' + methodUcfirst + 'RequestError'](jqXhr, textStatus, errorThrown);
                    }
                },
                complete: function(jqXhr, textStatus) {
                    if (requestTimerId) {
                        clearTimeout(requestTimerId);
                    }
                    if (typeof this['on' + methodUcfirst + 'RequestComplete'] === 'function') {
                        this['on' + methodUcfirst + 'RequestComplete'](jqXhr, textStatus);
                    }
                }
            }, ajaxOptions));
        },
        get: function(uri, data, ajaxOptions) {
            return this.request('GET', uri, data, ajaxOptions);
        },
        post: function(uri, data, ajaxOptions) {
            return this.request('POST', uri, data, ajaxOptions);
        },
        put: function(uri, data, ajaxOptions) {
            return this.request('PUT', uri, data, ajaxOptions);
        },
        delete: function(uri, data, ajaxOptions) {
            return this.request('DELETE', uri, data, ajaxOptions);
        },
        setEventHandler: function(element, events, selector) {
            element = element ? element : document;
            events = events ? events : 'click';
            selector = selector ? selector : '[' + this.config.uriAttribute + ']';

            $(element).on(events, selector, function(event) {
                event.preventDefault();
                // Get values from element attributes
                var $eventTarget = $(event.target);
                var method = '';
                var uri = '';
                var data = {};
                var ajaxOptions = {};
                if ($eventTarget.attr(this.config.methodAttribute)) {
                    method = $eventTarget.attr(this.config.methodAttribute);
                }
                if ($eventTarget.attr(this.config.uriAttribute)) {
                    uri = $eventTarget.attr(this.config.uriAttribute);
                }
                if ($eventTarget.attr(this.config.dataAttribute)) {
                    data = JSON.parse($eventTarget.attr(this.config.dataAttribute));
                }
                if ($eventTarget.attr(this.config.ajaxOptionsAttribute)) {
                    ajaxOptions = JSON.parse($eventTarget.attr(this.config.ajaxOptionsAttribute));
                }
                // Get values from form values
                if (event.target.nodeName == 'FORM') {
                    if ($eventTarget.attr('method')) {
                        method = $eventTarget.attr('method');
                    }
                    $.each($eventTarget.serializeArray(), function() {
                        data[this.name] = this.value;
                    });
                }
                // Request
                this.request(method, uri, data, ajaxOptions);
            }.bind(this));
        },
        setLinkHandler: function(element) {
            this.setEventHandler(element, 'click', 'a[' + this.config.uriAttribute + ']');
        },
        setFormHandler: function(element) {
            this.setEventHandler(element, 'submit', 'form[' + this.config.uriAttribute + ']');
        }
    };

})(typeof self !== 'undefined' ? self : this);
