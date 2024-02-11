import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCourseSymbols } from "../../actions/useCourseSymbols";
import Filters from "../../components/filters/filters.component";
import SectionList from "../../components/sectionlist/sectionlist.component";

const RegistrationPage = () => {
  const [currentSectionsList, setSectionsList] = useState([]);
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const [currentSymbols] = useCourseSymbols();

  console.log(currentSymbols);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:8080/registration");
        setSectionsList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSections();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/registration?${currentSearchParams.toString()}`,
      );

      setSectionsList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <div className="filter-container">
        <Filters
          courseSymbols={currentSymbols}
          setSearchParams={setSearchParams}
          currentSearchParams={currentSearchParams}
          handleFilter={handleFilter}
        ></Filters>
      </div>
      <div className="sectionlist-container">
        <h1>List</h1>
        <SectionList sectionList={currentSectionsList}></SectionList>
      </div>
    </div>
  );
};

export default RegistrationPage;
