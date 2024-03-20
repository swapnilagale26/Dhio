
import icons1 from "./newicons/Ficon.png";
import icons2 from "./newicons/Sicon.png";
import icons3 from "./newicons/Ticon.png";
import icons4 from "./newicons/Iicon4.png";
import icons5 from "./newicons/iconnew5.png";
import icons6 from "./newicons/iconNew6.png";
import React from "react";
import "./Leaderboard.module.css";


const Leaderboard = ()=>  {
  return (
    <div className="communitiscontainer">
    
    <div className="cardCommunities">
     
      <div className="card-body">
      <div className="d-flex-justify mb">
        <h4>Top 5 on Leaderboard</h4>
        
      </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src={`${icons1}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Manoj Verma</strong>{" "}
              </p>
              <small>Collects 350 points</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src={`${icons2}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Mrs. Marc Hamill</strong>{" "}
              </p>
              <small>Collects 345 points</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src= {`${icons3}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Brent Graham DDS</strong>{" "}
              </p>
              <small>Collects 9 Badges</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
      </div>
    </div>
 
    <div className="cardCommunities">
     
      <div className="card-body">
      <div className="d-flex-justify mb">
        <h4>Top Rated Courses</h4>
        
      </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src= {`${icons4}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Course name</strong>{" "}
              </p>
              <small>2500 Assigned users</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src={`${icons5}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Course name</strong>{" "}
              </p>
              <small>3654 assigned users</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
        <div className="d-flex-justify mb-3">
          <div className="d-flex-align-center">
            <span className="mr-2">
              <img src={`${icons6}`} alt="error" />
            </span>
            <div>
              <p className="mb-2">
                <strong className="font-weight-600">Course name</strong>{" "}
              </p>
              <small>12485 assigned users</small>
            </div>
          </div>
          {/* <div>
            <button className="btn btn-blue-lighter">32 Members</button>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Leaderboard;
