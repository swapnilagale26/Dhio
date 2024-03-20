const TableBody = ({ tableData, columns }) => {
  return (
    <tbody style={{ width: "100%" }}>
      {tableData.map((data, index) => {
        return (
          <tr key={index}>
            {columns.map(({ accessor, Cell }, aIndex) => {
              console.log(Cell);
              console.log(data[accessor]);
              const tData = data[accessor] ?? "——";
              return <td key={aIndex}>{Cell ? <Cell data={data} /> : tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
