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
      count: Math.ceil(count / size),
    });
  }
  async showList(req, res) {
    let product = await Product.find().limit(req.params.limit);
    res.json({ message: "limit!", data: product });
  }
  async pagination(req, res) {
    const size = parseInt(req.query.size) || 8;
    const page = parseInt(req.query.page) || 1;
    let totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / size);
    let productPage = await Product.find()
      .limit(size)
      .skip((page - 1) * size);
    res.json({
      message: "Total!",
      data: productPage,
      totalProduct: totalProduct,
    });
  }
  sortBy(req, res) {
    if (req.query.sort === "up") {
      Product.find()
        .sort({ price: 1 })
        .exec((err, products) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "limit!", data: products });
          }
        });
    } else {
      Product.find()
        .sort({ price: -1 })
        .exec((err, products) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "limit!", data: products });
          }
        });
    }
  }
}
export default new Shop();
