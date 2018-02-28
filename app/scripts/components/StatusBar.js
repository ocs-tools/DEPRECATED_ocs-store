import Component from '../../libs/chirit/Component.js';

import StatusBarItem from './StatusBarItem.js';

export default class StatusBar extends Component {

    init() {
        this.items = {};
    }

    html() {
        return `
            <div class="statusbar-spacer"></div>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.alignItems = 'center';
        this.element.style.flex = '0 0 auto';
        this.element.style.width = '100%';
        this.element.style.height = '24px';
        this.element.style.borderTop = '1px solid #cccccc';
        this.element.style.background = '#e0e0e0';
        this.element.style.overflow = 'hidden';

        return `
            .statusbar-spacer {
                flex: 1 1 auto;
                width: auto;
                height: 100%;
            }
        `;
    }

    addItem(data) {
        if (this.items[data.metadata.url]) {
            this.removeItem(data);
        }
        const item = document.createElement('div');
        item.setAttribute('data-statusbaritem', data.metadata.url);
        this.element.insertBefore(item, this.element.querySelector('.statusbar-spacer'));
        this.items[data.metadata.url] = new StatusBarItem(item, data);
    }

    updateItem(data) {
        if (this.items[data.metadata.url]) {
            this.items[data.metadata.url].update(data);
        }
    }

    updateItemDownloadProgress(id, bytesReceived, bytesTotal) {
        if (this.items[id]) {
            this.items[id].downloadProgress(bytesReceived, bytesTotal);
        }
    }

    removeItem(data) {
        if (this.items[data.metadata.url]) {
            this.element.removeChild(this.items[data.metadata.url].element);
            delete this.items[data.metadata.url];
        }
    }

}
