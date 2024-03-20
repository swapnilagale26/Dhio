
import "./Communities.css"; 
import icons1 from "./icons/Extended.png"
import icons2 from "./icons/phased.png"
import icons3 from "./icons/Multi.png"
import icons4 from "./icons/Group1.png"
import icons5 from "./icons/Group2.png"
import icons6 from "./icons/Group3.png"
import React from "react";


const Communities = ()=>  {
  return (
    <div className="communitiscontainer">
    
            <div className="cardCommunities">
             
              <div className="card-body">
              <div className="d-flex-justify mb">
                <h4>My Communities</h4>
                <button className="see_all_button">See all</button>
              </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src={`${icons1}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">Extended</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src={`${icons2}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">Phased</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src= {`${icons3}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">Multi-channelled</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardCommunities">
              <div className="card-body">
              <div className="d-flex-justify mb">
                <h4>My Groups</h4>
                <button className="see_all_button">See all</button>
              </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src= {`${icons4}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">Dickens, Mayert and Scham</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src={`${icons5}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">McClure, Batz and Kirlin</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
                <div className="d-flex-justify mb-3">
                  <div className="d-flex-align-center">
                    <span className="mr-2">
                      <img src={`${icons6}`} alt="error" />
                    </span>
                    <div>
                      <p className="mb-2">
                        <strong className="font-weight-600">Reynolds LLC</strong>{" "}
                      </p>
                      <small>Last visited on Jan 9, 2024</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default Communities;
