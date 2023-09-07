import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AuthorizeUser = () => {
  const loginStatus = sessionStorage["loginStatus"];
  return loginStatus == "1" ? <Home /> : <Signin />;
  // if (loginStatus == '1') {
  //   return <Home />
  // } else {
  //   return <Signin />
  // }
};

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthorizeUser />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/edit-blog" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
