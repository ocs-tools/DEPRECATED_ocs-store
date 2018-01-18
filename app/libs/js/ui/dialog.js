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
     * Message dialog
     * Required: $ as jQuery
     */
    self.js.ui.dialog = {
        config: {
            overlayIdPrefix: 'dialog-overlay-',
            containerIdPrefix: 'dialog-container-',
            contentIdPrefix: 'dialog-content-',
            closeIdPrefix: 'dialog-close-',
            overlayCss: {
                'position': 'fixed',
                'top': '0px',
                'left': '0px',
                'z-index': '1999',
                'width': '100%',
                'height': '100%',
                'overflow': 'hidden',
                'margin': '0',
                'padding': '0',
                'border': '0',
                'background-color': 'rgba(0,0,0,0.5)'
            },
            containerCss: {
                'position': 'fixed',
                'top': '45%',
                'left': '50%',
                'z-index': '2000',
                'max-width': '95%',
                'max-height': '95%',
                'overflow': 'hidden',
                'margin': '0',
                'padding': '0',
                'border': '0',
                'border-radius': '5px',
                'box-shadow': '0 0 15px rgba(0,0,0,0.5)',
                'background-color': 'rgba(255,255,255,0.97)'
            },
            contentCss: {
                'max-width': '800px',
                'max-height': '600px',
                'overflow': 'auto',
                'margin': '0',
                'padding': '50px',
                'border': '0',
                'color': '#000000',
                'font-weight': 'normal',
                'font-size': '100%',
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
        dialog: function(type, message) {
            // Generate element
            var id = Math.floor(Math.random() * 1000) + '-' + new Date().getTime();
            $('body').append(
                '<div id="' + this.config.overlayIdPrefix + id + '">'
                + '<style>body {overflow: hidden;}</style>'
                + '</div>'
                + '<div id="' + this.config.containerIdPrefix + id + '">'
                + '<div id="' + this.config.contentIdPrefix + id + '"></div>'
                + '<span id="' + this.config.closeIdPrefix + id + '"></span>'
                + '</div>'
            );
            var $overlay = $('#' + this.config.overlayIdPrefix + id);
            var $container = $('#' + this.config.containerIdPrefix + id);
            var $content = $('#' + this.config.contentIdPrefix + id);
            var $close = $('#' + this.config.closeIdPrefix + id);
            // Set style and content
            $overlay.css(this.config.overlayCss).hide();
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
            $overlay.fadeIn('normal', function() {
                $container.fadeIn('normal');
                // Position fix
                $container.css({
                    'margin-top': '-' + ($content.innerHeight() / 2) + 'px',
                    'margin-left': '-' + ($content.innerWidth() / 2) + 'px'
                });
            });
            // Return id
            return id;
        },
        close: function(id) {
            $('#' + this.config.containerIdPrefix + id).remove();
            $('#' + this.config.overlayIdPrefix + id).remove();
        },
        text: function(message) {
            this.dialog('text', message);
        },
        html: function(message) {
            this.dialog('html', message);
        }
    };

})(typeof self !== 'undefined' ? self : this);
