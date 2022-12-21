class Shop {
  ShowShopV1(req, res) {
    let login = req.cookies.login;
    res.render("user/shop-v1", { login: login });
  }
}
export default new Shop();
