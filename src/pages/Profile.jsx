import React, { useContext, useEffect } from "react";
import context from "../context/Context";
import axios from "axios";
import MyBlogs from "../components/MyBlogs";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const auth = useContext(context);
  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get("http://localhost:4000/api/users/myprofile", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      auth.setUser(api.data.user);
      auth.setIsAuthenticated(true);
    };
    fetchUser();
  }, []);

  return (
    <div className="text-center">
      <h1><FaUser />{" "}{auth.user.name}</h1>
      <h1><MdEmail />{" "}{auth.user.email}</h1>
      <MyBlogs />
    </div>
  );
};

export default Profile;
