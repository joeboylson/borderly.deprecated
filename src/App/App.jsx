import React, { useState, useEffect } from 'react';

// components
import FileUpload from '../FileUpload/FileUpload';
import PhotoPreview from '../PhotoPreview/PhotoPreview';
import Loading from '../Loading/Loading';

// utils
import { dummySetPreviewImages, submit } from '../utils';

// styles
import '../styles.scss'
import Nav from '../Nav/Nav';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState(null);

  const reset = () => {
    setLoading(false);
    setPreviewImages(null);
  };

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
  };

  const handleSubmit = (uploadedFiles, borderThickness) => {
    setLoading(true);
    const _uploadedFiles = uploadedFiles.map(it => it.file);
    submit(_uploadedFiles, borderThickness, submitCallback);
  };

  if (loading) return (
    <main>
      <Nav reset={reset}/>
      <Loading/>
    </main>
  );

  return (
    <main>
      <Nav reset={reset}/>
      { previewImages ? 
        <PhotoPreview previewImages={previewImages} reset={reset}/> : 
        <FileUpload handleSubmit={handleSubmit}/>
      }
    </main>
  );
};

export default App;