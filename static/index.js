let site = null;

window.addEventListener('DOMContentLoaded', () => {
  site = new Site();
})


const submit = () => {

  let formData = new FormData();
  let imagefile = document.querySelector('#file');
  let uploadedImage = imagefile.files[0]

  if (!uploadedImage) {
    return site.notification('No file uploaded')
  }

  if (!uploadedImage.type.includes('image')) {
    return site.notification('Uploaded file is not an image')
  }

  formData.append(uploadedImage.name, uploadedImage);
  axios.post('/border', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(result => {

    if (!result.data.success) {
      return site.notification(`There was an error submitting your image: ${result.data.message}`)
    }

    site.setImagePreview(result.data.data.filename)
    site.hideImageUploader()
    site.displayImagePreview()
  })
}