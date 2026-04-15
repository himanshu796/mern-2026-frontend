import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import context from "../context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const auth = useContext(context);
  const navigate = useNavigate();

  const logout = async () => {
    const api = await axios.get(`http://localhost:4000/api/users/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    auth.setIsAuthenticated(false);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="navbar">
        <Link to={"/"} className="left">
          <h2>MERN-2026</h2>
        </Link>

        <div className="right">
          {!auth.isAuthenticated && (
            <Link to={"/login"} className="items">
              <h3>
                <RiLoginBoxFill />
              </h3>
            </Link>
          )}

          {!auth.isAuthenticated && (
            <Link to={"/register"} className="items">
              <h3>Register</h3>
            </Link>
          )}

          {auth.isAuthenticated && (
            <Link to={"/addblog"} className="items">
              <h3>AddBlog</h3>
            </Link>
          )}

          {auth.isAuthenticated && (
            <Link to={"/profile"} className="items">
              <h3>
                <CgProfile />
              </h3>
            </Link>
          )}

          {auth.isAuthenticated && (
            <div onClick={logout} className="items">
              <h3>
                <RiLogoutBoxFill />
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
