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
          img.className += 'ui small image';
          backingInstance.appendChild(img);
        }
      });
    }
  }

  render() {
    let {name} = this.props;
    return (
      <div className="ui dimmable">
        <div ref={this.renderPreview}></div>
        <a onClick={this.handleRemove} className="ui right corner label remove-item">
          <i className="delete icon"></i>
        </a>
      </div>
    );
  }
}
