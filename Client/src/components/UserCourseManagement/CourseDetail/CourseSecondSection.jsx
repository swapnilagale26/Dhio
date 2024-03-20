import PieChart from "../../Dashboard/PieChart/pieChart";
import { FileIcon } from "../../../icons/index";
function CourseSecondSection() {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginBottom: "10%",
        }}
      >
        <PieChart />
      </div>
      <Notes />
    </div>
  );
}

let NotesData = [
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    backgroundColor: "#A6E7FF",
  },
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    backgroundColor: "#FFE3C2",
  },
];

function Notes() {
  return (
    <div
      className="Box-Shadow"
      style={{
        padding: "3%",
      }}
    >
      <div className="graphheadingFontSize" style={{ marginBottom: "5%" }}>
        Notes
      </div>
      {NotesData.map((ele) => {
        return (
          <div
            className="Box-Shadow"
            style={{
              width: "98%",
              display: "flex",
              padding: "2% 2% 2% 1%",
              marginTop: "2%",
              gap: "4%",
            }}
          >
            <div
              style={{
                width: "2em",
                height: "2em",
                backgroundColor: ele.backgroundColor,
                padding: ".8% .7% .8% .7%",
                borderRadius: "8px",
              }}
            >
              <div
                className="centerAlign"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <FileIcon width=".9em" height=".9em" />
              </div>
            </div>

            <div
              style={{
                // border: "1px solid red",
                display: "flex",
                width: "80%",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  fontSize: ".8em",
                  fontWeight: "600",
                  color: "#273143",
                  marginBottom: "2%",
                }}
              >
                {`Topic-${ele.Topic}`}
              </div>

              <div
                style={{
                  fontSize: ".6em",
                  fontWeight: "300",
                  color: "#273143",
                  fontFamily: "InterRegular",
                }}
              >
                {`${ele.discription}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CourseSecondSection;
export { Notes };
