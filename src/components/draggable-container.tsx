import * as React from "react";
import * as ReactDOM from 'react-dom';
import Sortable from 'sortablejs';
import FileAPI from 'fileapi';
import * as AppGlobals from '../app-globals';
import * as AppUtils from '../app-utils';
import {DraggableItem} from './draggable-item';

const PREVIEW_SIZE = 120;
const ANIMATION_SPEED = 500;
const REMOVE_BUTTON_SELECTOR = '.dz-remove';

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
  onAddHandler = (inputImg) => {
    FileAPI.Image(inputImg).preview(PREVIEW_SIZE).get((err, finalImg) => {
      if (!err) {
        let item = document.createElement('div');
        ReactDOM.render(
          <DraggableItem item={''} />
          , item);
        // append to container
        this.sortableContainerElement.appendChild(item);
        // TODO: update store
      }
    });
  }

  render() {
    const PREFIX = AppUtils.generateRandomString();
    let {containerData} = this.props;
    return (
      <div className="group dropzone">

        <div id="drop-zone" class="b-dropzone" style={{ display: 'none' }}>
          <div class="b-dropzone__bg"></div>
          <div class="b-dropzone__txt">Drop files</div>
        </div>

        <h2 className="group-title">{containerData.name}</h2>

        <input id={PREFIX + '_file'} name="files" type="file" accept="image/*" multiple
          style={{ display: 'none' }} ref={this.fileInputConstructor} />
        <label className="upload-link" htmlFor={PREFIX + '_file'}>Upload files...</label>

        <div className="group-list" ref={this.sortableContainerConstructor}>
          {containerData.items.map((item, index) =>
            <DraggableItem item={item} key={index} logger={this.props.logger} />
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
      // make preview 100x100
      FileAPI.Image(file).preview(100).get((err, img) => {
        if (!err) {
          // render preview
          this.onAddHandler(img);
          // upload file
          FileAPI.upload({
            url: AppGlobals.UPLOAD_URL,
            files: { file: file },
            // imageTransform: { type: 'image/jpeg', quality: 0.86 },
            upload: (evt) => { console.log('upload start') },
            progress: (evt) => { console.log('upload progress') },
            complete: (err, xhr) => { console.log('upload done') }
          });
        }
      });
    });
    // reset file input
    FileAPI.reset(evt.currentTarget);
  }
}
