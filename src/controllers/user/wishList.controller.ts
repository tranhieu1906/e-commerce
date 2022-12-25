import { wishList } from "../../schemas/wishlist.schema";
import { Product } from "./../../schemas/product.schema";

export class WhiteList {
  async ShowWishList(req, res) {
    try {
      let login = req.cookies.login;
      const idUser = req.cookies.idUser;
      let wishLists = await wishList.find({ user: idUser });
      if (wishLists.length === 0) {
        res.render("user/wishlist-empty", { login: login, idUser: idUser });
      } else {
        res.render("user/wishlist", {
          login: login,
          idUser: idUser,
          wishLists: wishLists[0].items,
        });
      }
    } catch (e) {
      console.log(e);
      res.redirect(301, "/user/home");
    }
  }
  async addWishList(req, res) {
    try {
      let wishlist = await wishList.findOne({ user: req.cookies.idUser });
      let product = await Product.findOne({ _id: req.params.id });
      if (!wishlist) {
        const newWishList = new wishList({
          items: [],
          user: req.cookies.idUser,
        });
        await newWishList.save();
        wishlist = newWishList;
        //@ts-ignore
        wishlist.items.push({
          name: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          product: req.params.id,
        });
        await wishlist.save();
      } else {
        //@ts-ignore
        wishlist.items.push({
          name: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          product: req.params.id,
        });
      }
      await wishlist.save();
      res.end();
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async deleteWishList(req, res) {
    const wishLists = await wishList.findOne({ user: req.cookies.idUser });
    wishLists.items = wishLists.items.filter((item) => {
      //@ts-ignore
      return item._id.toString() !== req.params.id;
    });
    await wishLists.save();
    res.end();
  }
  async showList(req, res) {
    try {
      let wishlist = await wishList.findOne({ user: req.cookies.idUser });
      res.json(wishlist);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new WhiteList();
