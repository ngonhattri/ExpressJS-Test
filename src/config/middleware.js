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

let checkDefault = (req, res, next) => {
    next();
};

module.exports = {
    checkLoggedIn,
    checkLoggedOut,
    checkDefault
}