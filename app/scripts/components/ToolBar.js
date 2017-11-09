'use strict';

const electronConfig = require('electron-config');

import Component from 'js/Component.js';

export default class ToolBar extends Component {

    init() {
        if (!this.state) {
            this.state = {
                backAction: '',
                forwardAction: '',
                homeAction: '',
                collectionAction: '',
                indicator: false,
                upgrade: false
            };
        }
    }

    html() {
        const backButtonAttr = this.state.backAction ? `data-dispatch="${this.state.backAction}"` : 'disabled';
        const forwardButtonAttr = this.state.forwardAction ? `data-dispatch="${this.state.forwardAction}"` : 'disabled';
        const homeButtonAttr = this.state.homeAction ? `data-dispatch="${this.state.homeAction}"` : 'disabled';
        const collectionButtonAttr = this.state.collectionAction ? `data-dispatch="${this.state.collectionAction}"` : 'disabled';

        return `
            <button class="toolbar-button icon-chevron-left" ${backButtonAttr}></button>
            <button class="toolbar-button icon-chevron-right" ${forwardButtonAttr}></button>
            <button class="toolbar-button icon-home label" ${homeButtonAttr}>Browse</button>
            <button class="toolbar-button icon-folder label" ${collectionButtonAttr}>Installed</button>
            <span class="toolbar-indicator icon-loading"></span>
            <span class="toolbar-spacer"></span>
            <select class="toolbar-select" name="startPage">
            <option value="">Choose Startpage</option>
            <option value="https://www.opendesktop.org/">opendesktop.org</option>
            <option value="https://www.gnome-look.org/">gnome-look.org</option>
            <option value="https://store.kde.org/">store.kde.org</option>
            <option value="https://www.xfce-look.org/">xfce-look.org</option>
            <option value="https://www.box-look.org/">box-look.org</option>
            <option value="https://www.enlightenment-themes.org/">enlightenment-themes.org</option>
            </select>
            <button class="toolbar-button icon-info" data-dispatch="upgrade-page"></button>
            <button class="toolbar-button icon-menu" data-dispatch="side-panel"></button>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '100%';
        this.element.style.height = '48px';
        this.element.style.borderBottom = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';

        return `
            .toolbar-button,
            .toolbar-select {
                display: inline-block;
                flex: 0 0 auto;
                width: 32px;
                height: 32px;
                margin: 0 0.2em;
                border-width: 0;
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                transition: background-color 0.3s ease-out;
            }
            .toolbar-button:hover,
            .toolbar-button:active {
                background-color: #c7c7c7;
            }

            .toolbar-select {
                width: auto;
                border: 1px solid rgba(0,0,0,0.1);
            }
            .toolbar-select option {
                background-color: #ffffff;
                color: #222222;
            }

            .toolbar-button.label {
                width: auto;
                padding: 0 4px 0 36px;
                background-position: 4px center;
            }

            .toolbar-button[disabled] {
                opacity: 0.5;
            }

            .toolbar-button[data-dispatch="upgrade-page"] {
                background-color: #ec407a;
            }
            .toolbar-button[data-dispatch="upgrade-page"]:hover,
            .toolbar-button[data-dispatch="upgrade-page"]:active {
                background-color: #d81b60;
            }

            .toolbar-indicator {
                display: inline-block;
                flex: 0 0 auto;
                width: 24px;
                height: 24px;
                margin: 0 0.4em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .toolbar-spacer {
                display: inline-block;
                flex: 1 1 auto;
            }
        `;
    }

    script() {
        this.state.indicator ? this.showIndicator() : this.hideIndicator();
        this.state.upgrade ? this.showUpgradeButton() : this.hideUpgradeButton();

        const config = new electronConfig({name: 'application'});

        const selectElement = this.element.querySelector('.toolbar-select[name="startPage"]');
        const targetElement = selectElement.querySelector(`option[value="${config.get('startPage')}"]`);

        if (targetElement) {
            targetElement.setAttribute('selected', 'selected');
        }

        selectElement.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.target.value) {
                document.dispatchEvent(new CustomEvent('start-page', {detail: {startPage: event.target.value}}));
            }
        }, false);
    }

    showIndicator() {
        this.state.indicator = true;
        this.element.querySelector('.toolbar-indicator').style.display = 'inline-block';
    }

    hideIndicator() {
        this.state.indicator = false;
        this.element.querySelector('.toolbar-indicator').style.display = 'none';
    }

    showUpgradeButton() {
        this.state.upgrade = true;
        this.element.querySelector('[data-dispatch="upgrade-page"]').style.display = 'inline-block';
    }

    hideUpgradeButton() {
        this.state.upgrade = false;
        this.element.querySelector('[data-dispatch="upgrade-page"]').style.display = 'none';
    }

}
