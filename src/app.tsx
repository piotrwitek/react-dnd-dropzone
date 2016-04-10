// enable hot-reloader
export function __reload(prev) {
  if (prev.app.state)
    app.setState(prev.app.state);
}
var appContainer = document.getElementById('app-container');

// style imports
import './app.css!';
// lib imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// components imports
import {DragulaExampleEsnext} from './components/dragula-example-esnext';
import {SortableExampleEsnext} from './components/sortable-example-esnext';
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

var galleryData = [
  {
    name: 'Salon',
    type: 0,
    items: [
      '/src_server/uploads/1460244748406_6785_xterm-app-128-cropped.png',
      '/src_server/uploads/1460244748406_6785_xterm-app-128-cropped.png'
    ]
  },
  {
    name: 'Pokój 1',
    type: 0,
    items: [
      '/src_server/uploads/1460244748406_6785_xterm-app-128-cropped.png'
    ]
  }
];

var logAppData = () => { console.log('app store data:', galleryData) };

interface AppState {
}

interface AppProps extends React.Props<App> {
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super();
  }

  render() {
    return (
      <div>
        <ImageUploadPanel inputData={galleryData} logger={logAppData} />
      </div>
    );
  }
}

export var app: any = ReactDOM.render(<App />, appContainer);
