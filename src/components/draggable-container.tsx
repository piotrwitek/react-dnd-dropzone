import * as React from "react";
import Sortable from 'sortablejs';
import {DraggableItem} from './draggable-item';

interface IProps extends React.Props<DraggableContainer> {
  logger: any;
  containerData: any;
}
interface IState {
}

export class DraggableContainer extends React.Component<IProps, IState> {
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
      Sortable.create(componentBackingInstance, options);
    }
  };

  renderGroupItems(items: any) {
    return items.map((item, index) => <DraggableItem item={item} key={index} />);
  }

  render() {
    let {containerData} = this.props;
    return (
      <div className="group">
        <h2 className="group-title">{containerData.name}</h2>
        <div className="group-list" ref={this.draggableItemsConstructor}>
          { this.renderGroupItems(containerData.items) }
        </div>
      </div>
    );
  }

}
