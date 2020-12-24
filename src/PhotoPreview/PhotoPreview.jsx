import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { getImageSize } from '../utils';

const PhotoPreview = ({ previewImages }) => (
  <div id={'photo-preview'}>
    { previewImages.map( (_image, index) => (
      <div key={index} className={'photo-inner'}>
        <img style={ getImageSize(_image) } src={ _image.src }/>

        <div className={'download-wrapper'}>
          <a href={_image.src} download><DownloadOutlined /></a>
        </div>
      </div>
    ))}
  </div>
);

export default PhotoPreview;