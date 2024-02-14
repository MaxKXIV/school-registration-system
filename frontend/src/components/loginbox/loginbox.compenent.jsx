import { useState } from "react";
import "./loginbox.styles.css";
import { useNavigate } from "react-router-dom";
const LoginBox = () => {
  let [currentPass, setPass] = useState("");
  let [currentUser, setUser] = useState("");
  const navigate = useNavigate();

  return (
    <div className="loginbox-container">
      <h1>Nawecam Registration</h1>
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        className="username"
      ></input>
      <input
        type="text"
        onChange={(e) => setPass(e.target.value)}
        className="password"
      ></input>
      <button
        onClick={() => {
          console.log(currentPass, currentUser);
          if (currentPass === "admin" && currentUser === "admin") {
            navigate("/registration");
          } else {
            // console.log();
            alert("invalid login");
          }
        }}
      >
        login
      </button>
    </div>
  );
};

export default LoginBox;
