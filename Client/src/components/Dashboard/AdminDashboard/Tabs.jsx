import Button from "../../Button/Button";
import Button1 from "./Button";
import icons2 from "./Adminicons/Ficon.png";
import { useState } from "react";
import { FilterIconUse, UserTabIcon } from "../../../icons";
import Header, { DemmyHeader } from "../../../containers/Asset/SuperAdmin/Header";
import Searchbox from "../../SearchBox/Searchbox";
import { Link } from "react-router-dom";
import SelectBox from "../../SearchBox/SelectBox";
function Tabs() {
  let [tab, showTab] = useState("RecentActivity");
  return (
    <div className="tabfont" style={{ width: "97%", display: "flex", flexDirection: "column" }}>
      <div className="width-per-100">
        <Header
          header={<Headers showTab={showTab} tab={tab} />}
          Component={[
            <DemmyHeader width="0%" />,
            <Searchbox />,
            <div style={{ width: "2.5em", height: "100%" }}>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#DAF5FF",
                  border: "0px ",
                }}
              >
                <FilterIconUse />
              </button>
            </div>,
            <Link to={`/user/AssetForm`}>
              <Button variant="hex" label="+ Add New " />,
            </Link>,
          ]}
        />
      </div>
      {tab == "RecentActivity" ? (
        <RecentActivityRow recentActivityData={recentActivityData} />
      ) : (
        <RequestRow requestData={requestData} />
      )}
    </div>
  );
}
export default Tabs;

function Headers({ showTab, tab }) {
  return (
    <div
      className="HeaderSection1"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <button
        onClick={() => {
          showTab("RecentActivity");
        }}
        className={tab == "RecentActivity" ? "tabHeader headerbutton borerBottom" : "tabHeader headerbutton"}
        style={{
          backgroundColor: "#FFFFFF",
          color: tab == "RecentActivity" ? "#00BAFF" : "#273143",
        }}
      >
        {"Recent Actitivities"}
      </button>

      <button
        onClick={() => {
          showTab("Requests");
        }}
        className={tab == "Requests" ? "tabHeader headerbutton borerBottom" : "tabHeader headerbutton"}
        style={{
          backgroundColor: "#FFFFFF",
          color: tab == "Requests" ? "#00BAFF" : "#273143",
        }}
      >
        {"Requests"}
      </button>
    </div>
  );
}

let requestData = [
  {
    requestName: "Sagar patil",
    image: icons2,
    discription: "Lorem ipsum dolor sit amet consectetur. In posuere nascetur tempor egestas pellentesque.",
    timing: "3 day ago",
  },
  {
    requestName: "rohit pawar",
    image: icons2,
    discription: "Lorem ipsum dolor sit amet consectetur. In posuere nascetur tempor egestas pellentesque.",
    timing: "1 week ago",
  },
];

let recentActivityData = [
  {
    requestName: "Sagar patil",
    image: icons2,
    discription: "Lorem ipsum dolor sit amet consectetur. In posuere nascetur tempor egestas pellentesque.",
    timing: "Added 5 min ago",
  },
  {
    requestName: "Machine Learning",
    image: icons2,
    discription: "Added 30 min ago",
    timing: "Added 30 min ago",
    type: "course",
  },
  {
    requestName: "Feedback Form",
    image: icons2,
    discription: "Lorem ipsum dolor sit amet consectetur. In posuere nascetur tempor egestas pellentesque.",
    timing: "Added 90 min ago",
    type: "Feedback",
  },
];

function RequestRow({ requestData }) {
  return (
    <div>
      {requestData.map((data) => {
        return (
          <div
            className="flex width-per-100 box-sizing Box-Shadow justify-space-btw"
            style={{
              padding: "1%",
              marginTop: "1%",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "2.4em",
                padding: "0% .5% 0% .5%",
                marginRight: "1%",
              }}
            >
              <div
                className="width-per-100 height-per-100"
                style={{
                  backgroundImage: `url(${data.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="flex flex-direction-Column ustify-space-ard  ">
              <div style={{ fontSize: ".8em", fontWeight: "500", marginBottom: "2%" }}>Request name</div>
              <div className="flex align-item-center">
                <div
                  className="centerAlign"
                  style={{
                    width: "1em",
                    height: "1em",
                    backgroundColor: "#DAF5FF",
                    padding: ".5% .6% .5% .6%",
                    borderRadius: "6px",
                  }}
                >
                  <UserTabIcon width=".7em" height=".7em" />
                </div>
                <div style={{ marginLeft: "5px", fontSize: ".6em" }}>{data.requestName}</div>
              </div>
            </div>
            <div
              className="center-align discription"
              style={{
                flex: "2 2 0",
              }}
            >
              <div className="box-sizing" style={{ paddingInline: "4%", width: "100%", fontSize: ".7em" }}>
                {data.discription}
              </div>
            </div>
            <div
              className="center-align"
              style={{
                paddingInline: "1%",
              }}
            >
              <div style={{ width: "100%", fontSize: ".7em", textAlign: "center", color: "#ABABAB" }}>
                {data.timing}
              </div>
            </div>
            <div className="flex justify-space-btw align-item-center " style={{ gap: "2%" }}>
              <Button1
                discription="Reject"
                className={"tabHeaderSecButton"}
                styling={{ backgroundColor: " #D05858", color: "#FFFFFF" }}
              />
              <Button1
                discription="Accept"
                className={"tabHeaderSecButton"}
                styling={{ backgroundColor: " #00BAFF", color: "#FFFFFF", marginLeft: "2px" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RecentActivityRow({ recentActivityData }) {
  return (
    <div>
      {recentActivityData.map((data) => {
        return (
          <div
            className="flex width-per-100 box-sizing Box-Shadow "
            style={{
              padding: "1%",
              marginTop: "1%",
              borderRadius: "8px",
              minHeight: "3em",
            }}
          >
            <div
              style={{
                width: "2.5em",
                padding: "0% .5% 0% .5%",
                marginRight: "1%",
              }}
            >
              <div
                className="width-per-100 height-per-100 "
                style={{
                  backgroundImage: `url(${data.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
            <div className="flex flex-Combined flex-direction-Column justify-space-ard">
              <div style={{ fontSize: ".8em", fontWeight: "500" }}>{data.requestName}</div>
              <div className="flex align-item-center">
                <div style={{ fontSize: ".6em" }}>{data.timing}</div>
              </div>
            </div>
            <div
              className="center-align discription"
              style={{
                flex: "2 2 0",
                paddingInline: "4%",
              }}
            >
              <div style={{ width: "100%", fontSize: ".7em" }}>{data.discription}</div>
            </div>

            <div className="flex flex-combined justify-flex-end align-item-center">
              <Button1
                discription={
                  data.type == "course" ? "Publish Now" : data.type == "Feedback" ? "Take a Tour" : "Publish Now"
                }
                className={"tabHeaderSecButton"}
                styling={{ backgroundColor: " #F9A400", color: "#FFFFFF", border: "none" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
