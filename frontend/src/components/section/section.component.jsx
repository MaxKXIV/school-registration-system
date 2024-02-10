import "./section.styles.css";

const Section = ({ section }) => {
  const {
    section_id,
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
    <div>
      <h2>{section_id}</h2>
      <h2>{course_symbol}</h2>
      <h2>{course_number}</h2>
      <p>{semester}</p>
      <p>{year}</p>
      <p>{capacity}</p>
      <p>{day}</p>
      <p>{start_time}</p>
      <p>{end_time}</p>
    </div>
  );
};

export default Section;
