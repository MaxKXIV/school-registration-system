import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Link to={"/RegistrationPage"}>
      <div>
        <h1>LOGIN PAGE</h1>
      </div>
    </Link>
  );
};

export default LoginPage;
