import express from "express";
import { home, auth, blogs, api, categories } from "./../controllers/index";
import { authValid, blogValid, categoryValid } from "./../validation/index";
import passport from "passport";
import initPassportLocal from "../config/passport_local";
initPassportLocal();
let router = express.Router();
/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {

    // Auth
    router.get("/login", auth.checkLoggedOut, auth.getLogin);
    router.get("/register", auth.checkLoggedOut, auth.getRegister);
    router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    router.put("/update-password", auth.checkLoggedIn, authValid.updatePassword, auth.updatePassword);

    // API
    router.get("/api/v1/blogs/", auth.checkApi, api.getBlogs);
    router.get("/api/v1/blogs/detail/:_id", auth.checkApi, api.detailBlogs);
    router.get("/api/v1/categories/", auth.checkApi, api.getCategories);

    // Home
    router.get("/", auth.checkLoggedIn, home.getHome);

    // Blog
    router.get("/blogs", auth.checkLoggedIn, blogs.getBlogs);
    router.post("/blogs", auth.checkLoggedIn, blogValid.blog, blogs.postBlogs);
    router.get("/blogs/add/", auth.checkLoggedIn, blogs.addBlogs);
    router.get("/blogs/detail/:_id", auth.checkLoggedIn, blogs.detailBlogs);
    router.put("/blogs/update/:_id", auth.checkLoggedIn, blogValid.blog, blogs.updateBlog);
    router.put("/blogs/status/:_id", auth.checkLoggedIn, blogValid.blog, blogs.changeStatus);
    router.delete("/blogs/delete/:_id", auth.checkLoggedIn, blogs.removeBlog);

    // Category
    router.get("/categories", auth.checkLoggedIn, categories.getCategories);
    router.post("/categories", auth.checkLoggedIn, categoryValid.category, categories.postCategories);
    router.get("/categories/add", auth.checkLoggedIn, categories.addCategories);
    router.get("/categories/detail/:_id", auth.checkLoggedIn, categories.detailCategories);
    router.put("/categories/update/:_id", auth.checkLoggedIn, categoryValid.category, categories.updateCategories);
    router.delete("/categories/delete/:_id", auth.checkLoggedIn, categories.removeCategories);

    // 404
    router.get("*", (req, res) => {
        res.render("main/404");
    })
    return app.use("/", router);
};

module.exports = initRoutes;