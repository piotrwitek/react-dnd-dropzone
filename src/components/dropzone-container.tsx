import * as React from "react";
import FileAPI from 'fileapi';

import {DraggableContainer} from './draggable-container';

const UPLOAD_URL = 'http://localhost:3000/uploadHandler';
const FILE_TYPES = '.jpg, .png, .gif';

interface IProps extends React.Props<DropzoneContainer> {
  logger: any;
  containerData: any;
}
interface IState {
}

export class DropzoneContainer extends React.Component<IProps, IState> {
  draggableInstance = undefined;

  draggableItemsConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {

    }
  };

  render() {
    let {containerData} = this.props;
    return (
      <div className="group dropzone">
        <DraggableContainer containerData={containerData} />
      </div>
    );
  }

}
