import Component from '../../libs/chirit/Component.js';

import Utility from '../../libs/chirit/Utility.js';

export default class StatusBarItem extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let message = '';
        let progressBar = '';
        let progressText = '';
        let openButton = '';
        let removeButton = '';

        if (this.state.status === 'success_downloadstart') {
            message = 'Downloading';
            progressBar = '<progress class="statusbaritem-progress-bar" value="" max="1"></progress>';
            progressText = '<span class="statusbaritem-progress-text"></span>';
        }
        else if (this.state.status === 'success_download') {
            message = 'Downloaded';
        }
        else if (this.state.status === 'success_savestart') {
            message = 'Downloading';
        }
        else if (this.state.status === 'success_save') {
            message = 'Downloaded';
            const openButtonParams = JSON.stringify({installType: this.state.metadata.install_type});
            const removeButtonParams = JSON.stringify(this.state);
            openButton = `<button class="statusbaritem-open-button icon-folder" data-dispatch="open-destination" data-params='${openButtonParams}'></button>`;
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
        }
        else if (this.state.status === 'success_installstart') {
            message = 'Installing';
        }
        else if (this.state.status === 'success_install') {
            message = 'Installed';
            const openButtonParams = JSON.stringify({installType: this.state.metadata.install_type});
            const removeButtonParams = JSON.stringify(this.state);
            openButton = `<button class="statusbaritem-open-button icon-folder" data-dispatch="installed-items-page" data-params='${openButtonParams}'></button>`;
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
        }
        else {
            message = this.state.message;
            const removeButtonParams = JSON.stringify(this.state);
            removeButton = `<button class="statusbaritem-remove-button icon-close" data-dispatch="remove-statusbar-item" data-params='${removeButtonParams}'></button>`;
        }

        return `
            <span class="statusbaritem-message">${message}: ${this.state.metadata.filename}</span>
            ${progressBar} ${progressText}
            ${openButton} ${removeButton}
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.maxWidth = '640px';
        this.element.style.height = '22px';
        this.element.style.border = '1px solid #cccccc';
        this.element.style.borderRadius = '0.2em';
        this.element.style.backgroundColor = '#ffffff';

        return `
            .statusbaritem-message {
                display: inline-block;
                flex: 1 1 auto;
                width: auto;
                margin: 0 0.2em;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .statusbaritem-progress-bar {
                display: inline-block;
                flex: 0 0 auto;
                width: 100px;
                height: 18px;
                margin: 0 0.2em;
            }

            .statusbaritem-progress-text {
                display: inline-block;
                flex: 1 1 auto;
                width: auto;
                margin: 0 0.2em;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
            }

            .statusbaritem-open-button,
            .statusbaritem-remove-button {
                display: inline-block;
                flex: 0 0 auto;
                width: 18px;
                height: 18px;
                margin: 0 0.2em;
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 0.6em;
                outline: none;
                background-color: transparent;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
                transition: background-color 0.3s ease-out;
            }
            .statusbaritem-open-button:hover,
            .statusbaritem-remove-button:hover {
                background-color: #c7c7c7;
            }
        `;
    }

    downloadProgress(bytesReceived, bytesTotal) {
        if (bytesReceived > 0 && bytesTotal > 0
            && this.element.querySelector('.statusbaritem-progress-bar')
        ) {
            this.element.querySelector('.statusbaritem-progress-bar').value = bytesReceived / bytesTotal;
            this.element.querySelector('.statusbaritem-progress-text').innerHTML = `${Utility.convertByteToHumanReadable(bytesReceived)} / ${Utility.convertByteToHumanReadable(bytesTotal)}`;
        }
    }

}
