export type ContainerModel = {
  id: number;
  name: string;
  type: number;
  items: string[]
}

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
  state: ContainerModel[] = initialStoreState;

  setState = (newState: ContainerModel[]): ContainerModel[] => {
    return this.state = newState;
  }

  addItem = (item) => {

  }

  removeItem = (item) => {

  }

  moveItem = (item) => {

  }

  moveContainer = (startIndex, endIndex) => {
    let storeState = this.state.slice();
    if (startIndex == null || startIndex === endIndex) return storeState;

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

    // console.log(newContainersData);
    return this.setState(newStoreState);
  }

}
