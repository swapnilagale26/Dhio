import { Doughnut } from "react-chartjs-2";
export default function PieChart() {
  let DonutData = {
    data: {
      // data which we want to show on x-axis in graph
      labels: ["In Progress", "Completed", "Assessment Score"],
      // inofrmation showing on graph
      datasets: [
        {
          //   label: "Points Earned",
          data: [20, 40, 10, 30], //data showing on y-axis
          borderColor: "#00BAFF",
          pointRadius: 2,
          // backgroundColor:"rgba(0,0,255,1.0)",  it use to set color of bar in chart we can use array to set multiple color of bar
          //in line chart it is use to fill color of Area under the line
          backgroundColor: ["#F9A400", "#636666", "#FB929C", "#FFFFFF"],
          borderJoinStyle: "round",
          borderWidth: 1,
          offset: 1,
          tension: 0.5, // Adjust the tension to control the curve of the line 0 means straight line and 1 means curve so we
          //need to adjust
          //fill: "origin",
        },
      ],
    },
    // it using to remove horizontal and vertical line
    options: {
      //   scales: {
      //     x: {
      //       grid: {
      //         display: false, // Disable x-axis grid lines
      //       },
      //     },
      //     y: {
      //       grid: {
      //         display: false, // Disable y-axis grid lines
      //       },
      //     },
      //   },
      plugins: {
        //  title:{
        //   display:true,
        //   text:"solve it"
        //  },  // it is a title which is showing in graph not the title of tooltip
        legend: {
          position: "bottom", // it color box with labels in graphs

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
          //   custom: externalTooltipHandler,
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
              //console.log(context[0]);
              let point = context[0].formattedValue;

              return `${point}%  ${context[0].label} `;
            },
            //it is text which show below the the title
            label: function (context) {
              return null;
            },
          },
        },
      },

      maintainAspectRatio: false, // Disables the default aspect ratio behavior
    },
  };
  return (
    <div
      style={{
        boxShadow: "0px 0px 6px 0px #00000014",
        marginTop: "10%",
        padding: "3%",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>Course Progress</div>
      <div style={{ fontSize: "16px", fontWeight: "400" }}>You can check overall progress here.</div>
      <div style={{ width: "287px", height: "287px", marginTop: "10px" }}>
        <Doughnut data={DonutData.data} options={DonutData.options} />
      </div>
    </div>
  );
}
