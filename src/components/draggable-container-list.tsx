import * as React from 'react';
import {observer} from 'mobx-react';
import Dragula from 'react-dragula';
import * as AppGlobals from '../app-globals';
import {DraggableContainer} from './draggable-container';
import {DraggableContainerStore} from './draggable-container-store';

interface IProps extends React.Props<DraggableContainerList> {
  store: DraggableContainerStore;
}
interface IState {
}

@observer
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
    let newIndex = sibling != undefined
      ? parseInt(sibling.getAttribute('data-id')) : source.childNodes.length;
    let sourceIndex = parseInt(source.parentNode.getAttribute('data-id'));
    let targetIndex = parseInt(target.parentNode.getAttribute('data-id'));
    console.log(oldIndex, newIndex, sourceIndex, targetIndex);
    this.props.store.moveItemBetweenContainers(oldIndex, newIndex, sourceIndex, targetIndex);
    // this.forceUpdate();
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
        let oldIndex = parseInt(el.getAttribute('data-id'));
        let newIndex = sibling != undefined
          ? parseInt(sibling.getAttribute('data-id')) : source.childNodes.length;

        // console.log(oldIndex, newIndex);
        this.props.store.moveContainer(oldIndex, newIndex);
        this.forceUpdate();
      });
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    // console.log(this.props.store.state);
  }

  render() {
    return (
      <div className="image-upload-panel" ref={this.draggablePanelsConstructor}>
        { this.props.store.state.map((containerData, index) =>
          <DraggableContainer key={containerData.id}
            containerIndex={index} containerData={containerData}
            containerStore={this.props.store}
            dragulaInstance={this.dragulaInstance} />) }
      </div>
    );
  }
}
