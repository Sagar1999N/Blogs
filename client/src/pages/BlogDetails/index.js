import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Blog from "../../components/blog";
import axios from "axios";
import { URL } from "../../config";
import Comment from "../../components/comment";
import { toast } from "react-toastify";

const BlogDetails = (props) => {
  const { state } = useLocation();
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState();
  const currentUserId = sessionStorage["id"];
  const navigate = useNavigate();

  const loadBlogDetails = () => {
    const { id } = state;
    const url = `${URL}/blog/details/${id}`;
    axios.get(url).then((response) => {
      const result = response.data;
      if (result["status"] == "success") {
        setBlog(result["data"]);
      }
    });
  };

  useEffect(() => {
    loadBlogDetails();
  }, []);

  const sendComment = () => {
    if (comment.length == 0) {
      toast.warning("please enter comment");
    } else {
      const { id } = state;

      const body = {
        userId: currentUserId,
        comment,
      };

      const url = `${URL}/comment/${id}`;
      axios.post(url, body).then((response) => {
        const result = response.data;

        // clear the comment box
        setComment("");

        if (result["status"] == "success") {
          toast.success("successfully added a comment");

          // refreshing the blog details
          loadBlogDetails();
        } else {
          toast.error(result["error"]);
        }
      });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1 className="title">Blog Details</h1>
        </div>
        <div className="col">
          {blog && blog.userId == currentUserId && (
            <button
              onClick={() => {
                navigate("/edit-blog", { state: { blog: blog } });
              }}
              className="btn btn-success float-end"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {blog && (
        <div>
          <div className="row">
            <div className="col">
              <Blog blog={blog} isDetails={true} />
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col">
              {blog.comments.map((comment) => {
                return <Comment comment={comment} />;
              })}
            </div>
          </div>
        </div>
      )}

      {blog && currentUserId != blog.userId && (
        <div>
          <div className="row">
            <div className="col">
              <textarea
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                rows="2"
                className="form-control"
                placeholder="your comment here"
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                onClick={sendComment}
                style={{ marginTop: "10px" }}
                className="btn btn-success"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
