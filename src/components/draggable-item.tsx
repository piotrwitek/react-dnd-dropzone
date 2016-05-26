import * as React from "react";
import * as ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import FileAPI from 'fileapi';

const PREVIEW_SIZE = 120;

interface IProps extends React.Props<DraggableItem> {
  itemReference: any;
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
    this.props.dragulaInstance.start(this.componentRootNode);
    this.props.dragulaInstance.remove();
    // update store
    this.props.removeHandler();
    ReactDOM.unmountComponentAtNode(this.componentRootNode.parentNode);
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
    console.log('item update', this.componentRootNode);
  }

  componentWillUnmount() {
    console.log('item unmount', this.componentRootNode);
  }

  render() {
    let src = this.props.itemReference.src;
    let fileName = src ? src.split('/').slice(-1).pop() : null;

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
