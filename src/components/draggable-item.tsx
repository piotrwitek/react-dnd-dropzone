import * as React from "react";
import FileAPI from 'fileapi';

const PREVIEW_SIZE = 120;

interface IProps extends React.Props<DraggableItem> {
  name: string;
  file: any;
  logger?: any;
}
interface IState {
}

export class DraggableItem extends React.Component<IProps, IState> {
  handleRemove = () => {

  }

  renderPreview = (backingInstance) => {
    if (backingInstance) {
      FileAPI.Image(this.props.file).preview(PREVIEW_SIZE).get((err, img) => {
        if (!err) {
          backingInstance.appendChild(img);
        }
      });
    }
  }

  render() {
    let {name} = this.props;
    return (
      <div className="draggable-item dz-preview dz-processing dz-image-preview dz-complete">
        <div className="dz-image" ref={this.renderPreview}>
        </div>
        <div className="dz-details">
          <div className="dz-remove" onClick={this.handleRemove}  data-dz-remove><span>Remove</span></div>
          <div className="dz-filename"><span data-dz-name>{name}</span></div>
        </div>
        <div className="dz-progress">
          <span className="dz-upload" data-dz-uploadprogress="" style={{}}></span>
        </div>
        <div className="dz-error-message"><span data-dz-errormessage></span></div>
        <div className="dz-success-mark"><span>Success</span></div>
        <div className="dz-error-mark"><span>Error</span></div>
      </div>
    );
  }
}
