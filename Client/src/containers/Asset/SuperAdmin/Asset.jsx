import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Header, { DemmyHeader } from "./Header";
import Searchbox from "../../../components/SearchBox/Searchbox";
import SelectBox from "../../../components/SearchBox/SelectBox";
import Button from "../../../components/Button/Button";
import { ShareDetailIcon, EditIcon, DeleteIcon, PdfIcon, VideoIcon, PPTIcon, ScrumIcon } from "../../../icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";

const AssetData = [
  {
    name: "Groupware",
    type: "PDF",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Virtual overriding Washington",
    type: "Video",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Groupware",
    type: "PDF",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Virtual overriding Washington",
    type: "PPT",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Groupware",
    type: "Scrum",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Virtual  Washington",
    type: "Video",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },

  {
    name: "Groupware",
    type: "PDF",
    duration: "4 days",
    description: "Elevate teamwork and cohesion with our dynamic Team Building course.",
  },
  {
    name: "Virtual overriding Washington",
    type: "Scrum",
    duration: "4 days",
    description: "Elevate  and cohesion with our dynamic Team Building course.",
  },
];

function Asset() {
  const assetOption = [{ option: "Select Organization" }, { option: "Ventura" }, { option: "Krios" }];

  let ButtonText = () => {
    return (
      <div className="center-align">
        <ShareDetailIcon />
        <div style={{ marginLeft: "2%" }}>Share</div>
      </div>
    );
  };
  return (
    <div className=" InterRegularFamily Chat">
      <div className="page-header InterBoldFamily">{"Assets"}</div>
      <Breadcrumb
        breadcrumbs={[
          {
            menu: "Asset",
            link: `/Asset`,
          },
        ]}
      />
      <div style={{ marginTop: "1.5%" }}>
        <div className="CourseDetailTop">
          <div className="width-per-100">
            <Header
              header={<div className="font-size-8em font-w-600 DemmyHeader">{"Asset"}</div>}
              Component={[
                <DemmyHeader width="40%" />,
                <Searchbox />,
                <SelectBox option={assetOption} />,
                <Button variant="quartary" label={`Share`} icon={<ButtonText />} />,
                <Link to={`/user/AssetForm`}>
                  <Button variant="primary" label="+ Add New" />
                </Link>,
              ]}
            />
          </div>
        </div>
        <div className="width-per-100">
          <AssetTable />
        </div>
      </div>
    </div>
  );
}

function AssetTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const isLoading = "loaded";

  const assetColumns = [
    {
      label: (
        <div className="selector">
          <input
            type="checkbox"
            onChange={() =>
              selectedRows.length === AssetData?.length ? setSelectedRows([]) : setSelectedRows(AssetData)
            }
            checked={selectedRows.length === AssetData?.length}
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
      label: "Name",
      accessor: "name",
      sortable: true,
      // filterable: true,
      Cell: (props) => {
        let fill =
          props.data.type == "PDF"
            ? "#5F8C25"
            : props.data.type == "Video"
            ? "#5C4BC8"
            : props.data.type == "PPT"
            ? "#CC4295"
            : "#346C5F";

        return (
          <div className="flex align-item-center">
            {
              <div
                style={{
                  width: "1.8em",
                  height: "1.8em",
                  backgroundColor:
                    props.data.type == "PDF"
                      ? "#5F8C2533"
                      : props.data.type == "Video"
                      ? "#5C4BC833"
                      : props.data.type == "PPT"
                      ? "#CC429533"
                      : "#346C5F33",
                  padding: ".5% .6% .5% .6%",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="centerAlign"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    // ContentPlay(ele.ContentId, ele.ContentType);
                  }}
                >
                  {props.data.type == "PDF" ? (
                    <PdfIcon width=".9em" height=".9em" innerFill={fill} />
                  ) : props.data.type == "Video" ? (
                    <VideoIcon width=".9em" height=".9em" innerFill={fill} />
                  ) : props.data.type == "PPT" ? (
                    <PPTIcon width=".9em" height=".9em" innerFill={fill} />
                  ) : (
                    <ScrumIcon width=".9em" height=".9em" innerFill={fill} />
                  )}
                </div>
              </div>
            }
            <div className="font-size-8em" style={{ marginLeft: "2%" }}>
              {props.data.name}
            </div>
          </div>
        );
      },
    },
    {
      label: "Type",
      accessor: "type",
      sortable: true,
      // filterable: true,
      Cell: (props) => (
        <div
          className="font-size-7em"
          style={{
            background:
              props.data.type == "PDF"
                ? "#5F8C2533"
                : props.data.type == "Video"
                ? "#5C4BC833"
                : props.data.type == "PPT"
                ? "#CC429533"
                : "#346C5F33",
            color:
              props.data.type == "PDF"
                ? "#5F8C25"
                : props.data.type == "Video"
                ? "#5C4BC8"
                : props.data.type == "PPT"
                ? "#CC4295"
                : "#346C5F",
            padding: "5% 8%",
            borderRadius: "8px",

            textAlign: "center",
            width: "fit-content",
          }}
        >
          {props.data.type}
        </div>
      ),
    },
    {
      label: "Duration",
      accessor: "duration",
      sortable: true,
      // filterable: true,
      Cell: (props) => <div className="font-size-8em">{props.data.duration}</div>,
    },
    {
      label: "Description",
      accessor: "description",
      sortable: true,
      // filterable: true,
      Cell: (props) => <div className="font-size-8em .font-w-300">{props.data.description}</div>,
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

          <span
            style={{
              marginLeft: "10%",
            }}
          >
            <DeleteIcon
              onClick={() => {
                // setSelectedRows([props?.data]);
                // setShowDeleteModal(true);
              }}
            />
          </span>
        </div>
      ),
    },
  ];

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

  return (
    <div>
      <div className="content-zone">
        {!isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={AssetData}
            columns={assetColumns}
            searchText={null}
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
}

export default Asset;
