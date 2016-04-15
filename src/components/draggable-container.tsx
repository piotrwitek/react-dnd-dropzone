import * as React from "react";
import * as ReactDOM from 'react-dom';
import Sortable from 'sortablejs';
import FileAPI from 'fileapi';
import * as AppGlobals from '../app-globals';
import * as AppUtils from '../app-utils';
import {DraggableItem} from './draggable-item';

const REMOVE_BUTTON = '.dz-remove';

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
        animation: 1000, // ms, animation speed moving items when sorting, `0` — without animation
        // draggable: "", // Specifies which items inside the element should be sortable
        group: "shared",
        onMove: this.onMoveHandler,
        filter: REMOVE_BUTTON,
        onFilter: this.onRemoveHandler
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
  // Interaction on filtered element
  onRemoveHandler = (evt) => {
    let item = evt.item, target = evt.target;
    if (Sortable.utils.is(target, REMOVE_BUTTON)) {  // Click on remove button
      item.parentNode.removeChild(item); // remove sortable item
    }

    // TODO: update store
    // TODO: delete file on server
  }

  onAddHandler = (inputImg) => {
    // TODO: render item
    let item = document.createElement('div');
    let src = '/src_server/1460437027905_1925_UUQYMPG.jpg';
    var img = new Image();   // Create new img element
    img.onload = () => {
      // execute drawImage statements here
      // let thumb = getThumbnail(img, 1 / 5);
      // this.sortableContainerElement.appendChild(thumb);
console.log('onload');
      FileAPI.Image(img).preview(100).get((err, finalImg) => {
        // add new item
        console.log('preview');
        this.sortableContainerElement.appendChild(finalImg);
      });

    };
    img.src = src; // Set source path

    // TODO: update store

    function getThumbnail(original, scale) {
      var canvas = document.createElement("canvas")

      canvas.width = original.width * scale
      canvas.height = original.height * scale

      canvas.getContext("2d").drawImage
        (original, 0, 0, canvas.width, canvas.height)

      return canvas
    }
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
        <label className="upload-link" htmlFor={PREFIX + '_file'}>Choose a file</label>

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

    FileAPI.filterFiles(files, (file, info/**Object*/) => {
      if (/^image/.test(file.type)) {
        return info.width >= 100 && info.height >= 100;
      }
      return false;
    }, (files/**Array*/, rejected/**Array*/) => {
      if (files.length) {
        files.forEach((file) => {
          // Make preview 100x100
          FileAPI.Image(file).preview(100).get((err, img) => {
            // add new item
            this.onAddHandler(img);
            if (!err) {
            }
          });
        })

        // Uploading Files
        // FileAPI.upload({
        //   url: AppGlobals.UPLOAD_URL,
        //   files: { images: files },
        //   progress: (evt) => { console.log('upload progress') },
        //   complete: (err, xhr) => { console.log('upload done') }
        // });
      }
    });
  }
}
