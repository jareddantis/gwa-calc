# [gwa-calc](https://calc.jared.gq/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/73b0ee1f-01f1-4660-a201-54e2b5c1efe1/deploy-status)](https://app.netlify.com/sites/gwa-calc/deploys) [![dependencies](https://david-dm.org/jareddantis/gwa-calc/status.svg)](https://david-dm.org/jareddantis/gwa-calc) [![devDependencies](https://david-dm.org/jareddantis/gwa-calc/dev-status.svg)](https://david-dm.org/jareddantis/gwa-calc?type=dev) [![GitHub license](https://img.shields.io/github/license/jareddantis/gwa-calc.svg)](https://github.com/jareddantis/gwa-calc/blob/master/LICENSE.md)

A quick, responsive general weighted average calculator for the modern web.
Built with Vue.js and Typescript, by a student, for students.

## Features

* GWA calculation
* Support for up to 5 sets of 20 subjects
* Grade transmutation and preset subjects for Philippine Science High School students
* Share subject sets and calculate with your friends through in-app QR codes
* Progressive Web App (can be installed offline)

## Building

To build the calculator on your machine, you will need a working installation of [Node.js](https://nodejs.org/en/download/).

Once you have Node.js installed, clone the repository locally and install the required Node.js modules (the following steps are for Linux/macOS):

```bash
git clone https://github.com/jareddantis/gwa-calc.git
cd gwa-calc
npm install -g @vue/cli
npm install
```

You are now ready to make your changes to the files inside `src/`. Preview your changes in your browser:

```bash
npm run serve
```

When you're done, build the calculator:

```bash
npm run build
```

Then serve the resulting `dist` directory in your [SPA](https://en.wikipedia.org/wiki/Single-page_application) compliant web server of choice.

## Contributing

The calculator is automatically built with [Travis](https://travis-ci.com) to make updating and testing easier.

If you have a suggestion for the calculator, you can either

* send me a message about it [here,](http://server.jared.gq/feedback/?subject=GWACalc-vue) or
* make a pull request on this repository if you have some code to share!

## Credits

- [@eligrey/FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [@FortAwesome/Font-Awesome](https://github.com/FortAwesome/Font-Awesome)
- [@google/material-design-icons,](https://material.io) [/workbox](https://github.com/googlechrome/workbox)
- [@localForage](https://github.com/localForage/localForage)
- [@nimiq/qr-scanner](https://github.com/nimiq/qr-scanner)
- [@pieroxy/lz-string](https://github.com/pieroxy/lz-string)
- [@soldair/node-qrcode](https://github.com/soldair/node-qrcode)
- [@SortableJS](https://github.com/SortableJS/Sortable)
- [@vuejs](https://vuejs.org/)
- [@vuetifyjs](https://vuetifyjs.com)

## License

```
gwa-calc: The quick, responsive GWA calculator for PSHS and college students.
Copyright (C) 2019-2020 Aurel Jared Dantis

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
