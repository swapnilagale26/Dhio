import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Button from '../../../components/Button/Button';
import PopupMessage from '../../../components/PopupMessage/PopupMessage';
import { fetchCourse, postCourse, updateCourse } from '../../../redux/slices/courseSlice';

const StepOne = ({ options, nextStep}) => {
  const hiddenFileInput = useRef(null);
  const loadingRef = useRef(false);
  const [message, showMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const currentUser = useSelector((state) => state.userReducer?.currentUser);
  const selectedCourse = useSelector((state) => state.courseReducer?.selectedCourse);
  const isLoading = useSelector((state) => state.courseReducer?.isLoading);
  const isError = useSelector((state) => state.courseReducer?.isError);
  const error = useSelector((state) => state.courseReducer?.error);

  const onChangeHandler = (event) => {
    const formDataToUpdate = { ...formData };
    formDataToUpdate[event.target.name] = event.target.value;
    setFormData(formDataToUpdate);
  }

  const onSkillsChangeHandler = (value) => {
    onChangeHandler({target:{name: 'skills', value}})
  }

  const handleClick = () => hiddenFileInput.current.click();
  const handleChange = event => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    const formDataToUpdate = {...formData};
    reader.onloadend = function (e) {
      formDataToUpdate.poster = reader.result;
      setFormData(formDataToUpdate);
    }
  };

  const saveAndNext = async () => {
    loadingRef.current = true;
    const formDataToadd = {
      ...formData,
      orgId: currentUser.orgId
    }
    if(!formData._id) {
      dispatch(postCourse(formDataToadd));
    } else {
      dispatch(updateCourse(formDataToadd));
    }
    nextStep();
  }
  const goBack = () => {
    // dispatch(deselectUser());
    return navigate("/course");
  }

  const isFormValid = () => {
    if(!formData?.name 
      || !formData?.type
      || !formData?.category
      || !formData?.author
      || formData?.skills?.length === 0
      || !formData?.poster
      || !formData?.expiry
      || !formData?.startDate
      || !formData?.duration){
      return true;
    }
  }

  useEffect(() => {
    if(params?.id) {
      dispatch(fetchCourse(params?.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if(!isLoading && loadingRef.current) {
      showMessage(true);
      if(!isError) {
        setTimeout(() => nextStep(), 1000);
      }
      setTimeout(() => showMessage(false), 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  useEffect(() => {
    if(selectedCourse?._id) {
      const skills = selectedCourse.skills.map(skill => ({label: skill, value: skill}))
      setFormData({...selectedCourse, skills});
    }
  }, [selectedCourse]);

  return (
    <div>
      {message && <PopupMessage isError={isError} />}
      <div className='form-field'>
        <label>Course Name</label>
        <input type='text' name='name' value={formData.name} onChange={onChangeHandler} />
        <p className='error'>{error && error[0]?.name}</p>
      </div>
      <div className='form-field'>
        <label>Course Type</label>
        <input type='text' name='type' value={formData.type} onChange={onChangeHandler} />
        <p className='error'>{error && error[0]?.type}</p>
      </div>
      <div className='form-field'>
        <label>Course Category</label>
        <input type='text' name='category' value={formData.category} onChange={onChangeHandler} />
        <p className='error'>{error && error[0]?.category}</p>
      </div>
      <div className='form-field'>
        <label>Author</label>
        <input type='text' name='author' value={formData.author} onChange={onChangeHandler} />
        <p className='error'>{error && error[0]?.author}</p>
      </div>
      <div className='form-field'>
        <label>Course Skills</label>
        <CreatableSelect 
          isMulti 
          options={options} 
          placeholder='Type' 
          name='skills' 
          value={formData.skills} 
          onChange={onSkillsChangeHandler}
        />
        <p className='error'>{error && error[0]?.skills}</p>
      </div>
      <div className='form-field'>
        <label>Course Image</label>
        <div className='file-uploader'>
          <img src={formData.poster ?? '/avatar.png'} height={150} width='auto' alt='poster'/>
          <Button variant='secondary'  onClick={handleClick}>
            Upload Image
          </Button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{display: 'none'}} // Make the file input element invisible
          />
          <p className='error'>{error && error[0]?.poster}</p>
        </div>
      </div>
      <div className='form-fields-in-row'>
        <div className='form-field'>
          <label>Course Duration(in min)</label>
          <div className='duration'>
            <input type='text' name='duration' value={formData.duration} onChange={onChangeHandler}/>
          </div>
          <p className='error'>{error && error[0]?.duration}</p>
        </div>
        <div className='form-field'>
          <label>Course Availabel for(in week)</label>
          <div className='duration'>
            <input type='text' name='expiry' value={formData.expiry} onChange={onChangeHandler}/>
          </div>
          <p className='error'>{error && error[0]?.expiry}</p>
        </div>
        <div className='form-field'>
          <label>Start Date</label>
          <div className='duration'>
            <input type='date' name='startDate' value={formData.startDate} onChange={onChangeHandler}/>
          </div>
          <p className='error'>{error && error[0]?.startDate}</p>
        </div>
      </div>
      <div className='action-bar'>
        <input className='ternary-button' type='button' value='Cancel' onClick={goBack}/>
        <input className='primary-button' type='button' value='Save & Next' onClick={saveAndNext} disabled={isFormValid()}/>
      </div>
    </div>
  )
}

export default StepOne