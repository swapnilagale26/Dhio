import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./reports.css";
import Table from "../../components/Table/Table";
import Reports from "../../containers/Reports/Reports.csv";

const LeaderBoardReports = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer?.isLoading);

  const columns = [
//     {
// label:"",
// accessor:""

//     },
    {
      label: "User Name",
     
      accessor: "userName",
      Cell: ({ data }) => {
        return (
          <div
            style={{
              // width: "5%",
              // border: "1px solid red",
              paddingLeft:"20px" ,
            }}
          >{data.userName}
    
          </div>
        );
      }
      
      
    },
    
    { label: "Course Taken", accessor:"courseTaken" },
    { label: "Badges", accessor:"badges" },
    { label: "Learning Time", accessor:"learningTime" },
    { label: "Points Earned", accessor:"pointsEarned" },
  ];

  const leaderboardData = [
    {
      userName:"Doctor Strange",
      courseTaken:"3456",
      badges:"8769",
      learningTime:"7658",
      pointsEarned:"4897",
    },
    {
      userName:"Doctor Strange",
      courseTaken:"3456",
      badges:"8769",
      learningTime:"7658",
      pointsEarned:"4897",
    },
    {
      userName:"Doctor Strange",
      courseTaken:"3456",
      badges:"8769",
      learningTime:"7658",
      pointsEarned:"4897",
    },
    {
      userName:"Doctor Strange",
      courseTaken:"3456",
      badges:"8769",
      learningTime:"7658",
      pointsEarned:"4897",
    },

    
    
    
    
    
   
    
    
  ]


  const breadcrumbs = [
    {
      menu: "Reports",
      link: "/reports/leardBoard-report",
    },
  ];

  return (
    <div className="report-container">
      <h2>Reports</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="parent-box-a">
        <div>
          <div className="result-of-users">Result of “Others - Leaderboard”</div>
        </div>
        <div className="">
        <a href={Reports} class="download-report">Download Report</a>
        </div>
      </div>

      <div className="content-zone">
        {isLoading ? <p>Loading...</p> : <LeaderboardTable tableData={leaderboardData} columns={columns} />}
      </div>
    </div>
  );
};



function LeaderboardTable({ tableData, columns }) {
  return (
    <table cellSpacing={0} cellPadding={0} style={{ width: "100%" }}>
      <thead>
        <tr>
          {columns.map(({ label }, index) => (
            <th key={index} style={{ paddingLeft: "20px" }}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ width: "100%", padding: "1%" }}>
        {tableData.map((data, index) => {
          return (
            <tr key={index} className="">
              {columns.map(({ accessor, Cell }, aIndex) => {
                console.log(Cell);
                console.log(data[accessor]);
                const tData = data[accessor] ?? null;
                return <td key={aIndex}>{Cell ? <Cell data={data} /> : tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default LeaderBoardReports;
