import "./Header.css";

function Header({ header, Component }) {
  return (
    <div className="flex width-per-100   Flex_direction">
      {header}
      <div className="flex flex-Combined horizontal-width">
        <div
          className="flex align-item-center box-sizing "
          style={{
            width: "100%",
            justifyContent: "space-between",
            gap: "3%",
          }}
        >
          {Component.map((ele) => {
            return ele;
          })}
        </div>
      </div>
    </div>
  );
}

function DemmyHeader({ width }) {
  return <div className="DemmyHeader" style={{ width: width }}></div>;
}

export default Header;
export { DemmyHeader };
