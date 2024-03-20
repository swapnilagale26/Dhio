import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NotificationIcon, SettingsIcon,DrodownIcon } from "../../icons";
import { fetchSurveyReports } from "../../redux/slices/surveyReportsSlice";
import { fetchSurveys } from "../../redux/slices/surveySlice";
import { fetchProfile, initStateUser } from "../../redux/slices/userSlice";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const loadingRef = useRef(false);
  const [notifications, setNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const isUserLoading = useSelector((state) => state.userReducer.isLoading);
  const isLoading = useSelector((state) => state.surveyReducer.isLoading);
  const surveys = useSelector((state) => [...state.surveyReducer.tnaData, ...state.surveyReducer.feedbackData]);
  const isReportLoading = useSelector((state) => state.surveyReportsReducer.isLoading);
  const surveyReports = useSelector((state) => state.surveyReportsReducer.reports);
  

  const showNotifications = (event) => {
    event.stopPropagation();
    setNotifications(true);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    document.addEventListener("click", () => setNotifications(false));
    if (!isUserLoading && !currentUser) {
      dispatch(fetchProfile(localStorage.getItem("token")));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && currentUser) {
      dispatch(fetchSurveys());
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isReportLoading && !loadingRef.current && surveys.length) {
      loadingRef.current = true;
      dispatch(fetchSurveyReports(surveys.map((survey) => survey._id)));
    }
  }, [isReportLoading, surveys]);

  function logOutFn() {
    localStorage.removeItem("token");
    dispatch(initStateUser());
    navigate("/login");
  }

  const pendingSurvey = surveyReports.length === 0 ? surveys : surveys;
  return (
    <header>
      <div className="header">
        <img src="/leamo.png" alt="leamo" />
        <div className="settings-panel">
          {/* <div className="notifications" onClick={showNotifications} data-text={pendingSurvey.length}>
            <NotificationIcon />
          </div> */}
          {/* <div onClick={logOutFn}>
            <SettingsIcon />
          </div> */}
          <div className="view-profile">
          <div className="notifications" onClick={showNotifications} data-text={pendingSurvey.length}>
            <NotificationIcon />
          </div>
        <div className="profile-info">
          <div className="profile-name">{currentUser?.fullname}</div>
          <img className="frame-icon2" alt="" src={currentUser?.avatar} />
          <div className="dropdown-icon">
          <DrodownIcon onClick={handleDropdownClick} />
          {showDropdown && (
          <button className="logout-button" onClick={logOutFn}>
            Logout
          </button>
        )}
         </div>
        </div>
       
      </div>
      {/* <img className="header-item" alt="" src="/vector-4.svg" /> */}
        </div>
      </div>
      {pendingSurvey.length > 0 && notifications && (
        <div className="notification-section">
          <div className="notification-panel">
            Pending Surveys
            {pendingSurvey.map((survey) => (
              <div className="survey-details" key={survey._id}>
                <Link to={`/survey/submit/${survey._id}`}>
                  <p>
                    {survey.title} <span className="complete-by"> (End Date: {survey.endDate})</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
