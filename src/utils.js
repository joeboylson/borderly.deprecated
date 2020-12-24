import axios from 'axios';

export const submit = (files, callback) => {
  if (!files || files.length <= 0) return console.log('No file uploaded')
  
  let formData = new FormData();
  files.forEach(file => formData.append(file.name, file));
  
  axios.post('/api/border', formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  }).then(result => {
  
    if (!result.data.success) return console.log(`There was an error submitting your image: ${result.data.message}`)
    callback(result.data.success, result.data.data.filenames)
  })
};

export const crunchFileName = (fileName) => {

  let nameLength = fileName.length;
  let lengthThreshold = 10

  if (nameLength < 20) return fileName 

  let pre = fileName.substring(0, lengthThreshold);
  let suf = fileName.substring(nameLength-lengthThreshold, nameLength);
  return `${pre}...${suf}`
}

const validExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
export const fileIsValid = (file) => {
  let isValid = (new RegExp('(' + validExtensions.join('|').replace(/\./g, '\\.') + ')$')).test(file.name);
  return {file, isValid};
};

export const getImageSize = (_image) => {

  let _w = window.innerWidth;
  let _h = window.innerHeight - 89;
  let _pw = _image.width;
  let _ph = _image.height;
  let sizeForHeight = (_ph / _pw) > (_h / _w);

  let ratio = sizeForHeight ? _ph / _h : _pw / _w ;
  let newHeight = (_ph / ratio) / 2;
  let newWidth = (_pw / ratio) / 2;

  return { width: newWidth, height: newHeight };
}