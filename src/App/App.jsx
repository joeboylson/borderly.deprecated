import React, { useState, useEffect } from 'react';
import { submit } from '../utils/border';
import 'antd/dist/antd.css';
import './App.scss';

// components
import FileUpload from '../FileUpload/FileUpload';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import Loading from '../Loading/Loading';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const reset = () => {
    setLoading(false);
    setPreviewImage(null);
  }

  const submitCallback = (success, imageUrl) => {

    console.log('CALLBACK', success, imageUrl)

    if (success) {

      let _image = new Image()
      _image.src = `/api/static/images/${imageUrl}`;

      _image.onload = () => {
        setLoading(false)
        setPreviewImage(_image)
      }
    }

  }

  const handleSubmit = (uploadedFile) => {
    setLoading(true);
    submit(uploadedFile, submitCallback)
  }

  if (loading) return (
    <main>
      <Loading/>
    </main>
  )

  return (

    <main>
      { previewImage ? 
        <PhotoPreview previewImage={previewImage} reset={reset}/> : 
        <FileUpload handleSubmit={handleSubmit}/>
      }
    </main>


  )

}

export default App;