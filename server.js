const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");

const app = express();
const passport = require("./config/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRouter = require("./routes/signupRouter");
const booksRouter = require("./routes/booksRouter");
const loginRouter = require("./routes/loginRouter");

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

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Express session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: true,
    },
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to Library API" });
});

//router
app.use("/api/user/books", booksRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth", loginRouter);

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
