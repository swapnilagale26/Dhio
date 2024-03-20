import React, { useRef } from 'react';
import { useDropzone } from "react-dropzone";
import { Link } from 'react-router-dom';
import { BulkUploadIcon } from '../../icons';

import './bulk-import.css';


const BulkUploader = ({ onDrop, accept, bulk = false }) =>{
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });
  const hiddenFileInput = useRef(null);
  
  const handleClick = () => hiddenFileInput.current.click();
  const handleChange = event => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      onDrop(reader.result)
    }
  };
  return (
    <div className='bulk-import'>
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
              <p>or {' '}
                <Link variant='secondary' onClick={handleClick}>
                    Click here  
                </Link>
                {' '}to browse
              </p>
              {bulk && (<p className='hint'>Suported format: xlx, docs, Pdf. Max size: 40 mb.</p>)}
              <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                accept={accept}
                {...getInputProps()}
                style={{display: 'none'}} // Make the file input element invisible
              />
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkUploader