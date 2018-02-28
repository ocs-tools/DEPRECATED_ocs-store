import Component from '../../libs/chirit/Component.js';

export default class CollectionPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        let totalFiles = 0;
        const installTypes = {};
        for (const key of Object.keys(this.state.installedItems)) {
            const type = this.state.installedItems[key].install_type;
            if (!installTypes[type]) {
                installTypes[type] = {
                    name: this.state.installTypes[type].name,
                    files: 0,
                    updateAvailable: false
                };
            }
            installTypes[type].files += this.state.installedItems[key].files.length;
            totalFiles += this.state.installedItems[key].files.length;
            if (this.state.updateAvailableItems[key]) {
                installTypes[type].updateAvailable = true;
            }
        }

        let list = '';
        for (const type of Object.keys(installTypes)) {
            const params = JSON.stringify({installType: type});
            const listItemImportant = installTypes[type].updateAvailable ? 'important' : '';

            list += `
                <tr>
                <td>
                <a class="list-item ${listItemImportant}" href="#" data-dispatch="installed-items-page" data-params='${params}'>
                ${installTypes[type].name}
                <span class="badge">${installTypes[type].files}</span>
                </a>
                </td>
                </tr>
            `;
        }

        return `
            <div class="collection-page-content">
            <h1 class="title">My Collection <span class="badge">${totalFiles}</span></h1>
            <table class="installtypes">${list}</table>
            </div>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'auto';

        return `
            .collection-page-content {
                width: 640px;
                margin: 2em auto;
            }

            .collection-page-content .title {
                margin-bottom: 1em;
                text-align: center;
            }

            .collection-page-content .installtypes {
                width: 100%;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .collection-page-content .installtypes tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .collection-page-content .installtypes .list-item {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .collection-page-content .installtypes .list-item:hover,
            .collection-page-content .installtypes .list-item:active {
                background-color: #e0e0e0;
            }

            .collection-page-content .installtypes .list-item.important {
                color: #03a9f4;
            }

            .collection-page-content .badge {
                padding: 0.2em 0.6em;
                border-radius: 0.6em;
                background-color: #cccccc;
                color: #ffffff;
                font-size: 80%;
            }
            .collection-page-content .installtypes .badge {
                float: right;
            }
        `;
    }

}
