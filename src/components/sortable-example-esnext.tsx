import './sortable-example-esnext.css!';

import * as React from "react";
import Sortable from 'sortablejs';


interface IProps extends React.Props<SortableExampleEsnext> {
  date?: Date;
}

interface IState {
}

export class SortableExampleEsnext extends React.Component<IProps, IState> {
  date: Date;
  asd: any;
  state: IState = {};

  sortableContainersDecorator = (componentBackingInstance) => {
    console.log(componentBackingInstance);
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

  constructor() {
    super();
    this.date = new Date();
    this.asd = "start";
  }

  render(): JSX.Element {
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        <div className="group">
          <h2 className="group-title">Group 1</h2>
          <div className="group-list" ref={this.sortableGroupDecorator}>
            <div>as me around</div>
            <div>sss her around</div>
            <div>Swap him around</div>
            <div>Swap them around</div>
            <div>Swap us around</div>
            <div>Swap things around</div>
            <div>Swap everything around</div>
          </div>
        </div>
        <div className="group">
          <h2 className="group-title">Group 2</h2>
          <div className="group-list" ref={this.sortableGroupDecorator}>
            <div>aa me around</div>
            <div>Swap her around</div>
            <div>Swap him around</div>
            <div>Swap them around</div>
            <div>Swap us around</div>
            <div>Swap things around</div>
            <div>Swap everything around</div>
          </div>
        </div>
        <div>
          It is {this.date.toLocaleTimeString() }
        </div>
      </div>
    );
  }
}
