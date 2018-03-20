const electron = require('electron');

import Component from '../../libs/chirit/Component.js';

export default class InstalledItemsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        const type = this.state.installType;
        let totalFiles = 0;

        let list = '';
        for (const itemKey of Object.keys(this.state.installedItems)) {
            const installedItem = this.state.installedItems[itemKey];
            if (installedItem.install_type === type) {
                const previewPic = `file://${electron.remote.app.getPath('userData')}/previewpic/${this.previewPicFilename(installedItem.url)}`;
                for (const file of installedItem.files) {
                    totalFiles++;

                    const filePath = `${this.state.installTypes[type].destination}/${file}`;
                    const applyThemeParams = JSON.stringify({path: filePath, installType: type});
                    const updateItemParams = JSON.stringify({itemKey: itemKey});
                    const openFileParams = JSON.stringify({path: filePath});
                    const removeFileParams = JSON.stringify({itemKey: itemKey});

                    let applyThemeButton = '';
                    if (this.state.isApplicableType) {
                        applyThemeButton = `<button data-dispatch="apply-theme" data-params='${applyThemeParams}'>Apply</button>`;
                    }

                    let listItemImportant = '';
                    let updateItemButton = '';
                    if (this.state.updateAvailableItems[itemKey]) {
                        listItemImportant = 'important';
                        updateItemButton = `<button data-dispatch="update-item" data-params='${updateItemParams}'>Update</button>`;
                    }

                    let openFileButton = '';
                    if (type === 'bin') {
                        openFileButton = `<button data-dispatch="open-file" data-params='${openFileParams}'>Run</button>`;
                    }
                    else {
                        openFileButton = `<button data-dispatch="open-file" data-params='${openFileParams}'>Open</button>`;
                    }

                    const removeFileButton = `<button data-dispatch="remove-file" data-params='${removeFileParams}'>Remove</button>`;

                    list += `
                        <tr data-item-key="${itemKey}">
                        <td class="primary-cell">
                        <a class="list-item ${listItemImportant}" href="#" data-dispatch="open-file" data-params='${openFileParams}'>
                        <img src="${previewPic}" width="48" height="48" class="previewpic">
                        ${file}
                        </a>
                        </td>
                        <td>${applyThemeButton}</td>
                        <td>${updateItemButton}</td>
                        <td>${openFileButton}</td>
                        <td>${removeFileButton}</td>
                        </tr>
                    `;
                }
            }
        }

        return `
            <div class="installeditems-page-content">
            <h1 class="title">${this.state.installTypes[type].name} <span class="badge">${totalFiles}</span></h1>
            <table class="installeditems">${list}</table>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .installeditems-page-content {
                width: 720px;
                margin: 2em auto;
            }

            .installeditems-page-content .title {
                margin-bottom: 1em;
                text-align: center;
            }

            .installeditems-page-content .installeditems {
                width: 100%;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .installeditems-page-content .installeditems tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .installeditems-page-content .installeditems .primary-cell {
                width: 100%;
            }

            .installeditems-page-content .installeditems .list-item {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .installeditems-page-content .installeditems .list-item:hover,
            .installeditems-page-content .installeditems .list-item:active {
                background-color: #e0e0e0;
            }

            .installeditems-page-content .installeditems .list-item.important {
                color: #03a9f4;
            }

            .installeditems-page-content .installeditems .list-item .previewpic {
                width: 48px;
                height: 48px;
                margin-right: 0.2em;
                border: 0;
                vertical-align: middle;
            }

            .installeditems-page-content .installeditems .list-item .update-progress-bar {
                display: inline-block;
                width: 90%;
                height: 12px;
                margin-top: 0.2em;
            }

            .installeditems-page-content .installeditems button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }

            .installeditems-page-content .badge {
                padding: 0.2em 0.6em;
                border-radius: 0.6em;
                background-color: #cccccc;
                color: #ffffff;
                font-size: 80%;
            }
        `;
    }

    disableItemControl(itemKey) {
        const installedItem = this.element.querySelector(`[data-item-key="${itemKey}"]`);

        const openFileLink = installedItem.querySelector('a[data-dispatch="open-file"]');
        if (openFileLink && openFileLink.hasAttribute('data-dispatch')) {
            openFileLink.removeAttribute('data-dispatch');
        }

        const applyThemeButton = installedItem.querySelector('button[data-dispatch="apply-theme"]');
        if (applyThemeButton && !applyThemeButton.disabled) {
            applyThemeButton.disabled = true;
        }

        const updateItemButton = installedItem.querySelector('button[data-dispatch="update-item"]');
        if (updateItemButton && !updateItemButton.disabled) {
            updateItemButton.disabled = true;
        }

        const openFileButton = installedItem.querySelector('button[data-dispatch="open-file"]');
        if (openFileButton && !openFileButton.disabled) {
            openFileButton.disabled = true;
        }

        const removeItemButton = installedItem.querySelector('button[data-dispatch="remove-file"]');
        if (removeItemButton && !removeItemButton.disabled) {
            removeItemButton.disabled = true;
        }
    }

    updateItemUpdateProgress(itemKey, progress) {
        this.disableItemControl(itemKey);

        const listItem = this.element.querySelector(`[data-item-key="${itemKey}"] .list-item`);

        if (!listItem.querySelector('.update-progress-bar')) {
            const progressBar = document.createElement('progress');
            progressBar.classList.add('update-progress-bar');
            progressBar.setAttribute('max', 1);
            listItem.appendChild(progressBar);
        }

        listItem.querySelector('.update-progress-bar').value = progress;
    }

    previewPicFilename(url) {
        // See also window-renderer.js
        return btoa(url).slice(-255);
    }

}
