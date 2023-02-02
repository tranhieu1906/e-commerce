import { Router } from "express";
import Auth from "../controllers/auth.controller";
import passport from "../middlewares/passport.middleware";
export const AuthRoute = Router();

AuthRoute.get("/register", Auth.showFormRegister);
AuthRoute.post("/register", Auth.register);
AuthRoute.get("/login", Auth.showFormLogin);
AuthRoute.post("/login", Auth.login);
AuthRoute.get("/logout", Auth.LogOut);

AuthRoute.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

AuthRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  Auth.loginFacebook
);

AuthRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

AuthRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  Auth.loginGoogle
);
