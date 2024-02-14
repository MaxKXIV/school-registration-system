import axios from "axios";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import CartList from "../../components/cartlist/cartlist.component";
import IDContext from "../../context/IDContext";

const CartPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentCartList, setCartList] = useContext(CartContext);
  const student_id = useContext(IDContext);
  console.log(currentCartList);
  const handleRegister = async (section_id) => {
    await axios
      .post(`http://localhost:8080/registration/register/${section_id}`, {
        id: section_id,
        student_id: student_id,
      })
      .then(() => {
        alert("registered to class");
        setCartList(currentCartList.filter((item) => item.id !== section_id));
      })
      .catch((err) => {
        console.log(err);
        alert("could not register for class");
      });
  };

  const handleDelete = async (section_id) => {
    console.log(section_id);
    await axios
      .patch(`http://localhost:8080/registration/cart/${section_id}`, {
        id: section_id,
        student_id: student_id,
      })
      .then(() => {
        alert("Removed from cart");
        setCartList(currentCartList.filter((item) => item.id !== section_id));
      })
      .catch((err) => {
        console.log(err);
        alert("could not delete from cart");
      });
  };
  return (
    <div className="registration-container">
      <div className="sectionlist-container">
        <h1>List</h1>
        <CartList
          sectionList={currentCartList}
          handleRegister={handleRegister}
          handleDelete={handleDelete}
        ></CartList>
      </div>
    </div>
  );
};

export default CartPage;
