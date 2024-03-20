import Calendar from "react-calendar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Dashboardcalender from "../Dashboard/DashboardCalender/Dashboardcalender";
import Pastevents from "./Pastevents";
import EventCalendar from "./EventCalendar";

const breadcrumbs = [
  {
    menu: "Courses",
    link: "/course",
  },
];

function Eventmain() {
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
        <div className="Admin-firstSection" style={{marginTop:"-2%"}}>
          <div style={{ marginBottom: "24px" }}>
            <div className="Topbar">
              <h2>Courses</h2>
              <Breadcrumb breadcrumbs={breadcrumbs} />
            </div>
          </div>
          <EventCalendar />

          <div></div>
        </div>
        <div className="Admin-secondSection">
          <div style={{ marginBottom: "24px" }}>
            <div className="dashboardCalender" style={{ marginleft: "20px" }}>
              <Dashboardcalender />
            </div>
            <div style={{ width: "100%" }}>
              {/* <CourseBadges /> */}
              <Pastevents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Eventmain;
