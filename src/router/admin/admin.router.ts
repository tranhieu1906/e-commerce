import { Router } from "express";
import HomeAdmin from "../../controllers/admin/home.controller";
import multer from "multer";
import sharp from "sharp";

export const AdminRoute = Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../../../src/public/images/uploads");
  },
  filename: function (req, file, cb) {
    let reg = /png|jpg|jpeg|svg/;
    let type = file.mimetype.match(reg);
    let filename = `${file.fieldname}-${Date.now()}.${type}`;
    cb(null, filename);
  },
});

var upload = multer({ storage: storage });

AdminRoute.get("/", HomeAdmin.showHome);
AdminRoute.post("/add-product", upload.single("image"), HomeAdmin.addProduct);
AdminRoute.get("/delete/:id", HomeAdmin.deleteProduct);
AdminRoute.post("/delete-many", HomeAdmin.deleteManyProducts);
AdminRoute.get("/edit/:id", HomeAdmin.editProduct);

