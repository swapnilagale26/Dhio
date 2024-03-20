import CourseFirstSection from "./CourseFirstSection";
import CourseSecondSection from "./CourseSecondSection";
import CourseBottom from "./CourseBottom";
import "./CourseDetail.css";
function CourseDetail() {
  return (
    <div className=" InterRegularFamily CourseDetail">
      <div className="CourseDetailTop">
        <div className="CourseFirstSection">
          <CourseFirstSection />
        </div>
        <div className="CourseSecondSection">
          <CourseSecondSection />
        </div>
      </div>
      <div className="CourseFirstSection ">
        <CourseBottom />
      </div>
    </div>
  );
}
export default CourseDetail;
