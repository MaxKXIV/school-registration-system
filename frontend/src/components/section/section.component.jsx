import "./section.styles.css";
import { Link } from "react-router-dom";
const Section = ({ section }) => {
  const {
    id,
    semester,
    year,
    course_symbol,
    course_number,
    start_time,
    end_time,
    day,
    capacity,
  } = section;

  return (
    <Link to={`/registration/${id}`}>
      <div className="section-container">
        <div className="section-title">
          <h2>{course_symbol}</h2>
          <h2>{course_number}</h2>
        </div>
        <div className="section-body">
          <p>{semester}</p>
          <p>{year}</p>
          <p>{capacity}</p>
        </div>
        <div className="section-body">
          <p>{day}</p>
          <p>{start_time}</p>
          <p>{end_time}</p>
        </div>
      </div>
    </Link>
  );
};

export default Section;
