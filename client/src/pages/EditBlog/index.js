import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";
import { useLocation } from "react-router";

const EditBlog = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [contents, setContents] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const { blog } = state;
    setTitle(blog.title);
    setTags(blog.tags);
    setContents(blog.details);
  }, []);

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
      };

      const url = `${URL}/blog/${state.blog.id}`;
      axios.put(url, body).then((response) => {
        const result = response.data;
        if (result["status"] == "success") {
          toast.success("successfully updated blog..");
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
            value={title}
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
            value={tags}
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
            value={contents}
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

export default EditBlog;
