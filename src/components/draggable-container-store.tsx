import {observable, autorun} from 'mobx';
import uuid from 'node-uuid';
import * as AppModels from '../app-models';
import * as AppUtils from '../app-utils';

const UPLOAD_PATH = '/src_server/uploads/';

export class DraggableContainerStore {
  @observable state: DraggableContainerModel[] = initialStoreState;

  setState = (newState: DraggableContainerModel[]): DraggableContainerModel[] => {
    this.state = newState;
    // console.log('set store: ', newState);
    return newState;
  }

  addItemToContainer = (fileObject, containerIndex) => {
    let newStoreState = this.state.slice();
    if (fileObject == undefined || containerIndex == undefined) return null;

    let newItem = new DraggableItemModel(fileObject);
    newStoreState[containerIndex].items.push(newItem);
    this.setState(newStoreState);


    let uploadStart = () => {
      console.log('upload start');
      // show loading indicator
      newItem.isLoading = true;
    };

    let uploadSuccess = (xhr) => {
      console.log('upload success');
      let url = xhr.options.url;
      let filesNames = JSON.parse(xhr.response);
      newItem.isLoading = false;
    };

    let uploadError = (err) => {
      console.log('upload failed');
      // show failure indicator
      newItem.isLoading = false;
      newItem.isFailed = true;
    };
    // upload file
    AppUtils.uploadFile(fileObject, uploadStart, uploadSuccess, uploadError);

    return newItem;
  }

  removeItemFromContainer = (itemIndex, containerIndex) => {
    let newStoreState = this.state.slice();
    if (itemIndex == undefined || containerIndex == undefined) return null;

    let container = newStoreState[containerIndex];
    container.items = container.items.filter((item, index) => index !== itemIndex);
    this.setState(newStoreState);
    // TODO: delete file on server
    // fetch(delete:images/id)

    return newStoreState;
  }

  moveItemBetweenContainers = (oldIndex, newIndex, sourceContainerIndex, targetContainerIndex) => {
    let storeState = this.state.slice();
    if (oldIndex == undefined || newIndex == undefined
      || sourceContainerIndex == undefined || targetContainerIndex == undefined
      || oldIndex === newIndex && sourceContainerIndex === targetContainerIndex
    ) return storeState;

    if (sourceContainerIndex === targetContainerIndex) {
      let items = storeState[sourceContainerIndex].items;
      let item = items[oldIndex];
      storeState[sourceContainerIndex].items = newIndex > oldIndex
        ? [
          ...items.slice(0, oldIndex),
          ...items.slice(oldIndex + 1, newIndex),
          item,
          ...items.slice(newIndex)
        ] : [
          ...items.slice(0, newIndex),
          item,
          ...items.slice(newIndex, oldIndex),
          ...items.slice(oldIndex + 1)
        ];
    } else {
      let sourceContainerItems = storeState[sourceContainerIndex].items;
      let item = sourceContainerItems.splice(oldIndex, 1);
      let targetContainerItems = storeState[targetContainerIndex].items;
      targetContainerItems.splice(newIndex, 0, ...item);
      console.log(storeState);
    }

    this.setState(storeState);
    return storeState;
  }

  moveContainer = (oldIndex, newIndex) => {
    let storeState = this.state.slice();
    if (oldIndex == undefined || oldIndex === newIndex) return storeState;

    let container = storeState[oldIndex];
    var newStoreState = newIndex > oldIndex ?
      [
        ...storeState.slice(0, oldIndex),
        ...storeState.slice(oldIndex + 1, newIndex),
        container,
        ...storeState.slice(newIndex)
      ] : [
        ...storeState.slice(0, newIndex),
        container,
        ...storeState.slice(newIndex, oldIndex),
        ...storeState.slice(oldIndex + 1)
      ];

    this.setState(newStoreState);
    return newStoreState;
  }

}

export class DraggableContainerModel {
  id: string;
  name: string;
  type: string;
  @observable items: DraggableItemModel[];
  constructor(id, name, type, items) {
    this.id = id || uuid.v1();
    this.name = name || 'Noname';
    this.type = type;
    this.items = items;
  }
}

export class DraggableItemModel {
  id: string;
  src: string | File;
  @observable isLoading: boolean = false;
  @observable isFailed: boolean = false;
  constructor(src: string) {
    this.id = uuid.v1();
    this.src = src;
  }
}

// sessionStorage
var initialStoreState = [
  new DraggableContainerModel('0', 'Salon', null, [
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg'),
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg')
  ]),
  new DraggableContainerModel('1', 'Pokój 1', null, [
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg')
  ]),
  new DraggableContainerModel('2', 'Pokój 2', null, [
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg'),
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg'),
    new DraggableItemModel('/src_server/1460437027905_1925_UUQYMPG.jpg')
  ])
];
