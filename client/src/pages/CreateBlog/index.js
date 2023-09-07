import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [contents, setContents] = useState("");

  const navigate = useNavigate();

  const save = () => {
    if (title.length == 0) {
      toast.warning("please enter title");
    } else if (tags.length == 0) {
      toast.warning("please enter tags");
    } else if (contents.length == 0) {
      toast.warning("please enter contents");
    } else {
      const body = {
        title,
        tags,
        details: contents,
        userId: sessionStorage["id"],
      };

      const url = `${URL}/blog/`;
      axios.post(url, body).then((response) => {
        const result = response.data;
        if (result["status"] == "success") {
          toast.success("added new blog..");
          navigate("/home");
        } else {
          toast.error(result["error"]);
        }
      });
    }
  };

  return (
    <div>
      <h1 className="title">Create Blog</h1>

      <div className="form">
        <div className="mb-3">
          <label htmlFor="" className="label-control">
            Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="label-control">
            Tags
          </label>
          <input
            onChange={(e) => {
              setTags(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="label-control">
            Contents
          </label>
          <textarea
            onChange={(e) => {
              setContents(e.target.value);
            }}
            rows="10"
            className="form-control"
          ></textarea>
        </div>

        <div className="mb-3">
          <button onClick={save} className="btn btn-success">
            Save
          </button>
          <Link to="/home" className="btn btn-danger float-end">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
