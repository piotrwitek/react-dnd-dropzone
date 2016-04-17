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
    console.log(el);debugger;
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

  render() {
    return (
      <div className="image-upload-panel" ref={this.draggablePanelsConstructor}>
        {this.props.containersData.map((containerData, index) =>
          <DraggableContainer key={index} index={index} itemsData={containerData}
            addItem={this.props.addItem} removeItem={this.props.removeItem} moveItem={this.props.moveItem}
            dragulaInstance={this.dragulaInstance} />) }
      </div>
    );
  }
}
