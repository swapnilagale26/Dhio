import React, { useState, useRef } from "react";
import "./Form.css";
import BulkUploader from "../../components/BulkUploader/BulkUploader";
// import "./AssetForm.css";

function Form() {
  const [selectedYear, setSelectedYear] = useState(null);
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  const [selectedCountry, setSelectedCountry] = useState("");

  // Function to handle changes to the selected country
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    // Add more countries as needed
  ];

  return (
    <div className="NewAsset">
      <div className="sizeasset InterBoldFamily">
        <h2>Customer </h2>
      </div>

      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">Customer Name</label>
          <input className="inputback" list="browsers" name="browser" id="browser" placeholder="Enter here" />
          <p className="error"></p>
        </div>
        <div className="form-field InterRegularFamily">
          <label id="gapid">Admin Name</label>
          <input className="inputback" list="browsertime" name="browsertime" id="browser" placeholder="Enter here" />
          <p className="error"></p>
        </div>
      </div>
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">Email Address</label>
          <input className="inputback" list="browsers" name="browser" id="browser" placeholder="Enter here" />
          <p className="error"></p>
        </div>
        <div className="form-field InterRegularFamily">
          <label id="gapid">Phone Number</label>
          <input className="inputback" list="browsertime" name="browsertime" id="browser" placeholder="Number" />
          <p className="error"></p>
        </div>
      </div>
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">No.of Users</label>
          <input className="inputback" list="browser" name="browser" id="browser" placeholder="Numerics only" />
          <p className="error"></p>
        </div>

        <div className="form-field InterRegularFamily">
          <div className="form-field gap">
            <label id="gapid">Billing Cycle</label>
            <select id="selectyear" value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <p className="error"></p>
          </div>
        </div>
      </div>
      <div className="newaddress InterBoldFamily">
        <h2>Address</h2>
      </div>
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">City</label>
          <input className="inputback" list="browser" name="browser" id="browser" placeholder="Enter city name" />
          <p className="error"></p>
        </div>

        <div className="form-field InterRegularFamily">
          <label id="gapid">Country</label>
          <select id="selectyear" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <p className="error"></p>
        </div>
      </div>
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">TimeZone</label>
          <input className="inputback" list="browser" name="browser" id="browser" placeholder="Select timezone" />
          <p className="error"></p>
        </div>

        <div className="form-field InterRegularFamily">
          <label id="gapid">Postal Code</label>
          <input className="inputback" list="browsertime" name="browsertime" id="browser" placeholder="Enter here" />

          <p className="error"></p>
        </div>
      </div>

      <div className="bulk-import">
        <div className="upload-section" style={{ marginLeft: "1%", marginRight: "1%", marginBottom: "1%" }}>
          <div className=" avtar InterBoldFamily">
            <h2>Avatar</h2>
          </div>
          <textarea
            class="width-per-10 box-sizing InterBoldFamily"
            name=""
            id=""
            placeholder="Write here"
            style={{
              height: "10em",
              width: "100%",
              marginTop: "1%",
              padding: "1%",
              backgroundColor: "rgb(251, 251, 251)",
              borderRadius: "5px",
              border: "1px solid rgba(171, 171, 171, 1)",
            }}
          ></textarea>
        </div>
      </div>
      <div className="btn-flex">
        <button id="addbtn">+ Add New Customer</button>

        <div className="action-form-button">
          <input className="secondary-button" type="button" id="cancel" value="Cancel" />
          <input className="primary-button" type="button" id="save" value="Save" />
        </div>
      </div>
    </div>
  );
}

export default Form;
