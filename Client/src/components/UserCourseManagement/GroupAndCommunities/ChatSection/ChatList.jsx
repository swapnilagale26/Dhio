import group1 from "../GroupAndCommunitesImage/group1.png";
import group2 from "../GroupAndCommunitesImage/group2.png";
import group3 from "../GroupAndCommunitesImage/group3.png";
import group4 from "../GroupAndCommunitesImage/group4.png";
import { OptionIcon } from "../../../../icons";

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

function ChatList({ setChatData }) {
  return (
    <div
      className="Box-Shadow"
      style={{
        padding: "3%",
      }}
    >
      <div
        style={{
          marginBlock: "3%",
        }}
      >
        <div className="box-sizing flex width-per-100 justify-space-ard">
          <div
            className="flex flex-direction-Column flex-Combined"
            style={{
              marginLeft: "2%",
            }}
          >
            <div className="font-weight" style={{ fontSize: "1em" }}>
              {"My Chats"}
            </div>
          </div>

          <div
            style={{
              paddingTop: ".5%",
            }}
          >
            <OptionIcon />
          </div>
        </div>

        <div
          style={{
            width: "90%",
            padding: ".5% 0% 0% .5%",
          }}
        >
          <input
            type="search"
            name=""
            id=""
            style={{
              height: "3em",
              padding: " 3% 2%",
              borderRadius: "8px",
              border: "1px solid #ABABAB",
              background: "linear-gradient(0deg, #FBFBFB, #FBFBFB), linear-gradient(0deg, #ABABAB, #ABABAB)",
              marginTop: "2%",
            }}
            className="box-sizing width-per-100"
            placeholder="Search  here..."
          />{" "}
        </div>
      </div>

      {chatsData.map((ele) => {
        return (
          <div
            className="flex Box-Shadow"
            style={{
              width: "98%",
              padding: "2% 2% 2% 1%",
              marginTop: "2%",
              gap: "4%",
            }}
            onClick={() => {
              setChatData(ele);
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
                className="center-align width-per-100"
                style={{
                  height: "100%",
                }}
              >
                <img src={ele.banner} alt="" className="width-per-100" />
              </div>
            </div>

            <div
              className="flex flex-Combined justify-space-btw "
              style={{
                gap: "3%",
              }}
            >
              <div className="flex flex-direction-Column justify-space-ard">
                <div
                  className="font-weight"
                  style={{
                    fontSize: ".7em",
                    color: "#273143",
                    marginBottom: "2%",
                  }}
                >
                  {`Topic-${ele.userName}`}
                </div>

                <div
                  className="InterRegularFamily"
                  style={{
                    fontSize: ".6em",
                    fontWeight: "300",
                    color: "#273143",
                  }}
                >
                  {`${ele.message}`}
                </div>
              </div>

              <div
                className="flex flex-direction-Column white-space-nowrap"
                style={{
                  marginTop: "3%",
                }}
              >
                <div
                  className="InterRegularFamily"
                  style={{
                    fontSize: ".6em",
                    fontWeight: "300",
                    color: "#273143",
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
export default ChatList;
