class Product {
  SingleProduct(req, res) {
    let login = req.cookies.login;
    res.render("user/single-product", { login: login });
  }
}
export default new Product();
