import UserName from "../components/UserName/UserName";
import { InviteUserIcon } from "../icons";

const tenancyColumns = [
  { label: 'Company Name', value: 'name' }, 
  { label: 'Sub Domain', value: 'subdomain' },
  { label: 'Users', value: 'userCount' },
  { label: 'Start Date', value: 'startDate' },
  { label: 'End Date', value: 'endDate' }
]

const getTenancyViewableColumns = (viewableColumns) => {
  const columns = [
    { label: "Company Name", accessor: "name", sortable: true, filterable: true },
    { label: "Sub Domain", accessor: "subdomain", sortable: true, filterable: true },
    { label: "Users", accessor: "userCount", sortable: true },
    { label: "Start Date", accessor: "startDate", sortable: true },
    { label: "End Date", accessor: "endDate", sortable: true },
    
  ];
  return viewableColumns.length ? columns.filter(column => viewableColumns.includes(column.accessor)) : columns;
}

const userColumns = [ 
  { label: 'User Name', value: 'fullname' }, 
  { label: 'Dept Name', value: 'dept' },
  { label: 'Email', value: 'email' },
  { label: 'Reporting Manager', value: 'manager' },
  { label: 'Phone', value: 'phone' },
  { label: 'Date of Birth', value: 'dob' }, 
  { label: 'Date of Joining', value: 'doj' }, 
  { label: 'City', value: 'city' },
  { label: 'Country', value: 'country' }
]

const getUserViewableColumns = (viewableColumns) => {
  const columns = [
    { label: 'User Name', accessor: 'fullname', sortable: true, filterable: true, Cell: (props) => <UserName {...props?.data}/> }, 
    { label: 'Dept Name', accessor: 'dept', sortable: true, filterable: true },
    { label: 'Email', accessor: 'email', sortable: true, filterable: true },
    { label: 'Reporting Manager', accessor: 'manager', sortable: true, filterable: true },
    // { label: 'Phone', accessor: 'phone', sortable: true, filterable: true },
    // { label: 'Date of Birth', accessor: 'dob', sortable: true, filterable: true }, 
    // { label: 'Date of Joining', accessor: 'doj', sortable: true, filterable: true }, 
    // { label: 'City', accessor: 'city', sortable: true, filterable: true },
    // { label: 'Country', accessor: 'country', sortable: true, filterable: true }
  ];
  return viewableColumns.length ? columns.filter(column => viewableColumns.includes(column.accessor)) : columns;
}

const coursesColumns = [
  { label: "Course Name", value: "name" },
  { label: "Type", value: "type" },
  { label: "Author", value: "author" },
  { label: "Duration", value: "duration" },
  { label: "Enrolled Users", value: "enrolledUsers", },
  {
    label: "Assign/Edit User",
    value: "authorizedUsers",
    sortable: true,
  },
  {
    label: "Ratings",
    value: "ratings",
    sortable: true,
  },
]


const getCourseViewableColumns = (viewableColumns, setShowInvitationPanel) => {
  const columns = [
    { label: "Course Name", accessor: "name", sortable: true, filterable: true },
    { label: "Type", accessor: "type", sortable: true, filterable: true },
    { label: "Author", accessor: "author", sortable: true },
    { label: "Duration", accessor: "duration", sortable: true, filterable: true },
    { label: "Enrolled Users", accessor: "enrolledUsers", sortable: true,  Cell: (props) => props.data?.enrolledUsers ? props.data?.enrolledUsers: '0' },
    {
      label: "Assign/Edit User",
      accessor: "authorizedUsers",
      Cell: (props) => (<div className="invite-users">{
        !props.data.published ? (
          <div className="publish-now">Publish now</div>
        ) : (
          <div className="authorized-users">
            {props.data.authorizedUsers?.map((image) => (
              <img src={image} className="user-image" alt="" />
            ))}
            <InviteUserIcon onClick={() => setShowInvitationPanel(true)}/>
          </div>
        )
      }</div>)
    },
    {
      label: "Ratings",
      accessor: "ratings",
      Cell: (props) => (
        <div className="ratings">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.73347 1.21085L11.3365 5.68047L15.9001 5.89272C16.0904 5.90162 16.2779 5.97244 16.4203 6.08885L16.421 6.08792C16.8888 6.45998 16.9186 7.21112 16.4354 7.61358L12.8628 10.5889L14.0798 15.1903C14.3075 16.0516 13.3896 16.7439 12.6792 16.2536L8.86826 13.622L5.05728 16.2534C4.34674 16.7441 3.42902 16.051 3.65677 15.1901L4.8737 10.5887L1.30111 7.61358C0.633491 7.05763 0.983265 5.93239 1.83642 5.89272L6.39997 5.68047L8.00305 1.21085C8.30298 0.374054 9.43336 0.374054 9.73347 1.21085Z"
              fill="#5CB85C"
            />
          </svg>
          <span
            style={{ marginLeft: "0.5em" }}
          >{`${props.data.ratings || 5}(${props.data.totalRatings || 0})`}</span>
        </div>
      ),
      sortable: true,
    },
  ];
  return viewableColumns.length ? columns.filter(column => viewableColumns.includes(column.accessor)) : columns;
}

export {
  coursesColumns, getCourseViewableColumns, getTenancyViewableColumns, getUserViewableColumns, tenancyColumns, userColumns
};

