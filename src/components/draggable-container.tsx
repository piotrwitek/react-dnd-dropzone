import * as React from "react";
import * as ReactDOM from 'react-dom';
import Sortable from 'sortablejs';
import FileAPI from 'fileapi';
import * as AppGlobals from '../app-globals';
import * as AppUtils from '../app-utils';
import {DraggableItem} from './draggable-item';

const ANIMATION_SPEED = 300;
const REMOVE_BUTTON_SELECTOR = '.remove-item';

interface IProps extends React.Props<DraggableContainer> {
  containerData: any;
}
interface IState {
}

export class DraggableContainer extends React.Component<IProps, IState> {
  sortableContainerElement = undefined;

  sortableContainerConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        animation: ANIMATION_SPEED, // ms, animation speed moving items when sorting, `0` — without animation
        // draggable: "", // Specifies which items inside the element should be sortable
        group: "shared",
        filter: REMOVE_BUTTON_SELECTOR,
        onFilter: this.onRemoveHandler,
        onMove: this.onMoveHandler
      };
      let sortableInstance = Sortable.create(componentBackingInstance, options);
      this.sortableContainerElement = sortableInstance.el;
    }
  };
  // Event when you move an item in the list or between lists
  onMoveHandler = (evt/**Event*/) => {
    let item = evt.dragged, from = evt.from, to = evt.to;
    console.log('move event');
    // TODO: update store
  }
  // Event on filtered selector
  onRemoveHandler = (evt) => {
    let item = evt.item, target = evt.target;
    if (Sortable.utils.is(target, REMOVE_BUTTON_SELECTOR)) {  // Click on remove button
      item.parentNode.removeChild(item); // remove sortable item
    }
    // TODO: update store
    // TODO: delete file on server
  }

  render() {
    const PREFIX = AppUtils.generateRandomString();
    let {containerData} = this.props;
    return (
      <div className="draggable-container ui dimmable" ref={this.dropzoneConstructor}>

        <h2 className="draggable-container-header">{containerData.name}</h2>

        <label className="upload-link" htmlFor={PREFIX + '_file'}>Upload files...</label>
        <input id={PREFIX + '_file'} name="files" type="file" accept="image/*" multiple
          style={{ display: 'none' }} ref={this.fileInputConstructor} />

        <div className="draggable-container-items" ref={this.sortableContainerConstructor}>
          {containerData.items.map((item, index) =>
            <div className="draggable-item" key={index}>
              <DraggableItem fileReference={item} name={item.split('/').slice(-1).pop() }/>
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

  // extract dropzone component
  dropzoneConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let previewContainer = this.sortableContainerElement;
      let hoverHandler = (isHover) => {
        componentBackingInstance.className = componentBackingInstance.className.replace(/\bdimmed\b/, '');
        if (isHover) componentBackingInstance.className += ' dimmed';
      };
      let dropHandler = (files) => {
        this.filterImageFiles(files).forEach(image => this.uploadNewFile(image));
      };
      FileAPI.event.dnd(componentBackingInstance, hoverHandler, dropHandler);
    }
  }

  // extract fileinput component
  fileInputConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let previewContainer = this.sortableContainerElement;
      FileAPI.event.on(componentBackingInstance, 'change', this.fileInputChangeHandler);
    }
  }

  filterImageFiles = (files) => {
    return files.filter((file) => /^image/.test(file.type));
  }

  uploadNewFile = (file) => {
    // render to container
    let item = document.createElement('div');
    item.className += "draggable-item";
    ReactDOM.render(<DraggableItem fileReference={file} name={file.name} />, item);
    this.sortableContainerElement.appendChild(item);

    // upload file
    FileAPI.upload({
      url: AppGlobals.UPLOAD_URL,
      files: { file: file },
      imageTransform: { type: 'image/jpeg', quality: 0.86 },
      upload: (evt) => { console.log('upload start') },
      progress: (evt) => { console.log('upload progress') },
      complete: (err, xhr) => { console.log('upload done') }
    });

    // TODO: update store
  }

  // Event when selected new file with input
  fileInputChangeHandler = (evt) => {
    let files = FileAPI.getFiles(evt); // Retrieve file list

    this.filterImageFiles(files).forEach(image => this.uploadNewFile(image));
    // reset file input
    FileAPI.reset(evt.currentTarget);
  }

}
