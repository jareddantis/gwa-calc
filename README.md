# gwa-calc

[![Build Status](https://travis-ci.com/jareddantis/gwa-calc.svg?branch=master)](https://travis-ci.com/jareddantis/gwa-calc) [![dependencies](https://david-dm.org/jareddantis/gwa-calc/status.svg)](https://david-dm.org/jareddantis/gwa-calc) [![devDependencies](https://david-dm.org/jareddantis/gwa-calc/dev-status.svg)](https://david-dm.org/jareddantis/gwa-calc?type=dev) [![Greenkeeper](https://badges.greenkeeper.io/jareddantis/gwa-calc.svg?style=flat)](https://greenkeeper.io)

A quick, responsive general weighted average calculator for the modern web. Built with Vue.js and Typescript, by a student, for students.

## Features

* GWA calculation and grade transmutation for Philippine Science High School students
* Support for up to 5 sets of 20 custom subjects (for students from other universities)
* Progressive Web App (can be installed offline)
* Night mode

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
 
When you're done, test and build the calculator:

```bash
npm run test:unit && npm run build
```

Then serve the resulting `dist` directory in your [SPA](https://en.wikipedia.org/wiki/Single-page_application) compliant web server of choice.

## Contributing

The calculator is automatically built with [Travis](https://travis-ci.com) to make updating and testing easier.

If you have a suggestion for the calculator, you can either

* send me a message about it [here,](http://server.jared.gq/feedback/?subject=GWACalc-vue) or
* make a pull request on this repository if you have some code to share!

## Credits

- Google for the [Material Design](https://material.io) spec and icons
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com)

## License

```
gwa-calc: The quick, responsive GWA calculator for PSHS and college students.
Copyright (C) 2019 Aurel Jared Dantis

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
