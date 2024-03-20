import React, { useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

import BulkUploader from '../../components/BulkUploader/BulkUploader';
// import './bulk-import.css';

const BulkUpload = () => {
  const [xsl, setXSL] = useState(null);
  const breadcrumbs = [
    {
      menu: 'User Management',
      link: '/user',
    },
    {
      menu: 'User Bulk Upload',
      link: '/user',
    }
  ]
  return (
    <div className="container">
      <h2>User Bulk Upload</h2>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <h4>Bulk Import Data</h4>

      <div className='bulk-import'>
        <div className='upload-section'>
          <BulkUploader setXSL={setXSL} accept='text/*, application/vnd.ms-excel,'/>
        </div>
        <div className='template-section'>template-section</div>
      </div>
    </div>
  )
}

export default BulkUpload