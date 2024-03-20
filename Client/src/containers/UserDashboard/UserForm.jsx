import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Button from '../../components/Button/Button';
import PopupMessage from '../../components/PopupMessage/PopupMessage';
import { fetchTenancies, fetchTenancy } from '../../redux/slices/tenancySlice';
import { deleteUserCall, deselectUser, fetchUser, fetchUsersByRole, postUser, updateUser } from '../../redux/slices/userSlice';
import { validateEmail, validatePhone } from '../../utils/formValidators';
import './user-dashboard.css';

const UserForm = () => {
  const [formData, setFormData] = useState({});
  const [profile, setProfile] = useState(null);
  const [message, showMessage] = useState(false);
  const loadingRef = useRef(false);
  const hiddenFileInput = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tenancies = useSelector((state) => state.tenancyReducer?.selectedTenancy ? [state.tenancyReducer?.selectedTenancy] : state.tenancyReducer?.data);
  const selectedUser = useSelector((state) => state.userReducer?.selectedUser);
  const currentUser = useSelector((state) => state.userReducer?.currentUser);
  const managers = useSelector((state) => state.userReducer?.byRole?.Manager);
  const isLoading = useSelector((state) => state.userReducer?.isLoading);
  const isError = useSelector((state) => state.userReducer?.isError);
  const error = useSelector((state) => state.userReducer?.error);

  const onConfirm = () => {
    const form = {...formData, avatar: profile };
    if(currentUser?.role === 'SuperAdmin') {
      form.role = 'Admin'
    } else {
      form.orgId= currentUser.orgId;
    }
    loadingRef.current = true;
    if(formData?._id) {
      dispatch(updateUser(form));
    } else {
      dispatch(postUser(form));
    }
  }

  const onDelete = () => {
    dispatch(deleteUserCall(formData?._id));
  }

  const goBack = () => {
    dispatch(deselectUser());
    return navigate("/user");
  }

  useEffect(() => {
    if(params.id) {
      dispatch(fetchUser(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    if(selectedUser?._id) {
      setFormData(selectedUser);
      setProfile(selectedUser.avatar);
    }
  }, [selectedUser]);

  useEffect(() => {
    if(!isLoading && loadingRef.current) {
      showMessage(true);
      loadingRef.current = false;
      if(!isError) {
        setTimeout(() => goBack(), 1000);
      }
      setTimeout(() => showMessage(false), 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  useEffect(() => {
    if(currentUser?.role === 'Admin') {
      setFormData({...formData, orgId: currentUser.orgId});
      dispatch(fetchTenancy(currentUser.orgId));
      dispatch(fetchUsersByRole('Manager'));
    }
    if(currentUser?.role === 'SuperAdmin') {
      dispatch(fetchTenancies());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])


  const onChangeHandler = (event) => {
    const form = {...formData, autoRenewal: true};
    form[event.target.name] = event.target.value;
    if(event.target.name === 'startDate') {
      const startDate = new Date(event.target.value);
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const day = startDate.getDate();
      const fulldate = new Date(year + 1, month, day);
      form.endDate = fulldate.toISOString().slice(0, 10);
    }
    setFormData(form);
  }

  const onDeptChangeHandler = (value) => {
    onChangeHandler({target:{name: 'dept', value}})
  }

  const isFormValid = () => {
    if((!formData?.firstname 
      || !formData?.lastname 
      || !validateEmail(formData.email)
      || (!formData?.phone || formData.phone.length < 10)
      || !formData?.dob
      || !formData?.doj
      || !formData?.country
      || !formData?.city
      || !profile)
      && (
        (currentUser?.role === 'Admin' && !formData?.dept  && !formData?.manager)
        || (currentUser?.role === 'SuperAdmin' && !formData?.orgId))){
      return true;
    }
  }
  
  const handleClick = () => hiddenFileInput.current.click();
  const handleChange = event => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setProfile(reader.result)
    }
  };
  const depts = tenancies?.find(tenancy => tenancy?._id === formData?.orgId)?.departments.map(dept => ({ value: dept, label: dept }))
  const breadcrumbs = [
    {
      menu: 'User Management',
      link: '/user',
    },
    {
      menu: params?.id ? 'Edit User Details' : 'Add New User',
      link: '/user',
    }
  ]

  return (
    <div className="container">
      <h2>{params?.id ? 'Update User Details' : 'Add New User'}</h2>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      {message && <PopupMessage isError={isError} />}
      <div>
        <div className='file-uploader'>
          <img src={profile ?? '/avatar.png'} width={120} height={120} alt='avatar'/>
          <Button variant='secondary'  onClick={handleClick}>
            Upload Image
          </Button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{display: 'none'}} // Make the file input element invisible
          />
        </div>
        {currentUser?.role === 'SuperAdmin' && (
          <div className='form-field'>
            <label>Choose Tenancy</label>
            <select name='orgId' onChange={onChangeHandler} value={formData.orgId || ''}>
              <option value='' disabled>Please select a Tenancy</option>
              {tenancies?.map(tenancy => (
                <option value={tenancy?._id} selected={formData?.orgId === tenancy?._id}>{tenancy?.name}</option>
              ))}
            </select>
          </div>
        )}
        {currentUser?.role === 'Admin' && (
          <div className='form-field'>
            <label>Choose Role</label>
            <select name='role' onChange={onChangeHandler} value={formData.role || ''}>
              <option value='' disabled>Please select a role</option>
              <option value='User' selected={formData?.role === 'User'}>User</option>
              <option value='Manager' selected={formData?.role === 'Manager'}>Manager</option>
            </select>
          </div>
        )}
        <div className='form-fields-in-row'>
          <div className='form-field'>
            <label>First Name</label>
            <input type='text' name='firstname' onChange={onChangeHandler} value={formData?.firstname} />
          </div>
          <div className='form-field'>
            <label>Last Name</label>
            <input type='text' name='lastname' onChange={onChangeHandler} value={formData?.lastname} />
          </div>
        </div>
        <div className='form-fields-in-row'>
          <div className='form-field'>
            <label>Phone</label>
            <input type='text' name='phone' onKeyDown={validatePhone} onChange={onChangeHandler} value={formData?.phone} />
            <p className='error'>{error && error[0]?.phone}</p>
          </div>
          <div className='form-field'>
            <label>Email</label>
            <input type='text' name='email' onChange={onChangeHandler} value={formData?.email} />
            <p className='error'>{error && error[0]?.email}</p>
          </div>
        </div>
        <div className='form-fields-in-row'>
          <div className='form-field'>
            <label>Date of Birth</label>
            <input type='date' name='dob' onChange={onChangeHandler} value={formData?.dob} />
          </div>
          <div className='form-field'>
            <label>Date of Joining</label>
            <input type='date' name='doj' onChange={onChangeHandler} value={formData?.doj} />
          </div>
        </div>
        {currentUser?.role === 'Admin' && (
          <>
            <div className='form-fields-in-row'>
              <div className='form-field'>
                <label>Department</label>
                <CreatableSelect 
                  options={depts} 
                  placeholder='Type' 
                  name='dept' 
                  value={depts?.find(dept => dept.value === formData.dept)} 
                  onChange={onDeptChangeHandler}
                />
              </div>
              <div className='form-field'>
                <label>Reporting Manager</label>
                <select name='manager' onChange={onChangeHandler}>
                  <option value='' disabled selected>Please select a manager</option>
                  {managers?.map(manager => (<option value={manager.fullname} selected={formData?.manager === manager.fullname}>{manager.fullname}</option>))}
                </select>
              </div>
            </div>
          </>
        )}
        <div className='form-fields-in-row'>
          <div className='form-field'>
            <label>City</label>
            <input type='text' name='city' onChange={onChangeHandler} value={formData?.city} />
          </div>
          <div className='form-field'>
            <label>Country</label>
            <input type='text' name='country' onChange={onChangeHandler} value={formData?.country} />
          </div>
        </div>
        <div className='form-actions'>
          <div>
            {formData?._id && (<Button variant='ternary' label='Delete' onClick={onDelete} />)}
          </div>
          <div className='action-bar'>
            <Button variant='secondary' label='Cancel' onClick={goBack} />
            <Button variant='primary' label={formData?._id ? 'Save Changes': 'Create User' } onClick={onConfirm} disabled={isFormValid()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserForm;