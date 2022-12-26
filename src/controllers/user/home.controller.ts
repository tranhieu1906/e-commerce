import { Product } from "./../../schemas/product.schema";
import { Category } from "./../../schemas/category.schema";
import { Cart } from "./../../schemas/cart.schema";
import JWT from "jsonwebtoken";

class HomeUser {
  async showHomePage(req, res) {
    let product = await Product.find({ quantity: { $gt: 0 } }).limit(8);
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
      res.render("user/home", {
        login: payload,
        product: product,
        idUser: idUser,
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
  autocomplete(req, res) {
    let regex = new RegExp(req.query["term"], "i");
    // let productFilter = Product.find({ title: regex }, { title: 1 }, {quantity: { $gt: 0 }})
    //   .sort({
    //     createdAt: -1,
    //   })
    //   .limit(6);
    let productFilter = Product.aggregate([
      {$match: {title: {$regex: regex}, quantity: {$gt: 0}}},
      {$sort: {createdAt: -1}},
      {$limit: 6},
      {$project: {title: 1, _id: 0}}
    ])
    productFilter.exec((err, data) => {
      let result = [];
      if (!err) {
        if (data && data.length && data.length > 0) {
          data.forEach((product) => {
            let obj = {
              id: product._id,
              label: product.title,
            };
            result.push(obj);
          });
        }
        res.jsonp(result);
      }
    });
  }
}
export default new HomeUser();
