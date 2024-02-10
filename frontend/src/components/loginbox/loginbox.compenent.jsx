import "./loginbox.styles.css";
const LoginBox = () => {
  return (
    <div className="loginbox-container">
      <h1>Login</h1>
      <input className="username"></input>
      <input className="password"></input>
      <button>login</button>
    </div>
  );
};

export default LoginBox;
