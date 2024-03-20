import { OptionIcon, SearchIcon, SendIcon, SmileIcon, BackIcon } from "../../../../icons";
import chatbackground from "./chatbackground.png";
import "./ChatSection.css";

function ChatSection({ data, setChatData }) {
  return (
    <div>
      <div
        className="flex box-sizing width-per-100"
        style={{
          borderBlock: " .5em solid #FBFBFB",
          borderInline: ".3em solid #FBFBFB",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <div
          className="min-Width"
          style={{
            width: "5%",
            padding: ".5% 0% 0% .5%",
          }}
        >
          <div className="width-per-100 height-per-100 ">
            <img src={data.banner} alt="" className="width-per-100" />
          </div>
        </div>

        {/* flex combined 1 1 0 */}
        <div
          className="flex flex-direction-Column justify-space-ard flex-Combined"
          style={{
            marginLeft: "2%",
          }}
        >
          <div className="font-w-600 " style={{ fontSize: ".8em" }}>
            {data.userName}
          </div>
          <div className="width-per-100" style={{ fontSize: ".6em" }}>
            last updated on {data.lastUpdated}
          </div>
        </div>

        <div
          className="flex justify-content-center align-item-center"
          style={{
            padding: "1%",
            gap: "25%",
            backgroundColor: "#FBFBFB",
          }}
        >
          <div>
            <SearchIcon width={24} height={24} />
          </div>
          <div>
            <OptionIcon />
          </div>
        </div>
      </div>

      <div className="center-align flex-direction-column width-per-100">{<ChatView setChatData={setChatData} />}</div>
    </div>
  );
}

function ChatView({ setChatData }) {
  return (
    <div
      className=" width-per-100 relative"
      style={{
        backgroundImage: `url(${chatbackground})`,
        height: "500px",
        borderRadius: "0 0 8px 8px",
      }}
    >
      <div></div>
      <div className="fixed" style={{ right: "10%" }}>
        <BackIcon
          onClick={() => {
            setChatData({});
          }}
        />
      </div>
      <div
        className=" center-align justify-space-btw absolute box-sizing "
        style={{
          width: "94%",
          bottom: "2%",
          backgroundColor: "#FFFFFF",
          marginInline: "3%",
          padding: "1% 2%",
          borderRadius: "15px",
          gap: "4%",
        }}
      >
        <SmileIcon width={"1.25em"} height={"1.25em"} />
        <input type="text" name="" id="" placeholder="Message" className="flex-Combined message-input" />

        <SendIcon width={"1.25em"} height={"1.25em"} />
      </div>
    </div>
  );
}

export default ChatSection;
