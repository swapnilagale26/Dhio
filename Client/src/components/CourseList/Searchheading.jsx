import React, { useEffect, useRef, useState } from "react";
import { getTenancyViewableColumns, tenancyColumns } from "../../utils/columns";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import ColumnsSelector from "../ColumnSelector/ColumnsSelector";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, FilterIconSecond, ReplayIcon, SearchIcon } from "../../icons";
import Searchhead from "./Searchhead.css";
import {
  bulkDeleteTenancies,
  bulkUpdateTenancies,
  deleteTenancyCall,
  fetchTenancies,
} from "../../redux/slices/tenancySlice";

const TenancyDashboard = () => {
  const [showDeleteTenancyModal, setShowDeleteTenancyModal] = useState(null);
  const [message, showMessage] = useState(false);
  const [bulkEditModal, showBulkEditModal] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(tenancyColumns.map((column) => column.value));

  const loadingRef = useRef(false);
  const dispatch = useDispatch();
  const onSearchTextChange = (event) => setSearchText(event.target.value);
  const [searchText, setSearchText] = useState("");

  const BulkActions = () => (
    <div className="filter-section">
      <DeleteIcon onClick={bulkDelete} />
      <Button variant="primary" onClick={() => showBulkEditModal(true)}>
        <div className="auto-renewal">
          <ReplayIcon />
          <p>Auto Renewal</p>
        </div>
      </Button>
    </div>
  );
  const bulkDelete = () => setShowDeleteTenancyModal(true);
  const bulkUpdateTenancy = (autoRenewal) => {
    loadingRef.current = true;
    dispatch(
      bulkUpdateTenancies({
        tenancyIds: selectedRows.map((tenancy) => tenancy._id),
        autoRenewal,
      })
    );
  };
  function Searchheading() {
    return (
      <>
        <div className="head">
          <div className="table-header-section">
            <div className="header-title">
              <h3>User List</h3>
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
                  <FilterIconSecond width={48} height={48} onClick={() => setOpenFilter(true)} />
                  {openFilter && (
                    <ColumnsSelector
                      // columns={userColumns}
                      onClose={() => setOpenFilter(false)}
                      setViewableColumns={(columns) => setVisibleColumns(columns)}
                      visibleColumns={visibleColumns}
                    />
                  )}
                </div>
                <div className="form-fields-in-row">
      <div className="form-field">
        <label></label>
        <select name="dept" style={{ border: "2px solid #ababab", height:"40px",marginTop:"-3px" }}>
          {["All Courses","Machine Learning", "Development", "Cyber Security"].map((data) => {
            return (
              <option value={`${data}`} style={{ color: "#00BAFF" }}>
                {data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  return <Searchheading />;
};
export default TenancyDashboard;
