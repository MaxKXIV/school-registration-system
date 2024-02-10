import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import RegistrationPage from "./pages/registration/registration.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
