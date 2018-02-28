import Component from '../../libs/chirit/Component.js';

export default class BrowsePage extends Component {

    html() {
        return `
            <webview data-webview="main"></webview>
        `;
    }

    style() {
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.element.style.overflow = 'hidden';

        return `
            [data-webview="main"] {
                width: 100%;
                height: 100%;
            }
        `;
    }

}
