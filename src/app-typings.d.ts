/// <reference path="../typings/main.d.ts" />

declare module 'fileapi' {
  const api: any;
  export = api;
}

declare module 'mobx' {
  export const observable: any;
  export const autorun: any;
}

declare module 'node-uuid' {
  export function v1(): string;
  export function v4(): string;
}

declare module 'dropzone' {
  const api: any;
  export = api;
}

declare module 'sortablejs' {
  const api: any;
  export = api;
}

declare module 'react-dragula' {
  export default null;
}
