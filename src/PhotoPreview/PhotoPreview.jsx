import React from 'react';
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons';
import './PhotoPreview.scss';

const PhotoPreview = (props) => {

  const { previewImage, reset } = props;

  console.log(previewImage.src)

  const getImageSize = () => {

    let _w = window.innerWidth;
    let _h = window.innerHeight - 89;
    let _pw = previewImage.width;
    let _ph = previewImage.height;
    let sizeForHeight = (_ph / _pw) > (_h / _w);

    let ratio = sizeForHeight ? _ph / _h : _pw / _w ;
    let newHeight = _ph / ratio;
    let newWidth = _pw / ratio;

    return { width: newWidth, height: newHeight};

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