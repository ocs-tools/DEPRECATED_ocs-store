#!/bin/bash

PKGNAME='ocsstore'

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

build_ubuntu() {
    # docker-image: ubuntu:16.04
    apt update -qq
    apt -y install curl git nodejs npm devscripts debhelper fakeroot

    apt -y install build-essential qt5-default libqt5websockets5-dev
    apt -y install cmake libssl-dev libcurl4-gnutls-dev libxpm-dev

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.deb")"
}

build_fedora() {
    # docker-image: fedora:22
    dnf -y install curl git nodejs npm rpm-build

    dnf -y install make automake gcc gcc-c++ libtool qt5-qtbase-devel qt5-qtwebsockets-devel
    dnf -y install cmake openssl-devel libcurl-devel libXpm-devel

    ln -sf /usr/bin/qmake-qt5 /usr/bin/qmake

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.rpm")"
}

build_opensuse() {
    # docker-image: opensuse:42.3
    zypper --non-interactive refresh
    zypper --non-interactive install curl git nodejs npm which rpm-build

    zypper --non-interactive install make automake gcc gcc-c++ libtool libqt5-qtbase-devel libQt5Gui-devel libqt5-qtwebsockets-devel libQt5DBus-devel
    zypper --non-interactive install cmake libopenssl-devel libcurl-devel libXpm-devel

    ln -sf /usr/bin/qmake-qt5 /usr/bin/qmake

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.rpm")"
}

build_archlinux() {
    # docker-image: base/archlinux:latest
    pacman -Syu --noconfirm
    pacman -S --noconfirm curl git nodejs npm

    pacman -S --noconfirm base-devel qt5-base qt5-websockets
    pacman -S --noconfirm cmake openssl libcurl-gnutls libxpm

    pacman -S --noconfirm gconf libxss

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.pkg.tar.xz")"
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

if [ "${BUILDTYPE}" = 'ubuntu' ]; then
    build_ubuntu
elif [ "${BUILDTYPE}" = 'fedora' ]; then
    build_fedora
elif [ "${BUILDTYPE}" = 'opensuse' ]; then
    build_opensuse
elif [ "${BUILDTYPE}" = 'archlinux' ]; then
    build_archlinux
elif [ "${BUILDTYPE}" = 'snap' ]; then
    build_snap
elif [ "${BUILDTYPE}" = 'flatpak' ]; then
    build_flatpak
elif [ "${BUILDTYPE}" = 'appimage' ]; then
    build_appimage
else
    echo "sh $(basename "${0}") [ubuntu|fedora|archlinux|snap|flatpak|appimage]"
    exit 1
fi
