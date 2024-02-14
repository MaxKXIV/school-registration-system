// import axios from "axios";
import { useContext } from "react";
// import { useNavigate } from "react-router";
import CartContext from "../../context/CartContext";
import SectionList from "../../components/sectionlist/sectionlist.component";
// import IDContext from "../../context/IDContext";

const CartPage = () => {
  // const id = useContext(IDContext);
  // eslint-disable-next-line no-unused-vars
  const [currentCartList, setCartList] = useContext(CartContext);

  return (
    <div className="registration-container">
      <div className="sectionlist-container">
        <h1>List</h1>
        <SectionList sectionList={currentCartList}></SectionList>
      </div>
    </div>
  );
};

export default CartPage;
