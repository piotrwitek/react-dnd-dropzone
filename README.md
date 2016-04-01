# Drag & Drop Image Dropzone - React Component
Image Dropzone with Drag & Drop Management Panel - React / ES2015 / TypeScript

## Features
- React with ES2015 / TypeScript
- Koa.js framework server for file uploads
- JSPM 0.17.X with hot-module reload enabled and example code (chokidar-socket-emitter/systemjs-hot-reloader)
- bundling for production in `~/dist/` folder - test productions available on `http://localhost/dist/`
- importing and bundling CSS dependencies using JSPM `plugin-css`
- npm run scripts to automate bundling & dev server startup
- various drag & drop libraries integration examples

---

## Examples
- React Dropzone integration - https://github.com/felixrieseberg/React-Dropzone-Component
- Dragula integration - https://github.com/bevacqua/dragula
- Sortable integration - https://github.com/RubaXa/Sortable

---

## Usage

#### NPM Commands

`npm start` - start local development server with hot-reload **(WARNING: currently working only for windows)**
*other platforms please npm run server & hot-reloader processes seperately, plan to fix it in the future*

`npm run server` - start local development server (browser-sync - w/o hot-reload)

`npm run hot-reloader` - start hot-reloader (chokidar-socket-emitter)

`npm run build-test` - build production bundle - debug version with source-maps

`npm run build-prod` - build production bundle - optimized minified version w/o source-maps

---

## Installation

#### Prerequisites
- node.js and git
- install jspm package globally to have jspm command available: `npm install jspm -g` (otherwise you would have to use a local version from `~/node_modules/`)


#### 1. Create new project folder
    mkdir my-project && cd my-project

#### 2. Clone repo
    git clone https://github.com/piotrwitek/react-dnd-dropzone.git

#### 3. Install npm dependencies
    npm install

#### 4. Run development server and start developing
###### On windows
    npm start
###### Other platforms
    npm run server
    npm run hot-reloader

---

## Dependencies
- https://github.com/Microsoft/TypeScript/
- https://github.com/facebook/react/
- https://github.com/capaj/chokidar-socket-emitter
- https://github.com/jspm/jspm-cli
- https://github.com/capaj/systemjs-hot-reloader

---

## The MIT License (MIT)

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
