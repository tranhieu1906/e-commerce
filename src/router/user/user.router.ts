import { Router } from "express";
export const UserRoute = Router();
import Home from "../../controllers/user/home.controller";
import Product from "../../controllers/user/product.controller";
import Cart from "../../controllers/user/cart.controller";
import checkOut from "../../controllers/user/checkOut.controller";
import shop from "../../controllers/user/shop.controller";
import whiteLists from "../../controllers/user/wishList.controller";
import Token from "../../middlewares/jwt.middleware";

UserRoute.get("/home", Home.showHomePage);
UserRoute.post("/home", Home.HomePage);
UserRoute.get("/home/add-cart/:id", Home.showAddCart);
UserRoute.get("/auto-complete",Home.autocomplete);

UserRoute.get("/single/product/:id", Product.SingleProduct);
UserRoute.get("/search", Product.SearchProduct);

UserRoute.get("/home/cart-total", Cart.CartTotal);
UserRoute.get("/home/show-cart", Cart.showCart);
UserRoute.get("/cart", Cart.Carts);
UserRoute.post("/save-cart/:productId", Cart.saveCart);
UserRoute.get("/delete-cart/:productId", Cart.deleteCart);
UserRoute.post("/add/cart/:productId", Token.veryfyAccessToken, Cart.addCart);


UserRoute.get("/check-out", checkOut.showCheckOut);
UserRoute.post("/check-out", checkOut.checkOut);

UserRoute.get("/shop-v1", shop.ShowShopV1);
UserRoute.get("/home/show-list/:limit", shop.showList);
UserRoute.put("/shop-v1/:page", shop.pagination);

UserRoute.get("/wish-list", whiteLists.ShowWishList);
UserRoute.get("/add/wish-list/:id", whiteLists.addWishList);
UserRoute.delete("/wish-list/:id", whiteLists.deleteWishList);
UserRoute.get("/show-list/:id", whiteLists.showList);