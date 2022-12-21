class Cart {
  showCart(req, res) {
    let login = req.cookies.login;
    res.render("user/cart", { login: login });
  }
}
export default new Cart();
