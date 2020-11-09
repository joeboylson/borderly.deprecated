import axios from 'axios';

export const submit = (files, callback) => {

  console.log(files)

  if (!files || file.length <= 0) return console.log('No file uploaded')
  
  let allFilesAreImages = files.every(f => f.type.includes('image'));
  if (!allFilesAreImages) return console.log('Uploaded file is not an image')
  
  let formData = new FormData();
  files.forEach(file => formData.append(file.name, file));
  
  axios.post('/api/border', formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  }).then(result => {
  
    if (!result.data.success) return console.log(`There was an error submitting your image: ${result.data.message}`)
    callback(result.data.success, result.data.data.filenames)
  })
}