import { useState } from "react";
import { DataFilterIcon, SortDown, SortUp } from "../../icons";
import ColumnFilters from "../ColumnFilters/ColumnFilters";
const TableHead = ({ columns, handleSorting, filters, onFiltersApply }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [showFilter, setShowFilter] = useState(null);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting({accessor, sortOrder});
  };

  const onConfirm = (filtersToSet) => {
    onFiltersApply({...filters, ...filtersToSet});
    setShowFilter(null);
  }

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable, filterable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
                ? "down"
                : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={cl}
            >
              {sortable ? (
                <div className="sortable-column">
                  {label}
                  <div className="filter-section">
                    {filterable && (
                      <div className='filters'>
                        <DataFilterIcon 
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setShowFilter(showFilter === accessor ? null : accessor);
                          }
                        }/>
                        {showFilter === accessor && (<ColumnFilters onConfirm={onConfirm} filters={filters[accessor]} accessor={accessor} />)}
                      </div>
                    )}
                    {accessor === sortField && (
                        <span>{order === 'asc' ? <SortDown /> : <SortUp />}</span>
                    )}
                  </div>
                </div>)
                : label
              }
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;