import './sortable-example-esnext.css!';

import * as React from "react";
import Sortable from 'sortablejs';


interface IProps extends React.Props<SortableExampleEsnext> {
  data?: any;
}

interface IState {
}

export class SortableExampleEsnext extends React.Component<IProps, IState> {
  state: IState = {};
  data = [];

  sortableContainersDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
        handle: ".group-title", // Restricts sort start click/touch to the specified element
        onUpdate: function(evt/**Event*/) {
          var item = evt.item; // the current dragged HTMLElement
        }
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    // console.log(componentBackingInstance);
    if (componentBackingInstance) {
      let options = {
        animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
        draggable: "div", // Specifies which items inside the element should be sortable
        onUpdate: function(evt/**Event*/) {
          var item = evt.item; // the current dragged HTMLElement
        },
        group: "shared"
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  groupItem = (item) => (
    <div>{item}</div>
  );

  renderItems(groupItems) {
    return (
      <div className="group-list" ref={this.sortableGroupDecorator}>
        { groupItems.map((item) => this.groupItem(item)) }
      </div>
    );
  }

  group = (group) => (
    <div className="group">
      <h2 className="group-title">{group}</h2>
      { this.renderItems(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']) }
    </div>
  );


  renderGroups(groups) {
    return groups.map((item) => this.group(item));
  }

  render(): JSX.Element {
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        { this.renderGroups(['Group 1', 'Group 2', "Group 3"]) }
      </div>
    );
  }
}
