import { Line } from "react-chartjs-2";
import './DashboardGraph.css'
function LineDetailGraph({data}) {
  return (
    <>
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      margin: "0px 5px 9px 10px",
    }}
  >
    <div className="graphheadingFontSize">My Leaderboard</div>
    <div
      style={{
        display: "none",
        //width: "300px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          alignItems: "center",
          width: "132px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "24px",
            backgroundColor: "#00BAFF",
            borderRadius: "4px",
          }}
        ></div>
        <div>Points Earned</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          alignItems: "center",
          width: "142px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "24px",
            backgroundColor: "#DEDEDE",
            borderRadius: "4px",
          }}
        ></div>
        <div>Badges Earned</div>
      </div>
    </div>
  </div>

  <Line
    data={data.graphdata}
    options={data.options}
    style={{
      boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, 0.2)",
      border: "0px solid",
      borderRadius: "10px",
      // paddingRight: "16px",
      // paddingLeft: "10px",
      // paddingTop: "5px",
      // paddingBottom: "5px",
    }}
  />
  </>

  )
}
export default LineDetailGraph