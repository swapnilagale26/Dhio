import { useState } from "react";
import { RatingStarIcon, OptionIcon } from "../../../icons";
import Button from "../../Dashboard/AdminDashboard/Button";
import card1 from "./CourseDetailImages/card1.png";
import card2 from "./CourseDetailImages/card2.png";
import card3 from "./CourseDetailImages/card3.png";
import card4 from "./CourseDetailImages/card4.png";
import userIcon from "../../Dashboard/AdminDashboard/Adminicons/Ficon.png";
import "./CourseBottom.css";
import { useNavigate } from "react-router-dom";

function CourseBottom() {
  const history = useNavigate();
  const ContentPlay = (contentId, contentType) => {
    history(`/course/5/${contentType}/${contentId}`);
  };
  return (
    <div>
      <div className="font-weight-600" style={{ fontSize: "1em", marginBlock: "1%" }}>
        Syllabus
      </div>
      <div className="Box-Shadow">
        {/* <Accordion /> */}
        {AccordingCardSectionData.map((ele) => {
          return <AccordingCardSection {...ele} ContentPlay={ContentPlay} />;
        })}
      </div>
      <InviteUser />
      <RatingReview />
      <UserReview />
    </div>
  );
}
export default CourseBottom;

let AccordionData = {
  heading: "Introduction Call",
  card: [],
};

// Accordion componoent
// function Accordion() {
//   // state variable to hide and  open accordion card
//   let [accordionStatus, setAccordionStatus] = useState(true);
//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "12px",
//           borderRadius: "10px",
//           boxShadow: "0px 0px 6px 0px #00000014",
//         }}
//       >
//         <div style={{ fontSize: ".8em", fontWeight: "500" }}>
//           {AccordionData.heading}
//         </div>
//         <div>
//           {accordionStatus ? (
//             <UpwardIcon
//               onClick={() => {
//                 setAccordionStatus(!accordionStatus);
//               }}
//             />
//           ) : (
//             <DownWardIcon
//               onClick={() => {
//                 setAccordionStatus(!accordionStatus);
//               }}
//             />
//           )}
//         </div>
//       </div>
//       {/* according Cards */}
//       <div>
//         <AccordionCard />
//       </div>
//     </div>
//   );
// }

// let AccordionCardData = {
//   heading: "Agriculture, forestry and fishing",
//   card: [],
// };
//  Accordion Card
// function AccordionCard() {
//   let [accordionCardStatus, setAccordionCardStatus] = useState(true);
//   return (
//     <div style={{ marginTop: "2%" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "12px",
//           borderRadius: "10px",
//           backgroundColor: "#DAF5FF",
//         }}
//       >
//         <div style={{ fontSize: ".8em", fontWeight: "500", color: "#00BAFF" }}>
//           {AccordionCardData.heading}
//         </div>
//         <div>
//           {accordionCardStatus ? (
//             <UpwardIcon
//               onClick={() => {
//                 setAccordionCardStatus(!accordionCardStatus);
//               }}
//             />
//           ) : (
//             <DownWardIcon
//               onClick={() => {
//                 setAccordionCardStatus(!accordionCardStatus);
//               }}
//             />
//           )}
//         </div>
//       </div>
//       <div>

//       </div>
//      {
//       AccordingCardSectionData.map((ele)=>{
//         return(
//             <AccordingCardSection {...ele}/>
//         )
//       })
//      }
//     </div>
//   );
// };

let AccordingCardSectionData = [
  {
    image: card1,
    heading: "Heading",
    discription:
      "Lorem ipsum dolor sit amet consectetur. Massa et in donec quam nibh sit lorem molestie. Eu semper mattis sagittis urna. Sed semper ultricies sed volutpat.",
    completionPer: "98",
    ContentType: "video",
    ContentId: "23",
  },
  {
    image: card3,
    heading: "Heading",
    discription:
      "Lorem ipsum dolor sit amet consectetur. Massa et in donec quam nibh sit lorem molestie. Eu semper mattis sagittis urna. Sed semper ultricies sed volutpat.",
    completionPer: "0",
    ContentType: "call",
    ContentId: "24",
  },
  {
    image: card2,
    heading: "Heading",
    discription:
      "Lorem ipsum dolor sit amet consectetur. Massa et in donec quam nibh sit lorem molestie. Eu semper mattis sagittis urna. Sed semper ultricies sed volutpat.",
    completionPer: "0",
    ContentType: "file",
    ContentId: "25",
  },
  {
    image: card4,
    heading: "Heading",
    discription:
      "Lorem ipsum dolor sit amet consectetur. Massa et in donec quam nibh sit lorem molestie. Eu semper mattis sagittis urna. Sed semper ultricies sed volutpat.",
    completionPer: "100",
    ContentType: "file",
    ContentId: "26",
  },
];

function AccordingCardSection({ ContentPlay, ...AccordingCardSectionData }) {
  let buttonText =
    AccordingCardSectionData.ContentType == "call"
      ? "Join Call"
      : AccordingCardSectionData.completionPer == 100
      ? "Restart"
      : AccordingCardSectionData.completionPer == 0
      ? "Start"
      : "Resume";
  return (
    <div
      className="centerAlign box-sizing width-per-100 justify-space-btw"
      style={{
        height: "fit-content",
        padding: "1%",
        marginTop: "2%",
        gap: "2%",
      }}
    >
      <div
        style={{
          width: "15%",
          height: "100%",
          padding: ".5% .5% 0% .5%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <img src={AccordingCardSectionData.image} alt="" style={{ width: "80%" }} />
        </div>
      </div>

      <div className="flex flex-Combined flex-direction-Column">
        <div className="font-w-600" style={{ fontSize: ".8em" }}>
          {AccordingCardSectionData.heading}
        </div>
        <div style={{ fontSize: ".65em", marginBlock: "1%" }}>{AccordingCardSectionData.discription}</div>
        {AccordingCardSectionData.ContentType != "call" ? (
          <div style={{ fontSize: ".8em", color: "#5CB85C" }}>
            <span>{AccordingCardSectionData.completionPer}% Completed</span>
          </div>
        ) : null}
      </div>

      <div className="flex align-item-center justify-flex-end">
        <button
          className={"tabHeaderSecButton"}
          style={{
            color: "#00BAFF",
            backgroundColor: "#FFFFFF",
            border: "2px solid ",
          }}
          onClick={() => {
            ContentPlay(AccordingCardSectionData.ContentId, AccordingCardSectionData.ContentType);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function InviteUser() {
  let userInrole = [1, 1, 1, 1, 1, 1];
  return (
    <>
      <div
        className="authorized-users InterBoldFamily centerAlign width-per-100"
        style={{
          backgroundColor: "#F9A40033",
          borderRadius: "8px",
          paddingBlock: "2%",
          marginBlock: "2%",
          fontSize: ".8em",
          color: "#273143",
          gap: "1%",
        }}
      >
        <div>
          {userInrole?.map((ele, index) => {
            // const invitedUser = users?.find(user => user._id === invitedId) || {};
            // console.log(invitedUser);
            return index < 3 && <img src={userIcon} className="user-image userImageSize hideImage" alt="user-avatar" />;
          })}
        </div>
        <div style={{ fontSize: ".8em" }}>
          {"Sarthak Singh, Vrushabh Shelar & 2.6K peoples was completed this course."}
        </div>
      </div>
    </>
  );
}

function RatingReview() {
  return (
    <>
      <div style={{ fontSize: "1em", fontWeight: "600", marginBlock: "1%" }}>Ratings and Review</div>
      <div
        style={{
          border: "0.5px solid #ABABAB",
          borderRadius: "8px",
        }}
      >
        <div
          className="flex align-item-center"
          style={{
            borderBottom: "0.5px solid #ABABAB",
            padding: "1% 1%",
          }}
        >
          <div>Rate Us:</div>
          <div className="flex">
            {[1, 1, 1, 1, 1].map((ele) => {
              return <RatingStar />;
            })}{" "}
          </div>
        </div>
        <textarea
          className="width-per-100 box-sizing input_focus"
          name=""
          id=""
          style={{
            height: "10em",
            padding: "1%",
            border: "none",
            backgroundColor: "#FBFBFB",
          }}
          placeholder="Write Review(optional)"
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2%",
        }}
      >
        <button
          discription="Cancel"
          className={"tabHeaderSecButton"}
          style={{ backgroundColor: "#FFFFFF", color: "#00BAFF", border: "2px solid " }}
        >
          Cancel{" "}
        </button>
        <button
          discription="Rate Now"
          className={"tabHeaderSecButton"}
          style={{ backgroundColor: "#ABABAB", color: "#FFFFFF", marginLeft: "2%", border: "none" }}
        >
          Rate Now
        </button>
      </div>
    </>
  );
}

function RatingStar() {
  let [fill, setFill] = useState(false);
  return (
    <div
      onClick={() => {
        setFill(!fill);
      }}
      style={{
        marginInline: "6%",
      }}
    >
      <RatingStarIcon fill={fill ? "#5CB85C" : "none"} />
    </div>
  );
}

function UserReview() {
  let userReview = [
    {
      image: userIcon,
      userName: "Sagar Patil",
      Date: "12 Jan 2024",
      review:
        "Lorem ipsum dolor sit amet consectetur. Mi est in nunc lacus dictum. Vitae donec egestas feugiat ut nulla. Eget commodo habitant neque sit cursus mauris aliquet mi. Urna turpis in tortor arcu sed euismod vestibulum sapien. Cursus habitasse viverra fringilla in.",
    },
    {
      image: userIcon,
      userName: "pratiK Patil",
      Date: "12 Jan 2024",
      review:
        "Lorem ipsum dolor sit amet consectetur. Mi est in nunc lacus dictum. Vitae donec egestas feugiat ut nulla. Eget commodo habitant neque sit cursus mauris aliquet mi. Urna turpis in tortor arcu sed euismod vestibulum sapien. Cursus habitasse viverra fringilla in.",
    },
    {
      image: userIcon,
      userName: "Ovi Patil",
      Date: "12 Jan 2024",
      review:
        "Lorem ipsum dolor sit amet consectetur. Mi est in nunc lacus dictum. Vitae donec egestas feugiat ut nulla. Eget commodo habitant neque sit cursus mauris aliquet mi. Urna turpis in tortor arcu sed euismod vestibulum sapien. Cursus habitasse viverra fringilla in.",
    },
  ];

  return userReview.map((ele) => {
    return (
      <div
        style={{
          marginTop: "3%",
        }}
      >
        <div className="flex box-sizing width-per-100">
          <div
            style={{
              width: "5%",
              padding: ".5% 0% 0% .5%",
            }}
          >
            <div className="width-per-100 height-per-100">
              <img src={userIcon} alt="" className="width-per-100" />
            </div>
          </div>

          <div
            className="flex flex-direction-Column  justify-space-ard flex-Combined"
            style={{
              marginLeft: "2%",
            }}
          >
            <div className="font-w-600 " style={{ fontSize: ".8em" }}>
              {ele.userName}
            </div>
            <div className="width-per-100" style={{ fontSize: ".6em" }}>
              {ele.Date}
            </div>
          </div>

          <div
            style={{
              paddingTop: ".5%",
            }}
          >
            <OptionIcon />
          </div>
        </div>

        <div
          className="center-align flex-direction-column"
          style={{
            width: "90%",
            padding: ".5% 0% 0% .5%",
          }}
        >
          <div className="width-per-100" style={{ fontSize: ".7em" }}>
            {ele.review}
          </div>
        </div>
      </div>
    );
  });
}
