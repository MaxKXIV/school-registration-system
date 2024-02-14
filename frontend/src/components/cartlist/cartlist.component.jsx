import "./cartlist.styles.css";
import CartSection from "../cartsection/cartsection.component";

const CartList = ({ sectionList, handleRegister, handleDelete }) => {
  return (
    <div>
      {sectionList.map((Item) => (
        <CartSection
          key={Item.id}
          section={Item}
          handleRegister={handleRegister}
          handleDelete={handleDelete}
        ></CartSection>
      ))}
    </div>
  );
};

export default CartList;
