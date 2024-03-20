import React from 'react';
import Button from '../Button/Button';

const DeleteWarning = ({ name, closeModal, onConfirm }) => {
  return (
    <div>
      <p>
        You really want to delete entry name: <br />
        <code>{name}</code>
      </p>
      <div className='actions'>
        <Button variant='secondary' label='Cancel' onClick={closeModal} />
        <Button variant='ternary' label='Delete' onClick={onConfirm} />
      </div>
    </div>
  )
}

export default DeleteWarning;