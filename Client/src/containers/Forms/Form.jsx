import React, { useState, useRef } from "react";
import "./Form.css";
import BulkUploader from "../../components/BulkUploader/BulkUploader";
// import "./AssetForm.css";
import {
  deleteTenancyCall,
  deselectTenancy,
  fetchTenancy,
  postTenancy,
  updateTenancy,
} from "../../redux/slices/tenancySlice";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/formValidators";

function Form() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState(null);
  const [message, showMessage] = useState(false);
  const hiddenFileInput = useRef(null);
  const loadingRef = useRef(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTenancy = useSelector((state) => state.tenancyReducer?.selectedTenancy);
  const isLoading = useSelector((state) => state.tenancyReducer?.isLoading);
  const isError = useSelector((state) => state.tenancyReducer?.isError);
  const error = useSelector((state) => state.tenancyReducer?.error);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  const [selectedCountry, setSelectedCountry] = useState("");

  const onChangeHandler = (event) => {
    const form = { ...formData, autoRenewal: true };
    form[event.target.name] = event.target.value;
    if (event.target.name === "startDate") {
      const startDate = new Date(event.target.value);
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const day = startDate.getDate();
      const fulldate = new Date(year + 1, month, day);
      form.endDate = fulldate.toISOString().slice(0, 10);
    }
    setFormData(form);
  };

  const onConfirm = () => {
    loadingRef.current = true;
    if (formData._id) {
      dispatch(updateTenancy({ ...formData, logo }));
    } else {
      dispatch(postTenancy({ ...formData, logo }));
    }
  };

  const isFormValid = () => {
    if (
      !formData?.name ||
      !validateEmail(formData.email) ||
      !formData?.phone ||
      formData.phone.length < 10 ||
      !formData?.adminName ||
      !formData?.city ||
      !formData?.country ||
      !formData?.noOfUser
    ) {
      return true;
    }
  };

  const goBack = () => {
    dispatch(deselectTenancy());
    return navigate("/tenancy");
  };
  const onDelete = () => {
    dispatch(deleteTenancyCall(formData._id));
  };

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
          <input
            className="inputback"
            list="browsers"
            name="name"
            id="browser"
            placeholder="Enter here"
            onChange={onChangeHandler}
            value={formData?.name}
          />
          <p className="error">{error && error[0]?.name}</p>
        </div>
        <div className="form-field InterRegularFamily">
          <label id="gapid">Admin Name</label>
          <input
            className="inputback"
            list="browsertime"
            name="adminName"
            id="browser"
            placeholder="Enter here"
            onChange={onChangeHandler}
            value={formData?.adminName}
          />
          <p className="error">{error && error[0]?.adminName}</p>
        </div>
      </div>

      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">Email Address</label>
          <input
            className="inputback"
            list="browsers"
            name="email"
            id="browser"
            placeholder="Enter here"
            onChange={onChangeHandler}
            value={formData?.email}
          />
          <p className="error">{error && error[0]?.email}</p>
        </div>
        <div className="form-field InterRegularFamily">
          <label id="gapid">Phone Number</label>
          <input
            className="inputback"
            list="browsertime"
            name="phone"
            id="browser"
            placeholder="Number"
            onChange={onChangeHandler}
            value={formData?.phone}
          />
          <p className="error">{error && error[0]?.phone}</p>
        </div>
      </div>
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">No.of Users</label>
          <input
            className="inputback"
            list="browser"
            name="noOfUser"
            id="browser"
            placeholder="Numerics only"
            onChange={onChangeHandler}
            value={formData?.noOfUser}
          />
          <p className="error">{error && error[0]?.noOfUser}</p>
        </div>

        <div className="form-field InterRegularFamily">
          <div className="form-field gap">
            <label id="gapid">Billing Cycle</label>
            <select id="selectyear" name="billingCycle" onChange={onChangeHandler} value={formData?.billingCycle}>
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
      <div className="form-fields-in-row-title main">
        <div className="form-field gap">
          <label id="gapid">City</label>
          <input
            className="inputback"
            list="browser"
            name="city"
            id="browser"
            placeholder="Enter city name"
            onChange={onChangeHandler}
            value={formData?.city}
          />
          <p className="error"></p>
        </div>

        <div className="form-field InterRegularFamily">
          <label id="gapid">Country</label>
          <select id="selectyear" name="country" onChange={onChangeHandler} value={formData?.country}>
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
      {/* <div className="newaddress InterBoldFamily">
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
      </div> */}
      {/* <div className="form-fields-in-row-title main">
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
      </div> */}

      {/* <div className="bulk-import">
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
      </div> */}
      <div className="form-actions">
        <div>
          {<Button variant="ternary" label="+ Add New Customer" onClick={onConfirm} disabled={isFormValid()} />}
        </div>
        <div className="action-bar">
          <Button variant="secondary" label="Cancel" onClick={goBack} />
          <Button variant="primary" label="Save" onClick={onConfirm} disabled={isFormValid()} />
        </div>
      </div>
    </div>
  );
}

export default Form;
