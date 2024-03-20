import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BulkUploadIcon } from "../../icons";

import "./module-uploader.css";

const DocumentModuleCreator = ({
  formData,
  setFormData,
  accept = "zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed",
  saveModule,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (files) => {
    const file = files[0];
    const formDataToUpdate = { ...formData, file };
    setFormData(formDataToUpdate);
  };

  const onDrop = (acceptedFiles, rejectedFiles) => {
    handleChange(acceptedFiles);
  };

  const updateInterval = setInterval(() => {
    if (uploadProgress < 100) {
      setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
    } else {
      clearInterval(updateInterval);
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    // Add the onUploadProgress callback
    onUploadProgress: (event) => {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(progress);
    }
  });

  const hiddenFileInput = useRef(null);

  const handleClick = () => hiddenFileInput.current.click();

  const onChangeHandler = (event) => {
    const assetForm = { ...formData };
    assetForm[event.target.name] = event.target.value;
    setFormData(assetForm);
  };

  const filePathSplitted = formData?.file_path?.split("/");
  const filename = filePathSplitted && filePathSplitted[filePathSplitted?.length - 1];

  return (
    <div className="module-uploader">
      <div className="form-field">
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={onChangeHandler} />
      </div>
      {formData.file || filename ? (
        <p>Document File: {formData.file?.name || filename}</p>
      ) : (
        <div className="form-field">
          <label>Upload Documents</label>
          <div className="file-import">
            <div className="upload-section">
              {/* <div {...getRootProps({ className: "dropzone" })}>
                <div className="file-uploader">
                  {isDragActive ? (
                    <p className="dropzone-content">Release to drop the files here</p>
                  ) : (
                    <>
                      <BulkUploadIcon />
                      <p>Drag and drop file here</p>
                      <p className="hint">Supported format: ZIP. Max size: 1GB.</p>
                      <input
                        type="file"
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        multiple={true}
                        accept={accept}
                        {...getInputProps()}
                        style={{ display: "none" }}
                      />
                    </>
                  )}
                </div>
              </div> */}
              
            </div>
          </div>
        </div>
      )}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${uploadProgress}%` }}
          aria-valuenow={uploadProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {uploadProgress}%
        </div>
      </div>
      <div className="action-bar">
        <input className="secondary-button" type="button" value="Cancel" />
        <input className="primary-button" type="button" value="Save Changes" onClick={saveModule} />
      </div>
    </div>
  );
};

export default DocumentModuleCreator;
