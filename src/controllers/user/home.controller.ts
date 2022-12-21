import { Product } from "./../../schemas/product.schema";
import { Category } from "./../../schemas/category.schema";
import { Cart } from "./../../schemas/cart.schema";
import JWT from "jsonwebtoken";

class HomeUser {
  async showHomePage(req, res) {
    let product = await Product.find().limit(8);
    const token = req.cookies.login;
    const idUser = req.cookies.idUser;
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      req.payload = payload;
      if (payload){
        res.cookie("idUser", payload.data._id, {
          maxAge: 900000,
          httpOnly: true,
        });
      }
      res.render("user/home", {
        login: payload,
        product: product,
        idUser: idUser
      });
    });
  }
  HomePage(req, res) {
    console.log(req.body);
  }
  async showAddCart(req, res) {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({ message: "Request received!", data: product });
  }
}
export default new HomeUser();
