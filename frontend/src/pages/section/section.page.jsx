import { useParams } from "react-router-dom";
import "./section.page.styles.css";
import { useQuery } from "@tanstack/react-query";
import fetchSection from "../../actions/fetchSection";
import axios from "axios";
import { useContext } from "react";
import IDContext from "../../context/IDContext";

const SectionPage = () => {
  const { id } = useParams();
  const student_id = useContext(IDContext);
  const results = useQuery({
    queryKey: ["Section-Details", id],
    queryFn: fetchSection,
  });
  if (results.isPending) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤷‍♂️</h2>
      </div>
    );
  }
  if (results.error) {
    <h1>Error getting section</h1>;
  }

  const section = results.data[0];

  const handleAddToCart = async () => {
    axios
      .post(`http://localhost:8080/registration/${id}`, {
        id: id,
        student_id: student_id,
      })
      .then(() => {
        alert("added to cart");
      })
      .catch((err) => {
        console.log(err);
        alert("could not add to cart, check your prereqs");
      });
  };

  return (
    <div className="section-page-container">
      <div className="info-container">
        <h1>{section.course_name}</h1>
        <div>
          <h2>
            {`${section.course_symbol}
            ${section.course_number}
            ${section.section_id}`}
          </h2>
        </div>
        <div>
          <h3>{section.semester}</h3>
          <h3>{section.year}</h3>
        </div>
        <div className="time-container">
          <h3>{`Start Time - ${section.start_time / 60} End Time - ${section.end_time / 60}`}</h3>
        </div>
        <h4>{`Teacher: ${section.first_name} ${section.last_name}`}</h4>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default SectionPage;
