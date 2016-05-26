import '../styles/image-upload-panel.css!';
import * as React from 'react';
import * as AppModels from '../app-models';
import {DraggableContainerList} from './draggable-container-list';
import {DraggableContainerStore, DraggableContainerModel} from './draggable-container-store';

interface IState {
  draggableContainerStore: DraggableContainerStore;
}
interface IProps extends React.Props<ImageUploadPanel> {
  visible: boolean;
  roomsIndices: string[];
}
export class ImageUploadPanel extends React.Component<IProps, IState> {
  state: IState = {
    draggableContainerStore: new DraggableContainerStore()
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    console.log(this.state.draggableContainerStore.state);
  }

  validateStoreData(storeState: DraggableContainerModel[], validIndices: string[]) {
    let stashedItems = [];
    let validContainers = storeState.filter((item) => {
      if (validIndices.includes(item.id)) {
        return true;
      } else {
        stashedItems = [...stashedItems, ...item.items.slice()];
        return false;
      }
    });
    let stashContainer =
      new DraggableContainerModel('stashed-container', 'Nie przydzielone', null, stashedItems);

    return [stashContainer, ...validContainers];
  }

  render() {
    let localStore = this.state.draggableContainerStore;
    let newStoreState = this.validateStoreData(localStore.state, this.props.roomsIndices);
    localStore.setState(newStoreState);
    return (
      <DraggableContainerList store={localStore} />
    );
  }
}
