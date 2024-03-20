import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./reports.css";
import Table from "../../components/Table/Table";
import CreatableSelect from "react-select/creatable";
import Button from "../../components/Button/Button";
import UserName from "../../components/UserName/UserName";
import { FilterIcon } from "../../icons";
import ColumnsSelector from "../../components/ColumnSelector/ColumnsSelector";
import Reports from "../../containers/Reports/Reports.csv";
import { userColumns } from "../../utils/columns";

const columns = [
  {
    label: "User Name",
    accessor: "fullname",
    
    Cell: ({ props,data }) => {
      return (
        <div
          style={{
            // width: "5%",
            // border: "1px solid red",
            paddingLeft: "1%",
          }}
        >
          <div className='username'>
      <img src={props?.avatar ?? '/avatar.png'} width={20} height={20} alt='avatar'/>
      {data?.fullname}
    </div>
        </div>
      );
    }
  },
  
  { label: "Dept Name", accessor: "dept" },
  { label: "Email", accessor: "email" },
  { label: "Reporting Manager", accessor: "manager" },
];

const ActiveUserReports = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer?.isLoading);
  const users = useSelector((state) => state.userReducer?.data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.value));

  console.log("users", users);

  const handleReset = () => {
    setSelectedOption(null); // Reset the dropdown value
    setStartDate(""); // Reset the date input value
  };

  const breadcrumbs = [
    {
      menu: "Reports",
      link: "/reports"
    },
    {
      menu: "User Reports",
      link: "/reports"
    },
  ];
  const options = [
    { value: 'Developer', label: 'Developer' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'QA', label: 'QA' },
    { value: 'Director', label: 'Director' },
    { value: 'Tester', label: 'Tester' },
    
  ];

  const userData =  [
    {
        fullname: "Tony1 Stark",
        dept: "Tester",
        email: "user1@ventura.com",
        learningHour:"60min",
        manager: "QA"
    },
    {
        fullname: "Bruce Wayne",
        dept: "Developer",
        email: "user2@ventura.com",
        learningHour:"30min",
        manager: "Tech Lead"
    },
    {
        fullname: "Peter Parker",
        dept: "Designer",
        email: "user3@ventura.com",
        learningHour:"2hrs",
        manager: "Creative Lead"
    },
    {
        fullname: "Natasha Romanoff",
        dept: "HR",
        email: "user4@ventura.com",
        learningHour:"60min",
        manager: "HR Manager"
    },
    {
        fullname: "Steve Rogers",
        dept: "Marketing",
        email: "user5@ventura.com",
        learningHour:"30min",
        manager: "Marketing Head"
    },
    {
        fullname: "Diana Prince",
        dept: "Sales",
        email: "user6@ventura.com",
        learningHour:"3hrs",
        manager: "Sales Manager"
    },
    {
        fullname: "Arthur Curry",
        dept: "Customer Support",
        email: "user7@ventura.com",
        learningHour:"60min",
        manager: "Support Manager"
    }
]


  

  return (
    <div className="report-container">
      <h2>Reports</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="parent-box-a">
        <div>
          <div className="result-of-users">Result of “Users - Total Users”</div>
        </div>
        <div className="">
        <a href={Reports} class="download-report">Download Report</a>
        </div>
      </div>
      <div className="select-section">
        <div className="form-field">
          <label>Department *</label>
          <CreatableSelect
             options={options}
            placeholder="Select from Dropdown"
            value={selectedOption}
          onChange={(newValue) => setSelectedOption(newValue)}
            // name='skills'
            // // value={formData.skills}
            // onChange={}
          />
        </div>
        <div className="form-field ">
          <label>Start Date*</label>
          <input type="date" name="startDate"   value={startDate}
          onChange={(e) => setStartDate(e.target.value)}/>
        </div>
        <div>
          <Button  className="primary-button"  label="Reset" onClick={handleReset} />
        </div>
        <div className="filters">
          <FilterIcon width={48} height={48} onClick={() => setOpenFilter(true)} />
          {openFilter && (
                <ColumnsSelector
                  columns={columns}
                  onClose={() => setOpenFilter(false)}
                  setViewableColumns={(columns) => setVisibleColumns(columns)}
                  visibleColumns={visibleColumns}
                />
              )}
        </div>
      </div>

      <div className="content-zone">{isLoading ? <p>Loading...</p> : <UserTable tableData={userData} columns={columns} />}</div>
    </div>
  );
};

function UserTable({ tableData, columns }) {
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


export default ActiveUserReports;
