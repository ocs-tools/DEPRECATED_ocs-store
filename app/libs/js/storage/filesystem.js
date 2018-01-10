/**
 * js
 *
 * @author      Akira Ohgaki <akiraohgaki@gmail.com>
 * @copyright   Akira Ohgaki
 * @license     https://opensource.org/licenses/BSD-2-Clause
 * @link        https://github.com/akiraohgaki/js
 */

(function(self) {
    'use strict';

    if (!self.js) {
        self.js = {};
    }
    if (!self.js.storage) {
        self.js.storage = {};
    }

    /**
     * File System API wrapper
     * Attention: Filesystem API is non-standard, only Chrome and Cordova
     */
    self.js.storage.filesystem = {
        filesystem: null,
        root: null,
        current: null,
        config: {
            type: 'TEMPORARY', // TEMPORARY|PERSISTENT
            size: 0
        },
        init: function(successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            if (!window.requestFileSystem && window.webkitRequestFileSystem) {
                window.requestFileSystem = window.webkitRequestFileSystem;
            }

            /*
            if (!window.storageInfo && window.webkitStorageInfo) {
                window.storageInfo = window.webkitStorageInfo;
            }
            */

            // Cordova defined TEMPORARY/PERSISTENT property into LocalFileSystem object
            var type = null;
            if (this.config.type.toUpperCase() == 'TEMPORARY') {
                if (typeof window.TEMPORARY !== 'undefined') {
                    type = window.TEMPORARY;
                }
                else if (typeof LocalFileSystem !== 'undefined'
                    && typeof LocalFileSystem.TEMPORARY !== 'undefined'
                ) {
                    type = LocalFileSystem.TEMPORARY;
                }
            }
            else if (this.config.type.toUpperCase() == 'PERSISTENT') {
                if (typeof window.PERSISTENT !== 'undefined') {
                    type = window.PERSISTENT;
                }
                else if (typeof LocalFileSystem !== 'undefined'
                    && typeof LocalFileSystem.PERSISTENT !== 'undefined'
                ) {
                    type = LocalFileSystem.PERSISTENT;
                }
            }

            if (window.requestFileSystem) {
                window.requestFileSystem(
                    type,
                    this.config.size,
                    function(filesystem) {
                        this.filesystem = filesystem;
                        this.root = this.filesystem.root;
                        this.current = this.root;
                        successCallback(this.filesystem);
                        resolve(this.filesystem);
                    }.bind(this),
                    function(error) {
                        errorCallback(error);
                        reject(error);
                    }
                );
            }
            else {
                var error = new Error('File System API is not supported');
                errorCallback(error);
                reject(error);
            }

            return promise;
        },
        createDir: function(dirname, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getDirectory(
                dirname,
                {create: true},
                function(dirEntry) {
                    successCallback(dirEntry);
                    resolve(dirEntry);
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        getDir: function(dirname, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getDirectory(
                dirname,
                {create: false},
                function(dirEntry) {
                    successCallback(dirEntry);
                    resolve(dirEntry);
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        readDir: function(dirname, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getDirectory(
                dirname,
                {create: false},
                function(dirEntry) {
                    this._readEntries(
                        dirEntry.createReader(),
                        [],
                        function(entries) {
                            successCallback(entries);
                            resolve(entries);
                        },
                        function(error) {
                            errorCallback(error);
                            reject(error);
                        }
                    );
                }.bind(this),
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        _readEntries: function(dirReader, entries, successCallback, errorCallback) {
            dirReader.readEntries(
                function(results) {
                    if (!results.length) {
                        successCallback(entries);
                    }
                    else {
                        this._readEntries(
                            dirReader,
                            entries.concat(results),
                            successCallback,
                            errorCallback
                        );
                    }
                }.bind(this),
                function(error) {
                    errorCallback(error);
                }
            );
        },
        removeDir: function(dirname, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getDirectory(
                dirname,
                {create: false},
                function(dirEntry) {
                    dirEntry.remove(
                        function() {
                            successCallback(true);
                            resolve(true);
                        },
                        function(error) {
                            errorCallback(error);
                            reject(error);
                        }
                    );
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        removeDirRecursively: function(dirname, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getDirectory(
                dirname,
                {create: false},
                function(dirEntry) {
                    dirEntry.removeRecursively(
                        function() {
                            successCallback(true);
                            resolve(true);
                        },
                        function(error) {
                            errorCallback(error);
                            reject(error);
                        }
                    );
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        createFile: function(filename, data, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getFile(
                filename,
                {create: true},
                function(fileEntry) {
                    fileEntry.createWriter(
                        function(fileWriter) {
                            fileWriter.write(data);
                            successCallback(fileEntry);
                            resolve(fileEntry);
                        },
                        function(error) {
                            errorCallback(error);
                            reject(error);
                        }
                    );
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        getFile: function(filename, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getFile(
                filename,
                {create: false},
                function(fileEntry) {
                    successCallback(fileEntry);
                    resolve(fileEntry);
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        removeFile: function(filename, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            this.current.getFile(
                filename,
                {create: false},
                function(fileEntry) {
                    fileEntry.remove(
                        function() {
                            successCallback(true);
                            resolve(true);
                        },
                        function(error) {
                            errorCallback(error);
                            reject(error);
                        }
                    );
                },
                function(error) {
                    errorCallback(error);
                    reject(error);
                }
            );

            return promise;
        },
        copy: function() {
            // Not implemented yet
        },
        move: function() {
            // Not implemented yet
        },
        download: function(uri, filename, successCallback, errorCallback) {
            if (typeof successCallback !== 'function') {
                successCallback = function(result) {};
            }
            if (typeof errorCallback !== 'function') {
                errorCallback = function(error) {};
            }

            var promise = null;
            var resolve = function(result) {};
            var reject = function(error) {};
            if (window.Promise) {
                promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }

            // Cordova may have FileTransfer object
            if (typeof FileTransfer !== 'undefined') {
                var fileTransfer = new FileTransfer();
                fileTransfer.download(
                    uri,
                    this.current.toURL() + '/' + filename,
                    function(fileEntry) {
                        successCallback(fileEntry);
                        resolve(fileEntry);
                    },
                    function(error) {
                        errorCallback(error);
                        reject(error);
                    }
                );
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', uri, true);
                xhr.responseType = 'blob';
                xhr.addEventListener('load', function(event) {
                    if (xhr.status === 200) {
                        this.createFile(
                            filename,
                            xhr.response,
                            function(fileEntry) {
                                successCallback(fileEntry);
                                resolve(fileEntry);
                            },
                            function(error) {
                                errorCallback(error);
                                reject(error);
                            }
                        );
                    }
                    else {
                        var error = new Error('File download error');
                        errorCallback(error);
                        reject(error);
                    }
                }.bind(this), false);
                xhr.send();
            }

            return promise;
        }
    };

})(typeof self !== 'undefined' ? self : this);
