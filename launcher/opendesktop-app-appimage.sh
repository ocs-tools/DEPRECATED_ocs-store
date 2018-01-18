#!/bin/bash

if [ -f "${HOME}/.cache/opendesktop-app/opendesktop-app.AppImage" ]; then
    chmod 755 ${HOME}/.cache/opendesktop-app/opendesktop-app.AppImage
    ${HOME}/.cache/opendesktop-app/opendesktop-app.AppImage --install
fi

if [ -f "${HOME}/.local/bin/opendesktop-app.AppImage" ]; then
    ${HOME}/.local/bin/opendesktop-app.AppImage
fi
