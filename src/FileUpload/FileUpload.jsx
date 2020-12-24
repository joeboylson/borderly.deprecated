import React, { useEffect, useState } from 'react';
import { PlusOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { filter, isEmpty} from 'lodash';
import { crunchFileName, fileIsValid } from '../utils';

const FileUpload = ({ handleSubmit }) => {
  
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [filesAreValid, setFilesAreValid] = useState(false);

  useEffect(() => {
    setFilesAreValid(uploadedFiles && uploadedFiles.every(f => f.isValid))
  }, [uploadedFiles]);

  const handleChange = (e) => {
    let _files = Array.prototype.slice.call(e.target.files).slice(0, 5)
    let filesValidity = _files.map(file => fileIsValid(file))
    setUploadedFiles(filesValidity);
  };

  const handleRemoveFile = (fileObject) => {
    const _uploadedFiles = filter(uploadedFiles, (_fileObject) => _fileObject !== fileObject);
    setUploadedFiles(_uploadedFiles);
  };

  return (
    <div>
      { isEmpty(uploadedFiles) ? (
        <div id={'file-input'}>
          <input id={'file'} type={'file'} onChange={handleChange} multiple accept="image/*" />
          <label htmlFor={'file'}>
            <span>
              <p>Upload a File</p>
              <p>(Maximum of 5)</p>
              <PlusOutlined/> 
            </span>
          </label>
        </div>
      ) : (
        <div id={'file-list-wrapper'}>
          <div id={'file-list'}>
            { uploadedFiles.map( (fileObject, index) => {
              const { file, isValid } = fileObject;

              return (
                <div key={index} className={`file ${isValid ? '' : 'invalid-file'}`}>
                  <p>{isValid ? '' : <CloseCircleOutlined />} { crunchFileName(file.name)} </p>
                  <button 
                    className={'file-remove-button'}
                    onClick={() => handleRemoveFile(fileObject)}
                  >
                    <CloseOutlined/>
                  </button>
                </div>
              )
            })}
          </div>
          <button 
            id={'submit-button'}
            disabled={!filesAreValid}
            onClick={() => handleSubmit(uploadedFiles)}
          >SUBMIT</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;