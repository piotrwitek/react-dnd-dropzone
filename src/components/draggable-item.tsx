import * as React from "react";
import FileAPI from 'fileapi';

const PREVIEW_SIZE = 120;

interface IProps extends React.Props<DraggableItem> {
  itemName: string;
  itemReference: any;
  dragulaInstance: any;
  removeHandler: any;
}
interface IState {
}

export class DraggableItem extends React.Component<IProps, IState> {
  componentRootNode = (backingInstance) => {
    if (backingInstance) {
      this.componentRootNode = backingInstance;
    }
  }

  handleRemove = () => {
    this.props.dragulaInstance.start(this.componentRootNode);
    this.props.dragulaInstance.remove();
    // update store
    this.props.removeHandler();
  }

  renderPreview = (backingInstance) => {
    if (backingInstance) {
      FileAPI.Image(this.props.itemReference).preview(PREVIEW_SIZE).get((err, img) => {
        if (!err) {
          img.className += 'ui small image';
          backingInstance.appendChild(img);
        }
      });
    }
  }

  render() {
    let {itemName} = this.props;
    return (
      <div className="ui dimmable" ref={this.componentRootNode}>
        <div ref={this.renderPreview}></div>
        <a onClick={this.handleRemove} className="ui right corner label remove-item">
          <i className="delete icon"></i>
        </a>
      </div>
    );
  }
}
