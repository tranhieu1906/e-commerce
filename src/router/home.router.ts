import { Router } from "express";
export const HomeRoute = Router();
import Home from "../controllers/home.controller";

HomeRoute.get("/home", Home.showHomePage);
HomeRoute.post("/home", Home.HomePage);
