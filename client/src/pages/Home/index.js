import Blog from "../../components/blog";
import SearchBar from "../../components/searchBar";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  // get the logged in user's information
  const { id, firstName, lastName } = sessionStorage;
  const navigate = useNavigate();

  // used only for testing
  const [blogs, setBlogs] = useState([]);

  // make a call to the search api to get the results
  const searchBlogs = () => {
    const url = `${URL}/blog/search`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result["status"] == "success") {
        setBlogs(result["data"]);
      } else {
        toast.error(result["error"]);
      }
    });
  };

  // load the data in the beginning
  useEffect(() => {
    searchBlogs();
    console.log("getting called");
  }, []);

  const logoutUser = () => {
    // remove the logged users details from session storage
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("loginStatus");

    // navigate to sign in component
    navigate("/signin");
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Blogs</h1>
        </div>

        <div className="col">
          <div className="float-end">
            <div className="btn-group " role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome {firstName}
              </button>
              <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li>
                  <Link to="/create-blog" className="dropdown-item">
                    Create
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item">Profile</a>
                </li>
                <li>
                  <button onClick={logoutUser} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <SearchBar />
        </div>
      </div>

      <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className="col">
          {blogs.map((blog) => {
            return <Blog blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
