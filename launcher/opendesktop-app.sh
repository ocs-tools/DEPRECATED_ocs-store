#!/bin/bash

PREFIX="$(cd "$(dirname "${0}")" && pwd)/"

if [ "${APPIMAGE}" ]; then
    if [ "${1}" = '--install' ]; then
        mkdir -p ${HOME}/.local/share/applications
        mkdir -p ${HOME}/.local/bin

        sed -e "s|Exec=opendesktop-app|Exec=${HOME}/.local/bin/opendesktop-app|" \
            -e "s|Icon=opendesktop-app|Icon=${HOME}/.local/share/applications/opendesktop-app.svg|" \
            ${PREFIX}opendesktop-app.desktop > ${HOME}/.local/share/applications/opendesktop-app.desktop
        chmod 644 ${HOME}/.local/share/applications/opendesktop-app.desktop
        install -D -m 644 ${PREFIX}opendesktop-app.svg ${HOME}/.local/share/applications/opendesktop-app.svg
        update-desktop-database ${HOME}/.local/share/applications

        ln -sf opendesktop-app-appimage ${HOME}/.local/bin/opendesktop-app
        install -D -m 755 ${PREFIX}opendesktop-app-appimage ${HOME}/.local/bin/opendesktop-app-appimage
        install -D -m 755 "${APPIMAGE}" ${HOME}/.local/bin/opendesktop-app.AppImage
        rm "${APPIMAGE}"

        exit 0
    elif [ "${1}" = '--uninstall' ]; then
        rm ${HOME}/.local/share/applications/opendesktop-app.desktop
        rm ${HOME}/.local/share/applications/opendesktop-app.svg
        update-desktop-database ${HOME}/.local/share/applications

        unlink ${HOME}/.local/bin/opendesktop-app
        rm ${HOME}/.local/bin/opendesktop-app-appimage
        rm ${HOME}/.local/bin/opendesktop-app.AppImage

        exit 0
    fi
fi

if [ -f "${PREFIX}opendesktop-app-linux-x64/opendesktop-app" ]; then
    ${PREFIX}opendesktop-app-linux-x64/opendesktop-app
elif [ -f "${PREFIX}../lib/opendesktop-app-linux-x64/opendesktop-app" ]; then
    ${PREFIX}../lib/opendesktop-app-linux-x64/opendesktop-app
elif [ -f "${PREFIX}usr/local/lib/opendesktop-app-linux-x64/opendesktop-app" ]; then
    ${PREFIX}usr/local/lib/opendesktop-app-linux-x64/opendesktop-app
elif [ -f "${PREFIX}usr/lib/opendesktop-app-linux-x64/opendesktop-app" ]; then
    ${PREFIX}usr/lib/opendesktop-app-linux-x64/opendesktop-app
elif [ -f '/usr/local/lib/opendesktop-app-linux-x64/opendesktop-app' ]; then
    /usr/local/lib/opendesktop-app-linux-x64/opendesktop-app
elif [ -f '/usr/lib/opendesktop-app-linux-x64/opendesktop-app' ]; then
    /usr/lib/opendesktop-app-linux-x64/opendesktop-app
else
    exit 1
fi
