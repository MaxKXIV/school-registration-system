import "./filter-selection-box.styles.css";

const FilterSelectionBox = ({ list, filterName, setSearchParam }) => {
  const doNotAddList = [
    "Type",
    "Semester",
    "Year",
    "Days",
    "Start-Time",
    "End-Time",
  ];
  return (
    <select
      onChange={(item) =>
        setSearchParam((currentSearchParams) => {
          //Checks if the default option is selected and removes it from query string
          if (doNotAddList.includes(item.target.value)) {
            if (currentSearchParams.has(filterName)) {
              currentSearchParams.delete(filterName);
            }
            return currentSearchParams;
          } else {
            //Adds filter name and filter to the query string
            currentSearchParams.set(filterName, item.target.value);
            return currentSearchParams;
          }
        })
      }
      className="list-select"
    >
      {list.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default FilterSelectionBox;
