import { Product } from "./../../schemas/product.schema";
let size = 8;
class Shop {
  async ShowShopV1(req, res) {
    let product = await Product.find().limit(8);
    let login = req.cookies.login;
    const idUser = req.cookies.idUser;
    let count = await Product.find().count();
    res.render("user/shop-v1", {
      login: login,
      idUser: idUser,
      product: product,
      count: Math.round(count / size),
    });
  }
  async showList(req, res) {
    let product = await Product.find().limit(req.params.limit);
    res.json({ message: "limit!", data: product });
  }
  async pagination(req, res) {
    const page = req.params.page || 1;
    const offset = (page - 1) * size;
    Product.find({ offset: offset, limit: size }, (err, items) => {
      if (err) {
        res.status(500).json({ error: "Error fetching items" });
      } else {
        res.json(items);
      }
    });
  }
}
export default new Shop();
