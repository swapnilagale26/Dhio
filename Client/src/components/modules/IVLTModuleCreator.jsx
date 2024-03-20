import React, { useMemo } from 'react';

const IVLTModuleCreator = ({
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
        <label>Title</label>
        <input type='text' name='title' value={form.title || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
      <div className='form-field'>
        <label>Date & Time</label>
        <input type='datetime-local' name='datetime' value={form.datetime || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
      {haveVenue && (<div className='form-field'>
        <label>Venue Location</label>
        <input type='text' name='location' value={form.location || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>)}
      <div className='form-field'>
        <label>Add Details</label>
        <textarea name='description' value={form.description || ''} onChange={onChangeHandler} />
        {/* <p className='error'>{error && error[0]?.name}</p> */}
      </div>
      <div className='action-bar'>
        <input className='secondary-button' type='button' value='Cancel' />
        <input className='primary-button' type='button' value='Save Changes' onClick={saveModule} />
      </div>
    </div>
  )
}

export default IVLTModuleCreator