const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Library API" });
});

//router
const booksRouter = require("./routes/booksRouter");
app.use("/api/user/books", booksRouter);

const authRouter = require("./routes/signupRouter");
app.use("api/auth", authRouter);
//start function
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
