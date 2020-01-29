import { validationResult } from "express-validator/check";
import { auth } from "./../services/index";
import { transSuccess } from "./../../lang/vi";
let getLogin = async (req, res) => {
    const check = await auth.checkExistsUser();
    if (!check) return res.redirect("/register");
    return res.render("auth/login", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let getRegister = async (req, res) => {
    const check = await auth.checkExistsUser();
    if (check) return res.redirect("/login");
    return res.render("auth/register", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let postRegister = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr);
        return res.redirect("/register");
    }
    try {
        let createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password);
        successArr.push(createUserSuccess);

        req.flash("success", successArr);
        return res.redirect("/login");
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("register");
    }
};

let updatePassword = async (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req)
    if (validationErrors.isEmpty() == false) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/");
    }
    try {
        let updateUserItem = req.body;
        await auth.updatePassword(req.user._id, updateUserItem);
        req.logout();
        req.flash("success", transSuccess.user_password_updated);
        return res.redirect("/login");
    } catch (error) {
        console.log(error)
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/");
    }
};

let getLogout = (req, res) => {
    req.logout();
    req.flash("success", transSuccess.logout_success);
    return res.redirect("/login");
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let checkApi = (req, res, next) => {
    next();
};

module.exports = {
    getLogin: getLogin,
    getRegister: getRegister,
    getLogout: getLogout,
    postRegister: postRegister,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    updatePassword: updatePassword,
    checkApi: checkApi
}