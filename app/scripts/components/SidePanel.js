import Component from '../../libs/chirit/Component.js';

import packageMeta from '../../../package.json';

export default class SidePanel extends Component {

    html() {
        return `
            <header class="menu-items-header">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${packageMeta.productName}</h1>
            </header>

            <ul class="menu-items-main">
            <li><button class="menu-item" data-dispatch="about-dialog">About This App</button></li>
            </ul>

            <ul class="menu-items-footer">
            </ul>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '300px';
        this.element.style.height = '100%';
        this.element.style.borderLeft = '1px solid #cccccc';
        this.element.style.background = '#007ac1';

        return `
            .menu-items-header {
                flex: 0 0 auto;
                width: 100%;
                height: 48px;
                padding: 4px;
                background-color: #006db3;
            }

            .menu-items-main {
                flex: 1 1 auto;
                width: 80%;
                height: 100%;
                margin: 0 auto;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-footer {
                flex: 1 1 auto;
                width: 80%;
                height: auto;
                margin: 0 auto;
                padding: 0.4em;
                list-style: none;
            }

            .menu-items-header .banner {
                height: 40px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            .menu-items-header .title {
                display: none;
            }

            .menu-items-main li,
            .menu-items-footer li {
                padding: 0.4em;
                text-align: center;
            }

            .menu-label {
                color: rgba(255,255,255,0.7);
                font-weight: bold;
            }

            .menu-item {
                display: block;
                width: 100%;
                padding: 0.6em;
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                color: rgba(255,255,255,0.7);
                font-weight: bold;
                transition: background-color 0.3s ease-out;
            }
            .menu-item:hover,
            .menu-item:active {
                background-color: #03a9f4;
            }
        `;
    }

    script() {
        this.toggle();
    }

    toggle() {
        this.element.style.display = this.element.style.display === 'flex' ? 'none' : 'flex';
    }

}
