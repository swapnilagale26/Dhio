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


const columns = [
  { label: "Course Name", accessor: "name" ,  Cell: ({ data }) => {
    return (
      <div
        style={{
          // width: "5%",
          // border: "1px solid red",
          paddingLeft:"20px" ,
        }}
      >{data.name}

      </div>
    );
  }},
  { label: "Type", accessor: "type" },
  { label: "Author", accessor: "author" },
  { label: "Duration", accessor: "duration" },
  { label: "Enrolled Users", accessor: "enrolledUsers",
  Cell: (props) => (props.data?.enrolledUsers ? props.data?.enrolledUsers : "0"), },
 
  {
    label: "Ratings",
    accessor: "ratings",
    Cell: (props) => (
      <div className="ratings">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.73347 1.21085L11.3365 5.68047L15.9001 5.89272C16.0904 5.90162 16.2779 5.97244 16.4203 6.08885L16.421 6.08792C16.8888 6.45998 16.9186 7.21112 16.4354 7.61358L12.8628 10.5889L14.0798 15.1903C14.3075 16.0516 13.3896 16.7439 12.6792 16.2536L8.86826 13.622L5.05728 16.2534C4.34674 16.7441 3.42902 16.051 3.65677 15.1901L4.8737 10.5887L1.30111 7.61358C0.633491 7.05763 0.983265 5.93239 1.83642 5.89272L6.39997 5.68047L8.00305 1.21085C8.30298 0.374054 9.43336 0.374054 9.73347 1.21085Z"
            fill="#5CB85C"
          />
        </svg>
        <span style={{ marginLeft: "0.5em" }}>{`${props.data.ratings || 5}(${props.data.totalRatings || 0})`}</span>
      </div>
    ),
    
  },
];

const CourseReports = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer?.isLoading);
 
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.value));

  const courses = useSelector((state) => state.courseReducer?.data);
  console.log("course",courses);

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
      menu: " Course Reports",
      link: "/reports"
    },
    
  ];
  const options = [
    { value: 'Blended', label: 'Blended' },
    { value: 'Geological', label: 'Geological' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Management', label: 'Management' },
    
    
  ];

  const jsonData = [
    {
      name: "HTML",
      type: "Geological",
      author: "UI Dev",
      duration: "120sadf",
      ratings: "5"
    },
    {
      name: "CSS",
      type: "Programming",
      author: "Frontend Engineer",
      duration: "90 minutes",
      ratings: "4"
    },
    {
      name: "JavaScript",
      type: "Programming",
      author: "Full Stack Developer",
      duration: "2 hours",
      ratings: "4.5"
    },
    {
      name: "Python",
      type: "Programming",
      author: "Data Scientist",
      duration: "3 hours",
      ratings: "4.7"
    },
    {
      name: "React",
      type: "Programming",
      author: "UI Developer",
      duration: "1.5 hours",
      ratings: "4.8"
    }
  ];

  

  return (
    <div className="report-container">
      <h2>Reports</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="parent-box-a">
        <div>
          <div className="result-of-users">Result of “Courses - Published Courses”</div>
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

      <div className="content-zone">{isLoading ? <p>Loading...</p> : <Table data={jsonData} columns={columns} />}</div>
    </div>
  );
};

export default CourseReports;
