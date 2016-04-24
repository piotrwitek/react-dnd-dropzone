import '../styles/image-upload-panel.css!';
import * as React from 'react';
import {DraggableContainerList} from './draggable-container-list';
import {DraggableContainerStore, ContainerModel} from './draggable-container-store';

interface IState {
  draggableContainerStore: DraggableContainerStore;
}
interface IProps extends React.Props<ImageUploadPanel> {
  visible: boolean;
  roomsIndices: number[];
}
export class ImageUploadPanel extends React.Component<IProps, IState> {
  state: IState = {
    draggableContainerStore: new DraggableContainerStore()
  }

  componentDidUpdate() {
  }

  validateStoreData(storeState: ContainerModel[], validIndices) {
    let stashedItems = [];
    let filteredStoreState = storeState.filter((item) => {
      if (validIndices.includes(item.id)) {
        return true;
      } else {
        stashedItems = [...stashedItems, ...item.items]
        return false;
      }
    });
    let stash = {
      id: undefined,
      name: 'Nie przydzielone',
      type: 0,
      items: stashedItems
    }
    return [stash, ...filteredStoreState];
  }

  render() {
    let store = this.state.draggableContainerStore;
    let newStoreState = this.validateStoreData(store.state, this.props.roomsIndices)
    store.setState(newStoreState);
    return (
      <DraggableContainerList store={store} />
    );
  }
}
