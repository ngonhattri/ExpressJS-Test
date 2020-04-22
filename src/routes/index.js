import express from "express";
import { home, auth, tests, api, categories } from "./../controllers/index";
import { authValid, categoryValid, testValid } from "./../validation/index";
import passport from "passport";
import initPassportLocal from "../config/passport_local";
import { checkDefault, checkLoggedIn, checkLoggedOut } from '../config/middleware';

initPassportLocal();
let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {

    // Auth
    router.get("/login", checkLoggedOut, auth.getLogin);
    router.get("/register", checkLoggedOut, auth.getRegister);
    router.post("/register", checkLoggedOut, authValid.register, auth.postRegister);
    router.post("/login", checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    router.get("/logout", checkLoggedIn, auth.getLogout);
    router.put("/update-password", checkLoggedIn, authValid.updatePassword, auth.updatePassword);

    // API
    router.get("/api/v1/tests/", checkDefault, api.getTests);
    router.get("/api/v1/tests/detail/:_id", checkDefault, api.detailTests);
    // Home
    router.get("/", checkLoggedIn, home.getHome);

    // Test
    router.get("/tests", checkLoggedIn, tests.getTests);
    router.post("/tests", checkLoggedIn, testValid.test, tests.postTest);
    router.get("/tests/add/", checkLoggedIn, tests.createTest);
    router.get("/tests/detail/:_id", checkLoggedIn, tests.detailTest);
    router.put("/tests/update/:_id", checkLoggedIn, testValid.test, tests.updateTest);
    router.delete("/tests/delete/:_id", checkLoggedIn, tests.removeTest);

    // Category
    router.get("/categories", checkLoggedIn, categories.getCategories);
    router.post("/categories", checkLoggedIn, categoryValid.category, categories.postCategory);
    router.get("/categories/add", checkLoggedIn, categories.createCategory);
    router.get("/categories/detail/:_id", checkLoggedIn, categories.detailCategory);
    router.put("/categories/update/:_id", checkLoggedIn, categoryValid.category, categories.updateCategory);
    router.delete("/categories/delete/:_id", checkLoggedIn, categories.removeCategory);

    // 404
    router.get("*", (req, res) => {
        res.render("main/404");
    })
    return app.use("/", router);
};

module.exports = initRoutes;