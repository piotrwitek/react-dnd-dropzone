import FileAPI from 'fileapi';
export const UPLOAD_URL = 'http://localhost:3000/uploadHandler';

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

export function uploadFile(file, previewNode) {
  FileAPI.upload({
    url: UPLOAD_URL,
    files: { file: file },
    imageTransform: { type: 'image/jpeg', quality: 0.86 },
    upload: (evt) => { console.log('upload start') },
    progress: (evt) => { console.log('upload progress') },
    complete: (err, xhr) => { console.log('upload done') }
  });
}
