import { useState } from "react";
import ChatList from "./ChatList";
import ChatSection from "./ChatSection";
import "./Chat.css";
import Breadcrumb from "../../../Breadcrumb/Breadcrumb";

function Chat() {
  const [chatData, setChatData] = useState({});
  return (
    <div className=" InterRegularFamily Chat">
      <div className="page-header InterBoldFamily">{"Groups & Communities"}</div>
      <Breadcrumb
        breadcrumbs={[
          {
            menu: "Groups & Communities",
            link: `/group`,
          },
          {
            menu: "Chats",
            link: `/Groups&Communities/Chats`,
          },
        ]}
      />
      <div style={{ marginTop: "1.5%" }}>
        <div className="CourseDetailTop">
          <div className={chatData.banner ? "hideChat CourseSecondSection" : " CourseSecondSection"}>
            <ChatList setChatData={setChatData} />
          </div>
          <div className={chatData.banner ? " CourseFirstSection" : " hideChat CourseFirstSection"}>
            <ChatSection data={chatData} setChatData={setChatData} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
