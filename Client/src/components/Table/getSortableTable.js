
function getDefaultSorting(defaultTableData = [], columns = []) {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter((column) => column.sortbyOrder);

    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    let { accessor = "name", sortbyOrder = "asc" } = Object.assign(
      {},
      ...filterColumn
    );
    if (!a[accessor]) {
      accessor = 'firstname'
    }
    if (!a[accessor]) {
      accessor = 'title'
    }
    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = a[accessor]
      .toString()
      .localeCompare(b[accessor].toString(), "en", {
        numeric: true,
      });

    return sortbyOrder === "asc" ? ascending : -ascending;
  });
  return sorted;
}
const filterdData = (data, columns, searchText, filters = {}) => {
  let dataToReturn = data;
  if(searchText) {
    dataToReturn = data.filter(d => columns.some(column => `${d[column?.accessor]}`?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())));
  }
  Object.keys(filters).forEach((accessor) => {
    const {filterType1, filterValue1} = filters[accessor];
    if(filterType1 && filterValue1) {
      if(filterType1 === 'contains') {
        dataToReturn = data.filter(d => `${d[accessor]}`?.toLocaleLowerCase().includes(filterValue1.toLocaleLowerCase()));
      } 
      if(filterType1 === 'not_contains') {
        dataToReturn = data.filter(d => !`${d[accessor]}`?.toLocaleLowerCase().includes(filterValue1.toLocaleLowerCase()));
      }
      if(filterType1 === 'equals') {
        dataToReturn = data.filter(d => `${d[accessor]}`?.toLocaleLowerCase() === filterValue1.toLocaleLowerCase());
      }
      if(filterType1 === 'not_equals') {
        dataToReturn = data.filter(d => `${d[accessor]}`?.toLocaleLowerCase() !== filterValue1.toLocaleLowerCase());
      }
      if(filterType1 === 'starts_with') {
        dataToReturn = data.filter(d => (`${d[accessor]}`?.toLocaleLowerCase()).startsWith(filterValue1.toLocaleLowerCase()));
      }
      if(filterType1 === 'ends_with') {
        dataToReturn = data.filter(d => (`${d[accessor]}`?.toLocaleLowerCase()).endsWith(filterValue1.toLocaleLowerCase()));
      }
      if(filterType1 === 'blank') {
        dataToReturn = data.filter(d => `${d[accessor]}` === '');
      }
    }
  })
  return dataToReturn;
}

export const getSortableTable = (data, columns, searchText, filters, sortData) => {
  let tableData = getDefaultSorting(filterdData(data, columns, searchText, filters), columns);
  const { accessor, sortOrder } = sortData;
  if (accessor) {
    const sorted = [...tableData].sort((a, b) => {
      if (a[accessor] === null) return 1;
      if (b[accessor] === null) return -1;
      if (a[accessor] === null && b[accessor] === null) return 0;
      return (
        a[accessor].toString().localeCompare(b[accessor].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    tableData =sorted;
  }

  return [tableData];
};