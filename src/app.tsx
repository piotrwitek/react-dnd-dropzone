// import 'systemjs-hot-reloader/default-listener.js';
// enable hot-reloader
export function __reload(prev) {
  if (prev.app.state)
    app.setState(prev.app.state);
}

// style imports
import './styles/app.css!';
import './vendors/dimmer.min.css!';
import './vendors/button.min.css!';
import './vendors/image.min.css!';
import './vendors/segment.min.css!';
import './vendors/label.min.css!';
import './vendors/icon.min.css!';

// lib imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// components imports
import {ImageUploadPanel} from './components/image-upload-panel';

var projectRoomsIndices = ['0', '1'];

export var app: any = ReactDOM.render(<ImageUploadPanel visible={true} roomsIndices={projectRoomsIndices} />, document.getElementById('app-container'));
