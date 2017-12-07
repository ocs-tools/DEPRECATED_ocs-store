Summary: OCS-Store
Name: ocsstore
Version: 2.3.0
Release: 1%{?dist}
License: GPLv3+
Group: Applications/Internet
URL: https://github.com/opendesktop/ocsstore

#Source0: https://github.com/opendesktop/ocsstore/archive/release-%{version}.tar.gz
Source0: %{name}.tar.gz

Requires: gconf2, libXss1, libQt5Gui5 >= 5.3.0, libQt5WebSockets5 >= 5.3.0, libQt5DBus5 >= 5.3.0
BuildRequires: curl, git, nodejs, npm, which, rpm-build, make, automake, gcc, gcc-c++, libtool, libqt5-qtbase-devel >= 5.3.0, libQt5Gui-devel >= 5.3.0, libqt5-qtwebsockets-devel >= 5.3.0, libQt5DBus-devel >= 5.3.0, cmake, libopenssl-devel, libcurl-devel, libXpm-devel

%description
OCS-compatible Electron-based frontend.

%prep
#%%autosetup -n %{name}-release-%{version}
%autosetup -n %{name}

%build
%define debug_package %{nil}
make

%install
make DESTDIR="%{buildroot}" prefix="/usr" install

%files
%defattr(-,root,root)
%{_bindir}/%{name}
%{_bindir}/%{name}-appimage
/usr/lib/%{name}-*/*
%{_datadir}/applications/%{name}.desktop
%{_datadir}/icons/hicolor/scalable/apps/%{name}.svg

%clean
rm -rf %{buildroot}

%changelog
* Thu Dec 07 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.3.0-1
- Update node.js, Electron, and modules
- Update ocs-manager
- Add close button to dialog
- Integrate libappimageupdate

* Mon Sep 25 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.2.1-1
- Support AppImage
- Fix for app launcher
- Fix missing dependencies

* Tue Aug 15 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.2.0-1
- Toolbar items and sidebar changed
- Added theme apply functions for Cinnamon desktop, it's available for wallpaper, icon, cursor, gtk3 theme, metacity theme, and cinnamon theme
- Added theme apply functions for Mate desktop, it's available for wallpaper, icon, cursor, gtk2 theme, and metacity theme

* Wed Jul 19 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.1.1-1
- Fix for file installation

* Sun Jul 09 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.1.0-1
- Rebrand
