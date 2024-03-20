import courseimg from "../CourseList/courseicons/courseimg1.png";
import courseimg2 from "../CourseList/courseicons/CourseImage.png";
import rating from "../CourseList/courseicons/rating.png";
import search from "../CourseList/courseicons/searchicon.jpg";
import timer from "../CourseList/courseicons/timeicon.jpg";
import ok from "../CourseList/courseicons/complete.png";
import { CourseCategoryIcon, CoursetypeIcon, RatingIcon, RightIcon, SearchCategoryIcon } from "../../icons";
import { useNavigate } from "react-router-dom";

import Course from "./Courses.css";

let courseList = [
  {
    courseName: "Machine learning with Jakob",
    courseName: "Tenetur repellat corporis",
    courseImage: courseimg,
    courseDuration: "2/3 month",
    courseDiscription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At placeat quidem debitis similique provident  enim dolorem quo distinctio adipisci recusandae accusantium dolores tempora perspiciatis repellat  itaque, aliquid quisquam asperiores consequuntur.",
  },
  
  {
    courseName: "Machine learning with Jakob",
    courseImage: courseimg2,
    courseDuration: "2/3 month",
    courseDiscription:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At placeat quidem debitis similique provident  enim dolorem quo distinctio adipisci recusandae accusantium dolores tempora perspiciatis repellat  itaque, aliquid quisquam asperiores consequuntur.",
  },
];
function Courses() {
  const history = useNavigate();
  return (
    <>
      <div className="course-container">
        {courseList.map((ele) => {
          return (
            <div className="child-container">
              <img className="courseimg2" src={`${ele.courseImage}`} alt="" />
              <p className="coursename">
                <span className="rating">
                  <h3>{ele.courseName}</h3>
                  <img className="ratesize" src={`${rating}`} alt="" />
                </span>
                <div className="category">
                  <CourseCategoryIcon />
                  <p>Course Category</p>
                  <SearchCategoryIcon />
                  <p>{ele.courseDuration}</p>
                  <button className="upbtn">Hurry Up!</button>
                </div>
                <div className="parasection">
                  <p>{ele.courseDiscription}</p>
                </div>
                <div className="btsection">
                  <span className="comp">
                    <RightIcon />
                    <p>Complete</p>
                  </span>
                  <button
                    className="btnlaunch"
                    onClick={() => {
                      history("/course/5");
                    }}
                  >
                    Launch
                  </button>
                </div>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Courses;
