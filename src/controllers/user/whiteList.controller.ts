class WhiteList {
  ShowWhiteList(req, res) {
    let login = req.cookies.login;
    res.render("user/wishlist", { login: login });
  }
  ShowWhiteListEmpty(req, res) {
    let login = req.cookies.login;
    res.render("user/wishlist-empty", { login: login });
  }
}
export default new WhiteList();
