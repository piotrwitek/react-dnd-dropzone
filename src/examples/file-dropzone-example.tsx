import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;

const UPLOAD_URL = 'http://localhost:3000/uploadHandler';
const FILE_TYPES = '.jpg, .png, .gif';

const template = ReactDOMServer.renderToStaticMarkup(
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

interface IProps extends React.Props<FileDropzoneExample> {
  data?: any;
}
interface IState {
}

export class FileDropzoneExample extends React.Component<IProps, IState> {
  dropzoneInstance = undefined;

  dropzoneConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        url: UPLOAD_URL,
        maxFilesize: 2,
        addRemoveLinks: true,
        acceptedFiles: FILE_TYPES
      };
      this.dropzoneInstance = new Dropzone(componentBackingInstance, options);
      this.dropzoneInstance.on("success", (file, responseText) => {
        // remove this file and create react component
        var mockFile = { name: "Filename", size: 12345 };
        let thumbnail = this.dropzoneInstance.createThumbnailFromUrl(mockFile, '/src_server/1460437027905_1925_UUQYMPG.jpg');

        //file.previewTemplate.appendChild(document.createTextNode(responseText));
      });

    }
  };

  componentDidMount() {
  }

  render() {
    return (
      <div id="clipboard-dropzone" className="file-dropzone dropzone" ref={this.dropzoneConstructor}></div>
    );
  }

}
