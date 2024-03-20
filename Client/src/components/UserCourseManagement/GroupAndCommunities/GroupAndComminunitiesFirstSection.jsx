import { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import DashboardCard from "../../Dashboard/DashboardCard/DashboardCard";
import card1 from "../../../components/Dashboard/DashboardCard/DashboardCardImage/card1.png";
import card2 from "../../../components/Dashboard/DashboardCard/DashboardCardImage/card2.png";
import { FilterIconUse } from "../../../icons";
import Button from "../../Dashboard/AdminDashboard/Button";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, DeleteIcon, AddUserIcon, SearchIcon, FilterIcon, AddOrangeIcon } from "../../../icons";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../Table/Table";
import group1 from "./GroupAndCommunitesImage/group1.png";
import group2 from "./GroupAndCommunitesImage/group2.png";
import group3 from "./GroupAndCommunitesImage/group3.png";
import group4 from "./GroupAndCommunitesImage/group4.png";
import Modal from "../../Modal/Modal";
import DeleteWarning from "../../DeleteWarning/DeleteWarning";
import BulkEdit from "../../../containers/UserDashboard/BulkEdit";
import TableBody from "../../Table/TableBody";
import userIcon from "../../Dashboard/AdminDashboard/Adminicons/Ficon.png";

let cardData = [
  {
    value: "59",
    title: "Total Group",
    backgroundImage: card1,
    margin: "8%",
  },
  {
    value: "86",
    title: "Total Communitites",
    backgroundImage: card2,
    margin: "8%",
  },
];

function GroupAndComminunitiesFirstSection() {
  return (
    <div className="sectionFirst" style={{ width: "100" }}>
      <div className="page-header InterBoldFamily" style={{ fontSize: "1.2em" }}>
        {"Groups & Communities"}
      </div>
      <Breadcrumb breadcrumbs={[{ menu: "Groups & Communities", link: `/Groups&Communities` }]} />
      <div style={{ marginTop: "1.5%" }}>
        <DashboardCard
          cardData={cardData}
          classNames={{
            cardHeading: "cardHeading",
            cardDiscription: "cardDiscription",
          }}
        />
      </div>

      {/* course Information */}
      <div>
        <div style={{ marginBlock: "2%" }}>
          <GroupAndComminunitiesTab />
        </div>
      </div>
    </div>
  );
}

function GroupAndComminunitiesTab() {
  let [tab, showTab] = useState("Communities");
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Headers showTab={showTab} tab={tab} />
      {/* {tab == "RecentActivity" ? <RecentActivityRow /> : <RequestRow />} */}
      <Group {...{ tab, showTab }} />
    </div>
  );
}
function Headers({ showTab, tab }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div
        className="HeaderSection1 Flex_Spacing"
        style={{
          display: "flex",
          // justifyContent: "space-between",
          gap: "6%",
          marginTop: "1%",
        }}
      >
        <div>
          <button
            onClick={() => {
              showTab("Groups");
            }}
            className={tab == "Groups" ? "tabHeader headerbutton borerBottom" : "tabHeader headerbutton"}
            style={{
              backgroundColor: "#FFFFFF",
              color: tab == "Groups" ? "#00BAFF" : "#273143",
            }}
          >
            {"Groups"}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              showTab("Communities");
            }}
            className={tab == "Communities" ? "tabHeader headerbutton borerBottom" : "tabHeader headerbutton"}
            style={{
              backgroundColor: "#FFFFFF",
              color: tab == "Communities" ? "#00BAFF" : "#273143",
            }}
          >
            {"Communities"}
          </button>
        </div>
      </div>
      <div
        className="HeaderSection2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1%",
          gap: "1%",
        }}
      >
        {/* search box */}
        <input
          type="search"
          name=""
          id=""
          style={{
            flex: "1 1 0",
            padding: "1%",
            borderRadius: "8px",
            border: "1px solid #ABABAB",
            background: "linear-gradient(0deg, #FBFBFB, #FBFBFB), linear-gradient(0deg, #ABABAB, #ABABAB)",
          }}
          placeholder="Search  here..."
        />
        {/* filter */}
        {/* <div style={{ width: "10%" }}>
          <button
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundImage: `url(${filter})`,
              // backgroundSize: "cover",
              // backgroundPosition: "center",
              backgroundColor: "#DAF5FF",
              border: "0px ",
            }}
          >
            <FilterIconUse />
          </button>
        </div> */}

        <Button
          discription=" + Create"
          className={"tabHeaderSecButton"}
          styling={{ backgroundColor: " #00BAFF", color: "#FFFFFF" }}
        />
      </div>
    </div>
  );
}

function Group({ tab, showTab }) {
  // it is use to handle delete data pops up to conform
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // it is use to bulk delete
  const [bulkEditModal, showBulkEditModal] = useState(null);

  //  it is array of user with we want to perform action
  const [selectedRows, setSelectedRows] = useState([]);

  // it is use for filter open and hide
  const [openFilter, setOpenFilter] = useState(false);

  // search text
  const [searchText, setSearchText] = useState("");

  // it is use to create object in which we define what to filter
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.userReducer?.isLoading);

  // data of login user
  const currentUser = useSelector((state) => state.userReducer?.currentUser);

  // all group associated with that user
  const groups = [
    {
      banner: group1,
      groupName: "Trantow, Klein and Jones",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "2",
    },
    {
      banner: group2,
      groupName: "Bashirian Inc",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "3",
    },
    {
      banner: group3,
      groupName: "Stroman and McDermott",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "4",
    },
    {
      banner: group4,
      groupName: "Monahan LLC",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "5",
    },
  ];

  // all communities associated with that user
  const communities = [
    {
      banner: group1,
      groupName: "Trantow, Klein and Jones",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "2",
    },
    {
      banner: group2,
      groupName: "Bashirian Inc",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "3",
    },
    {
      banner: group3,
      groupName: "Stroman and McDermott",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "4",
    },
    {
      banner: group4,
      groupName: "Monahan LLC",
      groupCreatedOn: "Jan 20, 2024",
      lastUpdated: "12:56 PM",
      userlist: "",
      groupId: "5",
    },
  ];

  // useEffect(() => {
  //   if (currentUser?._id) {
  //     dispatch(fetchUsers());
  //   }
  // }, [currentUser]);.

  const closeModal = () => {
    setShowDeleteModal(null);
    showBulkEditModal(false);
  };

  // const deleteUser = () => {
  //   if (selectedRows.length === 1) {
  //     dispatch(deleteUserCall(selectedRows[0]._id));
  //   } else {
  //     const userIdsToDelete = selectedRows.map((user) => user._id);
  //     dispatch(bulkDeleteUsers(userIdsToDelete));
  //   }
  //   setTimeout(() => {
  //     dispatch(fetchUsers());
  //     closeModal();
  //     setSelectedRows([]);
  //   }, 1000);
  // };

  // const bulkDelete = () => setShowDeleteModal(true);

  // const bulkUpdate = (manager) => {
  //   const userIdsToDelete = selectedRows.map((user) => user._id);
  //   dispatch(bulkUpdateUsers({ userIds: userIdsToDelete, manager }));
  //   setTimeout(() => {
  //     dispatch(fetchUsers());
  //     closeModal();
  //     setSelectedRows([]);
  //   }, 1000);
  // };

  // const onSearchTextChange = (event) => setSearchText(event.target.value);

  // const onRowSelect = (selection) => {
  //   const rows = [...selectedRows];
  //   const matchedIndex = rows.findIndex((row) => row._id === selection._id);
  //   if (matchedIndex === -1) {
  //     rows.push(selection);
  //   } else {
  //     rows.splice(matchedIndex, 1);
  //   }
  //   setSelectedRows(rows);
  // };

  const columns = [
    // ...getUserViewableColumns(visibleColumns),
    {
      label: "",
      accessor: "banner",
      Cell: ({ data }) => {
        return (
          <div
            style={{
              width: "60%",
              // border: "1px solid red",
              padding: ".5% 0% 0% .5%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <img src={data.banner} alt="" style={{ width: "100%" }} />
            </div>
          </div>
        );
      },
    },
    {
      label: "",
      accessor: "Details",
      Cell: ({ data }) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginLeft: "2%",
            }}
          >
            <div style={{ fontSize: ".8em", fontWeight: "600" }}>{data.groupName}</div>
            <div style={{ width: "100%", fontSize: ".6em" }}>Created on {data.groupCreatedOn}</div>
          </div>
        );
      },
    },

    {
      label: "",
      accessor: "details",
      Cell: ({ data }) => {
        return (
          <div
            style={{
              // width: "5%",
              // border: "1px solid red",
              padding: ".5% 0% 0% .5%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <InviteUser />
            </div>
          </div>
        );
      },
    },

    {
      label: "",
      accessor: "details",
      Cell: ({ data }) => {
        return (
          <div
            style={{
              // border: "1px solid red",
              padding: ".5% 0% 0% .5%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div style={{ width: "100%", fontSize: ".6em" }}>Last updated at {data.lastUpdated}</div>
            </div>
          </div>
        );
      },
    },

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

  return (
    <div className=" dashboard-user" style={{ marginTop: "2%" }}>
      {showDeleteModal && selectedRows.length > 0 && (
        <Modal displayModal title={"Are you sure?"} closeModal={closeModal}>
          <DeleteWarning
            closeModal={closeModal}
            // onConfirm={deleteUser}
            name={selectedRows.map((user) => user.fullname).join(", ")}
          />
        </Modal>
      )}
      <div style={{ width: "100%" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <GroupCommunitiesTable
            tableData={tab == "Communities" ? communities : groups}
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
}

function GroupCommunitiesTable({ tableData, columns }) {
  const history = useNavigate();
  return (
    <table cellSpacing={0} cellPadding={0} style={{ width: "100%" }}>
      <tbody style={{ width: "100%", padding: "1%" }}>
        {tableData.map((data, index) => {
          return (
            <tr
              key={index}
              className="Box-Shadow"
              onClick={() => {
                history("/Groups&Communities/Chats");
              }}
            >
              {columns.map(({ accessor, Cell }, aIndex) => {
                console.log(Cell);
                console.log(data[accessor]);
                const tData = data[accessor] ?? "——";
                return <td key={aIndex}>{Cell ? <Cell data={data} /> : tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function InviteUser() {
  let userInrole = [1, 1, 1, 1];
  return (
    <>
      <div
        className="authorized-users InterBoldFamily centerAlign"
        style={{
          width: "100%",
          borderRadius: "8px",
          paddingBlock: "2%",
          marginBlock: "2%",
          fontSize: ".8em",
          color: "#273143",
          gap: "1%",
        }}
      >
        <div style={{ display: "flex" }}>
          {userInrole?.map((ele, index) => {
            // const invitedUser = users?.find(user => user._id === invitedId) || {};
            // console.log(invitedUser);
            return index < 3 ? (
              <img
                src={userIcon}
                className="user-image userImageSize IconHide"
                alt="user-avatar"
                onClick={(index) => {}}
              />
            ) : (
              <div
                className="user-image userImageSize"
                onClick={(index) => {}}
                style={{
                  border: "1.6px dotted  #F9A400",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddOrangeIcon width={"50%"} height={"50%"} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default GroupAndComminunitiesFirstSection;
