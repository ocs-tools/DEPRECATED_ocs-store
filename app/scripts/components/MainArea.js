'use strict';

import Component from 'js/Component.js';

import StartupDialog from './StartupDialog.js';
import AboutDialog from './AboutDialog.js';
import OcsUrlDialog from './OcsUrlDialog.js';

import BrowsePage from './BrowsePage.js';
import CollectionPage from './CollectionPage.js';
import InstalledItemsPage from './InstalledItemsPage.js';
import UpgradePage from './UpgradePage.js';

export default class Root extends Component {

    html() {
        return `
            <article data-component="StartupDialog"></article>
            <article data-component="AboutDialog"></article>
            <article data-component="OcsUrlDialog"></article>

            <article data-component="BrowsePage"></article>
            <article data-component="CollectionPage"></article>
            <article data-component="InstalledItemsPage"></article>
            <article data-component="UpgradePage"></article>
        `;
    }

    style() {
        this.element.style.flex = '1 1 auto';
        this.element.style.width = '100%';
        this.element.style.height = '0';
        this.element.style.background = '#ffffff';

        return '';
    }

    script() {
        this.startupDialog = new StartupDialog('[data-component="StartupDialog"]');
        this.aboutDialog = new AboutDialog('[data-component="AboutDialog"]');
        this.ocsUrlDialog = new OcsUrlDialog('[data-component="OcsUrlDialog"]');

        this.browsePage = new BrowsePage('[data-component="BrowsePage"]');
        this.collectionPage = new CollectionPage('[data-component="CollectionPage"]');
        this.installedItemsPage = new InstalledItemsPage('[data-component="InstalledItemsPage"]');
        this.upgradePage = new UpgradePage('[data-component="UpgradePage"]');

        this.hideAllPages();
    }

    hideAllPages() {
        for (const key of Object.keys(this)) {
            if (key.endsWith('Page') && this[key].element) {
                this[key].element.style.display = 'none';
            }
        }
    }

    changePage(key) {
        if (this[key] && this[key].element) {
            this.hideAllPages();
            this[key].element.style.display = 'block';
        }
    }

}
