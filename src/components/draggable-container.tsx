import * as React from "react";
import * as ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import FileAPI from 'fileapi';
import * as AppUtils from '../app-utils';
import {DraggableItem} from './draggable-item';

const ANIMATION_SPEED = 300;
const REMOVE_BUTTON_SELECTOR = '.remove-item';

interface IProps extends React.Props<DraggableContainer> {
  dragulaInstance: any;
  index: any;
  itemsData: any;
  addItem: any;
  removeItem: any;
  moveItem: any;
}
interface IState {
}

export class DraggableContainer extends React.Component<IProps, IState> {
  draggableContainerNode: undefined;
  // items container
  draggableContainerConstructor = (backingInstance) => {
    if (backingInstance) {
      this.draggableContainerNode = backingInstance;
      this.props.dragulaInstance.containers.push(backingInstance);
    }
  }
  // dropzone overlay
  dropzoneOverlayConstructor = (backingInstance) => {
    if (backingInstance) {
      let previewContainer = this.draggableContainerNode;
      let hoverHandler = (isHover) => {
        backingInstance.classList.remove('dimmed');
        if (isHover) backingInstance.classList.add('dimmed');
      };
      let dropHandler = (files) => {
        AppUtils.filterImageFiles(files).forEach(image => this.addNewImage(image));
      };
      FileAPI.event.dnd(backingInstance, hoverHandler, dropHandler);
    }
  }
  // TODO: extract fileinput component
  fileInputConstructor = (backingInstance) => {
    if (backingInstance) {
      FileAPI.event.on(backingInstance, 'change', (evt) => {
        let files = FileAPI.getFiles(evt); // Retrieve file list

        AppUtils.filterImageFiles(files).forEach(image => this.addNewImage(image));
        // reset file input
        FileAPI.reset(evt.currentTarget);
      });
    }
  }
  // add new files handler
  addNewImage = (file) => {
    // render to container
    let index = this.draggableContainerNode.childNodes.length;
    let previewNode = document.createElement('div');
    previewNode.className += "draggable-item";
    previewNode.setAttribute('data-id', index.toString());
    ReactDOM.render(<DraggableItem fileReference={file} name={file.name} dragulaInstance={this.props.dragulaInstance} />, previewNode);
    this.draggableContainerNode.appendChild(previewNode);

    // upload file
    AppUtils.uploadFile(file, previewNode);

    // TODO: update store
  }

  render() {
    const PREFIX = AppUtils.generateRandomString();
    let {index, itemsData} = this.props;
    return (
      <div className="draggable-container ui dimmable" ref={this.dropzoneOverlayConstructor} data-id={index}>

        <h2 className="draggable-container-header">{itemsData.name}</h2>

        <label className="upload-link" htmlFor={PREFIX + '_file'}>Upload files...</label>
        <input id={PREFIX + '_file'} name="files" type="file" accept="image/*" multiple
          style={{ display: 'none' }} ref={this.fileInputConstructor} />

        <div className="draggable-container-items" ref={this.draggableContainerConstructor}>
          {itemsData.items.map((item, index) =>
            <div className="draggable-item" key={index} data-id={index}>
              <DraggableItem fileReference={item} name={item.split('/').slice(-1).pop() }
                dragulaInstance={this.props.dragulaInstance} />
            </div>
          ) }
        </div>

        <div className="ui simple dimmer">
          <div className="content">
            <h2 className="center">Drop here</h2>
          </div>
        </div>

      </div>
    );
  }

}
