import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import ColumnsSelector from "../../components/ColumnSelector/ColumnsSelector";
import DeleteWarning from "../../components/DeleteWarning/DeleteWarning";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import { AddUserIcon, DeleteIcon, EditIcon, FilterIcon, SearchIcon } from "../../icons";
import { bulkDeleteUsers, bulkUpdateUsers, deleteUserCall, fetchUsers } from "../../redux/slices/userSlice";
import { getUserViewableColumns, userColumns } from "../../utils/columns";
import BulkEdit from "./BulkEdit";
import "./user-dashboard.css";

const UserDashboard = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [bulkEditModal, showBulkEditModal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(userColumns.map((column) => column.value));
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer?.isLoading);
  const currentUser = useSelector((state) => state.userReducer?.currentUser);
  const users = useSelector((state) => state.userReducer?.data);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchUsers());
    }
  }, [currentUser]);

  const closeModal = () => {
    setShowDeleteModal(null);
    showBulkEditModal(false);
  };
  const deleteUser = () => {
    if (selectedRows.length === 1) {
      dispatch(deleteUserCall(selectedRows[0]._id));
    } else {
      const userIdsToDelete = selectedRows.map((user) => user._id);
      dispatch(bulkDeleteUsers(userIdsToDelete));
    }
    setTimeout(() => {
      dispatch(fetchUsers());
      closeModal();
      setSelectedRows([]);
    }, 1000);
  };

  const bulkDelete = () => setShowDeleteModal(true);
  const bulkUpdate = (manager) => {
    const userIdsToDelete = selectedRows.map((user) => user._id);
    dispatch(bulkUpdateUsers({ userIds: userIdsToDelete, manager }));
    setTimeout(() => {
      dispatch(fetchUsers());
      closeModal();
      setSelectedRows([]);
    }, 1000);
  };

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

  const columns = [
    {
      label: (
        <div className="selector">
          <input
            type="checkbox"
            onChange={() => (selectedRows.length === users.length ? setSelectedRows([]) : setSelectedRows(users))}
            checked={selectedRows.length === users.length}
          />
        </div>
      ),
      width: 20,
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
    ...getUserViewableColumns(visibleColumns),
    {
      label: "",
      accessor: "actions",
      Cell: (props) => (
        <div className="users-actions">
          <Link to={`/user/edit/${props?.data?._id}`}>
            {" "}
            <EditIcon />
          </Link>
          <DeleteIcon
            onClick={() => {
              setSelectedRows([props?.data]);
              setShowDeleteModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const BulkActions = () => (
    <div className="filter-section">
      <DeleteIcon width={48} height={48} onClick={bulkDelete} />
      <Button variant="primary" onClick={() => showBulkEditModal(true)}>
        <div className="auto-renewal">
          <AddUserIcon />
          <p>Change Reporting Manager</p>
        </div>
      </Button>
    </div>
  );

  const breadcrumbs = [
    {
      menu: "User Management",
      link: "/user",
    },
  ];
  return (
    <div className="container dashboard-user">
      <h2 className="page-header">User Management</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {showDeleteModal && selectedRows.length > 0 && (
        <Modal displayModal title={"Are you sure?"} closeModal={closeModal}>
          <DeleteWarning
            closeModal={closeModal}
            onConfirm={deleteUser}
            name={selectedRows.map((user) => user.fullname).join(", ")}
          />
        </Modal>
      )}

      {bulkEditModal && selectedRows.length > 0 && (
        <Modal displayModal title={"Change Reporting Manager"} closeModal={closeModal}>
          <BulkEdit closeModal={closeModal} onConfirm={bulkUpdate} />
        </Modal>
      )}

      <div className="table-header-section">
        <div className="header-title">
          <h3>User List</h3>
        </div>
        {selectedRows.length > 1 ? (
          <BulkActions />
        ) : (
          <div className="filter-section">
            <div className="search-bar">
              <input className="search-field" type="text" placeholder="Search here..." onChange={onSearchTextChange} />
              <SearchIcon className="search-icon" />
            </div>
            <div className="filters">
              <FilterIcon width={48} height={48} onClick={() => setOpenFilter(true)} />
              {openFilter && (
                <ColumnsSelector
                  columns={userColumns}
                  onClose={() => setOpenFilter(false)}
                  setViewableColumns={(columns) => setVisibleColumns(columns)}
                  visibleColumns={visibleColumns}
                />
              )}
            </div>
            <Link to={`/user/add`}>
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
            data={users}
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

export default UserDashboard;
