const electron = require('electron');
const electronConfig = require('electron-config');
const childProcess = require('child_process');

const packageMeta = require('../package.json');
const appConfig = require('./configs/application.json');
const ocsManagerConfig = require('./configs/ocs-manager.json');

let mainWindow = null;
let ocsManager = null;

{
    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;

    const debug = process.argv.indexOf('--debug') !== -1 ? true : false;

    function startOcsManager() {
        ocsManager = childProcess.execFile(
            `${app.getAppPath()}/${ocsManagerConfig.bin}`,
            ['-p', ocsManagerConfig.port],
            (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                }
            }
        );
    }

    function stopOcsManager() {
        if (ocsManager) {
            ocsManager.kill();
        }
    }

    function createWindow() {
        const config = new electronConfig({name: 'application', defaults: appConfig.defaults});
        const windowBounds = config.get('windowBounds');

        mainWindow = new BrowserWindow({
            title: packageMeta.productName,
            icon: `${__dirname}/images/app-icons/opendesktop-app.png`,
            x: windowBounds.x,
            y: windowBounds.y,
            width: windowBounds.width,
            height: windowBounds.height
        });

        mainWindow.loadURL(`file://${__dirname}/index.html`);

        if (debug) {
            mainWindow.webContents.openDevTools();
        }
        else {
            mainWindow.setMenu(null);
        }

        mainWindow.on('close', () => {
            const config = new electronConfig({name: 'application'});
            config.set('windowBounds', mainWindow.getBounds());
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    app.on('ready', () => {
        startOcsManager();
        createWindow();
    });

    app.on('quit', () => {
        stopOcsManager();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}
