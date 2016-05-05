import * as React from 'react';
import Dragula from 'react-dragula';

import * as AppGlobals from '../app-globals';
import {DraggableContainer} from './draggable-container';
import {DraggableContainerStore} from './draggable-container-store';

interface IProps extends React.Props<DraggableContainerList> {
  store: DraggableContainerStore;
}
interface IState {
}

export class DraggableContainerList extends React.Component<IProps, IState> {
  dragulaInstance = Dragula({
    revertOnSpill: true,
    direction: 'horizontal'
  }).on('drag', (el) => {
    el.className = el.className.replace('ex-moved', '');
  }).on('over', (el, container) => {
    container.className += ' ex-over';
  }).on('out', (el, container) => {
    container.className = container.className.replace('ex-over', '');
  }).on('drop', (el, target, source, sibling) => {
    let oldIndex = parseInt(el.getAttribute('data-id'));
    let index = sibling ? parseInt(sibling.getAttribute('data-id')) : null;
    let sourceIndex = source.getAttribute('data-id');
    let tergetIndex = target.getAttribute('data-id');
    console.log(oldIndex, index);
  });

  draggablePanelsConstructor = (backingInstance) => {
    if (backingInstance) {
      Dragula([backingInstance], {
        revertOnSpill: true,
        direction: 'vertical',
        moves: function(el, container, handle) {
          return handle.classList.contains(AppGlobals.HANDLE_SELECTOR);
        }
      }).on('drop', (el, target, source, sibling) => {
        let startIndex = parseInt(el.getAttribute('data-id'));
        let endIndex = sibling != undefined
          ? parseInt(sibling.getAttribute('data-id')) : source.childNodes.length;

        this.props.store.moveContainer(startIndex, endIndex);
      });
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    console.log(this.props.store.state);
  }

  render() {
    return (
      <div className="image-upload-panel" ref={this.draggablePanelsConstructor}>
        { this.props.store.state.map((containerData, index) =>
          <DraggableContainer key={index + containerData.name}
            containerIndex={index} containerData={containerData}
            containerStore={this.props.store}
            dragulaInstance={this.dragulaInstance} />) }
      </div>
    );
  }
}
