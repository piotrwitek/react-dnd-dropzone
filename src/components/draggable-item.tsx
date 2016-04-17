import * as React from "react";
import FileAPI from 'fileapi';

const PREVIEW_SIZE = 120;

interface IProps extends React.Props<DraggableItem> {
  name: string;
  fileReference: any;
  dragulaInstance: any;
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
    // TODO: update store

    // TODO: delete file on server
    // fetch(delete:images/id)
  }

  renderPreview = (backingInstance) => {
    if (backingInstance) {
      FileAPI.Image(this.props.fileReference).preview(PREVIEW_SIZE).get((err, img) => {
        if (!err) {
          img.className += 'ui small image';
          backingInstance.appendChild(img);
        }
      });
    }
  }

  render() {
    let {name} = this.props;
    return (
      <div className="ui dimmable" ref={this.componentRootNode} data-id="2" key="2">
        <div ref={this.renderPreview}></div>
        <a onClick={this.handleRemove} className="ui right corner label remove-item">
          <i className="delete icon"></i>
        </a>
      </div>
    );
  }
}
