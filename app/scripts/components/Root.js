'use strict';

import Component from '../../libs/js/Component.js';

import ToolBar from './ToolBar.js';
import StatusBar from './StatusBar.js';
import MainArea from './MainArea.js';
import SidePanel from './SidePanel.js';

export default class Root extends Component {

    init() {
        console.log('Component building started');
    }

    complete() {
        console.log('Component building completed');
    }

    html() {
        return `
            <div class="main-view">
            <nav data-component="ToolBar"></nav>
            <main data-component="MainArea" role="main"></main>
            <nav data-component="StatusBar"></nav>
            </div>

            <aside data-component="SidePanel"></aside>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'row nowrap';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        return `
            .main-view {
                display: flex;
                flex-flow: column nowrap;
                flex: 1 1 auto;
                width: auto;
                height: 100%;
                overflow: hidden;
            }
        `;
    }

    script() {
        this.toolBar = new ToolBar('[data-component="ToolBar"]');
        this.statusBar = new StatusBar('[data-component="StatusBar"]');
        this.mainArea = new MainArea('[data-component="MainArea"]');
        this.sidePanel = new SidePanel('[data-component="SidePanel"]');
    }

}
