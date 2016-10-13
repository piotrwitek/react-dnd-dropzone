import * as React from "react";
import * as ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import Dragula from 'react-dragula';
import FileAPI from 'fileapi';
import * as AppGlobals from '../app-globals';
import * as AppUtils from '../app-utils';
import * as AppModels from '../app-models';
import {DraggableItem} from './draggable-item';
import {DraggableContainerStore, DraggableContainerModel} from './draggable-container-store';

const ANIMATION_SPEED = 300;
const REMOVE_BUTTON_SELECTOR = '.remove-item';

interface IProps extends React.Props<DraggableContainer> {
  dragulaInstance: any;
  containerIndex: number;
  containerData: DraggableContainerModel;
  containerStore: DraggableContainerStore;
}
interface IState {
}

@observer
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
      // let previewContainer = this.draggableContainerNode;
      let dropzoneHoverHandler = (isHover) => {
        backingInstance.classList.remove('dimmed');
        if (isHover) backingInstance.classList.add('dimmed');
      };
      let dropzoneDropHandler = (fileObjects) => {
        AppUtils.filterImageFiles(fileObjects).forEach(imageFileObject => this.uploadFileHandler(imageFileObject));
      };
      FileAPI.event.dnd(backingInstance, dropzoneHoverHandler, dropzoneDropHandler);
    }
  }
  // TODO: extract fileinput component
  fileInputConstructor = (backingInstance) => {
    if (backingInstance) {
      FileAPI.event.on(backingInstance, 'change', (evt) => {
        let fileObjects = FileAPI.getFiles(evt); // Retrieve file list

        AppUtils.filterImageFiles(fileObjects).forEach(imageFileObject => this.uploadFileHandler(imageFileObject));
        // reset file input
        FileAPI.reset(evt.currentTarget);
      });
    }
  }
  // add new files handler
  uploadFileHandler = (fileObject) => {
    this.props.containerStore.addItemToContainer(fileObject, this.props.containerIndex);
  }

  componentDidUpdate() {
    // console.log(this.props.containerData);
  }

  render() {
    const PREFIX = AppUtils.generateRandomString();
    let {containerIndex, containerData} = this.props;
    let handleSelector = ' ' + (containerData.id != undefined ? AppGlobals.HANDLE_SELECTOR : '');
    return (
      <div className="draggable-container ui dimmable" ref={this.dropzoneOverlayConstructor} data-id={containerIndex}>

        <h2 className={`draggable-container-header${handleSelector}`}>
          {containerData.name}</h2>

        <label className="upload-link" htmlFor={PREFIX + '_file'}>Upload files...</label>
        <input id={PREFIX + '_file'} name="files" type="file" accept="image/*" multiple
          style={{ display: 'none' }} ref={this.fileInputConstructor} />

        <div className="draggable-container-items" ref={this.draggableContainerConstructor}>
          { containerData.items.map((item, index) =>
            <div className="draggable-item" key={item.id} data-id={index}>
              <DraggableItem itemReference={item}
                dragulaInstance={this.props.dragulaInstance}
                removeHandler={ () => { this.props.containerStore.removeItemFromContainer(index, this.props.containerIndex) } } />
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
