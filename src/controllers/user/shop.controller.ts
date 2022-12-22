class Shop {
  ShowShopV1(req, res) {
    let login = req.cookies.login;
    const idUser = req.cookies.idUser;
    res.render("user/shop-v1", { login: login, idUser: idUser });
  }
}
export default new Shop();
