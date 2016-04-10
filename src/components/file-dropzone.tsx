import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import Sortable from 'sortablejs';
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;
// import DropzoneComponent from 'react-dropzone-component';

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
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: 'http://localhost:3000/uploadHandler'
};

var djsConfig = {
  previewTemplate: template
};
