// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
// import Button from "../../components/Button/Button";
// import ColumnsSelector from "../../components/ColumnSelector/ColumnsSelector";
// import DeleteWarning from "../../components/DeleteWarning/DeleteWarning";
// import Modal from "../../components/Modal/Modal";
// import PopupMessage from "../../components/PopupMessage/PopupMessage";
// import Table from "../../components/Table/Table";
// import {
//   DeleteIcon,
//   EditIcon,
//   FilterIcon,
//   ReplayIcon,
//   SearchIcon,
// } from "../../icons";
// import {
//   bulkDeleteTenancies,
//   bulkUpdateTenancies,
//   deleteTenancyCall,
//   fetchTenancies,
// } from "../../redux/slices/tenancySlice";
// import { getTenancyViewableColumns, tenancyColumns } from "../../utils/columns";
// import BulkEdit from "./BulkEdit";
// import "./tenancy.css";

// const TenancyDashboard = () => {
//   const [showDeleteTenancyModal, setShowDeleteTenancyModal] = useState(null);
//   const [message, showMessage] = useState(false);
//   const [bulkEditModal, showBulkEditModal] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [openFilter, setOpenFilter] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState(
//     tenancyColumns.map((column) => column.value)
//   );
//   const [searchText, setSearchText] = useState("");
//   const [filters, setFilters] = useState({});
//   const loadingRef = useRef(false);

//   const dispatch = useDispatch();
//   const tenancies = useSelector((state) => state.tenancyReducer?.data);
//   const isLoading = useSelector((state) => state.tenancyReducer?.isLoading);
//   const isError = useSelector((state) => state.tenancyReducer?.isError);

//   useEffect(() => {
//     dispatch(fetchTenancies());
//   }, [dispatch]);

//   const closeModal = () => {
//     setShowDeleteTenancyModal(null);
//     showBulkEditModal(false);
//   };
//   const deleteTenancy = () => {
//     loadingRef.current = true;
//     if (selectedRows.length === 1) {
//       dispatch(deleteTenancyCall(selectedRows[0]._id));
//     } else {
//       const tenancyIdsToDelete = selectedRows.map((tenancy) => tenancy._id);
//       dispatch(bulkDeleteTenancies(tenancyIdsToDelete));
//     }
//   };

//   const bulkDelete = () => setShowDeleteTenancyModal(true);
//   const bulkUpdateTenancy = (autoRenewal) => {
//     loadingRef.current = true;
//     dispatch(
//       bulkUpdateTenancies({
//         tenancyIds: selectedRows.map((tenancy) => tenancy._id),
//         autoRenewal,
//       })
//     );
//   };

//   const onSearchTextChange = (event) => setSearchText(event.target.value);

//   const onRowSelect = (selection) => {
//     const rows = [...selectedRows];
//     const matchedIndex = rows.findIndex((row) => row._id === selection._id);
//     if (matchedIndex === -1) {
//       rows.push(selection);
//     } else {
//       rows.splice(matchedIndex, 1);
//     }
//     setSelectedRows(rows);
//   };

//   useEffect(() => {
//     if (!isLoading && loadingRef.current) {
//       showMessage(true);
//       loadingRef.current = false;
//       if (!isError) {
//         setTimeout(() => {
//           dispatch(fetchTenancies());
//           closeModal();
//           setSelectedRows([]);
//         }, 1000);
//       }
//       setTimeout(() => showMessage(false), 3000);
//     }
//   }, [isLoading]);

//   const columns = [
//     {
//       label: (
//         <div className="selector">
//           <input
//             type="checkbox"
//             onChange={() =>
//               selectedRows.length === tenancies.length
//                 ? setSelectedRows([])
//                 : setSelectedRows(tenancies)
//             }
//             checked={selectedRows.length === tenancies.length}
//           />
//         </div>
//       ),
//       width: 20,
//       accessor: "selector",
//       Cell: (props) => {
//         const value = selectedRows.some((row) => row._id === props.data._id);
//         return (
//           <div className="selector">
//             <input
//               type="checkbox"
//               onChange={() => onRowSelect(props.data)}
//               checked={value}
//             />
//           </div>
//         );
//       },
//     },
//     ...getTenancyViewableColumns(visibleColumns),
//     {
//       label: "",
//       accessor: "actions",
//       Cell: (props) => (
//         <div className="tenancy-actions">
//           <Link to={`/tenancy/edit/${props?.data?._id}`}>
//             {" "}
//             <EditIcon />
//           </Link>
//           <DeleteIcon
//             onClick={() => {
//               setSelectedRows([props?.data]);
//               setShowDeleteTenancyModal(true);
//             }}
//           />
//         </div>
//       ),
//     },
//   ];

//   const BulkActions = () => (
//     <div className="filter-section">
//       <DeleteIcon onClick={bulkDelete} />
//       <Button variant="primary" onClick={() => showBulkEditModal(true)}>
//         <div className="auto-renewal">
//           <ReplayIcon />
//           <p>Auto Renewal</p>
//         </div>
//       </Button>
//     </div>
//   );

//   const breadcrumbs = [
//     {
//       menu: "Tenancy",
//       link: "/tenancy",
//     },
//   ];
//   return (
//     <div className="container">
//       <div className="header-title">
//         <h2>Companies</h2>
//       </div>
//       <Breadcrumb breadcrumbs={breadcrumbs} />
//       {message && <PopupMessage isError={isError} />}
//       {showDeleteTenancyModal && selectedRows.length > 0 && (
//         <Modal displayModal title={"Are you sure?"} closeModal={closeModal}>
//           <DeleteWarning
//             closeModal={closeModal}
//             onConfirm={deleteTenancy}
//             name={selectedRows.map((tenancy) => tenancy.name).join(", ")}
//           />
//         </Modal>
//       )}

//       {bulkEditModal && selectedRows.length > 0 && (
//         <Modal displayModal title={"Auto Renewal"} closeModal={closeModal}>
//           <BulkEdit closeModal={closeModal} onConfirm={bulkUpdateTenancy} />
//         </Modal>
//       )}

//       <div className="table-header-section">
//         <h3>Company List</h3>
//         {selectedRows.length > 1 ? (
//           <BulkActions />
//         ) : (
//           <div className="filter-section">
//             <div className="search-bar">
//               <input
//                 className="search-field"
//                 type="text"
//                 placeholder="Search here..."
//                 onChange={onSearchTextChange}
//               />
//               <SearchIcon className="search-icon" />
//             </div>
//             <div className="filters">
//               <FilterIcon onClick={() => setOpenFilter(true)} />
//               {openFilter && (
//                 <ColumnsSelector
//                   columns={tenancyColumns}
//                   onClose={() => setOpenFilter(false)}
//                   setViewableColumns={(columns) => setVisibleColumns(columns)}
//                   visibleColumns={visibleColumns}
//                 />
//               )}
//             </div>
//             <Link to={`/tenancy/add`}>
//               <Button variant="primary" label="+ Add New" />
//             </Link>
//           </div>
//         )}
//       </div>
//       <div className="content-zone">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <Table
//             data={tenancies}
//             columns={columns}
//             searchText={searchText}
//             filters={filters}
//             onFiltersApply={setFilters}
//             onSearch={(event) => {
//               event.preventDefault();
//               event.stopPropagation();
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TenancyDashboard;
