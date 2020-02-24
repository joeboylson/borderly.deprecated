class Site {

  constructor() {
    this.imageUploader = document.getElementById('image-uploader');
    this.imagePreview = document.getElementById('image-preview');

    this.displayImage = document.getElementById('display-image')
    this.downloadLink = document.getElementById('download-link')
  }

  hideImageUploader = () => {
    this.imageUploader.style.display = 'none';
  }

  hideImagePreview = () => {
    this.imagePreview.style.display = 'none';
  }

  displayImageUploader = () => {
    this.imageUploader.style.display = 'block';
  }

  displayImagePreview = () => {
    this.imagePreview.style.display = 'block';
  }

  setImagePreview = (filename) => {
    this.displayImage.src = `/images/${filename}`;
    this.downloadLink.href = `/downloadfile/${filename}`;
  }



  notification = (message) => {
    console.log(message)
  }

}