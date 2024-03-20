import { SearchIcon } from "../../icons";

function Searchbox({ style, event }) {
  return (
    <div className="width-per-40 height-per-100 align-item-center relative">
      <SearchIcon
        width=".8em"
        height=".8em"
        style={{ position: "absolute", top: "50%", left: "2%", transform: "translateY(-50%)" }}
      />
      <input
        className=" height-per-100 input_focus width-per-100 box-sizing"
        type="search"
        name=""
        id=""
        style={{
          flex: "1 1 0",
          padding: "1% 0% 1% 2em",
          borderRadius: "8px",
          border: "1px solid #ABABAB",
          background: "linear-gradient(0deg, #FBFBFB, #FBFBFB), linear-gradient(0deg, #ABABAB, #ABABAB)",
          // width: "200px",
        }}
        placeholder="Search  here..."
      />
    </div>
  );
}
export default Searchbox;
