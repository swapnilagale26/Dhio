
import React, { useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { BulkUploadIcon } from '../../icons';

import './module-uploader.css';

const SelfPacedModuleCreator = ({ 
  formData, setFormData,changeLabel,
  accept='zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed', 
  saveModule
}) => {
  const handleChange = event => {
    var file = event[0] || event.target.files[0];
    const formDataToUpdate = {...formData, file};
    setFormData(formDataToUpdate);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleChange,
    accept
  });
  const hiddenFileInput = useRef(null);
  
  const handleClick = () => hiddenFileInput.current.click();

  const onChangeHandler = (event) => {
    const assetForm = {...formData};
    assetForm[event.target.name] = event.target.value;
    setFormData(assetForm);
  }
  const filePathSplitted = formData?.file_path?.split('/')
  const filename = filePathSplitted && filePathSplitted[filePathSplitted?.length - 1];

  return (
    <div className='module-uploader'>
      <div className='form-field'>
        <label>Title</label>
        <input type='text' name='title' value={formData.title} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
      {formData.file || filename ? <p> Upload File: {formData.file?.name || filename}</p>: (<div className='form-field'>
      <label>Upload</label>
        <div className='file-import'>
          <div className='upload-section'>
            <div {...getRootProps({ className: "dropzone" })}>
              <div className='file-uploader'>
                {isDragActive ? (
                  <p className="dropzone-content">
                    Release to drop the files here
                  </p>
                ) : (
                <>
                  <BulkUploadIcon />
                  <p>Drag and drop file here</p>
                  {/* <p>or {' '}
                    <Link variant='secondary' onClick={handleClick}>
                      Click here
                    </Link>
                    {' '}to browse
                  </p> */}
                  <p className='hint'>Suported format: ZIP. Max size: 1GB.</p>
                  <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    multiple={false}
                    accept={accept}
                    {...getInputProps()}
                    style={{display: 'none'}} // Make the file input element invisible
                  />
                </>)}
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <div className='action-bar'>
      
        <input className='secondary-button' type='button' value='Cancel'/>
        <input className='primary-button' type='button' value='Save Changes' onClick={saveModule} />
      </div>
    </div>
  )
}

export default SelfPacedModuleCreator