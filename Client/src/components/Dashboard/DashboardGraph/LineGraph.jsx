  import { Line } from "react-chartjs-2";
  import './DashboardGraph.css'
function LineGraph({data}) {
  return (
    <div
    className="SecondCharts"
    style={{
      display: "flex",
      flexDirection: "column",
      boxShadow: "3px 3px 1px 0px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px 10px 10px 10px",
    }}
  >
    <div className="graphheadingFontSize">
      Learning Time
    </div>
    <div
      style={{
        flexGrow: "1",
        padding:'0px 10px 5px 0px'
      }}
    >
      <Line
        data={data.graphdata}
        options={data.options}
      />
    </div>
  </div>
  )
}
export default LineGraph