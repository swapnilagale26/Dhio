import pastevent from "./Pastevents.css";
import badge from "../CourseList/courseicons/badge.png";
import { PastEventIcon } from "../../icons";
function Pastevents() {
  return (
    <>
      <div className="events">
        <div>
          <h2>Past Events</h2>
        </div>
        <div className="midpast">
          <span className="badgename">
          <PastEventIcon/>
            <p className="font">
              <h3>badge name</h3>
              <p>Earn 20 points to earn this badge</p>
            </p>
          </span>
          <button className="newbutton">Start Now</button>
        </div >
        <div className="midpast">
          <div className="backc">
          <span className="badgename">
          <PastEventIcon/>
            <p className="fontP">
              <h3>badge name</h3>
              <p>Earn 20 points to earn this badge</p>
            </p>
          </span>
          </div>
          
        </div>
        <div className="midpast">
          <div className="backc">         
             <span className="badgename">
          <PastEventIcon/>
            <p className="fontP">
              <h3>badge name</h3>
              <p>Earn 20 points to earn this badge</p>
            </p>

          </span>
          </div>

          
        </div>

      </div>
    </>
  );
}
export default Pastevents;
