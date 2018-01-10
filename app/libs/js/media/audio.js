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
    if (!self.js.media) {
        self.js.media = {};
    }

    /**
     * HTMLAudioElement wrapper
     */
    self.js.media.audio = {
        element: null,
        config: {
            autoplay: false
        },
        init: function(successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            if (window.HTMLAudioElement) {
                this.element = new Audio('');
                this.element.autoplay = this.config.autoplay;
                successCallback(this.element);
                resolve(this.element);
            }
            else {
                var error = new Error('HTMLAudioElement is not supported');
                errorCallback(error);
                reject(error);
            }

            return promise;
        },
        canPlayType: function(type) {
            return this.element.canPlayType(type);
        },
        load: function(src) {
            this.element.src = src;
        },
        play: function() {
            this.element.play();
        },
        pause: function() {
            this.element.pause();
        },
        stop: function() {
            this.element.pause();
            this.element.currentTime = 0;
        },
        go: function(time) {
            time = parseFloat(time);
            if (time >= 0) {
                this.element.currentTime = time;
            }
        },
        forward: function(time) {
            time = parseFloat(time);
            if (time > 0) {
                this.element.currentTime += time;
            }
        },
        rewind: function(time) {
            time = parseFloat(time);
            if (time > 0) {
                this.element.currentTime -= time;
            }
        },
        rateup: function(rate) {
            rate = parseFloat(rate);
            if (rate > 0) {
                this.element.play();
                this.element.playbackRate += rate;
            }
        },
        ratedown: function(rate) {
            rate = parseFloat(rate);
            if (rate > 0) {
                this.element.play();
                this.element.playbackRate -= rate;
            }
        },
        getCurrentSrc: function() {
            return this.element.currentSrc;
        },
        getDuration: function() {
            return this.element.duration;
        },
        getCurrentTime: function() {
            return this.element.currentTime;
        },
        setVolume: function(volume) {
            volume = parseFloat(volume);
            if (volume >= 0) {
                this.element.volume = volume;
            }
        },
        getVolume: function() {
            return this.element.volume;
        },
        toggleMute: function() {
            this.element.muted = this.element.muted ? false : true;
        },
        addEventListener: function(type, listener, useCapture) {
            useCapture = useCapture ? true : false;
            this.element.addEventListener(type, listener, useCapture);
        },
        removeEventListener: function(type, listener, useCapture) {
            useCapture = useCapture ? true : false;
            this.element.removeEventListener(type, listener, useCapture);
        }
    };

})(typeof self !== 'undefined' ? self : this);
