import axios from 'axios';

export const submit = (file, callback) => {

  let formData = new FormData();

  if (!file) {
    return console.log('No file uploaded')
  }

  if (!file.type.includes('image')) {
    return console.log('Uploaded file is not an image')
  }

  formData.append(file.name, file);
  
  axios.post('/api/border', formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  }).then(result => {

    console.log(result)
  
    if (!result.data.success) {
      return console.log(`There was an error submitting your image: ${result.data.message}`)
    }

    callback(result.data.success, result.data.data.filename)

  })
}