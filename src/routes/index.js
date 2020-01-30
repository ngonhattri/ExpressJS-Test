import express from "express";
import { home, auth, blogs, api } from "./../controllers/index";
import { authValid, blogValid } from "./../validation/index";
import passport from "passport";
import initPassportLocal from "../config/passport_local";
initPassportLocal();
let router = express.Router();
/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {
    router.get("/login", auth.checkLoggedOut, auth.getLogin);
    router.get("/register", auth.checkLoggedOut, auth.getRegister);
    router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));

    router.get("/api/v1/blogs/", auth.checkApi, api.getBlogsApi);
    router.get("/api/v1/blogs/detail/:_id", auth.checkApi, api.detailBlogsApi);

    router.get("/", auth.checkLoggedIn, home.getHome);
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    router.put("/update-password", auth.checkLoggedIn, authValid.updatePassword, auth.updatePassword);
    router.get("/blogs/", auth.checkLoggedIn, blogs.getBlogs);
    router.post("/blogs", auth.checkLoggedIn, blogValid.blog, blogs.postBlogs);
    router.get("/blogs/add/", auth.checkLoggedIn, blogs.addBlogs);
    router.get("/blogs/detail/:_id", auth.checkLoggedIn, blogs.detailBlogs);
    router.put("/blogs/update/:_id", auth.checkLoggedIn, blogValid.blog, blogs.updateBlog);
    router.put("/blogs/status/:_id", auth.checkLoggedIn, blogValid.blog, blogs.changeStatus);
    router.delete("/blogs/delete/:_id", auth.checkLoggedIn, blogs.removeBlog);
    router.get("/blogs/:page", auth.checkLoggedIn, blogs.getBlogs);
    router.get("*", (req, res) => {
        res.render("main/404");
    })
    return app.use("/", router);
};

module.exports = initRoutes;