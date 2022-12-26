import { Product } from "./../../schemas/product.schema";
import { User } from "./../../schemas/user.schema";
import { Cart } from "./../../schemas/cart.schema";
import { wishList } from "../../schemas/wishlist.schema";
import { CheckoutProduct } from "./../../schemas/checkOut.schema";

class HomeAdmin {
  async showHome(req, res) {
    let product = await Product.aggregate([{ $sort: { createdAt: -1 } }]).limit(
      8
    );
    const size = parseInt(req.query.size) || 8;
    const page = parseInt(req.query.page) || 1;
    let totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / size);
    let productPage = await Product.find()
      .limit(size)
      .skip((page - 1) * size);
    res.render("admin/index", {
      product: product,
      totalPages: totalPages,
      productPage: productPage,
      page: page,
    });
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
    await Cart.updateMany(
      {},
      {
        $pull: {
          items: { product: req.params.id },
        },
      }
    );
    await wishList.updateMany(
      {},
      {
        $pull: {
          items: { product: req.params.id },
        },
      }
    );
    res.redirect("/admin");
  }
  async deleteManyProducts(req, res) {
    let checkedProductIds = req.body;
    await Product.deleteMany({ _id: { $in: checkedProductIds } });
    await Cart.updateMany(
      {},
      {
        $pull: {
          items: { product: { $in: checkedProductIds } },
        },
      }
    );
    await wishList.updateMany(
      {},
      {
        $pull: {
          items: { product: { $in: checkedProductIds } },
        },
      }
    );
    res.redirect(req.get("referer"));
  }
  async showEditProduct(req, res) {
    let product = await Product.findOne({ _id: req.params.id });
    res.render("admin/edit", { product: product });
  }
  async updateProduct(req, res) {
    await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: "/images/uploads/" + req.file.filename,
      }
    );
    res.redirect("/admin");
  }
  async page(req, res) {
    const size = parseInt(req.query.size) || 8;
    const page = parseInt(req.query.page) || 1;
    let totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / size);
    let productPage = await Product.find()
      .limit(size)
      .skip((page - 1) * size);
    res.json({
      message: "Total!",
      data: productPage,
      totalProduct: totalProduct,
    });
  }
  async userPage(req, res) {
    let user = await User.find();
    res.render("admin/user", { user: user });
  }
  async deleteManyUser(req, res) {
    let checkedProductIds = req.body;
    await User.deleteMany({ _id: { $in: checkedProductIds } });
    res.redirect(req.get("referer"));
  }
  autocomplete(req, res) {
    let regex = new RegExp(req.query["term"], "i");
    let productFilter = Product.find({ title: regex }, { title: 1 })
      .sort({
        createdAt: -1,
      })
      .limit(6);
    productFilter.exec((err, data) => {
      let result = [];
      if (!err) {
        if (data && data.length && data.length > 0) {
          data.forEach((product) => {
            let obj = {
              id: product._id,
              label: product.title,
            };
            result.push(obj);
          });
        }
        res.jsonp(result);
      }
    });
  }
  async searchProduct(req, res) {
    let product = await Product.find({
      title: { $regex: req.query.title, $options: "i" },
    });
    res.status(200).json(product);
  }
  async ShowPageBestseller(req, res) {
    let checkout = await CheckoutProduct.find();
    let arrMonth = [];
    checkout.forEach((element) => {
      if (!arrMonth.includes(element.createdAt.getMonth() + 1)) {
        arrMonth.push(element.createdAt.getMonth() + 1);
      }
    });
    const result = await CheckoutProduct.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date("2022-12-01"),
            $lt: new Date("2023-01-01"),
          },
        },
      },
    ]);
    const groupedItems = {};
    checkout.forEach((order) => {
      order.items.forEach((item) => {
        const month = order.createdAt.getMonth() + 1;
        if (!groupedItems[month]) {
          groupedItems[month] = [];
        }
        groupedItems[+month].push(item);
      });
    });
    console.log(groupedItems);
    res.render("admin/bestseller", { arrMonth: arrMonth });
  }
}
export default new HomeAdmin();
