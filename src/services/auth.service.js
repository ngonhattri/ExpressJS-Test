import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { transErrors } from "./../../lang/vi";

let saltRounds = 7;

/**
 * This is function check if user existsed in database
 */
let checkExistsUser = async () => {
    const check = await UserModel.checkIfUserExsits();
    return !!check;
};

/**
 * This is function register new user
 * @param {*} email 
 * @param {*} password 
 */
let registerNewUser = async (email, password) => {
    let userByEmail = await UserModel.findByEmail(email);
    if (userByEmail) throw { message: transErrors.auth.account_in_use };
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
        email: email,
        password: bcrypt.hashSync(password, salt),
    };
    return await UserModel.createNew(userItem);
};

/**
 * This is function update password
 * @param {*} id 
 * @param {*} dataUpdate 
 */
let updateUserPassword = async (id, dataUpdate) => {
    let currentUser = await UserModel.findUserById(id);
    if (!currentUser) throw { message: transErrors.auth.account_undefined };
    let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.old_password);
    if (!checkCurrentPassword) throw { message: transErrors.auth.user_current_password_failed };
    let salt = bcrypt.genSaltSync(saltRounds);
    return await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.password, salt));
};

module.exports = {
    checkExistsUser,
    registerNewUser,
    updateUserPassword
}