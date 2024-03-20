import React, { useEffect, useState } from 'react';

import Button from '../Button/Button';
import './column-filters.css';

const ColumnFilters = ({ filters = {},accessor, onConfirm }) => {
  const [formData, setFormData] = useState({});

  const onChangeHandler = (event) => {
    const filtersToSet = {...formData};
    filtersToSet[event.target.name] = event.target.value;
    setFormData(filtersToSet);
  }

  useEffect(() => {
    setFormData({...filters});
  }, [])

  return (
    <div className='popup-filters' onClick={(event) => {event.preventDefault(); event.stopPropagation()}}>
      <div className='form-field'>
        <select name='filterType1' onChange={onChangeHandler} value={formData?.filterType1 || ''}>
          <option value='' disabled selected>Please Select</option>
          <option value='contains'>Contains</option>
          <option value='not_contains'>Not Contains</option>
          <option value='equals'>Equals</option>
          <option value='not_equals'>Not Equals</option>
          <option value='starts_with'>Starts With</option>
          <option value='ends_with'>Ends With</option>
          <option value='blank'>Blank</option>
        </select>
      </div>
      <div className='form-field'>
        <input type='text' name='filterValue1' onChange={onChangeHandler} value={formData?.filterValue1 || ''} />
      </div>
      {/* <div className='form-fields-in-row'>
        <div className='radio-options'>
          <input type='radio' name='operator' value='AND' onChange={onChangeHandler} checked={formData?.operator === 'AND'} />
          <label>AND</label>
        </div>
        <div className='radio-options'>
          <input type='radio' name='operator' value='OR' onChange={onChangeHandler}  checked={formData?.operator === 'OR'} />
          <label>OR</label>
        </div>
      </div>
      {formData?.operator && (
        <>
          <div className='form-field'>
            <select name='filterType2' onChange={onChangeHandler} value={formData?.filterType2}>
              <option value='' disabled>Please Select</option>
              <option value='contains'>Contains</option>
              <option value='not_contains'>Not Contains</option>
              <option value='equals'>Equals</option>
              <option value='not_equals'>Not Equals</option>
              <option value='starts_with'>Starts With</option>
              <option value='ends_with'>Ends With</option>
              <option value='blank'>Blank</option>
            </select>
          </div>
          <div className='form-field'>
            <input type='text' name='filterValue2' onChange={onChangeHandler} value={formData?.filterValue2} />
          </div>
        </>
      )} */}
      <Button 
        variant='primary' 
        onClick={()=>onConfirm({ [accessor]:formData })}>Apply</Button>
      <Button 
        variant='secondary' 
        onClick={() => setFormData({})}>Reset Filter</Button>
    </div>
  )
}

export default ColumnFilters