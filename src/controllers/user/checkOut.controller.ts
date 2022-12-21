class CheckOut {
  showCheckOut(req, res) {
    let login = req.cookies.login;
    res.render("user/checkout", { login: login });
  }
}
export default new CheckOut();
