#!/bin/sh

PKGNAME='opendesktop-app'
PKGVER='3.0.3'
PKGREL='1'

curl -fsSL -o appimagetool.AppImage https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod 755 appimagetool.AppImage
./appimagetool.AppImage --appimage-extract

make ocsmanager_bin=appimage
make DESTDIR="${PKGNAME}.AppDir" prefix=/usr install

install -D -m 755 /usr/lib/x86_64-linux-gnu/libgconf-2.so.4 ${PKGNAME}.AppDir/usr/lib/opendesktop-app-linux-x64/libgconf-2.so.4
install -D -m 755 /usr/lib/x86_64-linux-gnu/libXss.so.1 ${PKGNAME}.AppDir/usr/lib/opendesktop-app-linux-x64/libXss.so.1

install -D -m 755 ${PKGNAME}.AppDir/usr/bin/${PKGNAME} ${PKGNAME}.AppDir/AppRun
install -D -m 755 ${PKGNAME}.AppDir/usr/bin/${PKGNAME}-appimage ${PKGNAME}.AppDir/${PKGNAME}-appimage
install -D -m 644 ${PKGNAME}.AppDir/usr/share/applications/${PKGNAME}.desktop ${PKGNAME}.AppDir/${PKGNAME}.desktop
install -D -m 644 ${PKGNAME}.AppDir/usr/share/icons/hicolor/scalable/apps/${PKGNAME}.svg ${PKGNAME}.AppDir/${PKGNAME}.svg

./squashfs-root/AppRun ${PKGNAME}.AppDir

mv ${PKGNAME}*.AppImage ${PKGNAME}-${PKGVER}-${PKGREL}-x86_64.AppImage
