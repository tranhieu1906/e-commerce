import { Product } from "./../../schemas/product.schema";
import sharp from "sharp";
import path from "path";
class HomeAdmin {
  async showHome(req, res) {
    let product = await Product.aggregate([{ $sort: { createdAt: -1 } }]);
    res.render("admin/index", { product: product });
  }
  async addProduct(req, res) {
    await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: "/images/uploads/" + req.file.filename,
      quantity: req.body.quantity,
    });
    res.redirect("/admin");
  }
  async deleteProduct(req, res) {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  }
  async deleteManyProducts(req, res) {
    let checkedProductIds = req.body;
    await Product.deleteMany({ _id: { $in: checkedProductIds } });
    res.redirect(req.get("referer"));
  }
  async editProduct(req,res){
    res.render("admin/edit")
  }
}
export default new HomeAdmin();
