import React, { useState } from "react";
import "./Users.css";
import Frame from "../GroupAndCommunitesImage/Fram.png";
import Frame2 from "../GroupAndCommunitesImage/Frame2.png";
import Frame3 from "../GroupAndCommunitesImage/Frame3.png";
import Frame4 from "../GroupAndCommunitesImage/Frame4.png";
import Frame5 from "../GroupAndCommunitesImage/Frame5.png";
import Frame6 from "../GroupAndCommunitesImage/Frame6.png";
import Frame7 from "../GroupAndCommunitesImage/Frame7.png";
import Frame8 from "../GroupAndCommunitesImage/Frame8.png";
import Frame9 from "../GroupAndCommunitesImage/Frame9.png";
import Frame10 from "../GroupAndCommunitesImage/Frame10.png";
import Frame11 from "../GroupAndCommunitesImage/Frame11.png";
import Frame12 from "../GroupAndCommunitesImage/Frame12.png";
import chat1 from "../GroupAndCommunitesImage/chat1.png";
import chat2 from "../GroupAndCommunitesImage/chat2.png";
import chat3 from "../GroupAndCommunitesImage/chat3.png";
import chat4 from "../GroupAndCommunitesImage/chat4.png";
import chat5 from "../GroupAndCommunitesImage/chat5.png";

function Users() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="user">
        <span id="frame">
          <img className="Frame" src={Frame} alt="" />
          <img className="Frame" src={Frame2} alt="" />
          <img className="Frame" src={Frame3} alt="" />
          <img className="Frame" src={Frame4} alt="" />
          <img className="Frame" src={Frame5} alt="" />
          <img className="Frame" src={Frame6} alt="" />
          <img className="Frame" src={Frame7} alt="" />
          <img className="Frame" src={Frame8} alt="" />
          <img className="Frame" src={Frame9} alt="" />
          <img className="Frame" src={Frame10} alt="" />
          <img className="Frame" src={Frame11} alt="" />
          <img className="Frame" src={Frame12} alt="" />
          <img className="Frame" src={Frame9} alt="" />
          <img className="Frame" src={Frame} alt="" />
        </span>
      </div>
      <div className="chatlist">
        <div className="heading">
          <h2>1154 Result</h2>
          <span className="checkboxnew">
            <h5>Select All</h5>
            <input style={{width:"75px"}} type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          </span>
        </div>
        <div className="chatresults">
          <div className="newchat">
            <span className="chat1">
              <img src={`${chat1}`} alt="error" />
            </span>
            <div className="chatname">
              <p className="Extend">
                <strong className="font-weight-600">Quirin Mensing</strong>{" "}
              </p>
              <small>Pune, India</small>
            </div>
          </div>
          <div>
            <input id="box" type="checkbox" />
          </div>
        </div>
        <div className="chatresults">
          <div className="newchat">
            <span className="chat1">
              <img src={`${chat2}`} alt="error" />
            </span>
            <div className="chatname">
              <p className="Extend">
                <strong className="font-weight-600">Prof. Dr. Nikita Jerschabek</strong>{" "}
              </p>
              <small>Pune, India</small>
            </div>
          </div>
          <div>
            <input id="box" type="checkbox" />
          </div>
        </div>
        <div className="chatresults">
          <div className="newchat">
            <span className="chat1">
              <img src={`${chat3}`} alt="error" />
            </span>
            <div className="chatname">
              <p className="Extend">
                <strong className="font-weight-600">Evelin Hartmann</strong>{" "}
              </p>
              <small>Pune, India</small>
            </div>
          </div>
          <div>
            <input id="box" type="checkbox" />
          </div>
        </div>
        <div className="chatresults">
          <div className="newchat">
            <span className="chat1">
              <img src={`${chat4}`} alt="error" />
            </span>
            <div className="chatname">
              <p className="Extend">
                <strong className="font-weight-600">Ayman Lindenberg</strong>{" "}
              </p>
              <small>Pune, India</small>
            </div>
          </div>
          <button id="btn">Already Added</button>
          <div>
            <input id="box" type="checkbox" />
          </div>
        </div>
        <div className="chatresults">
          <div className="newchat">
            <span className="chat1">
              <img src={`${chat5}`} alt="error" />
            </span>
            <div className="chatname">
              <p className="Extend">
                <strong className="font-weight-600">Johanna Schmitt</strong>{" "}
              </p>
              <small>Pune, India</small>
            </div>
          </div>
          <div>
            <input id="box" type="checkbox" />
          </div>
        </div>
        <div className="action-newbar">
          <input className="secondary-button" type="button" value="Cancel" />
          <input className="primary-button" type="button" value="Save Changes" />
        </div>
      </div>
    </>
  );
}

export default Users;
