import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { transErrors, transSuccess } from "./../../lang/vi";

let saltRounds = 7;

let checkExistsUser = async () => {
    const check = await UserModel.checkIfUserExsits();
    return !!check;
};

let register = (email, gender, password) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            return reject(transErrors.account_in_use);
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            email: email,
            password: bcrypt.hashSync(password, salt),
        };
        let user = await UserModel.createNew(userItem);
        resolve(transSuccess.user_created(user.email));
    });
};

let updatePassword = (id, dataUpdate) => {
    return new Promise(async (resolve, reject) => {
        let currentUser = await UserModel.findUserById(id);
        if (!currentUser) {
            return reject(transErrors.account_undefined);
        }
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.old_password);
        if (!checkCurrentPassword) {
            return reject(transErrors.user_current_password_failed);
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.password, salt));
        resolve(true);

    });
};

module.exports = {
    checkExistsUser: checkExistsUser,
    register: register,
    updatePassword: updatePassword
}