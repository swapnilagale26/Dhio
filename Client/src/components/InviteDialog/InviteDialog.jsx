import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon,CloseIcon } from '../../icons';
import { fetchUsers } from '../../redux/slices/userSlice';
import Button from '../Button/Button';

import { inviteForSurvey } from '../../redux/slices/surveySlice';
import './invite-dialog.css';

const InviteDialog = ({closeModal, surveyId}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.data);

  const onSearchTextChange = (event) => setSearchText(event.target.value);

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  const onUserSelect = (userId) => {
    let seletedUsers = [...selectedRows];
    const userIndex = seletedUsers.indexOf(userId);
    if(userIndex===-1) {
      seletedUsers.push(userId);
    } else {
      seletedUsers.splice(userIndex, 1);
    }
    setSelectedRows(seletedUsers);
  }

  const invite = () => {
    const payload = {
      surveyId,
      invited: selectedRows
    }
    dispatch(inviteForSurvey(payload))
  }

  const usersToShow = users.filter(user => user.fullname.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || user.dept.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  return (
    <div className='invite-section'>
      <div className="filter-section">
        <div className="search-bar">
          <input
            className="search-field"
            type="text"
            placeholder="Search here..."
            onChange={onSearchTextChange}
          />
          <SearchIcon className="search-icon" />
        </div>
        <Button variant='primary' label="Search"/>
      </div>
      <div className="user-list-horizontal">
        {usersToShow.map((user, index) => (
          <div className="user-Cardimage" key={user._id}>
             <div className="user-info">
            <img
              src={user.avatar ?? '/avatar.png'}
              alt="user-avatar"
              className="user-image"
              width={40}
              height={50}
            />
            <p className="user-name">{user.firstname}</p>
            </div>
            <CloseIcon className="close-icon-on-image"  onClick={() => onUserSelect(user._id)} />
          </div>
        ))}
      </div>
      <div className='user-list'>
        <div>
          <div className='select-all-users'>
            <p>{usersToShow.length} Results</p>
            <div className="selector">
              <label>Select All</label>
              <input type="checkbox" onChange={() => selectedRows.length === users?.length ? setSelectedRows([]) : setSelectedRows(users.map(user => user._id))} checked={selectedRows.length === users?.length} />
            </div>
          </div>
        </div>
        <div className='user-card-list'>
          {usersToShow.map((user, index) => (
            <div className='user-card'>
              <img src={user.avatar ?? '/avatar.png'} alt='user-avatar' className='user-image' width={40} height={40} />
              <div className='user-details'>
                <p>{user.fullname}</p>
                <p className='address'>{`${user.city}, ${user.country}`}</p>
              </div>
              <input type="checkbox" onChange={() => onUserSelect(user._id)} checked={selectedRows.some(u => u === user._id)} />
            </div>
          ))}
        </div>
      </div>
      <div className='action-bar'>
        <input className='secondary-button' type='button' value='Cancel' onClick={closeModal}/>
        <input className='primary-button' type='button' value='Save Changes' onClick={invite}/>
      </div>
    </div>
  )
}

export default InviteDialog