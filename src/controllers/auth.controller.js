import { validationResult } from "express-validator/check";
import { auth } from "./../services/index";
import { transSuccess } from "./../../lang/vi";

/**
 * This is function get view login
 * @param {*} req 
 * @param {*} res 
 */
let getLogin = async (req, res) => {

    // If not admin
    const check = await auth.checkExistsUser();
    if (!check) return res.redirect("/register");

    return res.render("auth/login", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        value: req.flash("value")
    });
};

/**
 * This is function get view reigster
 * @param {*} req 
 * @param {*} res 
 */
let getRegister = async (req, res) => {

    // If exists admin
    const check = await auth.checkExistsUser();
    if (check) return res.redirect("/login");

    return res.render("auth/register", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        value: req.flash("value")
    });
};

/**
 * This is function logout user
 * @param {*} req 
 * @param {*} res 
 */
let getLogout = (req, res) => {
    req.logout();
    req.flash("success", transSuccess.auth.logout_success);
    return res.redirect("/login");
};

/**
 * This is function register user
 * @param {*} req 
 * @param {*} res 
 */
let postRegister = async (req, res) => {
    let errorArr = [];

    // Check validate
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash("errors", errorArr);
        req.flash("value", req.body);
        return res.redirect("/register");
    }

    // Create user
    try {
        let createUserSuccess = await auth.registerNewUser(req.body.email, req.body.password);
        req.flash("success", transSuccess.user.user_created(createUserSuccess.email));
        return res.redirect("/login");
    } catch (error) {
        req.flash("errors", error.message);
        req.flash("value", req.body);
        return res.redirect("register");
    }
};

/**
 * This is function updater password user
 * @param {*} req 
 * @param {*} res 
 */
let updatePassword = async (req, res) => {
    let errorArr = [];

    // Check validate
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((element) => {
            errorArr.push(element.msg);
        });
        req.flash('errors', errorArr);
        return res.redirect("/");
    }

    // Update user
    try {
        let updateUserItem = req.body;
        await auth.updateUserPassword(req.user._id, updateUserItem);
        req.logout();
        req.flash("success", transSuccess.auth.user_info_updated);
        return res.redirect("/login");
    } catch (error) {
        errorArr.push(error.message);
        req.flash("errors", errorArr);
        return res.redirect("/");
    }
};

module.exports = {
    getLogin,
    getRegister,
    getLogout,
    postRegister,
    updatePassword,
}