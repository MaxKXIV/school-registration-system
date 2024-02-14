import "./login.styles.css";
// import checkLogin from "../../actions/checkLogin";
import LoginBox from "../../components/loginbox/loginbox.compenent";

const LoginPage = () => {
  let currentPassword = "";
  let currentUsername = "";
  console.log(currentPassword);
  console.log(currentUsername);

  return (
    <div className="login-container">
      <h1>LOGIN PAGE</h1>
      <LoginBox></LoginBox>
    </div>
  );
};

export default LoginPage;
