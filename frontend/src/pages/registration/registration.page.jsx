import axios from "axios";
import { useEffect, useState } from "react";
import Filters from "../../components/filters/filters.component";
import SectionList from "../../components/sectionlist/sectionlist.component";

const RegistrationPage = () => {
  const [currentSectionsList, setSectionsList] = useState([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:8080/registration");
        console.log(response.data);
        setSectionsList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSections();
  }, []);

  return (
    <div className="registration-container">
      <div className="filter-container">
        <Filters></Filters>
      </div>
      <div className="sectionlist-container">
        <h1>List</h1>
        <SectionList sectionList={currentSectionsList}></SectionList>
      </div>
    </div>
  );
};

export default RegistrationPage;
