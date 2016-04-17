import '../styles/image-upload-panel.css!';

import * as React from 'react';
import Sortable from 'sortablejs';

import {DraggableContainer} from './draggable-container';
import {FileDropzone} from './file-dropzone';

const HANDLE_SELECTOR = '.draggable-container-header';

interface IProps extends React.Props<ImageUploadPanel> {
  logger: any;
  inputData?: any;
}
interface IState {
}

export class ImageUploadPanel extends React.Component<IProps, IState> {

  draggableContainersConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        animation: 250, // ms, animation speed moving items when sorting, `0` — without animation
        handle: HANDLE_SELECTOR, // Restricts sort start click/touch to the specified element
        onMove: this.onMoveHandler
      };
      Sortable.create(componentBackingInstance, options);
    }
  };
  // Event when you move an item in the list or between lists
  onMoveHandler = (evt/**Event*/) => {
    let item = evt.dragged, from = evt.from, to = evt.to;
    console.log('move event', item);
    // TODO: update store
  }

  render() {
    return (
      <div className="image-upload-panel" ref={this.draggableContainersConstructor}>
        {/* <FileDropzone /> */}
        {this.props.inputData.map((containerData, index) =>
          <DraggableContainer containerData={containerData} logger={this.props.logger} key={index} />) }
      </div>
    );
  }
}
