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
    if (!self.js.ui) {
        self.js.ui = {};
    }

    /**
     * Message notification
     * Required: $ as jQuery
     */
    self.js.ui.notification = {
        config: {
            lifetime: 6000,
            containerIdPrefix: 'notification-container-',
            contentIdPrefix: 'notification-content-',
            closeIdPrefix: 'notification-close-',
            containerCss: {
                'position': 'fixed',
                'top': '0px',
                'left': '0px',
                'z-index': '2000',
                'width': '100%',
                'height': 'auto',
                'overflow': 'hidden',
                'margin': '0',
                'padding': '0',
                'border': '0',
                'box-shadow': '0 0 15px rgba(0,0,0,0.5)',
                'background-color': 'rgba(255,255,255,0.97)'
            },
            contentCss: {
                'width': '100%',
                'height': 'auto',
                'overflow': 'auto',
                'margin': '0',
                'padding': '15px',
                'border': '0',
                'color': '#000000',
                'font-weight': 'bold',
                'font-size': '125%',
                'text-align': 'center',
                'text-shadow': 'none'
            },
            closeCss: {
                'display': 'inline-block',
                'position': 'absolute',
                'top': '5px',
                'right': '5px',
                'line-height': '1',
                'margin': '0',
                'padding': '5px',
                'border': '1px solid #ffffff',
                'border-radius': '5px',
                'background-color': 'rgba(0,0,0,0.2)',
                'color': '#ffffff',
                'font-weight': 'bold',
                'font-size': '80%',
                'text-shadow': 'none',
                'cursor': 'pointer'
            },
            closeHtml: 'close'
        },
        notify: function(type, message, lifetime) {
            if (!lifetime) {
                lifetime = this.config.lifetime;
            }
            // Generate element
            var id = Math.floor(Math.random() * 1000) + '-' + new Date().getTime();
            $('body').append(
                '<div id="' + this.config.containerIdPrefix + id + '">'
                + '<div id="' + this.config.contentIdPrefix + id + '"></div>'
                + '<span id="' + this.config.closeIdPrefix + id + '"></span>'
                + '</div>'
            );
            var $container = $('#' + this.config.containerIdPrefix + id);
            var $content = $('#' + this.config.contentIdPrefix + id);
            var $close = $('#' + this.config.closeIdPrefix + id);
            // Set style and content
            $container.css(this.config.containerCss).hide();
            $content.css(this.config.contentCss);
            $close.css(this.config.closeCss).html(this.config.closeHtml);
            if (type == 'text') {
                $content.text(message);
            }
            else if (type == 'html') {
                $content.html(message);
            }
            // Set event handler
            $close.on('click', function(event) {
                event.preventDefault();
                this.close(id);
            }.bind(this));
            // Show content
            $container.fadeIn('fast', function() {
                $(this).delay(lifetime).fadeOut('slow', function() {
                    $(this).remove();
                });
            });
            // Return id
            return id;
        },
        close: function(id) {
            $('#' + this.config.containerIdPrefix + id).remove();
        },
        text: function(message, lifetime) {
            this.notify('text', message, lifetime);
        },
        html: function(message, lifetime) {
            this.notify('html', message, lifetime);
        }
    };

})(typeof self !== 'undefined' ? self : this);
