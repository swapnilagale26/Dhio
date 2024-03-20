import React, { useMemo } from 'react';
import { DeleteIcon } from '../../icons';

const AssesmentModuleCreator = ({
  formData, setFormData, saveModule, haveVenue,
}) => {
  const form = useMemo(() => formData || {}, [formData]);
  const onChangeHandler = (event) => {
    const assetForm = {...form};
    assetForm[event.target.name] = event.target.value;
    setFormData(assetForm);
  }
  console.log(form);


   return (
    <div className='module-uploader'>
      <div className='form-field'>
        <label>Question 1</label>
        <input type='text' name='title' value={form.title || ''} onChange={onChangeHandler}  />
       
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>

      <div className='form-row'>
        <div className='form-field'>
          <label>Option 1 <DeleteIcon className='option' /></label>
          <input type='text' name='option1' value={form.option1 || ''} onChange={onChangeHandler} />
          
          {/* <p className='error'>{error && error[0]?.name}</p> */}
        </div>

        <div className='form-field'>
          <label>Option 2 <DeleteIcon className='option' /></label>
          <input type='text' name='option2' value={form.option2 || ''} onChange={onChangeHandler} />
        
          {/* <p className='error'>{error && error[0]?.name}</p> */}
        </div>
      </div>

      <div className='form-row'>
        <div className='form-field'>
          <label >Option 3  <DeleteIcon className='option' /> </label> 
          <input type='text' name='option3' value={form.option3 || ''} onChange={onChangeHandler} />
          
          {/* <p className='error'>{error && error[0]?.name}</p> */}
        </div>

        <div className='form-field'>
          <label>Option 4 <DeleteIcon className='option' /></label>
          <input type='text' name='option4' value={form.option4 || ''} onChange={onChangeHandler} />

          {/* <p className='error'>{error && error[0]?.name}</p> */}
        </div>
      </div>

      <div className='action-bar'>
     
        <input className='secondary-button' type='button' value='Cancel' />
        <input className='primary-button' type='button' value='Save Changes' onClick={saveModule} />
      </div>
    </div>
  )
}
export default AssesmentModuleCreator