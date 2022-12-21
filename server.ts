import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
const flash = require("connect-flash");
import { AuthRoute } from "./src/router/auth.router";
import { UserRoute } from "./src/router/user/user.router";
import Token from "./src/middlewares/jwt.middleware";
const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(flash());
app.use(cors());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "login",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.authenticate("session"));

app.use("/auth", AuthRoute);
// , Token.veryfyAccessToken
app.use("/user", UserRoute);

app.use(function (req, res, next) {
  res.render("404");
});
app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
  res.render("500");
});
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
