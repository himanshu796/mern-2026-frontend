import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const UserDetail = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(`http://localhost:4000/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      //console.log(api.data.blogs);
      setUser(api.data.user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <h4><FaUser />{" "}{user.name}</h4>
      <h4><MdEmail />{" "}{user.email}</h4>
    </>
  );
};

export default UserDetail;
