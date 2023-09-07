const express = require("express");
const cors = require("cors");
const routerUser = require("./routes/userRoutes");
const routerRating = require("./routes/rating");
const routerComment = require("./routes/comment");
const routerBlog = require("./routes/blog");
const dotenv = require("dotenv");
dotenv.config();

//rest object
const app = express();

app.use(cors("*"));

app.use(express.json());

app.use("/user", routerUser);

// use the router to find all the apis related to the blogs
app.use("/blog", routerBlog);

// use the router to find all the apis related to the comment
app.use("/comment", routerComment);

// use the router to find all the apis related to the rating
app.use("/rating", routerRating);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} on port ${PORT}`);
});
