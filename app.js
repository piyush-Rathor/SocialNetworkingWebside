const express = require("express");

const bodyParser = require("body-parser");
const multer = require("multer");

const mongoose = require("mongoose");
MONGODB_URI =
  "mongodb+srv://Piyush123:Piyush123@cluster0.v594s.mongodb.net/Chat-box?retryWrites=true&w=majority"; //a Permanent constant url h apne database ka
const session = require("express-session"); //session require kiya
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const fileStorage = multer.diskStorage({
  //multer package ka use karake destination matlab kha save karana h set kar rhe h and name set kar rhe h
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); //name diya h date se related
  },
});

const fileFilter = (req, file, cb) => {
  //fileFilter set kiya h hame es es type ki file hi keval accept karani h
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const path = require("path");

const app = express();
const store = new mongoDBStore({
  //object bnaya apne database se connect karane k liye
  uri: MONGODB_URI, //url diya apne database ka
  collection: "Session", //collection jha tum apne database m session store karoge nam diya h database m
});
const csrfProtection = csrf();

const loginRouter = require("./router/Login");
const signUpRouter = require("./router/Signup");
const chatRouter = require("./router/Chat");
const reqRouter = require("./router/req");
const photoRouter = require("./router/Photo");
const aboutRouter = require("./router/About");
const frndProfileRouter = require("./router/frndProfile");
const likeandCommentRouter = require("./router/LikesandComment");
const searchRouter = require("./router/search");

const User = require("./models/User");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); //use kiya h body-Parser
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("userProfilePhoto")
);
app.use(express.static(path.join(__dirname, "public"))); //ye hamane css k path ko add kiya
app.use("/images", express.static(path.join(__dirname, "images"))); //ye hamane css k path ko add kiya

app.set("view engine", "ejs"); //ejs ka engine use ho rha h ye btaya
app.set("views", "views"); //folder btaya k apne ejs ki files eske andar rakhi h pahala views represent kar rha h k ham ejs ki location de rhe h and dusara folder ka nam

app.use((req, res, next) => {
  const userId = req.query.userId;
  if (userId) {
    User.findById({
      _id: userId,
    }).then((user) => {
      user.lastSeen = new Date();
      user.save();
    });
  }
  next();
});

app.use(
  session({
    secret: "Piyush**123Piyush@@123",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(loginRouter);
app.use(signUpRouter);
app.use(chatRouter);
app.use(reqRouter);
app.use(photoRouter);
app.use(aboutRouter);
app.use(frndProfileRouter);
app.use(likeandCommentRouter);
app.use(searchRouter);

mongoose
  .connect(MONGODB_URI) //mongoose database connect ho jaye
  .then((result) => {
    //than tab hi server on ho
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
