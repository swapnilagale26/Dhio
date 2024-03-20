import React, { useMemo } from 'react';

const DescriptiveModuleCreator = ({
  formData, setFormData, saveModule, haveVenue,
}) => {
  const form = useMemo(() => formData || {}, [formData]);
  const onChangeHandler = (event) => {
    const assetForm = {...form};
    assetForm[event.target.name] = event.target.value;
    setFormData(assetForm);
    console.log("asses",assetForm);
  }
  console.log(form);
  return (
    <div className='module-uploader'>
      <div className='form-field'>
        <label>Question Text Box</label>
        <input type='text' name='title' value={form.title || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
     
     
      <div className='form-field'>
        <label>To User</label>
        <textarea name='description' value={form.description || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
      <div className='action-box'>
      <input className='module-button' type='button' value='Repeat' />
      <div>
        <input className='secondary-button' type='button' value='Cancel' />
        <input className='primary-button' type='button' value='Save Changes' onClick={saveModule} />
        </div>
      </div>
    </div>
  )
}

export default DescriptiveModuleCreator