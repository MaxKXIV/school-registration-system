import { Link } from "react-router-dom";
import "./login.styles.css";
import LoginBox from "../../components/loginbox/loginbox.compenent";

const LoginPage = () => {
  return (
    <div className="login-container">
      <Link to={"/registration"}>
        <h1>LOGIN PAGE</h1>
      </Link>
      <div>
        <LoginBox></LoginBox>
      </div>
    </div>
  );
};

export default LoginPage;
