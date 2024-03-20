import React from "react";
import Users from "./Users";
import "./AddEdituser.css";
import Button from "../../../Button/Button";
import { FilterIconSecond } from "../../../../icons";
import Breadcrumb from "../../../Breadcrumb/Breadcrumb";
const breadcrumbs = [
  {
    menu: "Add User",
    link: "/Assets",
  },
];
function AddEdituser() {
  return (
    <>
      <div>
        <div className="Addhead">
        <h1>Add/Edit User</h1>
        </div>
        <div className="Searchnew">
          <div className="Searchsection" style={{}}>
            {/* search box */}
            <input
              className="inputSearch"
              type="search"
              name=""
              id=""
              style={{
                padding: "1%",
                width: "90%",
                borderRadius: "5px",
                border: "1px solid #ABABAB",
                background: "linear-gradient(0deg, #FBFBFB, #FBFBFB), linear-gradient(0deg, #ABABAB, #ABABAB)",
              }}
              placeholder="Search here"
            />
            {/* filter */}
            <div style={{ width: "5%" }}>
              <button
                style={{
                  width: "85%",
                  height: "100%",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#DAF5FF",
                  border: "0px ",
                }}
              >
                <FilterIconSecond />
              </button>
            </div>
            <Button>Search</Button>
          </div>
        </div>
        <div>
          <Users />
        </div>
      </div>
    </>
  );
}

export default AddEdituser;
