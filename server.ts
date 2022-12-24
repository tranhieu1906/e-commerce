import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
const flash = require("connect-flash");
import JWT from "jsonwebtoken";
import multer from "multer";
import { AuthRoute } from "./src/router/auth.router";
import { UserRoute } from "./src/router/user/user.router";
import { AdminRoute } from "./src/router/admin/admin.router";
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
app.use((req: any, res, next) => {
  const token = req.cookies.login;
  const idUser = req.cookies.idUser;
  JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
    req.payload = payload;
    if (payload) {
      res.cookie("idUser", payload.data._id, {
        maxAge: 900000,
        httpOnly: true,
      });
    }
    req.login = payload;
  });
  req.idUser = idUser;
  next();
});
app.use("/user", UserRoute);

app.use("/admin", Token.checkRole, AdminRoute);

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
