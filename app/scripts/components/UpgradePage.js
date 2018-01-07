'use strict';

import Component from 'js/Component.js';

import packageMeta from '../../../package.json';

export default class UpgradePage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let list = '';
        for (const releasefile of this.state.releasefiles) {
            const params = JSON.stringify({
                ocsUrl: `ocs://download?url=${encodeURIComponent(releasefile.url)}&type=downloads`,
                providerKey: '',
                contentId: ''
            });
            list += `
                <tr>
                <td class="file-description-cell">
                <h4>${releasefile.name}</h4>
                <p>${releasefile.description}</p>
                </td>
                <td class="file-download-cell">
                <button data-dispatch="ocs-url-dialog" data-params='${params}'>Download</button>
                </td>
                </tr>
            `;
        }

        return `
            <div class="upgrade-page-content">
            <div class="banner icon-opendesktop-app"></div>
            <h1 class="title">${packageMeta.productName}</h1>
            <h3 class="version">Version ${this.state.versionname} available</h3>
            <p class="description">Current version ${packageMeta.version}</p>
            <table class="releasefiles">${list}</table>
            <p>Visit <a href="${this.state.releasepage}" target="_blank">${this.state.releasepage}</a> for more details.</p>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .upgrade-page-content {
                width: 640px;
                margin: 2em auto;
            }

            .upgrade-page-content > h1,
            .upgrade-page-content > h3,
            .upgrade-page-content > p {
                text-align: center;
            }

            .upgrade-page-content .banner {
                height: 128px;
                margin-bottom: 2em;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .upgrade-page-content .description {
                margin: 1em 0;
            }

            .upgrade-page-content .releasefiles {
                width: 100%;
                margin-bottom: 1em;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .upgrade-page-content .releasefiles tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .upgrade-page-content .releasefiles .file-description-cell {
                width: 100%;
                padding: 0.6em;
            }

            .upgrade-page-content .releasefiles button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }
        `;
    }

}
