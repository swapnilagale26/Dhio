import React from 'react';
import { Link } from 'react-router-dom';

const NoPageFound = () => {
  return (
    <div className='comming-soon'>
      <div>
        <h2>404: Page Not Found</h2>
        <Link to="/dashboard" className='menu-label'>
          <p>Go Back</p>
        </Link>
      </div>
    </div>
  )
}

export default NoPageFound;