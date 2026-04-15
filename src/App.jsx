import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import context from "./context/Context.jsx";

const App = () => {
  const navigate = useNavigate();
  const auth = useContext(context);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
