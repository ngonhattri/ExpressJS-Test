import homeController from "./home.controller";
import authController from "./auth.controller";
import testController from "./test.controller";
import categoryController from "./category.controller";
import questionController from "./question.controller";
import apiController from "./api/test.controller";


export const home = homeController;
export const auth = authController;
export const tests = testController;
export const categories = categoryController;
export const questions = questionController;
export const api = apiController;