import Dashboardcalender from "../DashboardCalender/Dashboardcalender";
import DashboardTop from "../DashboardTop/DashboardTop";
import Admincard from "./AdminDashboardGraph";
import "./AdminDashboard.css";
import Tabs from "./Tabs";
import Leaderboard from "./LeaderBoard/Leaderboard";

// import Communities from "../UserDashboard/Mycommunitites/Communities";
function AdminDashboard() {
  return (
    <>
      <div className="  InterRegularFamily flex CourseDetail flexArrangement">
        <div className="Admin-firstSection">
          <div style={{ marginBottom: "24px" }}>
            <DashboardTop />
          </div>
          <Admincard />
          <Tabs />
        </div>
        <div className="Admin-secondSection">
          <div style={{ marginBottom: "24px" }}>
            <div className="dashboardCalender" style={{ marginleft: "20px" }}>
              <Dashboardcalender />
            </div>
            <div style={{ width: "100%" }}>
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
