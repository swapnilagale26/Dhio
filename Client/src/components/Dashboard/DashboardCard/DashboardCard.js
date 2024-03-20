import { useEffect, useState } from "react";
import { cardBackGroundImage1 } from "../../../icons";
import "./DashboardCard.css";

function DashboardCard({ cardData, classNames }) {
  // let [cardData, setCardData] = useState(null);
  // useEffect(() => {
  //   setCardData(
  //     cardData
  //   );
  // }, []);

  return (
    cardData && (
      <div className="DashboardCard">
        {cardData.map((data) => {
          return (
            <div
              style={{
                //width: "0px",
                height: "100%",
                //backgroundColor: `${data.backgroundColor}`,
                borderRadius: "8px",
                backgroundImage: `url(${data.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flex: "1", // we set flex zero because intial size taken by each flexable item is zero   we want
                // padding:'32px 0px 0px 32px'
              }}
            >
              <div style={{ margin: data?.margin ?? "10%" }}>
                <div className={`${classNames.cardHeading}`} style={{ marginBottom: "2%" }}>
                  {data.value}
                </div>
                <div className={`${classNames.cardDiscription}`}>{data.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
export default DashboardCard;
