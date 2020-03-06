import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";

let register = [
    check("email", transValidation.auth.email_incorrect)
        .isEmail()
        .trim(),
    check("password", transValidation.auth.password_incorrect)
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation", transValidation.auth.password_confirmation_incorrect)
        .custom((value, { req }) => {
            return value === req.body.password
        })
];

let updatePassword = [
    check('old_password', transValidation.auth.old_password_incorrect)
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check('password', transValidation.auth.password_incorrect)
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check('password_confirmation', transValidation.auth.password_confirmation_incorrect)
        .custom((value, { req }) => value === req.body.password)
];

module.exports = {
    register,
    updatePassword
};
