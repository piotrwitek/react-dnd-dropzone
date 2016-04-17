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

// type ProjectGalleryData = {
//   roomsList: [
//     {
//       name: string;
//       type: number;
//       images: string[]
//     }
//   ]
// }

var initialContainersData = [
  {
    name: 'Salon',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  },
  {
    name: 'Pokój 1',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  }
];

// sessionStorage

var logAppData = () => {
  console.log('app store data:', initialContainersData);
};

interface AppState {
  galleryData: any;
}

interface AppProps extends React.Props<App> {
}

export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    galleryData: initialContainersData
  }

  addItem = (item) => {

  }

  removeItem = (item) => {

  }

  moveItem = (item) => {

  }

  moveContainer = (position) => {

  }

  render() {
    return (
      <ImageUploadPanel containersData={this.state.galleryData} moveContainer={this.moveContainer}
        addItem={this.addItem} removeItem={this.removeItem} moveItem={this.moveItem} />
    );
  }
}

export var app: any = ReactDOM.render(<App />, document.getElementById('app-container'));
