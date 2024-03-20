import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import DeleteWarning from "../../components/DeleteWarning/DeleteWarning";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import {
  DeleteIcon,
  EditIcon,
  SearchIcon,
  FilterIcon,
  InviteUserIcon,
} from "../../icons";
import {
  deleteCourses,
  deselectCourse,
  fetchCourses,
} from "../../redux/slices/courseSlice";
import { coursesColumns, getCourseViewableColumns } from "../../utils/columns";
import "./course-dashboard.css";
import ColumnsSelector from "../../components/ColumnSelector/ColumnsSelector";
import { fetchUsers } from "../../redux/slices/userSlice";
import InviteDialog from "../../components/InviteDialog/InviteDialog";

const CourseDashboard = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showInvitationPanel, setShowInvitationPanel] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(
    coursesColumns?.map((column) => column.value)
  );

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.courseReducer?.isLoading);
  const courses = useSelector((state) => state.courseReducer?.data);
  const users = useSelector((state) => state.userReducer.data);

  useEffect(() => {
    dispatch(deselectCourse());
    dispatch(fetchCourses());
  }, []);

  const onRowSelect = (selection) => {
    const rows = [...selectedRows];
    const matchedIndex = rows.findIndex((row) => row._id === selection._id);
    if (matchedIndex === -1) {
      rows.push(selection);
    } else {
      rows.splice(matchedIndex, 1);
    }
    setSelectedRows(rows);
  };

  const columns = [
    {
      label: (
        <div className="selector">
          <input
            type="checkbox"
            onChange={() =>
              selectedRows.length === courses?.length
                ? setSelectedRows([])
                : setSelectedRows(courses)
            }
            checked={selectedRows.length === courses?.length}
          />
        </div>
      ),
      accessor: "selector",
      Cell: (props) => {
        const value = selectedRows.some((row) => row._id === props.data._id);
        return (
          <div className="selector">
            <input
              type="checkbox"
              onChange={() => onRowSelect(props.data)}
              checked={value}
            />
          </div>
        );
      },
    },
    ...getCourseViewableColumns(visibleColumns, setShowInvitationPanel),
    // {
    //   label: "Assign/Edit User",
    //   accessor: "authorizedUsers",
    //   Cell: (props) => (<div className="invite-users">{
    //     !props.data.published && new Date(props.data.endDate) > new Date() ? (
    //       <div className="publish-now">Publish now</div>
    //     ) : new Date(props.data.endDate) > new Date() ? (
    //       <div className="authorized-users">
    //         {props.data.invited?.map((invitedId, index) => {
    //           const invitedUser = users?.find(user => user._id === invitedId) || {};
    //           console.log(invitedUser);
    //           return index < 4 && (
    //             <img src={invitedUser.avatar ?? '/avatar.png'} className='user-image' alt='user-avatar' width={30}/>
    //           )
    //           })}
    //         <InviteUserIcon onClick={() => setSurveyToInvite(props.data._id)}/>
    //       </div>
    //     ) : null
    //   }</div>)
    // },
    {
      label: "Actions",
      accessor: "actions",
      Cell: (props) => (
        <div className="table-actions">
          <Link to={`/course/edit/${props?.data?._id}`}>
            {" "}
            <EditIcon />
          </Link>
        </div>
      ),
    },
  ];
  const onSearchTextChange = (event) => setSearchText(event.target.value);

  const closeModal = () => {
    setShowDeleteModal(null);
    // showBulkEditModal(false);
  };
  const bulkDelete = () => setShowDeleteModal(true);
  const deleteConfirm = () => {
    const userIdsToDelete = selectedRows.map((user) => user._id);
    dispatch(deleteCourses(userIdsToDelete));
    setTimeout(() => {
      dispatch(fetchCourses());
      closeModal();
      setSelectedRows([]);
    }, 1000);
  };
  const BulkActions = () => (
    <div className="filter-section">
      <DeleteIcon onClick={bulkDelete} />
      {/* <Button variant='primary' onClick={() => showBulkEditModal(true)} >
        <div className='auto-renewal'><AddUserIcon /><p>Change Reporting Manager</p></div>
      </Button> */}
    </div>
  );

  const breadcrumbs = [
    {
      menu: "Course Management",
      link: "/course",
    },
  ];

  return (
    <div className="container">
      <h2>Course Management</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {showDeleteModal && selectedRows.length > 0 && (
        <Modal displayModal title={"Are you sure?"} closeModal={closeModal}>
          <DeleteWarning
            closeModal={closeModal}
            onConfirm={deleteConfirm}
            name={selectedRows.map((course) => course.name).join(", ")}
          />
        </Modal>
      )}
      {/* {showInvitationPanel && (
         <Modal displayModal title={"Are you sure?"} closeModal={() => setShowInvitationPanel(false)}>
          Invitation Panel
        </Modal>
      )} */}
      {showInvitationPanel && (
        <Modal
          displayModal
          title={"Assign Users"}
          closeModal={() => setShowInvitationPanel(false)}
        >
          <InviteDialog
            closeModal={() => setShowInvitationPanel(false)}
            onConfirm={(selectedUserIds) => console.log(selectedUserIds)}
            // surveyId={surveyToInvite}
          />
        </Modal>
      )}
      <div className="summary">
        <div className="total-course-summary">
          <h3>{courses?.length}</h3>
          <p>Total Courses</p>
        </div>
        <div className="active-course-summary">
          <h3>{courses?.filter((course) => course?.published).length}</h3>
          <p>Active Courses</p>
        </div>
        <div className="launched-course-summary">
          <h3>{courses?.filter((course) => course?.published).length}</h3>
          <p>Launched Courses</p>
        </div>
        <div className="due-course-summary">
          <h3>{courses?.filter((course) => !course?.published).length}</h3>
          <p>Due Courses</p>
        </div>
      </div>
      <div className="table-header-section">
        <div className="header-title">
          <h3>Course List</h3>
        </div>
        {selectedRows.length > 1 ? (
          <BulkActions />
        ) : (
          <div className="filter-section">
            <div className="search-bar">
              <input
                className="search-field"
                type="text"
                placeholder="Search here..."
                onChange={onSearchTextChange}
              />
              <SearchIcon className="search-icon" />
            </div>
            <div className="filters">
              <FilterIcon
                width={48}
                height={48}
                onClick={() => setOpenFilter(true)}
              />
              {openFilter && (
                <ColumnsSelector
                  columns={coursesColumns}
                  onClose={() => setOpenFilter(false)}
                  setViewableColumns={(columns) => setVisibleColumns(columns)}
                  visibleColumns={visibleColumns}
                />
              )}
            </div>
            <Link to={`/course/add`}>
              <Button variant="primary" label="+ Add New" />
            </Link>
          </div>
        )}
      </div>
      <div className="content-zone">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={courses}
            columns={columns}
            searchText={searchText}
            filters={filters}
            onFiltersApply={setFilters}
            onSearch={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;
