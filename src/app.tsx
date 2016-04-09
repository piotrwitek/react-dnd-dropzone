// enable hot-reloader
export function __reload(prevModule) {
  if (prevModule.appComponent.state)
    appComponent.setState(prevModule.appComponent.state);
}
var appContainer = document.getElementById('app-container');
// style imports
import './app.css!';
// lib imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import DropzoneComponent from 'react-dropzone-component';

// components imports
import {DragulaExampleEsnext} from './components/dragula-example-esnext';
import {SortableExampleEsnext} from './components/sortable-example-esnext';

var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: 'http://localhost:3000/uploadHandler'
};

var djsConfig = {
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview">
      <div className="dz-image">
        <img data-dz-thumbnail />
      </div>
      <div className="dz-details">
        <div className="dz-size"><span data-dz-size></span></div>
        <div className="dz-filename"><span data-dz-name></span></div>
      </div>
      <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress></span></div>
      <div className="dz-error-message"><span data-dz-errormessage></span></div>
      <div className="dz-success-mark"><span>Success</span></div>
      <div className="dz-error-mark"><span>Error</span></div>
      <a href='#' data-dz-remove>Remove</a>
    </div>
  )
};

interface AppProps extends React.Props<App> {
}

interface AppState {
  test: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super();
    this.state = { test: false };
  }

  render() {
    return (
      <div>
        <SortableExampleEsnext />
        <DragulaExampleEsnext />
      </div>
    );
  }
}

export var appComponent = ReactDOM.render(<App />, appContainer);
