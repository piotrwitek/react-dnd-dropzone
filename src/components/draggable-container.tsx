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
  logger: any;
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
  // Event when selected new file with input
  onAddHandler = (file) => {
    let item = document.createElement('div');
    item.className += "draggable-item";
    ReactDOM.render(<DraggableItem file={file} name={file.name} />, item);
    // append to container
    this.sortableContainerElement.appendChild(item);
    // TODO: update store
  }

  render() {
    const PREFIX = AppUtils.generateRandomString();
    let {containerData} = this.props;
    return (
      <div className="draggable-container">

        <div id="drop-zone" class="b-dropzone" style={{ display: 'none' }}>
          <div class="b-dropzone__bg"></div>
          <div class="b-dropzone__txt">Drop files</div>
        </div>

        <h2 className="draggable-container-header">{containerData.name}</h2>

        <label className="upload-link" htmlFor={PREFIX + '_file'}>Upload files...</label>
        <input id={PREFIX + '_file'} name="files" type="file" accept="image/*" multiple
          style={{ display: 'none' }} ref={this.fileInputConstructor} />

        <div className="draggable-container-items" ref={this.sortableContainerConstructor}>
          {containerData.items.map((item, index) =>
            <div className="draggable-item" key={index}>
              <DraggableItem file={item} name={item.split('/').slice(-1).pop()}  logger={this.props.logger} />
            </div>
          ) }
        </div>

      </div>
    );
  }

  // extract component
  fileInputConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let previewContainer = this.sortableContainerElement;
      FileAPI.event.on(componentBackingInstance, 'change', this.fileInputChangeHandler);
    }
  }

  fileInputChangeHandler = (evt) => {
    let files = FileAPI.getFiles(evt); // Retrieve file list
    files = files.filter((file) => /^image/.test(file.type));
    files.forEach((file) => {
      this.onAddHandler(file);
      // upload file
      FileAPI.upload({
        url: AppGlobals.UPLOAD_URL,
        files: { file: file },
        imageTransform: { type: 'image/jpeg', quality: 0.86 },
        upload: (evt) => { console.log('upload start') },
        progress: (evt) => { console.log('upload progress') },
        complete: (err, xhr) => { console.log('upload done') }
      });
    });
    // reset file input
    FileAPI.reset(evt.currentTarget);
  }
}
