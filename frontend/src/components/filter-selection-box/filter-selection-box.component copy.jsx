import "./filter-selection-box.styles.css";

const FilterSelectionBox = ({ list }) => {
  return (
    <select className="list-select">
      {list.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default FilterSelectionBox;
