import { Router } from "express";
export const UserRoute = Router();
import Home from "../../controllers/user/home.controller";
import Product from "../../controllers/user/product.controller";
import Cart from "../../controllers/user/cart.controller";
import checkOut from "../../controllers/user/checkOut.controller";
import shop from "../../controllers/user/shop.controller";
import whiteList from "../../controllers/user/whiteList.controller";

UserRoute.get("/home", Home.showHomePage);
UserRoute.post("/home", Home.HomePage);
UserRoute.get("/home/add-cart/:id", Home.showAddCart);

UserRoute.get("/single/product", Product.SingleProduct);

UserRoute.get("/home/cart-total", Cart.CartTotal);
UserRoute.get("/home/show-cart", Cart.showCart);
UserRoute.post("/add/cart/:productId", Cart.addCart);

UserRoute.get("/check-out", checkOut.showCheckOut);

UserRoute.get("/shop-v1", shop.ShowShopV1);

UserRoute.get("/white-list", whiteList.ShowWhiteList);
UserRoute.get("/white-list-empty", whiteList.ShowWhiteListEmpty);
