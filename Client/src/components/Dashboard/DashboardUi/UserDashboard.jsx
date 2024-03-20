import DashboardGraph from "../DashboardGraph/DashboardGraph";
import DashboardTop from "../DashboardTop/DashboardTop";
import Dashboardcalender from "../DashboardCalender/Dashboardcalender";
import "./UserDashboard.css";
import MyCommunities from "./Mycommunitites/Communities";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
// this import Chart  is important without that chart is not showing because ultimatally we useing chart.js to create graph

const breadcrumbs = [
  {
    menu: "Dashboard",
    link: "/home",
  },
];
function UserDashboard() {
  return (
    <div
      className="flexArrangement"
      style={{
        marginLeft: "2%",
        marginTop: "3%",
        display: "flex",

        // justifyContent: "space-between",
      }}
    >
      <div className="firstSection" style={{ paddingRight: "2%" }}>
        <div style={{ marginBottom: "24px" }}>
        <h1>DashBoard</h1>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <DashboardGraph />
      </div>
      <div>
        <div className="dashboardCalender">
          <Dashboardcalender />
        </div>
        <div>
          <MyCommunities />
        </div>
      </div>
    </div>
  );
}
export default UserDashboard;
