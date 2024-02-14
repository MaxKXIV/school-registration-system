import { useParams } from "react-router-dom";
import "./section.styles.css";
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
      .then()
      .catch((err) => {
        console.log(err);
        alert("could not add to cart, check your prereqs");
      });
  };

  return (
    <div>
      <h1>Section</h1>
      <h1>{section.id}</h1>
      <p>{section.section_id}</p>
      <p>{section.semester}</p>
      <p>{section.year}</p>
      <p>{section.course_symbol}</p>
      <p>{section.course_number}</p>
      <p>{section.start_time}</p>
      <p>{section.end_time}</p>
      <p>{section.teacher_id}</p>
      <p>{section.room_number}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default SectionPage;
