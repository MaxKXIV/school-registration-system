import "./filters.styles.css";
import FilterSelectionBox from "../filter-selection-box/filter-selection-box.component";
const Filters = ({ setSearchParams, currentSearchParams, handleFilter }) => {
  const symbol = [
    "CMPT",
    "ACCT",
    "MATH",
    "AABB",
    "BBAA",
    "1234",
    "1235",
    "3546",
    "POOP",
  ];
  const semester = ["Fall", "Winter"];
  const year = ["2024", "2025"];
  const days = ["Monday-Wednesday-Friday", "Tuesday-Thursday"];
  const timeslots = [
    "8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
    "8-10",
    "10-12",
    "12-2",
    "2-4",
    "4-6",
  ];

  return (
    <div>
      <h1>Filters</h1>
      <div className="filters-container">
        <FilterSelectionBox
          list={symbol}
          filterName={"symbol"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={semester}
          filterName={"semester"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={year}
          filterName={"year"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={days}
          filterName={"days"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={year}
          filterName={"year"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={timeslots}
          filterName={"timeslots"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <button onClick={handleFilter}>filter</button>
      </div>
    </div>
  );
};

export default Filters;
