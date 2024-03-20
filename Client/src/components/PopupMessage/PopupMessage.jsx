import React from 'react';
import { CloseIcon2, ErrorIcon, SuccessIcon } from '../../icons';
import './popup-message.css';

const PopupMessage = ({ isError = false }) => {
  const success = (
    <div className='success'>
      <div className='mark'>
        <SuccessIcon />
      </div>
      <div className='message'>
        <h3>Success!</h3>
        <p>Your details saved successfully!</p>
      </div>
      <div className='close-icon'>
        <CloseIcon2 />
      </div>
    </div>
  )

  const error = (
    <div className='error'>
      <div className='mark'>
        <ErrorIcon />
      </div>
      <div className='message'>
        <h3>Failed!</h3>
        <p>Your details failed to save.</p>
      </div>
      <div className='close-icon'>
        <CloseIcon2 />
      </div>
    </div>
  )
  return (
    <div className='popup-message'>
      {isError ? error : success}
    </div>
  )
}

export default PopupMessage