import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { getSortableTable } from "./getSortableTable";

import './table.css';

const Table = ({ data = [], columns = [], searchText, filters, onFiltersApply }) => {
  const [sortData, setSortData] = useState({});
  const [tableData] = getSortableTable(data, columns, searchText, filters, sortData);
  return (
    <>
      {!tableData.length ? <p className="no-results-message">No results to show!!!</p> :
        (
          <table className="table" cellSpacing={0} cellPadding={0}>
            <TableHead {...{ columns, handleSorting: setSortData, filters, onFiltersApply }} />
            <TableBody {...{ columns, tableData }} />
          </table>
        )
      }
    </>
  );
};

export default Table;