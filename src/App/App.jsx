import React, { useState, useEffect } from 'react';
import { submit } from '../utils/border';
import './App.scss';

// components
import FileUpload from '../FileUpload/FileUpload';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import Loading from '../Loading/Loading';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState(null);

  const reset = () => {
    setLoading(false);
    setPreviewImage(null);
  }

  const submitCallback = (success, filenames) => {
    let _previewImages = [];  
    if (success) {

      filenames.forEach(filename => {
        let _image = new Image()
        _image.src = `/api/static/images/${filename}`;
        
        _image.onload = () => {
          _previewImages.push(_image)
          let _allImagesLoaded = _previewImages.length === filenames.length;

          if (_allImagesLoaded) {
            setLoading(false);
            setPreviewImages(_previewImages);
          }
        }
      })
    }
  }

  const handleSubmit = (uploadedFiles) => {
    setLoading(true);
    submit(uploadedFiles, submitCallback)
  }

  if (loading) return (
    <main>
      <Loading/>
    </main>
  )

  return (

    <main>
      { previewImages ? 
        <PhotoPreview previewImages={previewImages} reset={reset}/> : 
        <FileUpload handleSubmit={handleSubmit}/>
      }
    </main>


  )

}

export default App;