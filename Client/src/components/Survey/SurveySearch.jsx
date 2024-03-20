import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { EditIcon, InviteUserIcon, SearchIcon, FilterIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../Table/Table";

const SurveyDashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("TNA");
  const [selectedRows, setSelectedRows] = useState([]);
  const [surveyToInvite, setSurveyToInvite] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.data);
  const onSearchTextChange = (event) => setSearchText(event.target.value);
  const isLoading = useSelector((state) => state.surveyReducer.isLoading || state.userReducer.isLoading);
  const tnaData = useSelector((state) => state.surveyReducer.tnaData);
  const feedbackData = useSelector((state) => state.surveyReducer.feedbackData);
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
  const feedback = [
    {
      title: "Unbranded synthesizing",
      startDate: "Sun Jul 09 2023",
      author: "Mr. Jessie Beatty",
      status: "In-progress",
    },
    {
      title: " Pennsylvania AI HDD",
      startDate: "Mon May 08 2023",
      author: "MSara O'Keefe III",
      status: "In-progress",
    },
    {
      title: "embrace National Arkansas",
      startDate: "Wed feb 08 2023",
      author: "Julia Wyman",
      status: "Completed",
    },
    {
      title: "supply-chains",
      startDate: "Sat Nov 25 2023",
      author: "Jeff Thompson",
      status: "In-progress",
    },
    {
      title: "parsing",
      startDate: "Sun Nov 26 2023",
      author: "Dwight Paucek",
      status: "Incompleted",
    },
    {
      title: "web-enabled",
      startDate: "Mon Nov 06 2023",
      author: "Leigh Ruecker",
      status: "In-progress",
    },
    {
      title: "Borders",
      startDate: "Thu Dec 21 2023",
      author: "Rudolph Parisian",
      status: "In-progress",
    },
    {
      title: "hack interactive",
      startDate: "Wed Nov 29 2023",
      author: "Robin Williamson",
      status: "In-progress",
    },
    {
      title: "microchip",
      startDate: "Tue Jul 18 2023",
      author: "Olive Bosco II",
      status: "Completed",
    },
    {
      title: "Borders",
      startDate: "Thu Dec 21 2023",
      author: "Rudolph Parisian",
      status: "In-progress",
    },
  ];
  const feedbackColumns = [
    {
      label: "Name",
      accessor: "title",
    },

    {
      label: "Date",
      accessor: "startDate",
    },
    {
      label: "Author",
      accessor: "author",
    },

    {
      label: "Status",
      accessor: "authorizedUsers",

      Cell: (props) => (
        <Button
          variant={
            props.data.status === "In-progress"
              ? "quartary"
              : props.data.status === "Completed"
              ? "customborder"
              : props.data.status === "Incomplete" && props.data.title === "parsing"
              ? "Start-Now"
              : "startnow"
          }
          label={
            props.data.status === "In-progress"
              ? "In-progress"
              : props.data.status === "Completed"
              ? "View Result"
              : props.data.status === "Incompleted" && props.data.title === "parsing"
              ? "Start Now"
              : "startnow"
          }
        />
      ),
    },
  ];
  function SurveySearch() {
    return (
      <>
        <div>
          <div className="summary"></div>
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
                <input
                  className="search-field"
                  type="text"
                  placeholder="Search here..."
                  onChange={onSearchTextChange}
                />
                <SearchIcon className="search-icon" />
              </div>
              <Link to={`/survey/${activeTab}`}>
                {/* <Button variant="primary" label="+ Add New" /> */}
                <div className="filters">
                  <FilterIcon width={48} height={48} />
                </div>
              </Link>
            </div>
          </div>
          <div className="content-zone">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Table
                data={activeTab === "TNA" ? tnaData : feedback}
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
      </>
    );
  }
  return <SurveySearch />;
};
export default SurveyDashboard;
