import "./filters.styles.css";
import FilterSelectionBox from "../filter-selection-box/filter-selection-box.component";
const Filters = ({
  courseSymbols,
  setSearchParams,
  currentSearchParams,
  handleFilter,
}) => {
  const semester = ["Semester", "Fall", "Winter"];
  const year = ["Year", "2024", "2025"];
  const days = ["Days", "Monday-Wednesday-Friday", "Tuesday-Thursday"];
  const start_time = [
    "Start-Time",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
  ];

  const end_time = [
    "End-Time",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ];

  return (
    <div>
      <h1>Filters</h1>
      <div className="filters-container">
        <FilterSelectionBox
          list={courseSymbols}
          filterName={"course_symbol"}
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
          filterName={"day"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={start_time}
          filterName={"start_time"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <FilterSelectionBox
          list={end_time}
          filterName={"end_time"}
          setSearchParam={setSearchParams}
          currentSearchParams={currentSearchParams}
        ></FilterSelectionBox>
        <button onClick={handleFilter}>filter</button>
      </div>
    </div>
  );
};

export default Filters;
