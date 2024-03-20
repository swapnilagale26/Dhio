import React from "react";
import "./Feedback.css"
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import SurveySearch from "./SurveySearch";

const breadcrumbs = [
  {
    menu: "Survey",
    link: "/",
  },
];
function Feedback(){
  return (
    <div>
      <div style={{ marginBottom: "24px",marginLeft:"1%" }}>
        <div className="Topbar">
          <h2>Survey</h2>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <div className="feedback" style={{ marginTop: "-8%" }}>
        <SurveySearch/>
        </div>
      </div>
    </div>
  )
}

export default Feedback
