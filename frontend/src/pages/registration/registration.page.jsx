import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { useCourseSymbols } from "../../actions/useCourseSymbols";
import Filters from "../../components/filters/filters.component";
import SectionList from "../../components/sectionlist/sectionlist.component";
import IDContext from "../../context/IDContext";

const RegistrationPage = () => {
  const [currentSectionsList, setSectionsList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [_, setCartList] = useContext(CartContext);
  const id = useContext(IDContext);
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const [currentSymbols] = useCourseSymbols();

  //
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const responseSections = await axios.get(
          "http://localhost:8080/registration",
        );
        const responseCart = await axios.get(
          `http://localhost:8080/registration/cart/${id}`,
        );
        setCartList(responseCart.data);
        setSectionsList(responseSections.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSections();
  }, []);

  /**
   * gets a filtered list of sections
   */
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
        <Link to="/registration/cart/">
          <button>🛒</button>
        </Link>
      </div>
      <div className="sectionlist-container">
        <h1>List</h1>
        <SectionList sectionList={currentSectionsList}></SectionList>
      </div>
    </div>
  );
};

export default RegistrationPage;
