import { Product } from "./../../schemas/product.schema";
import { Category } from "./../../schemas/category.schema";
import { Cart } from "./../../schemas/cart.schema";
class Products {
  async SingleProduct(req, res) {
    let idProduct = req.params.id;
    let dataProduct = await Product.findOne({ _id: idProduct });
    let login = req.cookies.login;
    const idUser = req.cookies.idUser;
    res.render("user/single-product", {
      login: login,
      idUser: idUser,
      data: dataProduct,
    });
  }
  async SearchProduct(req,res){
    let product = await Product.find(
      {
        title: { $regex: req.query.title, $options: "i" },
        quantity: { $gt: 0 },
      }
    );
    res.status(200).json(product);
  }
}
export default new Products();
