import homeController from "./home.controller";
import authController from "./auth.controller";
import blogController from "./blog.controller";
import categoryController from "./category.controller";
import apiController from "./api/blog.controller";

export const home = homeController;
export const auth = authController;
export const blogs = blogController;
export const categories = categoryController;
export const api = apiController;