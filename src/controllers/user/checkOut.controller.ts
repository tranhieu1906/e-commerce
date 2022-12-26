import { Cart } from "./../../schemas/cart.schema";
import { CheckoutProduct } from "./../../schemas/checkOut.schema";
import { Product } from "./../../schemas/product.schema";

import JWT from "jsonwebtoken";

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
    JWT.verify(login, process.env.SECRET_KEY, (err, payload) => {
      req.payload = payload;
      if (payload) {
        res.cookie("idUser", payload.data._id, {
          maxAge: 900000,
          httpOnly: true,
        });
      }
      res.render("user/checkout", {
        login: payload,
        idUser: idUser,
        total: total,
        cart: cart.items,
      });
    });
  }
  async checkOut(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.cookies.idUser }).populate(
        "items.product"
      );
      let arr = [];
      let idProduct = [];
      cart.items.forEach((element) => {
        idProduct.push({
          productId: element.product._id,
        });
      });
      cart.items.forEach((element) => {
        arr.push({
          productId: element.product._id,
          //@ts-ignore
          name: element.product.title,
          quantity: element.quantity,
          //@ts-ignore
          price: element.product.price,
        });
      });
      CheckoutProduct.create({
        customer: {
          idUser: req.cookies.idUser,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        },
        items: arr,
        billingAddress: {
          name: req.body.name,
          street: req.body.street,
          city: req.body.city,
          zip: req.body.zip,
          country: req.body.country,
        },
      });
      cart.items.forEach(async (element) => {
        await Product.findByIdAndUpdate(
          { _id: element.product._id },
          {
            $set: {
              //@ts-ignore
              quantity: element.product.quantity - element.quantity,
            },
          }
        );
      });

      // Clear the cart
      cart.items = [];
      await cart.save();
      res.redirect(301, "/user/home");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
export default new CheckOut();

// [
//   {
//     product: {
//       _id: new ObjectId("63a7e8e1c46f876281863960"),
//       title: 'DOUBLE SLEEVES ZIP HOODIE - TASMAN',
//       description: 'NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made in Vietnam',
//       price: 549000,
//       image: '/images/uploads/image-1671948513569.null',
//       quantity: 2,
//       createdAt: 2022-12-24T17:00:00.000Z,
//       __v: 0
//     },
//     quantity: 1,
//     _id: new ObjectId("63a814bae168725b34951a88")
//   },
//   {
//     product: {
//       _id: new ObjectId("63a7e942c46f87628186396a"),
//       title: 'STRAIGHT SWEATPANTS - CREAM',
//       description: 'NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made in Vietnam',
//       price: 489000,
//       image: '/images/uploads/image-1671948610672.null',
//       quantity: 2,
//       createdAt: 2022-12-24T17:00:00.000Z,
//       __v: 0
//     },
//     quantity: 1,
//     _id: new ObjectId("63a81597e168725b34951a9b")
//   }
// ]
