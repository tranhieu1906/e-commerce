import { Router } from "express";
import HomeAdmin from "../../controllers/admin/home.controller";
import multer from "multer";

export const AdminRoute = Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../../../src/public/images/uploads");
  },
  filename: function (req, file, cb) {
    let reg = /png|jpg|webp|jpeg|svg/;
    let type = file.mimetype.match(reg);
    let filename = `${file.fieldname}-${Date.now()}.${type}`;
    cb(null, filename);
  },
});

var upload = multer({ storage: storage });

AdminRoute.get("/", HomeAdmin.showHome);
AdminRoute.put("/", HomeAdmin.page);
AdminRoute.post("/add-product", upload.single("image"), HomeAdmin.addProduct);
AdminRoute.get("/delete/:id", HomeAdmin.deleteProduct);
AdminRoute.post("/delete-many", HomeAdmin.deleteManyProducts);
AdminRoute.get("/edit/:id", HomeAdmin.showEditProduct);
AdminRoute.post("/edit/:id", upload.single("file"), HomeAdmin.updateProduct);
AdminRoute.get("/user", HomeAdmin.userPage);
AdminRoute.get("/user/delete-many", HomeAdmin.deleteManyUser);
AdminRoute.get("/auto-complete", HomeAdmin.autocomplete);
AdminRoute.get("/search", HomeAdmin.searchProduct);


