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

// type ProjectGalleryData = [
//   {
//     name: string;
//     type: number;
//     items: string[]
//   }
// ]


// sessionStorage
var sessionStorageContainersData = [
  {
    id: 0,
    name: 'Salon',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  },
  {
    id: 1,
    name: 'Pokój 1',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  },
  {
    id: 2,
    name: 'Pokój 2',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  }
];
var projectContainersIndices = [0, 1];

function validateStorageData(storageData, validIndices) {
  let stashedItems = [];
  let filteredStorageData = storageData.filter((item) => {
    if (validIndices.includes(item.id)) {
      return true;
    } else {
      stashedItems = [...stashedItems, ...item.items]
      return false;
    }
  });
  let stash = {
    id: undefined,
    name: 'Nie przydzielone',
    type: 0,
    items: stashedItems
  }
  return [stash, ...filteredStorageData];
}
var validContainersData = validateStorageData(sessionStorageContainersData, projectContainersIndices);

interface AppState {
  containersData: any;
}
interface AppProps extends React.Props<App> {
}
export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    containersData: validContainersData
  }

  addItem = (item) => {

  }

  removeItem = (item) => {

  }

  moveItem = (item) => {

  }

  moveContainer = (startIndex, endIndex) => {
    if (startIndex == null || startIndex === endIndex) return;
    let containersData = this.state.containersData.slice();
    let container = this.state.containersData[startIndex];

    var newContainersData = endIndex > startIndex ?
      [
        ...containersData.slice(0, startIndex),
        ...containersData.slice(startIndex + 1, endIndex),
        container,
        ...containersData.slice(endIndex)
      ] : [
        ...containersData.slice(0, endIndex),
        container,
        ...containersData.slice(endIndex, startIndex),
        ...containersData.slice(startIndex + 1)
      ];

    // console.log(newContainersData);
    this.setState({ containersData: newContainersData });
  }

  render() {
    return (
      <ImageUploadPanel containersData={this.state.containersData} moveContainer={this.moveContainer}
        addItem={this.addItem} removeItem={this.removeItem} moveItem={this.moveItem} />
    );
  }
}

export var app: any = ReactDOM.render(<App />, document.getElementById('app-container'));
