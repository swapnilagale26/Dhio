import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import { EditIcon, InviteUserIcon, SearchIcon, FilterIcon } from "../../icons";
import ColumnsSelector from "../../components/ColumnSelector/ColumnsSelector";
import { useDispatch, useSelector } from "react-redux";
import InviteDialog from "../../components/InviteDialog/InviteDialog";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import { fetchSurveys } from "../../redux/slices/surveySlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import "./survey-dashboard.css";



const SurveyDashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("TNA");
  const [selectedRows, setSelectedRows] = useState([]);
  const [surveyToInvite, setSurveyToInvite] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  // const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.value));

  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.data);
  const tnaData = useSelector((state) => state.surveyReducer.tnaData);
  const isLoading = useSelector((state) => state.surveyReducer.isLoading || state.userReducer.isLoading);
  const feedbackData = useSelector((state) => state.surveyReducer.feedbackData);
  const onSearchTextChange = (event) => setSearchText(event.target.value);

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

  const tnaColumns = [
    {
      label: (
        <div className="selector">
          <input
            type="checkbox"
            onChange={() => (selectedRows.length === tnaData?.length ? setSelectedRows([]) : setSelectedRows(tnaData))}
            checked={selectedRows.length === tnaData?.length}
          />
        </div>
      ),
      accessor: "selector",
      Cell: (props) => {
        const value = selectedRows.some((row) => row._id === props.data._id);
        return (
          <div className="selector">
            <input type="checkbox" onChange={() => onRowSelect(props.data)} checked={value} />
          </div>
        );
      },
    },
    {
      label: "Survey Title",
      accessor: "title",
      sortable: true,
      filterable: true,
    },
    {
      label: "Date",
      accessor: "startDate",
      sortable: true,
      filterable: true,
    },
    {
      label: "Status",
      accessor: "published",
      Cell: (props) =>
        new Date(props.data.endDate) > new Date() ? (
          <Button variant="secondary" label="On Going" />
        ) : (
          <Button variant="primary" label="View Result" />
        ),
    },
    {
      label: "Assign/Edit User",
      accessor: "authorizedUsers",
      Cell: (props) => (
        <div className="invite-users">
          {!props.data.published && new Date(props.data.endDate) > new Date() ? (
            <div className="publish-now">Publish now</div>
          ) : new Date(props.data.endDate) > new Date() ? (
            <div className="authorized-users">
              {props.data.invited?.map((invitedId, index) => {
                const invitedUser = users?.find((user) => user._id === invitedId) || {};
                console.log(invitedUser);
                return (
                  index < 4 && (
                    <img
                      src={invitedUser.avatar ?? "/avatar.png"}
                      className="user-image"
                      alt="user-avatar"
                      width={30}
                    />
                  )
                );
              })}
              <InviteUserIcon onClick={() => setSurveyToInvite(props.data._id)} />
            </div>
          ) : null}
        </div>
      ),
    },
    {
      label: "Actions",
      accessor: "actions",
      Cell: (props) => (
        <div className="table-actions">
          <Link to={`/survey/${activeTab}/${props?.data?._id}`}>
            {" "}
            <EditIcon />
          </Link>
        </div>
      ),
    },
  ];

  const feedbackColumns = [
    {
      label: (
        <div className="selector">
          <input
            type="checkbox"
            onChange={() =>
              selectedRows.length === feedbackData?.length ? setSelectedRows([]) : setSelectedRows(feedbackData)
            }
            checked={selectedRows.length === feedbackData?.length}
          />
        </div>
      ),
      accessor: "selector",
      Cell: (props) => {
        const value = selectedRows.some((row) => row._id === props.data._id);
        return (
          <div className="selector">
            <input type="checkbox" onChange={() => onRowSelect(props.data)} checked={value} />
          </div>
        );
      },
    },
    {
      label: "Survey Title",
      accessor: "title",
      sortable: true,
      filterable: true,
    },
    {
      label: "Date",
      accessor: "startDate",
      sortable: true,
      filterable: true,
    },
    {
      label: "Status",
      accessor: "published",
      Cell: (props) =>
        new Date(props.data.endDate) > new Date() ? (
          <Button variant="secondary" label="On Going" />
        ) : (
          <Button variant="primary" label="View Result" />
        ),
    },
    {
      label: "Assign/Edit User",
      accessor: "authorizedUsers",
      Cell: (props) => (
        <div className="invite-users">
          {!props.data.published && new Date(props.data.endDate) > new Date() ? (
            <div className="publish-now">Publish now</div>
          ) : new Date(props.data.endDate) > new Date() ? (
            <div className="authorized-users">
              {props.data.authorizedUsers?.map((image) => (
                <img src={image} className="user-image" alt="" />
              ))}
              <InviteUserIcon onClick={() => {}} />
            </div>
          ) : null}
        </div>
      ),
    },
    {
      label: "Actions",
      accessor: "actions",
      Cell: (props) => (
        <div className="table-actions">
          <Link to={`/survey/${activeTab}/${props?.data?._id}`}>
            {" "}
            <EditIcon />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchSurveys());
    dispatch(fetchUsers());
  }, []);
  const breadcrumbs = [
    {
      menu: "Survey Management",
      link: "/survey",
    },
  ];
  return (
    <div className="container">
      <h2>Survey Management</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {surveyToInvite && (
        <Modal displayModal title={"Assign Users"} closeModal={() => setSurveyToInvite(null)}>
          <InviteDialog
            closeModal={() => setSurveyToInvite(null)}
            onConfirm={(selectedUserIds) => console.log(selectedUserIds)}
            surveyId={surveyToInvite}
          />
        </Modal>
      )}
      <div className="summary">
        <div className="total-course-summary">
          <h3>100</h3>
          <p>TNA Conducted</p>
        </div>
        <div className="active-course-summary">
          <h3>100</h3>
          <p>Feedback Rolledout</p>
        </div>
      </div>
      <div className="table-header-section">
        <div className="tabs">
          <div className={activeTab === "TNA" ? "selected" : ""} onClick={() => setActiveTab("TNA")}>
            TNA
          </div>
          <div className={activeTab === "Feedback" ? "selected" : ""} onClick={() => setActiveTab("Feedback")}>
            Feedback
          </div>
        </div>
        <div className="filter-section">
          <div className="search-bar">
            <input className="search-field" type="text" placeholder="Search here..." onChange={onSearchTextChange} />
            <SearchIcon className="search-icon" />
          </div>
          <div className="filters">
            <FilterIcon width={48} height={48} onClick={() => setOpenFilter(true)} />
            {/* {openFilter && (
                <ColumnsSelector
                   columns={activeTab === "TNA" ? tnaColumns : feedbackColumns}
                  onClose={() => setOpenFilter(false)}
                  setViewableColumns={(columns) => setVisibleColumns(columns)}
                  visibleColumns={visibleColumns}
                />
              )} */}
          </div>
          <Link to={`/survey/${activeTab}`}>
            <Button variant="primary" label="+ Add New" />
          </Link>
        </div>
      </div>
      <div className="content-zone">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={activeTab === "TNA" ? tnaData : feedbackData}
            columns={activeTab === "TNA" ? tnaColumns : feedbackColumns}
            searchText={searchText}
            // filters={filters}
            // onFiltersApply={setFilters}
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

export default SurveyDashboard;
