import React from 'react';
import './username.css';

const UserName = (props) => {
  
  return (
    <div className='username'>
      <img src={props.avatar ?? '/avatar.png'} width={20} height={20} alt='avatar'/>
      {props?.fullname}
    </div>
  )
}

export default UserName