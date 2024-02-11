import "./filter-selection-box.styles.css";

const FilterSelectionBox = ({ list, filterName, setSearchParam }) => {
  return (
    <select
      onChange={(item) =>
        setSearchParam((currentSearchParams) => {
          currentSearchParams.set(filterName, item.target.value);
          return currentSearchParams;
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
