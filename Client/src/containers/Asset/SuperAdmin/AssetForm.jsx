import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import BulkUploader from "../../../components/BulkUploader/BulkUploader";
import "./AssetForm.css";
const breadcrumbs = [
  {
    menu: "Assets",
    link: "/Assets",
  },
  {
    menu: "Add New Asset",
    link: "/Assets",
  },
];
function AssetForm() {
  const [autoRenewal, setAutoRenewal] = useState(false);
  return (
    <div className="NewAsset">
      <div className="sizeasset">
        <h1>Add New Asset</h1>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div className="form-fields-in-row-title">
        <div className="form-field">
          <label  id="gaptile">Title *</label>
          <input style={{height: "42px"}} className="inputback" id="title" type="text" name="name" placeholder="Write here" />
          <p className="error"></p>
        </div>
      </div>
      <div className="form-fields-in-row-title ">
        <div className="form-field">
          <label id="gapid">Type *</label>
          <select style={{height: "42px"}}
            className="inputback"
            
            name="autoRenewal"
            onChange={(event) => setAutoRenewal(event.target.value)}
            defaultValue="true"
          >
            <option value="true" selected={autoRenewal}>
              True
            </option>
            <option value="false" selected={!autoRenewal}>
              False
            </option>
          </select>
          <p className="error"></p>
        </div>
        <div className="form-field">
          <label id="gapid">Duration</label>
          <input style={{height: "42px"}}  className="inputback" type="text" name="subdomain" placeholder="2 hours" />
          <p className="error"></p>
        </div>
      </div>
      <div className="form-field-Description" style={{ marginLeft: "1%", marginRight: "-1%" }}>
        <div style={{ marginBottom: "10px", color: "rgba(39, 49, 67, 1)" }}>
          <label>Description</label>
        </div>
        <textarea
          class="width-per-10 box-sizing"
          name=""
          id=""
          placeholder="Write here"
          style={{ height: "10em", width: "98%", padding: "1%", backgroundColor: "rgb(251, 251, 251)", borderRadius:"5px",border:"1px solid rgba(171, 171, 171, 1)"}}
        ></textarea>
        <p className="error"></p>
      </div>
      <div className="bulk-import">
        <div className="upload-section" style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "1%" }}>
          <label>Upload File</label>
          <BulkUploader />
        </div>
      </div>
      <div className="action-form-button">
        <input className="secondary-button" type="button" value="Cancel" />
        <input className="primary-button" type="button" value="Create" />
      </div>
    </div>
  );
}

export default AssetForm;
