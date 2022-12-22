import { Cart } from "./../../schemas/cart.schema";

class CheckOut {
  async showCheckOut(req, res) {
    let login = req.cookies.login;
    const idUser = req.cookies.idUser;
    const cart = await Cart.findOne({ user: req.cookies.idUser }).populate(
      "items.product"
    );
    let total = 0;
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      //@ts-ignore
      const price = item.product.price;
      const quantity = item.quantity;
      total += price * quantity;
    }
    res.render("user/checkout", {
      login: login,
      idUser: idUser,
      total: total,
      cart: cart.items,
    });
  }
  async checkOut(req,res){
    try {
      const cart = await Cart.findOne({ user: req.cookies.idUser }).populate(
        "items.product"
      );
      // Clear the cart
      cart.items = [];
      await cart.save();
      res.redirect(301,"/user/home")
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
export default new CheckOut();
