/**
 * Chirit
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/chirit
 */

export default class StatusManager {

    constructor(eventTarget) {
        // "eventTarget" will be Element object or selector string
        if (typeof eventTarget === 'string') {
            eventTarget = document.querySelector(eventTarget);
        }

        this._eventTarget = eventTarget ? eventTarget : document;
        this._eventListener = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const params = event.detail ? event.detail : {};
            this.dispatch(event.type, params);
        };

        this._status = new Map();
        this._actions = new Map();
        this._views = new Map();
    }

    getStatus() {
        return this._status;
    }

    getState(type) {
        return this._status.get(type);
    }

    registerAction(type, action, options) {
        const actions = this._actions.has(type) ? this._actions.get(type) : new Map();
        if (!actions.size) {
            this._status.set(type, {});
            this._eventTarget.addEventListener(type, this._eventListener, false);
        }
        actions.set(action, options);
        this._actions.set(type, actions);
    }

    unregisterAction(type, action) {
        if (this._actions.has(type)) {
            const actions = this._actions.get(type);
            if (actions.has(action)) {
                actions.delete(action);
                if (actions.size) {
                    this._actions.set(type, actions);
                }
                else {
                    this._actions.delete(type);
                    this._status.delete(type);
                    this._eventTarget.removeEventListener(type, this._eventListener, false);
                }
            }
        }
    }

    registerView(type, view, options) {
        const views = this._views.has(type) ? this._views.get(type) : new Map();
        views.set(view, options);
        this._views.set(type, views);
    }

    unregisterView(type, view) {
        if (this._views.has(type)) {
            const views = this._views.get(type);
            if (views.has(view)) {
                views.delete(view);
                if (views.size) {
                    this._views.set(type, views);
                }
                else {
                    this._views.delete(type);
                }
            }
        }
    }

    dispatch(type, params) {
        if (!this._actions.has(type)) {
            console.error(new Error(`No actions for type "${type}"`));
            return;
        }

        const actions = this._actions.get(type);
        const promises = [];
        for (const [action, options] of actions) {
            promises.push(new Promise((resolve, reject) => {
                action(resolve, reject, params, options);
            }));
        }

        Promise.all(promises)
        .then((status) => {
            const state = {};
            for (const _state of status) {
                Object.assign(state, _state);
            }
            this._status.set(type, state);

            if (!this._views.has(type)) {
                console.log(`No views for type "${type}"`); // This case is not error
                return;
            }

            const views = this._views.get(type);
            for (const [view, options] of views) {
                view(state, options);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

}
