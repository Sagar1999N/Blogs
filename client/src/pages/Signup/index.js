import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../config";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // used to navigate from one component to another
  const navigate = useNavigate();

  const signupUser = () => {
    if (firstName.length == 0) {
      toast.warning("Please enter first name");
    } else if (lastName.length == 0) {
      toast.warning("Please enter last name");
    } else if (email.length == 0) {
      toast.warning("Please enter email");
    } else if (password.length == 0) {
      toast.warning("Please enter password");
    } else if (confirmPassword.length == 0) {
      toast.warning("Please confirm your password");
    } else if (password != confirmPassword) {
      toast.warning("Password does not match");
    } else {
      const body = {
        firstName,
        lastName,
        email,
        password,
      };

      // url to call the api
      const url = `${URL}/user/signup`;

      // http method: post
      // body: contains the data to be sent to the API
      axios.post(url, body).then((response) => {
        // get the data from the response
        const result = response.data;
        console.log(result);
        if (result["status"] == "success") {
          toast.success("Successfully signed up new user");

          // navigate to the signin page
          navigate("/signin");
        } else {
          toast.error(result["error"]);
        }
      });
    }
  };

  return (
    <div>
      <h1 className="title">Signup</h1>

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                First Name
              </label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Last Name
              </label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Email Address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Confirm Password
              </label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <div>
                Already have an account? <Link to="/signin">Signin here.</Link>
              </div>
              <button onClick={signupUser} className="btn btn-primary">
                Signup
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Signup;
