import * as React from "react";
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
  draggableInstance = undefined;

  draggableItemsConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        animation: 250, // ms, animation speed moving items when sorting, `0` — without animation
        draggable: ".dz-preview.dz-complete", // Specifies which items inside the element should be sortable
        group: "shared",
        onMove: this.onMove,
        filter: REMOVE_BUTTON,
        onFilter: this.onFilter
      };
      this.draggableInstance = Sortable.create(componentBackingInstance, options);
    }
  };
  // Interaction on filtered element
  onFilter = (evt) => {
    var item = evt.item, target = evt.target;
    if (Sortable.utils.is(target, REMOVE_BUTTON)) {  // Click on remove button
      item.parentNode.removeChild(item); // remove sortable item
    }

    // TODO: update store
    // TODO: delete file on server
  }
  // Event when you move an item in the list or between lists
  onMove = (evt/**Event*/) => {
    var item = evt.dragged, from = evt.from, to = evt.to;
    console.log('move event');
    // TODO: update store
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

        <div className="group-list" ref={this.draggableItemsConstructor}>
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
      let previewContainer = this.draggableInstance;
      FileAPI.event.on(componentBackingInstance, 'change', (evt) => {
        var files = FileAPI.getFiles(evt); // Retrieve file list

        FileAPI.filterFiles(files, (file, info/**Object*/) => {
          if (/^image/.test(file.type)) {
            return info.width >= 100 && info.height >= 100;
          }
          return false;
        }, (files/**Array*/, rejected/**Array*/) => {
          if (files.length) {
            // Make preview 100x100
            FileAPI.each(files, (file) => {
              FileAPI.Image(file).preview(100).get((err, img) => {
                // console.log(this.draggableInstance.el)
                this.draggableInstance.el.appendChild(img);
              });
            });

            // Uploading Files
            FileAPI.upload({
              url: AppGlobals.UPLOAD_URL,
              files: { images: files },
              progress: (evt) => { /* ... */ },
              complete: (err, xhr) => { /* ... */ }
            });
          }
        });
      });
    }
  }

}
