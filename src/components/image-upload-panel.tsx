import './image-upload-panel.css!';

import * as React from "react";
import Sortable from 'sortablejs';
import {DraggableContainer} from './draggable-container';

interface IProps extends React.Props<ImageUploadPanel> {
  logger: any;
  inputData?: any;
}
interface IState {
}

export class ImageUploadPanel extends React.Component<IProps, IState> {

  draggableContainersConstructor = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        animation: 250, // ms, animation speed moving items when sorting, `0` — without animation
        handle: ".group-title", // Restricts sort start click/touch to the specified element
        onUpdate: function(evt/**Event*/) {
          var item = evt.item; // the current dragged HTMLElement
        }
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  render() {
    return (
      <div className="container" ref={this.draggableContainersConstructor}>
        { this.props.inputData.map((containerData, index) =>
         <DraggableContainer containerData={containerData} logger={this.props.logger} key={index} />) }
      </div>
    );
  }
}
