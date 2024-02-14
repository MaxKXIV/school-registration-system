import axios from "axios";
import { useNavigate } from "react-router-dom";
const checkLogin = async (user, pass) => {
  const navigate = useNavigate;
  axios
    .post("http://localhost:8080/login", { username: user, password: pass })
    .then(() => {
      navigate("/registration");
    })
    .catch((err) => {
      console.log(err);
      alert("Invalid Password");
    });
};

export default checkLogin;
