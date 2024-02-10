import "./filters.styles.css";
import FilterSelectionBox from "../filter-selection-box/filter-selection-box.component copy";
const Filters = () => {
  const list = [
    "CMPT",
    "ACCT",
    "MATH",
    "CMPT",
    "CMPT",
    "ACCT",
    "MATH",
    "CMPT",
    "ACCT",
    "MATH",
    "CMPT",
    "ACCT",
    "MATH",
    "CMPT",
    "ACCT",
    "MATH",
  ];
  const semester = ["Fall", "Winter"];
  const year = ["2024", "2025"];
  const days = ["Monday-Wednesday-Friday", "Tuesday-Thursday"];
  const timeslots = [
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [8, 10],
    [10, 12],
    [12, 2],
    [2, 4],
    [4, 6],
  ];

  return (
    <div>
      <h1>Filters</h1>
      <form className="filters-container">
        <FilterSelectionBox list={list}></FilterSelectionBox>
        <FilterSelectionBox list={semester}></FilterSelectionBox>
        <FilterSelectionBox list={year}></FilterSelectionBox>
        <FilterSelectionBox list={days}></FilterSelectionBox>
        <FilterSelectionBox list={year}></FilterSelectionBox>
        <FilterSelectionBox list={timeslots}></FilterSelectionBox>
        <button>filter</button>
      </form>
    </div>
  );
};

export default Filters;
