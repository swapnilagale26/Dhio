import Graph from "./Graph";
import "./SuperAdminDashboard.css";

// this import Chart  is important without that chart is not showing because ultimatally we useing chart.js to create graph

function SuperAdminDashboard() {
  return (
    <div
      style={{
        marginLeft: "2%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="SuperAdminfirstSection" style={{paddingRight:'2%'} }>
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontWeight: "700",
              fontSize: "24px",
              margin: "10px 0px 0px 0px",
            }}
          >
            Summary
          </div>{" "}
        </div>
        <Graph />
      </div>
      {/* <div   className="secondSection">
      <div style={{marginBottom:'24px',}}>
      <div  className="dashboardCalender" style={{marginleft:'20px'}}  >
        <Dashboardcalender />
        
      </div>
      <Communities></Communities>
      </div >
     
      
      </div> */}
      {/* <Communities></Communities> */}
    </div>
  );
}
export default SuperAdminDashboard;
