import group1 from "./GroupAndCommunitesImage/group1.png";
import group2 from "./GroupAndCommunitesImage/group2.png";
import group3 from "./GroupAndCommunitesImage/group3.png";
import group4 from "./GroupAndCommunitesImage/group4.png";

let chatsData = [
  {
    banner: group1,
    userName: "Mr. Woodrow Kris",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "2",
  },
  {
    banner: group2,
    userName: "Trantow, Klein",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "3",
  },
  {
    banner: group3,
    userName: "Hubert Kreiger",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "4",
  },
  {
    banner: group4,
    userName: "Raul Skiles",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "5",
  },
  {
    banner: group1,
    userName: "Mr. Woodrow Kris",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "6",
  },
  {
    banner: group2,
    userName: "Trantow, Klein",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "7",
  },
  {
    banner: group3,
    userName: "Hubert Kreiger",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "8",
  },
  {
    banner: group4,
    userName: "Raul Skiles",
    message: "Where are you?",
    lastUpdated: "12:56 PM",
    userId: "9",
  },
];

function GroupAndComminunitiesSecondSection() {
  return (
    <div
      className="Box-Shadow"
      style={{
        padding: "3%",
      }}
    >
      <div className="graphheadingFontSize" style={{ marginBottom: "5%" }}>
        Chats
      </div>
      {chatsData.map((ele) => {
        return (
          <div
            className="Box-Shadow"
            style={{
              width: "98%",
              display: "flex",
              padding: "2% 2% 2% 1%",
              marginTop: "2%",
              gap: "4%",

              // justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "2em",
                height: "2em",
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
                <img src={ele.banner} alt="" style={{ width: "100%" }} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flex: "1 1 0",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  // border: "1px solid red",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  // flex: "1 1 0",
                }}
              >
                <div
                  style={{
                    fontSize: ".7em",
                    fontWeight: "600",
                    color: "#273143",
                    marginBottom: "2%",
                  }}
                >
                  {`Topic-${ele.userName}`}
                </div>

                <div
                  style={{
                    fontSize: ".6em",
                    fontWeight: "300",
                    color: "#273143",
                    fontFamily: "InterRegular",
                  }}
                >
                  {`${ele.message}`}
                </div>
              </div>

              <div
                style={{
                  // border: "1px solid red",
                  display: "flex",
                  flexDirection: "column",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    fontSize: ".6em",
                    fontWeight: "300",
                    color: "#273143",
                    fontFamily: "InterRegular",
                  }}
                >
                  {`${ele.lastUpdated}`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default GroupAndComminunitiesSecondSection;
