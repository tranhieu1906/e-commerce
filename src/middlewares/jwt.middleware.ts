import JWT from "jsonwebtoken";
import createError from "http-errors";
class Token {
  async signAccessToken(data) {
    return new Promise((resolve, reject) => {
      const payload = {
        data,
      };
      const secret = process.env.SECRET_KEY;
      const options = {
        expiresIn: "24h",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  async signRefreshToken(userID) {
    return new Promise((resolve, reject) => {
      const payload = {
        userID,
      };
      const secret = process.env.REFERENCE_TOKEN;
      const options = {
        expiresIn: "1y",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  async veryfyAccessToken(req, res, next) {
    if (!req.cookies.login) {
      return res.redirect("/auth/login");
    }
    const token = req.cookies.login;
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }
      req.payload = payload;
      next();
    });
  }
  async checkRole(req, res, next) {
    try {
      const token = req.cookies.login;

      const decoded = JWT.verify(token, process.env.SECRET_KEY);
      // @ts-ignore
      const userRole = decoded.data.role;
      if (userRole === "admin") {
        next();
      } else {
        res.redirect("/auth/login")
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export default new Token();
