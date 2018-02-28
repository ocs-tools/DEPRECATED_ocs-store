const url = require('url');

import Component from '../../libs/chirit/Component.js';

export default class OcsUrlDialog extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        const parsedUrl = url.parse(this.state.ocsUrl, true);

        let message = '';
        if (parsedUrl.hostname === 'download') {
            message = 'Do you want to download?';
        }
        else if (parsedUrl.hostname === 'install') {
            message = 'Do you want to install?';
        }

        let ocsUrlUrl = '';
        if (parsedUrl.query.url) {
            ocsUrlUrl = parsedUrl.query.url;
        }

        let ocsUrlType = 'Unknown';
        if (parsedUrl.query.type && this.state.installTypes[parsedUrl.query.type]) {
            ocsUrlType = this.state.installTypes[parsedUrl.query.type].name;
        }

        let ocsUrlFilename = 'Unknown';
        if (parsedUrl.query.filename) {
            ocsUrlFilename = parsedUrl.query.filename;
        }
        else if (ocsUrlUrl) {
            ocsUrlFilename = decodeURIComponent(ocsUrlUrl.split('/').pop());
        }

        const params = JSON.stringify({
            ocsUrl: this.state.ocsUrl,
            providerKey: this.state.providerKey,
            contentId: this.state.contentId
        });

        return `
            <button class="ocsurl-dialog-close-button icon-close" name="close"></button>

            <div class="ocsurl-dialog-content">

            <div class="content">
            <h1 class="title">${message}</h1>
            <p class="description">
            File: ${ocsUrlFilename}<br>
            Type: ${ocsUrlType}
            </p>
            </div>

            <nav class="control">
            <button data-dispatch="process-ocs-url" data-params='${params}'>OK</button>
            <button name="cancel">Cancel</button>
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
            .ocsurl-dialog-close-button {
                position: relative;
                left: 226px;
                top: 18px;
                display: inline-block;
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 32px;
                outline: none;
                background-color: #ffffff;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                box-shadow: 0 0 1px 2px rgba(0,0,0,0.2);
                transition: background-color 0.3s ease-out;
            }
            .ocsurl-dialog-close-button:hover {
                background-color: #eeeeee;
            }

            .ocsurl-dialog-content {
                display: flex;
                flex-flow: column nowrap;
                width: 460px;
                height: 200px;
                border-radius: 0.6em;
                background-color: #ffffff;
                box-shadow: 0 0 2em 0.6em rgba(0,0,0,0.2);
            }

            .ocsurl-dialog-content .content {
                flex: 1 1 auto;
                height: 100%;
                padding: 1em 2em;
            }

            .ocsurl-dialog-content .content .title {
                margin-top: 1em;
                font-size: 100%;
            }

            .ocsurl-dialog-content .content .description {
                margin-top: 1em;
            }

            .ocsurl-dialog-content .control {
                flex: 0 0 auto;
                height: auto;
                padding: 1em 2em;
                border-bottom-left-radius: 0.6em;
                border-bottom-right-radius: 0.6em;
                background-color: #eeeeee;
                text-align: right;
            }

            .ocsurl-dialog-content .control button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }
        `;
    }

    script() {
        this.hide();

        if (!this.state) {
            return;
        }

        this.element.querySelector('button[name="close"]').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.hide();
        }, false);

        this.element.querySelector('button[name="cancel"]').addEventListener('click', (event) => {
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
