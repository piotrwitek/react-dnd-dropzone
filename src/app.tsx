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
        <SortableExampleEsnext />
      </div>
    );
  }
}

export var app: any = ReactDOM.render(<App />, appContainer);
