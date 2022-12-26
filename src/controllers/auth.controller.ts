import bcrypt from "bcrypt";
import { User } from "../schemas/user.schema";

import passport from "../middlewares/passport.middleware";
import Token from "../middlewares/jwt.middleware";
class Auth {
  showFormRegister(req, res) {
    let error = req.flash("err");
    res.render("register", { data: error });
  }
  async register(req, res, next) {
    let user = req.body;
    try {
      let checkEmailname = await User.findOne({
        email: user.email,
      });
      if (checkEmailname) {
        res.redirect("/auth/register");
      } else {
        user.password = await bcrypt.hash(user.password, 10);
        user = await User.create(user);
        res.redirect(301, "/auth/login");
      }
    } catch (err) {
      console.log(err);
      next();
    }
  }
  showFormLogin(req, res) {
    res.render("login", { data: "" });
  }
  LogOut(req, res) {
    res.clearCookie("login");
    res.clearCookie("idUser");
    res.redirect(301, "/");
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
          res.redirect(301, "/");
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
    res.redirect("/");
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
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
}

export default new Auth();
