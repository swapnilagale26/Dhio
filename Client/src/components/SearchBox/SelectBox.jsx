function SelectBox({ option }) {
  return (
    <div className=" flex  height-per-100 width-per-40 align-item-center">
      <select
        className="height-per-100 input_focus  width-per-100 box-sizing"
        style={{
          padding: "0% 2%",
          borderRadius: "8px",
          border: "1px solid #ABABAB",
          background: "linear-gradient(0deg, #FBFBFB, #FBFBFB), linear-gradient(0deg, #ABABAB, #ABABAB)",
        }}
        name="type"
        onChange={(event) => {}}
      >
        {option.map((ele, index) => (
          <option value={index} disabled={index == 0} className="width-per-100">
            {ele.option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectBox;
