'use strict';

import Component from 'js/Component.js';

import packageMeta from '../../../package.json';

export default class AboutDialog extends Component {

    html() {
        return `
            <div class="about-dialog-content">

            <div class="content">
            <div class="banner icon-ocsstore"></div>
            <h1 class="title">${packageMeta.productName}</h1>
            <h3 class="version">Version ${packageMeta.version}</h3>
            <p class="description">${packageMeta.description}</p>
            <p>Author: ${packageMeta.author}</p>
            <p>License: ${packageMeta.license}</p>
            <p>Website: <a href="${packageMeta.homepage}" target="_blank">${packageMeta.homepage}</a></p>
            </div>

            <nav class="control">
            <button name="close">Close</button>
            </nav>

            </div>
        `;
    }

    style() {
        this.element.style.zIndex = '999';
        this.element.style.position = 'absolute';
        this.element.style.left = '0';
        this.element.style.top = '0';
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.justifyContent = 'center';
        this.element.style.alignItems = 'center';
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'hidden';

        return `
            .about-dialog-content {
                display: flex;
                flex-flow: column nowrap;
                width: 460px;
                height: 460px;
                border-radius: 0.6em;
                background-color: #ffffff;
                box-shadow: 0 0 2em 0.6em rgba(0,0,0,0.2);
            }

            .about-dialog-content .content {
                flex: 1 1 auto;
                height: 100%;
                padding: 1em 2em;
                text-align: center;
            }

            .about-dialog-content .content .banner {
                height: 128px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .about-dialog-content .content .title {
                margin-top: 1em;
            }

            .about-dialog-content .content .version {
            }

            .about-dialog-content .content .description {
                margin-top: 1em;
            }

            .about-dialog-content .control {
                flex: 0 0 auto;
                height: auto;
                padding: 1em 2em;
                border-bottom-left-radius: 0.6em;
                border-bottom-right-radius: 0.6em;
                background-color: #eeeeee;
                text-align: right;
            }

            .about-dialog-content .control button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }
        `;
    }

    script() {
        this.hide();

        this.element.querySelector('button[name="close"]').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.hide();
        }, false);
    }

    show() {
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
    }

}
