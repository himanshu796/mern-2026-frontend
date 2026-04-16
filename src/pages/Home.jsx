import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetail from "../components/UserDetail.jsx";

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(`https://mern-2026-backend.onrender.com/api/blogs/allblogs`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setBlog(api.data.blogs);
    };
    fetchBlog();
  }, []);

  return (
    <>
      <div className="container text-center my-5" style={{ maxWidth: "56%" }}>
        {blog.map((data) => {
          return (
            <div
              className="card mb-3 bg-secondary text-light my-5"
              style={{ maxWidth: "760px" }}
              key={data._id}
            >
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img
                    src={data.imgUrl}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">
                      <small>{data.createdAt}</small>
                    </p>
                    <UserDetail id={data.user} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
