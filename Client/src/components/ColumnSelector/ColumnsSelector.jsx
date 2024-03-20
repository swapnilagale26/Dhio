import React, { useState } from 'react';
import { CloseIcon } from '../../icons';

import Button from '../Button/Button';
import './columns-selector.css';

const ColumnsSelector = ({ columns, visibleColumns, setViewableColumns, onClose}) => {
  const [viewable, setViewable] = useState([...visibleColumns]);

  const setColumn = (column) => {
    const index = viewable.indexOf(column.value);
    const columnnsToView = [...viewable];
    if(index === -1) {
      setViewable([...columnnsToView, column.value]);
    } else {
      columnnsToView.splice(index, 1);
      setViewable([...columnnsToView]);
    }
  }

  const onApply = () => {
    setViewableColumns(viewable);
    onClose();
  }

  return (
    <div className='popup-filters'>
      <div className='select-all'>
        <p onClick={() => {}} className='column-selector'>
          <input 
            type="checkbox" 
            onChange={() => columns.length === viewable.length ? setViewable([]) : setViewable([...columns.map(column=>column.value)])} 
            checked={columns.length === viewable.length} 
          />
          Select All
        </p>
        <CloseIcon onClick={onClose}/>
      </div>
      {columns.map((column) => (
        <p className='column-selector' key={column.value}>
          <input type="checkbox" onChange={() => setColumn(column)} checked={viewable.includes(column.value)} />
          {column.label}
        </p>
      ))}
      <div className='action-bar'>
        <Button variant='primary' label='Apply' onClick={onApply}/>
      </div>
    </div>
  )
}

export default ColumnsSelector