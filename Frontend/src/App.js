import React from "react";
import Signup from "./Auth/Signup";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Navbarcode from "./nav/Navbarcode";
import Login from "./Auth/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
const App = () => {
  const { token } = useSelector((state) => state.users);
  console.log("🚀 ~ App ~ token:", token);
  return (
    <BrowserRouter>
      <Navbarcode />
      <Toaster />
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
