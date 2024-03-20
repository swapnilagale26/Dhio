import { MultiStarIcon, MultiUserIcon, StarIcon } from "../../../icons/index";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import CourseImage from "./CourseDetailImages/CourseImage.png";
import "../CourseDetail/CourseFirstSection.css";

let courseData = {
  courseName: "Machine Learning with Jakob",
  courseId: "22",
  courseBanner: "",
  courseDiscription:
    "Lorem ipsum dolor sit amet consectetur. Faucibus iaculis viverra ut id nunc cursus ridiculus ipsum. Egestas pharetra amet odio orci. Adipiscing iaculis tincidunt vitae sed at bibendum pellentesque commodo feugiat. Scelerisque viverra et egestas nulla vestibulum mauris turpis pulvinar. Et sem pretium phasellus ultrices in. Ut ipsum dis et mollis neque proin in arcu.",
  rating: "4.6",
  noOfUserCompleted: "2.3",
};

function CourseFirstSection() {
  return (
    <div className="sectionFirst" style={{ width: "100" }}>
      <div className=" InterBoldFamily font-size-9em">{courseData.courseName}</div>
      <Breadcrumb
        breadcrumbs={[
          { menu: "Courses", link: `/Course` },
          { menu: courseData.courseName, link: `/${courseData.courseId}` },
        ]}
      />
      <div style={{ marginTop: "1.5%" }}>
        <img src={CourseImage} alt="" style={{ width: "100%" }} />
      </div>

      {/* course Information */}
      <div>
        <div style={{ fontSize: "1em", fontWeight: "600", marginBlock: "2%" }}>About This Course</div>
        <div style={{ fontSize: ".8em", width: "98%" }}>{courseData.courseDiscription}</div>

        {/* rating and no of user Completed Section */}
        <div
          className="flex"
          style={{
            height: "5em",
            background: "#FBFBFB",
            marginBlock: "2%",
          }}
        >
          <div
            className="centerAlign"
            style={{
              flex: "1 1 0",
              borderRight: "1px solid #ABABAB",
              flexDirection: "column",
              gap: "7%",
            }}
          >
            <MultiUserIcon width={"2em"} height={"2em"} />
            <div
              style={{
                fontSize: ".8em",
                fontWeight: "500",
                fontFamily: "InterBold",
              }}
            >{`${courseData.noOfUserCompleted}K People Completed`}</div>
          </div>

          <div
            className="centerAlign"
            style={{
              flex: "1 1 0",
              flexDirection: "column",
              gap: "7%",
            }}
          >
            <StarIcon width={"2em"} height={"2em"} />
            <div
              style={{
                fontSize: ".8em",
                fontWeight: "500",
                fontFamily: "InterBold",
              }}
            >{`${courseData.rating} Rating`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseFirstSection;
