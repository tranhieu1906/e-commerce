import { User } from "../schemas/user.schema";

class Home {
  showHomePage(req, res) {
    res.render("home");
  }
  HomePage(req, res) {
    console.log(req.body);
  }
}
export default new Home();
