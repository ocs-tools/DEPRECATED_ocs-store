import Component from '../../libs/chirit/Component.js';

import packageMeta from '../../../package.json';

export default class StartupDialog extends Component {

    html() {
        return `
            <div class="startup-dialog-content">

            <div class="content">
            <div class="banner icon-ocs-store"></div>
            <h1 class="title">Welcome to ${packageMeta.productName}</h1>
            <span class="indicator icon-loading">Starting</span>
            </div>

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
            .startup-dialog-content {
                display: flex;
                flex-flow: column nowrap;
                width: 460px;
                height: 260px;
                border-radius: 0.6em;
                background-color: #ffffff;
                box-shadow: 0 0 2em 0.6em rgba(0,0,0,0.2);
            }

            .startup-dialog-content .content {
                flex: 1 1 auto;
                height: 100%;
                padding: 1em 2em;
                text-align: center;
            }

            .startup-dialog-content .content .banner {
                height: 128px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }

            .startup-dialog-content .content .title {
                margin-top: 1em;
                font-size: 100%;
            }

            .startup-dialog-content .content .indicator {
                display: inline-block;
                margin-top: 1em;
                padding-left: 24px;
                background-position: left center;
                background-repeat: no-repeat;
                background-size: 16px 16px;
            }
        `;
    }

    script() {
        this.hide();
    }

    show() {
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
    }

}
