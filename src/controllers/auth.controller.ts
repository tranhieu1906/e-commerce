import bcrypt from "bcrypt";
import { User } from "../schemas/user.schema";
import { userValidate } from "./validation.controller";
import passport from "../middlewares/passport.middleware";
import Token from "../middlewares/jwt.middleware";
class Auth {
  showFormRegister(req, res) {
    let error = req.flash("err");
    console.log("🚀 ~ file: auth.controller.ts:9 ~ Auth ~ showFormRegister ~ error", error)
    res.render("register", { data: error });
  }
  async register(req, res, next) {
    let user = req.body;
    try {
      let checkEmailname = await User.findOne({
        email: user.email,
      });
      if (checkEmailname) {
        req.flash("err", "Email đã được đăng ký");
        res.redirect("/auth/register");
      } else {
        const { error } = userValidate(user);
        if (error) {
          res.render("register", { data: error.message });
        } else {
          user.password = await bcrypt.hash(user.password, 10);
          console.log(user);
          user = await User.create(user);
          res.redirect(301, "/user/login");
        }
      }
    } catch (err) {
      console.log(err);
      next();
    }
  }
  showFormLogin(req, res) {
    res.render("login", { data: "" });
  }

  async login(req, res, next) {
    try {
      let data = req.body;
      let user = await User.findOne({
        email: data.email,
      });
      if (!user) {
        res.redirect("/auth/login");
      } else {
        let match = await bcrypt.compare(data.password, user.password);
        if (match) {
          const accessToken = await Token.signAccessToken(user);
          res.cookie("login", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          });
          res.redirect(301, "/home");
        } else {
          res.redirect("/auth/login");
        }
      }
    } catch (err) {
      next(err);
    }
  }
  async loginFacebook(req, res, next) {
    let data = {
      name: req.user.displayName,
      email: req.user.id + "@gmail.com",
      passport: Math.random(),
    };
    const accessToken = await Token.signAccessToken(data);
    res.cookie("login", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.redirect("/home");
  }
  async loginGoogle(req, res, next) {
    try {
          let data = {
            name: req.user.displayName,
            email: req.user.emails[0].value,
            passport: Math.random(),
          };
          const accessToken = await Token.signAccessToken(data);
          res.cookie("login", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          });
          res.redirect("/home");
    } catch (err) {
      next(err);
    }
  }
}

export default new Auth();
