import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const BulkEdit = ({ closeModal, onConfirm }) => {
  const [autoRenewal, setAutoRenewal] = useState(false);
  return (
    <div className='bulk-edit'>
      <p>Lorem ipsum dolor sit amet consectetur. Augue duis urna felis et eget rutrum. Ipsum.</p>
      <div className='bulk-delete-image'><img src='/bulk-edit.png' alt='bulk-edit'/></div>
      <div className='form-field'>
        <label>Auto Renewal</label>
        <select name='autoRenewal' onChange={(event) => setAutoRenewal(event.target.value)} defaultValue='true'>
          <option value='true' selected={autoRenewal}>True</option>
          <option value='false' selected={!autoRenewal}>False</option>
        </select>
      </div>
      <div className='action-bar'>
        <Button variant='secondary' label='Cancel' onClick={closeModal} />
        <Button variant='primary' label='Save' onClick={() => onConfirm(autoRenewal)} />
      </div>
    </div>
  )
}

export default BulkEdit