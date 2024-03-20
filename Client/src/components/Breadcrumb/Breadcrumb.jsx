import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackIcon, HomeIcon } from '../../icons';
import './breadcrumb.css';

const Breadcrumb = ({ breadcrumbs }) =>  {
  const navigate = useNavigate();
  return (
    <div className='breadcrumb'>
      <BackIcon onClick={() => navigate('/dashboard')}/>
      <HomeIcon className='breadcrumb-home' onClick={() => navigate('/dashboard')}/>
      {breadcrumbs.map((breakcrumb, index) => (
        <React.Fragment key={breakcrumb.menu}>
          <p>/</p>
          {index < breadcrumbs.length - 1 ? 
            <Link to={breakcrumb.link} className='menu-label'>
              <p>{breakcrumb.menu}</p>
            </Link> :
            <p>{breakcrumb.menu}</p>
          }
        </React.Fragment>
      ))}
      
    </div>
  )
}

export default Breadcrumb