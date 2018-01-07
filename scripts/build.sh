#!/bin/bash

PKGNAME='opendesktop-app'

BUILDTYPE=''
if [ "${1}" ]; then
    BUILDTYPE="${1}"
fi

PROJDIR="$(cd "$(dirname "${0}")/../" && pwd)"

BUILDVER="$(cd "${PROJDIR}" && git describe --always)"

BUILDDIR="${PROJDIR}/build_${PKGNAME}_${BUILDVER}_${BUILDTYPE}"

SRCARCHIVE="${BUILDDIR}/${PKGNAME}.tar.gz"

export_srcarchive() {
    filepath="${1}"
    $(cd "${PROJDIR}" && git archive --prefix="${PKGNAME}/" --output="${filepath}" HEAD)
}

build_snap() {
    echo 'Not implemented yet'
}

build_flatpak() {
    echo 'Not implemented yet'
}

build_appimage() {
    cd "${PROJDIR}"
    mkdir -p "${BUILDDIR}"
    export_srcarchive "${SRCARCHIVE}"

    tar -xzvf "${SRCARCHIVE}" -C "${BUILDDIR}"
    cp "${PROJDIR}/pkg/appimage/appimage.sh" "${BUILDDIR}/${PKGNAME}"
    cd "${BUILDDIR}/${PKGNAME}"
    sh appimage.sh
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
