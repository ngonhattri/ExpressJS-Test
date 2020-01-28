import express from "express";
import { home, auth } from "./../controllers/index";
import { authValid } from "./../validation/index";
import passport from "passport";
import initPassportLocal from "../config/passport_local";
initPassportLocal();
let router = express.Router();
/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {
    router.get("/", home.getHome);
    router.get("/login", auth.getLogin);
    router.get("/register", auth.getRegister);
    router.post("/register", authValid.register, auth.postRegister);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    return app.use("/", router);
};

module.exports = initRoutes;