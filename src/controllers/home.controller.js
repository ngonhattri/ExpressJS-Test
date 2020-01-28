import { auth } from "./../services/index";

let getHome = async (req, res) => {
    const check = await auth.checkExistsUser();
    if (!check) return res.redirect("/register");
    return res.render('main/home/home', {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user
    });
};

module.exports = {
    getHome: getHome
};