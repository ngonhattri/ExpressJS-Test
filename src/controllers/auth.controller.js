import { validationResult } from "express-validator/check";
import { auth } from "./../services/index";

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

let getLogout = (req, res) => {
    // do something
};

module.exports = {
    getLogin: getLogin,
    getRegister: getRegister,
    getLogout: getLogout,
    postRegister: postRegister,
}