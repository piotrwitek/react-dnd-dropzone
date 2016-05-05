import FileAPI from 'fileapi';
import * as AppGlobals from './app-globals';

export function generateRandomString(length = 10) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// helper to filter images
export function filterImageFiles(files) {
  return files.filter((file) => /^image/.test(file.type));
}

export function uploadFile(file, startCallback, successCallback, errorCallback) {
  FileAPI.upload({
    url: AppGlobals.UPLOAD_URL,
    files: { file: file },
    imageTransform: { type: 'image/jpeg', quality: 0.86 },
    upload: (xhr) => {
      startCallback()
    },
    progress: (evt) => {
      // console.log('upload progress', evt)
    },
    complete: (err, xhr) => {
      if (err) {
        errorCallback(err)
        return;
      }
      successCallback(xhr);
    }
  });
}
