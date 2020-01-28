import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "../models/user.model";
import { transErrors, transSuccess } from "../../lang/vi";

let LocalStratery = passportLocal.Strategy;

/**
 * Valid user account type: local
 */

let initPassportLocal = () => {
    passport.use(new LocalStratery({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findByEmail(email);
            if (!user) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }

            let checkPassword = await user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }
            return done(null, user, req.flash("success", transSuccess.login_success(user.email)));
        } catch (error) {
            // Server Error
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));

    /**
     * Save UserID to Session
     */
    passport.serializeUser((user, done) => {
        // only save user._id
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(user => {
                return done(null, user);
            })
            .catch(error => {
                return done(error, null);
            });
    });
};

module.exports = initPassportLocal;