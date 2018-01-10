'use strict';

/**
 * js
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/js
 */

/**
 * Base class of component classes
 */
export default class Component {

    constructor(element, state) {
        // "element" will be Element object or selector string
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        this.element = element ? element : document.createElement('div');
        this.innerHTML = this.element.innerHTML;
        this.state = state;

        this.init();
        this._build();
        this.complete();
    }

    /**
     * Build the component
     * Subclass should not override this class method
     */
    _build() {
        const html = this.html();
        const style = this.style();
        this.element.innerHTML = style ? `<style scoped>${style}</style>${html}` : html;
        this.script();
    }

    /**
     * Update the component
     * Subclass should not override this class method
     */
    update(state) {
        this.state = state;
        this._build();
    }

    /**
     * Alternative constructor for subclass
     */
    init() {}

    /**
     * A class mehod to be called when the component initialization finished
     */
    complete() {}

    /**
     * Render HTML content
     */
    html() {
        return '';
    }

    /**
     * Render CSS content
     */
    style() {
        return '';
    }

    /**
     * Script for the component
     */
    script() {}

}
