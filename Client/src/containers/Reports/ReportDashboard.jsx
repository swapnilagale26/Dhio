import { useCallback } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./reports.css";
import { useNavigate } from 'react-router-dom';

const Reports = () => {

  const navigate = useNavigate();

  const onAllUsersFrameClick = () => {
    navigate('/reports/activeUesr-report');
  };

  const onUsersFrameClick = () => {
    navigate('/reports/user-report');
  };
  const onCourseReportClick = () => {
    navigate('/reports/course-report');
    
  };
  const onLeaderBoardClick = () => {
    navigate('/reports/leardBoard-report');
  };

  

  const breadcrumbs = [
         {
          menu: "Reports",
           link: "/reports",
         },
      ];
      

  return (

    
      <div className="container">
      <h2>Reports</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="generate-button">
          <div>Generate Reports</div>
          <div className="users-frame">
            <div className="users1">Users</div>
            <div className="active-users-frame">
              <div className="all-users-frame" onClick={onAllUsersFrameClick}>
                <div   >Total users added</div>
              </div>
              <div className="all-users-frame" onClick={onAllUsersFrameClick}>
                <div>Total active users</div>
              </div>
              <div className="all-users-frame" onClick={onUsersFrameClick}>
                <div className="total-active-users2">
                  Total active users with their learning hours
                </div>
              </div>
            </div>
          </div>

          <div className="users-frame">
            <div className="users1">Courses</div>
            <div className="active-users-frame">
              <div className="all-users-frame" onClick={onCourseReportClick}>
                <div >New courses</div>
              </div>
              <div className="all-users-frame" onClick={onCourseReportClick}>
                <div>Active courses</div>
              </div>
              <div className="all-users-frame" onClick={onCourseReportClick}>
                <div className="total-active-users2">
                Published courses
                </div>
              </div>
            </div>
          </div>

          <div className="users-frame">
            <div className="users1">Others</div>
            <div className="active-users-frame">
              <div className="all-users-frame" onClick={onLeaderBoardClick}>
                <div >Leaderboard</div>
              </div>
             
              
            </div>
          </div>
        </div>
        
             </div>
    
  );
};

export default Reports;




