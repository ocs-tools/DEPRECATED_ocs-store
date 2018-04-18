/**
 * Chirit
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/chirit
 */

import Component from './Component.js';
import StatusManager from './StatusManager.js';
import WebStorage from './WebStorage.js';
import Utility from './Utility.js';

export default class Chirit {

    static get Component() {
        return Component;
    }

    static get StatusManager() {
        return StatusManager;
    }

    static get WebStorage() {
        return WebStorage;
    }

    static get Utility() {
        return Utility;
    }

}
