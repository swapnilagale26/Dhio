import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import {
  deleteTenancyCall,
  deselectTenancy,
  fetchTenancy,
  postTenancy,
  updateTenancy,
} from "../../redux/slices/tenancySlice";
import { validateEmail, validatePhone } from "../../utils/formValidators";
import "./tenancy.css";

const TenancyForm = () => {
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

  const onConfirm = () => {
    loadingRef.current = true;
    if (formData._id) {
      dispatch(updateTenancy({ ...formData, logo }));
    } else {
      dispatch(postTenancy({ ...formData, logo }));
    }
  };

  const onDelete = () => {
    dispatch(deleteTenancyCall(formData._id));
  };

  const goBack = () => {
    dispatch(deselectTenancy());
    return navigate("/tenancy");
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTenancy(params.id));
    }
  }, [params, dispatch]);

  useEffect(() => {
    if (selectedTenancy?._id) {
      setFormData(selectedTenancy);
      setLogo(selectedTenancy?.logo);
    }
  }, [selectedTenancy]);

  useEffect(() => {
    if (!isLoading && loadingRef.current) {
      showMessage(true);
      loadingRef.current = false;
      if (!isError) {
        setTimeout(() => goBack(), 1000);
      }
      setTimeout(() => showMessage(false), 3000);
    }
  }, [isLoading]);

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

  const isFormValid = () => {
    if (
      !formData?.name ||
      !formData?.subdomain ||
      !formData?.gstin ||
      !validateEmail(formData.email) ||
      !formData?.phone ||
      formData.phone.length < 10 ||
      !formData?.startDate ||
      !formData?.endDate ||
      !formData?.city ||
      !formData?.country ||
      !formData?.autoRenewal
    ) {
      return true;
    }
  };

  const handleClick = () => hiddenFileInput.current.click();
  const handleChange = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setLogo(reader.result);
    };
  };

  const breadcrumbs = [
    {
      menu: "Tenancy",
      link: "/tenancy",
    },
    {
      menu: params?.id ? "Edit Company Details" : "Add New Company",
      link: "/tenancy",
    },
  ];
  return (
    <div className="container">
      <h2>{params?.id ? "Update Tenancy" : "Add New Tenancy"}</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {message && <PopupMessage isError={isError} />}
      <div>
        <div className="file-uploader">
          <img src={logo ?? "/avatar.png"} width={120} height={120} alt="avatar" />
          <Button variant="secondary" onClick={handleClick}>
            Upload Logo
          </Button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }} // Make the file input element invisible
          />
        </div>
        <div className="form-fields-in-row">
          <div className="form-field">
            <label>Company Name</label>
            <input type="text" name="name" onChange={onChangeHandler} value={formData?.name} />
            <p className="error">{error && error[0]?.name}</p>
          </div>
          <div className="form-field">
            <label>Sub Domain</label>
            <input type="text" name="subdomain" onChange={onChangeHandler} value={formData?.subdomain} />
            <p className="error">{error && error[0]?.subdomain}</p>
          </div>
        </div>
        <div className="form-fields-in-row">
          <div className="form-field">
            <label>GSTIN</label>
            <input type="text" name="gstin" onChange={onChangeHandler} value={formData?.gstin} />
            <p className="error">{error && error[0]?.gstin}</p>
          </div>
          <div className="form-field">
            <label>Auto Renewal</label>
            <select name="autoRenewal" onChange={onChangeHandler} value={formData?.autoRenewal} defaultValue="true">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className="form-fields-in-row">
          <div className="form-field">
            <label>Email</label>
            <input type="email" name="email" onChange={onChangeHandler} value={formData?.email} />
            <p className="error">{error && error[0]?.email}</p>
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              onKeyDown={validatePhone}
              onChange={onChangeHandler}
              value={formData?.phone}
            />
            <p className="error">{error && error[0]?.phone}</p>
          </div>
        </div>
        <div className="form-fields-in-row">
          <div className="form-field">
            <label>Start Date</label>
            <input type="date" name="startDate" onChange={onChangeHandler} value={formData?.startDate} />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input type="date" name="endDate" onChange={onChangeHandler} value={formData?.endDate} />
          </div>
        </div>
        <div className="form-fields-in-row">
          <div className="form-field">
            <label>City</label>
            <input type="text" name="city" onChange={onChangeHandler} value={formData?.city} />
          </div>
          <div className="form-field">
            <label>Country</label>
            <input type="text" name="country" onChange={onChangeHandler} value={formData?.country} />
          </div>
        </div>
        <div className="form-actions">
          <div>{formData._id && <Button variant="ternary" label="Delete" onClick={onDelete} />}</div>
          <div className="action-bar">
            <Button variant="secondary" label="Cancel" onClick={goBack} />
            <Button
              variant="primary"
              label={formData._id ? "Save Changes" : "Add Company"}
              onClick={onConfirm}
              disabled={isFormValid()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenancyForm;
