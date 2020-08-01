import React, { useState } from 'react';
import { PlusOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import './FileUpload.scss'

const validExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

const crunchFileName = (fileName) => {

  let nameLength = fileName.length;
  let lengthThreshold = 10

  if (nameLength < 20) return fileName 

  let pre = fileName.substring(0, lengthThreshold);
  let suf = fileName.substring(nameLength-lengthThreshold, nameLength);
  return `${pre}...${suf}`
}

const FileUpload = (props) => {

  const { handleSubmit } = props;
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileIsValid, setFileIsValid] = useState(false);

  const handleChange = (e) => {
    let file = e.target.files[0]
    let isValidExtension = (new RegExp('(' + validExtensions.join('|').replace(/\./g, '\\.') + ')$')).test(file.name);

    setFileIsValid(isValidExtension)
    setUploadedFile(file)

  }

  return (
    <div id={'file-upload'}>

      <div className={'input-wrapper'}>
        <input id={'file'} type={'file'} onChange={handleChange}></input>
        <label htmlFor={'file'}> <PlusOutlined/> </label>
      </div>

      <div className={'footer'}>

        <div className={'file-info'}>
          <p>{uploadedFile ? crunchFileName(uploadedFile.name) : 'No File Selected'}</p>
          <p>Valid: <span className={fileIsValid ? 'valid' : 'invalid'}>{fileIsValid.toString().toUpperCase()}</span></p>
        </div>

        <button 
          onClick={() => handleSubmit(uploadedFile)}
          className={fileIsValid ? '' : 'disabled'}
        >
          { fileIsValid ? 
            <RightOutlined /> :
            <CloseOutlined />
          }
        </button>
      </div>

    </div>
  );

}

export default FileUpload;