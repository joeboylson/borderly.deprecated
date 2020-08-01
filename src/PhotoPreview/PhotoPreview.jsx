import React from 'react';
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons';
import './PhotoPreview.scss';

const PhotoPreview = (props) => {

  const { previewImage, reset } = props;

  console.log(previewImage.src)

  const getImageSize = () => {

    let _w = window.innerWidth;
    let _h = window.innerHeight - 89;
    let imageIsPortrait = previewImage.height > previewImage.width;

    if (!imageIsPortrait) {
      return { width: _w, height: 'auto'}
    }

    if (previewImage.height > _h) {
      let ratio = previewImage.height / _h ;
      let newHeight = previewImage.height / ratio;
      let newWidth = previewImage.width / ratio;

      return { width: newWidth, height: newHeight}
    }

  }

  return (
    <div id={'photo-preview'}>
      
      <div className={'photo-wrapper'}>
        <img style={getImageSize()} src={previewImage.src}/>
      </div>

      <div className={'footer'}>
        <button onClick={reset}>
          <UndoOutlined />
        </button>
        <a href={previewImage.src} download>
          <DownloadOutlined />
        </a>
      </div>


    </div>
  );

}

export default PhotoPreview;