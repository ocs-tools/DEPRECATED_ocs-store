#!/bin/bash

PKGNAME='opendesktop-app'

PKGUSER='pkgbuilder'

BUILDTYPE=''
if [ "${1}" ]; then
    BUILDTYPE="${1}"
fi

PROJDIR="$(cd "$(dirname "${0}")/../" && pwd)"

BUILDSCRIPT="${PROJDIR}/scripts/build.sh"

TRANSFERLOG="${PROJDIR}/transfer.log"

install_nodejs() {
    npm cache clean
    npm install n -g
    #n stable
    n lts
    ln -sf /usr/local/bin/node /usr/bin/node
    ln -sf /usr/local/bin/node /usr/bin/nodejs
    ln -sf /usr/local/bin/npm /usr/bin/npm
}

transfer_file() {
    filepath="${1}"
    if [ -f "${filepath}" ]; then
        filename="$(basename "${filepath}")"
        echo "Uploading ${filename}" >> "${TRANSFERLOG}"
        curl -T "${filepath}" "https://transfer.sh/${filename}" >> "${TRANSFERLOG}"
        echo "" >> "${TRANSFERLOG}"
    fi
}

build_snap() {
    echo 'Not implemented yet'
}

build_flatpak() {
    echo 'Not implemented yet'
}

build_appimage() {
    # docker-image: ubuntu:17.10
    apt update -qq
    apt -y install curl git nodejs npm

    apt -y install build-essential qt5-default libqt5websockets5-dev
    apt -y install cmake libssl-dev libcurl4-gnutls-dev libxpm-dev

    apt -y install file

    apt -y install libgconf-2-4 libxss1
    apt -y install libssl1.0.0 zlib1g

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.AppImage")"
}

if [ "${BUILDTYPE}" = 'snap' ]; then
    build_snap
elif [ "${BUILDTYPE}" = 'flatpak' ]; then
    build_flatpak
elif [ "${BUILDTYPE}" = 'appimage' ]; then
    build_appimage
else
    echo "sh $(basename "${0}") [snap|flatpak|appimage]"
    exit 1
fi
