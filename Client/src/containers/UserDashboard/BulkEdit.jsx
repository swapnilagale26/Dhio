import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const BulkEdit = ({ closeModal, onConfirm }) => {
  const [manager, setManager] = useState(false);
  return (
    <div className='bulk-edit'>
      <p>Lorem ipsum dolor sit amet consectetur. Augue duis urna felis et eget rutrum. Ipsum.</p>
      <div className='bulk-delete-image'><img src='/bulk-edit.png' alt='bulk-edit'/></div>
      <div className='form-field'>
        <label>Reporting Manager</label>
        <select name='manager' onChange={(event) => setManager(event.target.value)}>
          <option value='' disabled selected>Please select a manager</option>
          <option value='IT' selected={manager === 'IT'}>IT</option>
          <option value='QA' selected={manager === 'QA'}>QA</option>
        </select>
      </div>
      <div className='action-bar'>
        <Button variant='secondary' label='Cancel' onClick={closeModal} />
        <Button variant='primary' label='Save' onClick={() => onConfirm(manager)} />
      </div>
    </div>
  )
}

export default BulkEdit