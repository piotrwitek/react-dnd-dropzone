import * as React from "react";

interface IProps extends React.Props<DraggableItem> {
  item: any;
}
interface IState {
}

export class DraggableItem extends React.Component<IProps, IState> {
  render() {
    let name = this.props.item.split('/').slice(-1).pop();
    return (
      <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
        <div className="dz-image">
          <img data-dz-thumbnail src={this.props.item} />
        </div>
        <div className="dz-details">
          <div className="dz-size"><span data-dz-size></span></div>
          <div className="dz-filename"><span data-dz-name>{name}</span></div>
        </div>
        <div className="dz-progress">
          <span className="dz-upload" data-dz-uploadprogress="" style={{}}></span>
        </div>
        <div className="dz-error-message"><span data-dz-errormessage></span></div>
        <div className="dz-success-mark"><span>Success</span></div>
        <div className="dz-error-mark"><span>Error</span></div>
        <a href='#' data-dz-remove>Remove</a>
      </div>
    );
  }
}
