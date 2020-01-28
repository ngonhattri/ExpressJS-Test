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
        return this.findOne({ "local.email": email }).exec();
    }
};

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = mongoose.model('users', UserSchema);