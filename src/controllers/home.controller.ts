import { User } from "../schemas/user.schema";

class Home {
  showHomePage(req, res) {
    let login = req.cookies.login;
    res.render("user/home",{login: login});
  }
  HomePage(req, res) {
    console.log(req.body);
  }
}
export default new Home();
