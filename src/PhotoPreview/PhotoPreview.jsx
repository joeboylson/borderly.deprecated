import React from 'react';
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons';
import './PhotoPreview.scss';

const getImageSize = (_image) => {

  let _w = window.innerWidth;
  let _h = window.innerHeight - 89;
  let _pw = _image.width;
  let _ph = _image.height;
  let sizeForHeight = (_ph / _pw) > (_h / _w);

  let ratio = sizeForHeight ? _ph / _h : _pw / _w ;
  let newHeight = (_ph / ratio);
  let newWidth = (_pw / ratio);

  return { width: newWidth, height: newHeight};
}

const PhotoPreview = ({ previewImages, download, reset }) => {

  return (
    <div id={'photo-preview'}>
      
      <div className={'photo-wrapper'}>
        { previewImages.map( (_image, index) => {
          let _style = getImageSize(_image)
          return (
            <div className={'photo-inner'}>
              <img style={ _style } src={ _image.src }/>

              <div style={ _style } className={'download-wrapper'}>
                <a href={_image.src} download><DownloadOutlined /></a>
              </div>
            </div>
          )

        })}
      </div>

      <div className={'footer'}>
        <button onClick={reset}><UndoOutlined /></button>
      </div>


    </div>
  );

}

export default PhotoPreview;