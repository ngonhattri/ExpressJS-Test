import mongoose from "mongoose";
import bcrypt from "bcryptjs";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: String,
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png'
    },
    complete: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'complete'
        }
    ],
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: null
    }
});

UserSchema.statics = {
    checkIfUserExsits() {
        return this.countDocuments().exec();
    },
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({ "email": email }).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    updatePassword(id, hashedPassword) {
        return this.findOneAndUpdate({ _id: id }, { "password": hashedPassword }).exec();
    },
    push(id, data) {
        return this.findOneAndUpdate({ _id: id }, { $push: { done_test: data } }).exec();
    },
    pull(id, data) {
        return this.findOneAndUpdate({ _id: id }, { $pull: { done_test: data } }).exec();
    }
};

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = mongoose.model('users', UserSchema);