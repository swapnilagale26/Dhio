import Calendar from "react-calendar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Admincard from "../Dashboard/AdminDashboard/AdminDashboardGraph";
import Tabs from "../Dashboard/AdminDashboard/Tabs";
import DashboardTop from "../Dashboard/DashboardTop/DashboardTop";
import Dashboardcalender from "../Dashboard/DashboardCalender/Dashboardcalender";
import Leaderboard from "../Dashboard/AdminDashboard/LeaderBoard/Leaderboard";
import "./Courselist.css";
import CourseBadges from "./CourseBadges";
import DashboardCard from "../Dashboard/DashboardCard/DashboardCard";
import card1 from "../../components/Dashboard/DashboardCard/DashboardCardImage/card1.png";
import card2 from "../../components/Dashboard/DashboardCard/DashboardCardImage/card2.png";
import Courses from "./Courses";
import Searchheading from "./Searchheading";
const breadcrumbs = [
  {
    menu: "Courses",
    link: "/course",
  },
];
function Courselist() {
  return (
    <>
      <div
        className="flexArrangement"
        style={{
          marginLeft: "2%",
          width: "100%",
          marginTop: "3%",
          display: "flex",
          // justifyContent: "space-between",
        }}
      >
        <div className="Admin-firstSection" style={{ marginTop: "-2%" }}>
          <div style={{ marginBottom: "24px" }}>
            <div className="Topbar">
              <h2>Courses</h2>
              <Breadcrumb breadcrumbs={breadcrumbs} />
            </div>
          </div>
          <div style={{ width: "97%" }}>
            <DashboardCard
              cardData={[
                {
                  value: "586",
                  title: "Assigned Courses",
                  backgroundColor: "#73ACFF",
                  margin: "5%",
                  backgroundImage: card1,
                },
                {
                  value: "986",
                  title: "Active Courses",
                  backgroundColor: "black",
                  margin: "5%",
                  backgroundImage: card2,
                },
              ]}
              // className which you want to apply on card
              classNames={{
                cardHeading: "cardHeading",
                cardDiscription: "cardDiscription",
              }}
            />
          </div>
          <div>
            <Searchheading />
          </div>
          {/* <Activities /> */}
          <Courses />
          {/* <Tabs/> */}
        </div>
        <div className="Admin-secondSection">
          <div style={{ marginBottom: "24px" }}>
            <div className="dashboardCalender" style={{ marginleft: "20px" }}>
              <Dashboardcalender />
            </div>
            <div style={{ width: "100%" }}>
              <CourseBadges />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Courselist;
