import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;

let template = ReactDOMServer.renderToStaticMarkup(
  <div className="dz-preview">
    <div className="dz-image">
      <img data-dz-thumbnail />
    </div>
    <div className="dz-details">
      <div className="dz-size"><span data-dz-size></span></div>
      <div className="dz-filename"><span data-dz-name></span></div>
    </div>
    <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress></span></div>
    <div className="dz-error-message"><span data-dz-errormessage></span></div>
    <div className="dz-success-mark"><span>Success</span></div>
    <div className="dz-error-mark"><span>Error</span></div>
    <a href='#' data-dz-remove>Remove</a>
  </div>
);

var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif']
};

interface IProps extends React.Props<FileDropzone> {
  data?: any;
}
interface IState {
}

export class FileDropzone extends React.Component<IProps, IState> {
  imageDropzone = undefined;

  dropzoneConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        url: 'http://localhost:3000/uploadHandler'
      };
      this.imageDropzone = new Dropzone(componentBackingInstance, options);
    }
  };

  render() {
    return (
      <div className="file-dropzone" ref={this.dropzoneConstructor}></div>
    );
  }

}
