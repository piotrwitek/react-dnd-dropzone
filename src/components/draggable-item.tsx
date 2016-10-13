import * as React from "react";
import * as ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import FileAPI from 'fileapi';
import {DraggableItemModel} from './draggable-container-store';

const PREVIEW_SIZE = 120;
const UPLOAD_STARTED_IMAGE = '/placeholder-image';
const UPLOAD_FAILED_IMAGE = '/failed-upload-image';

interface IProps extends React.Props<DraggableItem> {
  itemReference: DraggableItemModel;
  dragulaInstance: any;
  removeHandler: any;
}
interface IState {
}

@observer
export class DraggableItem extends React.Component<IProps, IState> {
  componentRootNode = null;
  getComponentRootNode = (backingInstance) => {
    if (backingInstance) {
      this.componentRootNode = backingInstance;
    }
  }

  handleRemove = () => {
    // update store
    this.props.removeHandler();
  }

  renderPreview = (backingInstance) => {
    if (backingInstance) {
      FileAPI.Image(this.props.itemReference.src).preview(PREVIEW_SIZE).get((err, img) => {
        if (!err) {
          img.className += 'ui small image';
          backingInstance.appendChild(img);
        }
      });
    }
  }

  componentDidUpdate() {
    // console.log('item update', this.componentRootNode);
  }

  componentWillUnmount() {
    // console.log('item unmount', this.componentRootNode);
  }

  getFileName = (stringOrFile) => {
    if (stringOrFile == undefined) return 'No Name';

    return (typeof stringOrFile === 'string')
    ? stringOrFile.split('/').slice(-1).pop()
    : stringOrFile.name;
  }

  render() {
    let fileName = this.getFileName(this.props.itemReference.src);

    return (
      <div className="ui dimmable" ref={this.getComponentRootNode}>
        <div ref={this.renderPreview}></div>
        <a onClick={this.handleRemove} className="ui right corner label remove-item">
          <i className="delete icon"></i>
        </a>
      </div>
    );
  }
}
