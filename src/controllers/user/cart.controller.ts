import { Cart } from "./../../schemas/cart.schema";
class Carts {
  async showCart(req, res) {
    let product = await Cart.find({ user: req.cookies.idUser }).populate(
      "items.product"
    );
    res.json({ message: "Request received!", data: product });
  }
  async addCart(req, res) {
    try {
      let cart = await Cart.findOne({ user: req.cookies.idUser });
      if (!cart) {
        // If the cart doesn't exist, create it
        const newCart = new Cart({
          items: [],
          user: req.cookies.idUser,
        });
        await newCart.save();
        cart = newCart;
      }
      let newItem = true;
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].product.toString() === req.params.productId) {
          cart.items[i].quantity++;
          newItem = false;
          break;
        }
      }
      if (newItem) {
        cart.items.push({
          product: req.params.productId,
          quantity: req.body.quantity,
        });
      }
      await cart.save();
      res.redirect(301, "/user/home");
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async CartTotal(req, res) {
    const cart = await Cart.findOne({ user: req.cookies.idUser }).populate(
      "items.product"
    );
    let total = 0;
    let totalProduct = 0
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      //@ts-ignore
      const price = item.product.price;
      const quantity = item.quantity;
      totalProduct += item.quantity;
      total += price * quantity;
    }
    res.json({ message: "Total!", data: total, totalProduct: totalProduct });
  }
}
export default new Carts();
