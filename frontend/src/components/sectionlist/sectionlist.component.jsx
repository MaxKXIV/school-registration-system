import "./sectionlist.styles.css";
import Section from "../section/section.component";
const SectionList = ({ sectionList }) => {
  return (
    <div>
      {sectionList.map((Item) => (
        <Section key={Item.id} section={Item}></Section>
      ))}
    </div>
  );
};

export default SectionList;
