import * as AppModels from '../app-models';

const UPLOAD_PATH = '/src_server/uploads/';

// sessionStorage
var initialStoreState = [
  {
    id: 0,
    name: 'Salon',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  },
  {
    id: 1,
    name: 'Pokój 1',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  },
  {
    id: 2,
    name: 'Pokój 2',
    type: 0,
    items: [
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg',
      '/src_server/1460437027905_1925_UUQYMPG.jpg'
    ]
  }
];

export class DraggableContainerStore {
  state: AppModels.ContainerModel[] = initialStoreState;

  setState = (newState: AppModels.ContainerModel[]): AppModels.ContainerModel[] => {
    this.state = newState;
    // console.log('set store: ', newState);
    return newState;
  }

  addItemToContainer = (item, containerIndex) => {
    let storeState = this.state.slice();
    if (item == undefined || containerIndex == undefined) return storeState;

    let targetContainerItems = storeState[containerIndex].items;
    let newItem = UPLOAD_PATH + item;
    storeState[containerIndex].items = [...targetContainerItems, newItem];

    this.setState(storeState);
    return storeState;
  }

  removeItemFromContainer = (itemIndex, containerIndex) => {
    let storeState = this.state.slice();
    if (itemIndex == undefined || containerIndex == undefined) return storeState;

    let targetContainerItems = storeState[containerIndex].items;
    storeState[containerIndex].items = [...targetContainerItems, UPLOAD_PATH + itemIndex];

    this.setState(storeState);
    // TODO: delete file on server
    // fetch(delete:images/id)
    return storeState;
  }

  moveItemInContainer = (startIndex, endIndex, containerIndex) => {

  }

  moveContainer = (startIndex, endIndex) => {
    let storeState = this.state.slice();
    if (startIndex == undefined || startIndex === endIndex) return storeState;

    let targetContainer = this.state[startIndex];
    var newStoreState = endIndex > startIndex ?
      [
        ...storeState.slice(0, startIndex),
        ...storeState.slice(startIndex + 1, endIndex),
        targetContainer,
        ...storeState.slice(endIndex)
      ] : [
        ...storeState.slice(0, endIndex),
        targetContainer,
        ...storeState.slice(endIndex, startIndex),
        ...storeState.slice(startIndex + 1)
      ];

    this.setState(newStoreState);
    return newStoreState;
  }

}
