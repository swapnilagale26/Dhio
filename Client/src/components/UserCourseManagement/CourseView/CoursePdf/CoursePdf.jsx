import Breadcrumb from "../../../Breadcrumb/Breadcrumb";
import { Notes } from "../../CourseDetail/CourseSecondSection";

let pdfData = {
  pdfName: "Machine Learning with Jakob",
  pdfId: "22",
  courseId: "5",
  pdfDiscription:
    "Lorem ipsum dolor sit amet consectetur. Faucibus iaculis viverra ut id nunc cursus ridiculus ipsum. Egestas pharetra amet odio orci. Adipiscing iaculis tincidunt vitae sed at bibendum pellentesque commodo feugiat. Scelerisque viverra et egestas nulla vestibulum mauris turpis pulvinar. Et sem pretium phasellus ultrices in. Ut ipsum dis et mollis neque proin in arcu.",
};

function CoursePdf() {
  return (
    <div className=" InterRegularFamily CourseDetail">
      <div className="CourseDetailTop">
        {/* pdf view section */}
        <div className="CourseFirstSection">
          <div className="font-size-9em InterBoldFamily">{pdfData.pdfName}</div>
          <Breadcrumb
            breadcrumbs={[
              { menu: "Courses", link: `/Course` },
              { menu: "OverView", link: `/Course/5` },
              { menu: "Details", link: `/course/${pdfData.courseId}/pdf/${pdfData.pdfId}` },
            ]}
          />
          {/* Video */}
          <div style={{ marginTop: "1.5%" }}>
            <iframe
              src="https://venturacompackages.s3.ap-south-1.amazonaws.com/pakage/AWSDeployPDf.pdf"
              frameborder="0"
              width={"100%"}
              height={"700px"}
            ></iframe>
          </div>

          {/* pdf Information*/}
          <div>
            <div>
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "1em", fontWeight: "600", marginBlock: "2%" }}>{pdfData.pdfName}</div>
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
              <div style={{ fontSize: ".8em", width: "98%" }}>{pdfData.pdfDiscription}</div>
            </div>
          </div>
        </div>
        <div
          className="CourseSecondSection"
          style={{
            marginTop: "2%",
          }}
        >
          <Notes />
        </div>
      </div>
    </div>
  );
}
export default CoursePdf;

// https://venturacompackages.s3.ap-south-1.amazonaws.com/pakage/AWSDeployPDf.pdf
