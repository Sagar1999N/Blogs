import moment from "moment";
import axios from "axios";
import { URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { formatDate, formatDateAgo } from "../utils";

const styles = {
  title: {
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  subtitle: {
    color: "darkgray",
  },
  detailsContainer: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  toggleButton: {
    cursor: "pointer",
    width: "20px",
    height: "20px",
    margin: "5px",
  },
};

const Blog = (props) => {
  const { blog, isDetails } = props;
  const currentUserId = sessionStorage["id"];
  const navigate = useNavigate();

  const toggleLike = (type) => {
    const body = {
      type,
      userId: currentUserId,
    };

    const url = `${URL}/blog/${blog.id}/toggle-like`;
    axios.patch(url, body).then((response) => {
      const result = response.data;
      if (result["status"] == "success") {
        toast.success(
          `successfully ${type == 1 ? "liked" : "disliked"} the blog`
        );
      } else {
        toast.error(result["error"]);
      }
    });
  };

  return (
    <div key={blog.id}>
      <div className="row">
        <div className="col">
          <div style={styles.title}>{blog.title}</div>
          <div style={styles.subtitle}>
            Created By {blog.firstName} on {formatDate(blog.createdTimestamp)} (
            {formatDateAgo(blog.createdTimestamp)})
          </div>
        </div>

        <div className="col text-end">
          {blog.userId != currentUserId && (
            <div className="row">
              <div className="col">
                <img
                  style={styles.toggleButton}
                  onClick={() => {
                    toggleLike(1);
                  }}
                  src={require("../assets/like.png")}
                ></img>

                <img
                  style={styles.toggleButton}
                  onClick={() => {
                    toggleLike(0);
                  }}
                  src={require("../assets/dislike.png")}
                ></img>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col" style={styles.subtitle}>
              {blog.ratings.length} ratings
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={styles.detailsContainer}>
        <div className="col">
          {!isDetails
            ? blog.details.length > 100
              ? blog.details.substring(0, 100) + "..."
              : blog.details
            : blog.details}
        </div>
      </div>

      {!isDetails && (
        <div className="row">
          <div className="col">
            <button
              onClick={() => {
                // go to blog detail along with the blog id
                navigate("/blog-details", { state: { id: blog.id } });
              }}
              className="btn btn-link"
            >
              read more
            </button>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
};

export default Blog;
