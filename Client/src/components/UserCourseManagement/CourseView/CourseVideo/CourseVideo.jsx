import Breadcrumb from "../../../Breadcrumb/Breadcrumb";
import "../../CourseDetail/CourseDetail.css";
import { PdfIcon, VideoIcon } from "../../../../icons";
import { useNavigate } from "react-router-dom";

let courseData = {
  courseVideoName: " Introduction to Machine Learning with Jakob",
  courseId: "22",
  courseVideo: "",
  courseVideoheading: " Machine Learning with Jakob",
  courseVideoDiscription:
    "Lorem ipsum dolor sit amet consectetur. Faucibus iaculis viverra ut id nunc cursus ridiculus ipsum. Egestas pharetra amet odio orci. Adipiscing iaculis tincidunt vitae sed at bibendum pellentesque commodo feugiat. Scelerisque viverra et egestas nulla vestibulum mauris turpis pulvinar. Et sem pretium phasellus ultrices in. Ut ipsum dis et mollis neque proin in arcu.",
};

function CourseVideo() {
  return (
    // this some class we uses from our Course Detail Section
    <div className="CourseDetailTop  CourseDetail InterRegularFamily">
      <div className="CourseFirstSection">
        <div className="font-size-9em InterBoldFamily">{courseData.courseVideoName}</div>
        <Breadcrumb
          breadcrumbs={[
            { menu: "Courses", link: `/Course` },
            { menu: "OverView", link: `/Course/5` },
            { menu: "Details", link: `/${courseData.courseId}/video` },
          ]}
        />
        {/* Video */}
        <div style={{ marginTop: "1.5%" }}>
          {/* <img src={CourseImage} alt="" style={{ width: "100%" }} /> */}
          <video style={{ width: "100%" }} controls>
            <source
              src="https://www.youtube.com/embed/uXWycyeTeCs"
              //type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
          {/* <iframe
            src="https://venturacompackages.s3.ap-south-1.amazonaws.com/skillshots/Accenture+Interest+Rate+Swaps/story.html"
            width={1000}
            height={500}
          ></iframe> */}
        </div>

        {/* video Information */}
        <div>
          <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "1em", fontWeight: "600", marginBlock: "2%" }}>
                {courseData.courseVideoheading}
              </div>
              <div style={{ fontSize: "1em", fontWeight: "600", marginBlock: "2%" }}>
                <button
                  className={"tabHeaderSecButton"}
                  style={{
                    backgroundColor: "#00BAFF",
                    color: "#FFFFFF",
                    border: "2px solid ",
                  }}
                >
                  {"Take Notes"}
                </button>
              </div>
            </div>
            <div style={{ fontSize: ".8em", width: "98%" }}>{courseData.courseVideoDiscription}</div>
          </div>
        </div>
      </div>
      <div className="CourseSecondSection">
        <Next />
      </div>{" "}
    </div>
  );
}

let nextData = [
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    ContentType: "video",
    ContentId: "23",
  },
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    backgroundColor: "#FFE3C2",
    ContentType: "pdf",
    ContentId: "24",
  },
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    ContentType: "pdf",
    ContentId: "26",
  },
  {
    Topic: "Chapter Name",
    discription: "Lorem ipsum dolor sit amet consectet",
    backgroundColor: "#FFE3C2",
    ContentType: "pdf",
    ContentId: "27",
  },
];

function Next() {
  const history = useNavigate();
  const ContentPlay = (contentId, contentType) => {
    history(`/course/5/${contentType}/${contentId}`);
  };
  return (
    <div
      className="Box-Shadow"
      style={{
        padding: "3%",
      }}
    >
      <div className="graphheadingFontSize" style={{ marginBottom: "5%" }}>
        Next
      </div>
      {nextData.map((ele) => {
        return (
          <div
            className="Box-Shadow"
            style={{
              width: "98%",
              display: "flex",
              padding: "2% 2% 2% 1%",
              marginTop: "4%",
              gap: "4%",
            }}
          >
            <div
              style={{
                width: "2em",
                height: "2em",
                backgroundColor: " #F9A40033",
                padding: ".8% .7% .8% .7%",
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
                  ContentPlay(ele.ContentId, ele.ContentType);
                }}
              >
                {ele.ContentType == "pdf" ? (
                  <PdfIcon width=".9em" height=".9em" />
                ) : (
                  <VideoIcon width=".9em" height=".9em" />
                )}
              </div>
            </div>

            <div
              style={{
                // border: "1px solid red",
                display: "flex",
                width: "80%",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                className="InterRegularFamily"
                style={{
                  fontSize: ".7em",
                  fontWeight: "300",
                  color: "#273143",
                }}
              >
                {`${ele.discription}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default CourseVideo;
