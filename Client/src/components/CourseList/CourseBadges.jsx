import "./CourseBadges.css";
import badge from "../CourseList/courseicons/badge.png";
function CourseBadges() {
  return (
    <>
      <div className="sectionBadge">
        <div>
          <h2>Badges</h2>
        </div>
        <div className="inter">
          <span className="d-flex-1">
            <img className="imgd" src={`${badge}`} alt="" />
            <p className="font">
              <h3>badge name</h3>
              <p>Earn 20 points to earn this badge</p>
            </p>
          </span>
          <button className="newbutton">Start Now</button>
        </div>
        <div className="inter">
          <span className="d-flex-1">
            <img className="imgd" src={`${badge}`} alt="" />
            <p className="font">
              <h3>badge name</h3>
              <p>Just need 2 more points this badge.</p>
            </p>
          </span>
          <button className="newbutton">Start Now</button>
        </div>
        <hr />
        <h2>Earned Badges</h2>
        <div className="inter">
          <span className="d-flex-1">
            <img className="imgd" src={`${badge}`} alt="" />
            <p className="font">
              <h3>badge name</h3>
              <p>Earned on 24 May, 2023</p>
            </p>
          </span>
        </div>
        <div className="inter">
          <span className="d-flex-1">
            <img className="imgd" src={`${badge}`} alt="" />
            <p className="font">
              <h3>badge name</h3>
              <p>Earned on 24 May, 2023</p>
            </p>
          </span> 
        </div>
      </div>
    </>
  );
}
export default CourseBadges;
