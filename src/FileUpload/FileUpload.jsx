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

const FileUpload = ({ handleSubmit }) => {
  
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [filesAreValid, setFilesAreValid] = useState(false);

  const handleChange = (e) => {
    let files = Array.prototype.slice.call(e.target.files)

    let filesValidity = files.map(file => {
      let isValid = (new RegExp('(' + validExtensions.join('|').replace(/\./g, '\\.') + ')$')).test(file.name);
      return {isValid}
    })

    if (filesValidity.every(f => f.isValid)) {
      setFilesAreValid(true)
      setUploadedFiles(files)
    }

  }

  return (
    <div id={'file-upload'}>

      <div className={'input-wrapper'}>
        <input id={'file'} type={'file'} onChange={handleChange} multiple />
        <label htmlFor={'file'}> <PlusOutlined/> </label>
      </div>

      <div className={'footer'}>

        <div className={'file-info'}>
          {/* <p>{uploadedFile ? crunchFileName(uploadedFile.name) : 'No File Selected'}</p> */}
          <p>Valid: <span className={filesAreValid ? 'valid' : 'invalid'}>{filesAreValid.toString().toUpperCase()}</span></p>
        </div>

        <button 
          onClick={() => handleSubmit(uploadedFiles)}
          className={filesAreValid ? '' : 'disabled'}
        >
          { filesAreValid ? 
            <RightOutlined /> :
            <CloseOutlined />
          }
        </button>
      </div>

    </div>
  );

}

export default FileUpload;