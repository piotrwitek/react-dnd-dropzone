import '../styles/image-upload-panel.css!';

import * as React from 'react';
import Dragula from 'react-dragula';

import {DraggableContainer} from './draggable-container';
// import {FileDropzone} from './file-dropzone';

const HANDLE_SELECTOR = 'draggable-container-header';

interface IProps extends React.Props<ImageUploadPanel> {
  containersData: any;
  moveContainer: any;
  addItem: any;
  removeItem: any;
  moveItem: any;
}
interface IState {
}

export class ImageUploadPanel extends React.Component<IProps, IState> {
  dragulaInstance = Dragula({
    revertOnSpill: true,
    direction: 'horizontal'
  }).on('drag', (el) => {
    el.className = el.className.replace('ex-moved', '');
  }).on('over', (el, container) => {
    container.className += ' ex-over';
  }).on('out', (el, container) => {
    container.className = container.className.replace('ex-over', '');
  }).on('drop', (el, target, source, sibling) => {

  });

  draggablePanelsConstructor = (backingInstance) => {
    if (backingInstance) {
      Dragula([backingInstance], {
        revertOnSpill: true,
        direction: 'vertical',
        moves: function(el, container, handle) {
          return handle.classList.contains(HANDLE_SELECTOR);
        }
      });
    }
  }

  // Event when you move an item in the list or between lists
  onEndHandler = (evt/**Event*/) => {
    let item = evt.item, oldIndex = evt.oldIndex, newIndex = evt.newIndex;
    console.log('move event', evt);
    // TODO: update store
  }

  render() {
    return (
      <div className="image-upload-panel" ref={this.draggablePanelsConstructor}>
        {this.props.containersData.map((containerData, index) =>
          <DraggableContainer itemsData={containerData} key={index} dragulaInstance={this.dragulaInstance}
            addItem={this.props.addItem} removeItem={this.props.removeItem} moveItem={this.props.moveItem} />) }
      </div>
    );
  }
}
