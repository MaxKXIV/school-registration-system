import "./sectionlist.styles.css";
import Section from "../section/section.component";
// import Class from "../class/class.component";
const SectionList = ({ sectionList }) => {
  console.log(sectionList);
  return (
    <div>
      {sectionList.map((Item) => (
        <Section key={Item.id} section={Item}></Section>
      ))}
    </div>
  );
};

export default SectionList;
