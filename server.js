const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const app = express();
const booksRouter = require("./routes/booksRouter");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Library API" });
});

//router
app.use("/api/user/books", booksRouter);

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
