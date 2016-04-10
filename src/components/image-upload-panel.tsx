import './image-upload-panel.css!';

import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import Sortable from 'sortablejs';

interface IProps extends React.Props<SortableExampleEsnext> {
  data?: any;
}

interface IState {
}

export class SortableExampleEsnext extends React.Component<IProps, IState> {
  state: IState = {};
  data = [];


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

  draggableItemsConstructor = (componentBackingInstance) => {
    // console.log(componentBackingInstance);
    if (componentBackingInstance) {
      let options = {
        animation: 250, // ms, animation speed moving items when sorting, `0` — without animation
        draggable: ".dz-preview.dz-complete", // Specifies which items inside the element should be sortable
        onUpdate: function(evt/**Event*/) {
          var item = evt.item; // the current dragged HTMLElement
        },
        group: "shared"
      };
      Sortable.create(componentBackingInstance.firstChild, options);
    }
  };

  groupItem = (item, index) => (
    <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete" key={index}>
      <div className="dz-image">
        <img data-dz-thumbnail src="/src_server/uploads/1460244748406_6785_xterm-app-128-cropped.png" />
      </div>
      <div className="dz-details">
        <div className="dz-size"><span data-dz-size></span></div>
        <div className="dz-filename"><span data-dz-name>{item}</span></div>
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

  renderItems(groupItems) {
    return groupItems.map((item, index) => this.groupItem(item, index));
  }

  group = (group, index) => (
    <div className="group" key={index}>
      <h2 className="group-title">{group}</h2>
      <div className="" ref={this.draggableItemsConstructor}>
        <div className="group-list dz-preview"> { this.renderItems(['Item 1']) } </div>
      </div>
    </div>
  );


  renderGroups(groups) {
    return groups.map((item, index) => this.group(item, index));
  }

  render(): JSX.Element {
    return (
      <div className="container" ref={this.draggableContainersConstructor}>
        <div className="" ref={this.draggableItemsConstructor}>
        </div>
        { this.renderGroups(['Group 1', 'Group 2', "Group 3"]) }
      </div>
    );
  }
}
