import { useEffect, useState } from "react";
import { Line, Bar, tooltips } from "react-chartjs-2";
import { Chart as Chart } from "chart.js/auto";
import DashboardCard from "../DashboardCard/DashboardCard";
import "./Graph.css.module";
import LineGraph from "../DashboardGraph/LineGraph";
import LineDetailGraph from "../DashboardGraph/LineDetailGraph";
import BarGraph from "../DashboardGraph/BarGraph";
import card1 from "../DashboardCard/DashboardCardImage/card1.png";
import card2 from "../DashboardCard/DashboardCardImage/card2.png";
import card3 from "../DashboardCard/DashboardCardImage/card3.png";
import card4 from "../DashboardCard/DashboardCardImage/card4.png";
import card6 from "../DashboardCard/DashboardCardImage/card6.png";
import card7 from "../DashboardCard/DashboardCardImage/card7.png";
import card5 from "../DashboardCard/DashboardCardImage/card5.png";
import card8 from "../DashboardCard/DashboardCardImage/card8.png";

// this import Chart  is important without that chart is not showing because ultimatally we useing chart.js to create graph

function DashboardGraph() {
  let [dashBoardData, setDashBoardData] = useState(null);
  const UserData = [
    {
      id: 0,
      year: 0,
      userGain: 0,
      userLost: 823,
    },
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  useEffect(() => {
    // api call and update store or state variable

    setDashBoardData({
      LineYear: {
        graphdata: {
          // data which we want to show on x-axis in graph
          labels: [0, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          // inofrmation showing on graph
          datasets: [
            {
              label: "Points Earned",
              data: [0, 20, 40, 10, 40, 30, 35, 20.5, 70, 40, 60, 70, 46], //data showing on y-axis
              borderColor: "#00BAFF",
              pointRadius: 2,
              // backgroundColor:"rgba(0,0,255,1.0)",  it use to set color of bar in chart we can use array to set multiple color of bar
              //in line chart it is use to fill color of Area under the line
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300); //(x,y,x1,y1) 1300 is in px
                gradient.addColorStop(0, "#FB9C2D"); // Start color
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // End color
                return gradient;
              },
              borderJoinStyle: "round",
              borderWidth: 3,
              tension: 0.5, // Adjust the tension to control the curve of the line 0 means straight line and 1 means curve so we
              //need to adjust
              fill: "origin",
            },
          ],
        },
        // it using to remove horizontal and vertical line
        options: {
          scales: {
            x: {
              grid: {
                display: false, // Disable x-axis grid lines
              },
            },
            y: {
              grid: {
                display: false, // Disable y-axis grid lines
              },
            },
          },
          plugins: {
            //  title:{
            //   display:true,
            //   text:"solve it"
            //  },  // it is a title which is showing in graph not the title of tooltip
            legend: {
              //position:"right" // it color box with labels in graphs
              // display:false it is use to hide legend
            },
            tooltip: {
              backgroundColor: "white", // background color of tooltip
              displayColors: false, //it use to hide color box  show in tooltip  and label is text show on right side of color box and title is showing on top
              bodyColor: "green", // color of text inside body
              borderColor: "black", // border color of tooltip
              borderWidth: "1", // border width
              // padding:'0',
              // enabled:false,
              position: "nearest",
              titleFont: {
                size: 13,
                weight: "normal",
              }, // title in tooltip is not part of body  here we can define fint family or weight also
              bodyFont: {
                size: 13,
              }, // label in tooltip is part of body
              titleColor: "#00BAFF", // title color
              yAlign: "bottom", // the arrow of tooltip
              callbacks: {
                title: function (context) {
                  // Return the title (if needed)
                  // console.log(context);
                  let point = context[0].formattedValue;

                  return `${point} Points Earned`;
                },
                label: function (context) {
                  return "23 Badges Earned";
                },
              },
            },
          },

          maintainAspectRatio: false, // Disables the default aspect ratio behavior
        },
      },

      Bar: {
        graphdata: {
          // data which we want to show on x-axis in graph
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          // inofrmation showing on graph
          datasets: [
            {
              label: "User Gained",
              data: [45, 20, 50, 30, 40, 55, 35, 20, 10, 30, 15, 20], //data showing on y-axis
              // backgroundColor:"rgba(0,0,255,1.0)",  it use to set color of bar in chart we can use array to set multiple color of bar
              //in line chart it is use to fill color of Area under the line
              //   backgroundColor: "#eba611",
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 500); //(x,y,x1,y1) 1300 is in px
                gradient.addColorStop(0, "#ACADF9"); // Start color
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // End color
                return gradient;
              },
              borderWidth: 20,
              borderSkipped: false,
              //borderRadius: 15,
              borderJoinStyle: "round",
              borderWidth: 0,
              tension: 0.5, // Adjust the tension to control the curve of the line 0 means straight line and 1 means curve so we
              //need to adjust
              fill: "origin", // it it use to fill area under the graph
              barThickness: 20, // The barThickness property sets the thickness of each bar in pixels.
              borderSkipped: [false, false, false, false], // To make all side rounded
              // minBarLength: 2, // Set a minimum length for bars  even if bar vlaue less than it still it aquired minimum length
              barPercentage: 0.6, // The barPercentage property determines the width of each bar relative to the available space in the bar category. It is specified as a decimal value between 0 and 1.
            },
          ],
        },
        // it using to remove horizontal and vertical line
        options: {
          scales: {
            x: {
              grid: {
                display: false, // Disable x-axis grid lines
              },
              stacked: false,
            },
            y: {
              grid: {
                display: false, // Disable y-axis grid lines
                beginAtZero: true,
              },
              stacked: false,
              // grace:1
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                filter: function (legendItem, chartData) {
                  // Filter out legend items with an empty label
                  return legendItem.text !== "";
                },
              },
            },
            tooltip: {
              backgroundColor: "white", // background color of tooltip
              displayColors: false, //it use to hide color box  show in tooltip  and label is text show on right side of color box and title is showing on top
              bodyColor: "green", // color of text inside body
              borderColor: "black", // border color of tooltip
              borderWidth: "1", // border width
              // padding:'0',
              titleFont: {
                size: 13,
                weight: "normal",
              }, // title in tooltip is not part of body  here we can define fint family or weight also
              bodyFont: {
                size: 13,
              }, // label in tooltip is part of body
              titleColor: "#00BAFF", // title color
              yAlign: "bottom", // the arrow of tooltip
              callbacks: {
                // title: function (context) {
                //   // Return the title (if needed)
                //    console.log(context[0]);
                //   let point = context?.[0]?.formattedValue;
                //   return context?.[0]?.datasetIndex==0?`${point} Points Earned`:null;
                // },
                // label: function (context) {
                //   return context.datasetIndex==0?"23 Badges Earned":null;
                // },
              },
              filter: function (tooltipItem) {
                // Return false to hide the tooltip for a specific dataset
                return tooltipItem.datasetIndex !== 1; // Change 1 to the dataset index you want to hide
              },
              //The filter function is primarily used to selectively show or hide tooltips for specific datasets, allowing for more fine-grained control over the tooltip display behavior. It does not have other use cases beyond this context.
            },
          },
          maintainAspectRatio: false,
        },
      },
    });
  }, []);
  return (
    dashBoardData && (
      <div>
        {/* Top card UI */}

        <div
          style={{
            fontWeight: "700",
            fontSize: "16px",
            margin: "0px 0px 1% 0px",
          }}
        >
          Growth
        </div>
        <div style={{ width: "100%", marginBottom: "3%" }}>
          <DashboardCard
            cardData={[
              {
                value: "586",
                title: "Assigned Courses",
                backgroundColor: "#73ACFF",
                backgroundImage: card1,
              },
              {
                value: "986",
                title: "Active Courses",
                backgroundColor: "#CBAFDA",
                backgroundImage: card4,
              },
              {
                value: "19 Hrs",
                title: "Learning Times",
                backgroundColor: "#B6B93F",
                backgroundImage: card2,
              },
              {
                value: "19 Hrs",
                title: "Learning Times",
                backgroundColor: "#B6B93F",
                backgroundImage: card3,
              },
            ]}
            // className which you want to apply on card
            classNames={{
              cardHeading: "cardHeadingFour",
              cardDiscription: "cardDiscriptionFour",
            }}
          />
        </div>
        <div
          style={{
            fontWeight: "700",
            fontSize: "16px",
            margin: "1% 0px 1% 0px",
          }}
        >
          Revenue
        </div>
        <div style={{ width: "100%", height: "138px" }}>
          <DashboardCard
            cardData={[
              {
                value: "9",
                title: "Companies",
                backgroundColor: "#73ACFF",
                backgroundImage: card5,
              },
              {
                value: "986",
                title: "Users",
                backgroundColor: "#CBAFDA",
                backgroundImage: card6,
              },
              {
                value: "100",
                title: "Courses",
                backgroundColor: "#B6B93F",
                backgroundImage: card7,
              },
              {
                value: "10",
                title: "Countries",
                backgroundColor: "#B6B93F",
                backgroundImage: card8,
              },
            ]}
            // className which you want to apply on card
            classNames={{
              cardHeading: "cardHeadingFour",
              cardDiscription: "cardDiscriptionFour",
            }}
          />
        </div>

        {/* Performance */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2%",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "1.5rem", fontWeight: "600" }}> Performance</div>
        </div>

        {/* second two chart  */}
        <div className="SecondCombinedChart">
          {/* line chart */}
          <div className="SecondCharts">
            <Line
              data={dashBoardData.LineYear.graphdata}
              options={dashBoardData.LineYear.options}
              style={{
                boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, 0.2)",
                border: "0px solid",
                borderRadius: "10px",
                padding: "0px 10px 5px 0px",
              }}
            />
          </div>

          {/* third Bar Chart */}
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
              <div> My Progress</div>
              {/* <div style={{marginRight:'5px'}}><SelectionBox/></div> */}
            </div>
            <div
              style={{
                flexGrow: "1",
                padding: "0px 10px 5px 0px",
              }}
            >
              <Bar data={dashBoardData.Bar.graphdata} options={dashBoardData.Bar.options} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default DashboardGraph;
