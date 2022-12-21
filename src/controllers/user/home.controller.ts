import { Product } from './../../schemas/product.schema';
import { Category } from './../../schemas/category.schema';
class HomeUser {
  async showHomePage(req, res) {
    await Product.find();
    await Category.find()
    let login = req.cookies.login;
    res.render("user/home", { login: login });
  }
  HomePage(req, res) {
    console.log(req.body);
  }
}
export default new HomeUser();
