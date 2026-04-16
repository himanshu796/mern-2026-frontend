import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Context from "../context/Context.jsx";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
  const fetchBlog = async () => {
    if (!auth.id) return; // ✅ Skip fetch if no id (new blog mode)

    try {
      const api = await axios.get(
        `https://mern-2026-backend.onrender.com/api/blogs/blog/${auth.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setTitle(api.data.blog.title);
      setDescription(api.data.blog.description);
      setImgUrl(api.data.blog.imgUrl);
    } catch (error) {
      console.error("Failed to fetch blog:", error.response?.data);
    }
  };

  fetchBlog();
}, [auth.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.id) {
      try {
        const api = await axios.post(
          `https://mern-2026-backend.onrender.com/api/blogs/new`,
          {
            title,
            description,
            imgUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        toast.success(api.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        auth.setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        auth.setIsAuthenticated(false);
      }
    } else {
      try {
        const api = await axios.put(
          `https://mern-2026-backend.onrender.com/api/blogs/${auth.id}`,
          {
            title,
            description,
            imgUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        toast.success(api.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        auth.setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);

        auth.setId("");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        auth.setIsAuthenticated(false);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container" style={{ width: "45%" }}>
        {auth.id ? (
          <h1 className="text-center my-3">Edit Blog</h1>
        ) : (
          <h1 className="text-center my-3">Add Blog</h1>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampletext"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              ImgUrl
            </label>
            <input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="d-grid gap-2 my-3">
            {auth.id ? (
              <button type="submit" className="btn btn-primary">
                Edit Blog
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Blog
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
